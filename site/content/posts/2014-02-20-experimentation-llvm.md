---
title: Expérimentation LLVM
author: Shanti
date: 2014-02-20T10:01:00+00:00
image: /img/2016/04/2.Developpement-1.jpg
categories:
  - DÉVELOPPEMENT
tags:
  - llvm
  - sogiday
---

Aujourd’hui, nous avons continué dans notre nouvelle tradition des SogiDays. Un sujet que j’ai proposé concernait LLVM et avait pour but d’expérimenter la création d’un compilateur pour un micro-langage.

L’intérêt principal de [LLVM](http://llvm.org) est qu’il est possible de générer facilement un interpréteur et un compilateur optimisé grâce à la représentation intermédiaire LLVM. Il est aussi possible, par exemple, d’exécuter son code en JavaScript en utilisant ASM-JS. Les possibilités sont multiples. Ensuite, cela permet de facilement découvrir différents aspects de la compilation. Ces sujets ne sont pas encode abordés, mais il peut être intéressant de voir comment compiler :

- des closures (fonctions avec contexte)
- des objets polymorphiques, avec vtables, interfaces, …
- des continuations
- l’introspection
- des exceptions
- expérimenter sur différentes manières de gérer les erreurs
- implémenter `eval()` pour un langage compilé (cela implique un compilateur dans le runtime)
- une gestion de l’interopérabilité entre langages

Les sujets sont presque inépuisables…

Au lieu d’écrire le compilateur en entier, la partie front-end (le parseur) et la partie back-end (génération de code machine) ont été réutilisées. Le parseur choisi est [miniexp](http://leon.bottou.org/projects/minilisp) et la génération de code s’est faite directement en C++ avec LLVM. Maintenant, voyons comment s’est déroulée la journée.

# Infrastructure de compilation

La compilation a été un peu laborieuse en début de journée, surtout en considérant le temps relativement court pour réaliser un prototype viable. La [documentation LLVM sur CMake](http://llvm.org/releases/3.3/docs/CMake.html) n’est pas au point. Au lieu de cela, un fichier [FindLLVM.cmake](http://lists.cs.uiuc.edu/pipermail/llvmdev/2010-June/032412.html) trouvé sur les listes de diffusion et utilisant directement `llvm-config` a été de la plus grande aide.

Au final, le `CMakeLists.txt` ressemble à :

{{< highlight llvm >}}
set(CMAKE_MODULE_PATH ${CMAKE_MODULE_PATH}
    "${CMAKE_CURRENT_SOURCE_DIR}/cmake/modules"
"\${LLVM_ROOT}/share/llvm/cmake")

# ./cmake/modules est l'endoit où se trouve FindLLVM.cmake téléchargé

find_package(LLVM REQUIRED)
include(HandleLLVMOptions)

find_llvm_libs( ${LLVM_CONFIG_EXECUTABLE} "native bitwriter linker bitreader jit interpreter support ipo"
REQ_LLVM_LIBRARIES LLVM_NATIVE_OBJECTS )
exec_program(${LLVM_CONFIG_EXECUTABLE} ARGS --libdir OUTPUT_VARIABLE LLVM_LIBRARY_DIRS )
exec_program(\${LLVM_CONFIG_EXECUTABLE} ARGS --includedir OUTPUT_VARIABLE LLVM_INCLUDE_DIRS )

add_definitions( ${LLVM_DEFINITIONS} )
include_directories( ${LLVM_INCLUDE_DIRS} )
link_directories( \${LLVM_LIBRARY_DIRS} )

add_executable(${PROJECT_NAME} ${SRC_LIST} ${LLVM_NATIVE_OBJECTS})
target_link_libraries(${PROJECT_NAME} \${REQ_LLVM_LIBRARIES})
{{< /highlight >}}

Le fichier `handleLLVMOptions.cmake` dans `/usr/share/llvm/cmake` est utile pour les options préprocesseur.

Finalement, une fois les détails réglés, CMake a su se faire oublier.

# Quel langage ?

Le fichier `test.sx` suivant a été utile tout au long de la journée pour tester le compilateur. Les instructions étaient ajoutées au fur et à mesure dans la fonction main :

{{< highlight llvm >}}
(def main
(fun
(puts "Hello World")
(printfi "n = %d" (+ 1 2))))
{{< /highlight >}}

Ce n’est pas grand chose, mais cela permet de démarrer un projet de compilateur.

Pour information, le code [LLVM-IR](http://llvm.org/docs/LangRef.html) généré `test.ll` ressemble à :

{{< highlight llvm >}}
; ModuleID = 'top'

@0 = private unnamed_addr constant [15 x i8] c"22Hello World22A0"
@1 = private unnamed_addr constant [10 x i8] c"22n = %d22A0"

define void @main() {
entry:
call void @puts(i8* getelementptr inbounds ([15 x i8]* @0, i32 0, i32 0))
%0 = add i32 1, 2
call void (i8*, ...)* @printf(i8* getelementptr inbounds ([10 x i8]* @1, i32 0, i32 0), i32 %0)
ret void
}

declare void @puts(i8\*)

declare void @printf(i8\*, ...)
{{< /highlight >}}

Ensuite, ce code est compilé en bytecode `test.bc` LLVM :

{{< highlight llvm >}}
llvm-as <test.ll >test.bc
{{< /highlight >}}

Puis en assembleur machine `test.S` :

{{< highlight llvm >}}
llc test.bc -o test.S
{{< /highlight >}}

Puis en exécutable :

{{< highlight llvm >}}
clang test.S -o test
{{< /highlight >}}

On peut aussi directement interpréter le bytecode avec une machine virtuelle :

{{< highlight llvm >}}
lli test.bc
{{< /highlight >}}

# L’implémentation

L’implémentation est relativement simple et tient en quelques classes. L’architecture du code est relativement peu intéressante. Trouver la bonne représentation bytecode pour un code donné est facile. En effet, il existe sur Internet [une démo LLVM](http://ellcc.org/demo/index.cgi) qui permet de compiler n’importe quel code C et d’en voir la représentation bytecode LLVM, ou encore mieux, les appels d’API LLVM pour générer le bytecode.

Ainsi, pour générer une des constantes, considérant `llvm::IRBuilder<> builder`, il faut exécuter :

{{< highlight llvm >}}
(llvm::Value*) builder.CreateGlobalStringPtr((std::string) string);
(llvm::Value*) llvm::ConstantInt::get(llvm::Type::getInt32Ty(builder.getContext()), (int) integer);
{{< /highlight >}}

Pour ajouter une instruction d’addition au flot d’instructions `llvm::BasicBlock *entry`, il faut :

{{< highlight llvm >}}
(llvm::Value*) llvm::BinaryOperator::Create(llvm::Instruction::Add, (llvm::Value*) a, (llvm::Value\*) b, "",
entry);
{{< /highlight >}}

Dans un module `llvm::Module *module`, pour déclarer des fonctions :

{{< highlight llvm >}}
// void puts(i8*);
std::vector<llvm::Type*> putsFuncTypeArgs(1);
putsFuncTypeArgs[0] = builder.getInt8PtrTy();
llvm::FunctionType *putsFuncType = llvm::FunctionType::get(builder.getVoidTy(), llvm::makeArrayRef
(putsFuncTypeArgs), false);
llvm::Function *putsFunc = llvm::Function::Create(putsFuncType, llvm::Function::ExternalLinkage, "puts",
module);

// void printf(i8*,...);
std::vector<llvm::Type*> printfFuncTypeArgs(1);
printfFuncTypeArgs[0] = builder.getInt8PtrTy();
llvm::FunctionType *printfFuncType = llvm::FunctionType::get(builder.getVoidTy(), llvm::makeArrayRef
(printfFuncTypeArgs), true); // true if for vararg
llvm::Function *printfFunc = llvm::Function::Create(printfFuncType, llvm::Function::ExternalLinkage, "printf",
module);
{{< /highlight >}}

Et pour appeler ces fonctions :

{{< highlight llvm >}}
// puts
std::vector<llvm::Value*> putsFuncArgs(1);
putsFuncArgs[0] = (Value*);
llvm::CallInst::Create(putsFunc, llvm::makeArrayRef(putsFuncArgs), "", entry);

// printf avec un arguent entier en vararg
std::vector<llvm::Value*> printfFuncArgs(2);
printfFuncArgs[0] = (Value*);
printfFuncArgs[1] = (Value\*);
llvm::CallInst::Create(printfFunc, llvm::makeArrayRef(printfFuncArgs), "", entry);
{{< /highlight >}}

Et finalement, le squelette de code pour créer un module :

{{< highlight llvm >}}
// Initialisation
llvm::LLVMContext& context = llvm::getGlobalContext();
llvm::Module\* module = new llvm::Module("top", context);

// Génération d'une fonction main
llvm::IRBuilder<> builder(module->getContext());
llvm::FunctionType *funcType = llvm::FunctionType::get(builder.getVoidTy(), false);
llvm::Function *mainFunc = llvm::Function::Create(funcType, llvm::Function::ExternalLinkage, name, module);
llvm::BasicBlock \*entry = llvm::BasicBlock::Create(module->getContext(), "entry", mainFunc);
builder.SetInsertPoint(entry);

// Génération des instructions ...

// Return de la fonction main
llvm::ReturnInst::Create(module->getContext(), entry);
builder.SetInsertPoint(entry);

// Génération de code finale
llvm::PassManager pm;
pm.add(llvm::createPrintModulePass(&llvm::outs()));
pm.run(\*module);
{{< /highlight >}}

Le code est disponible sur GitHub dans le projet [minisexp](https://github.com/sogilis/minisexp).
