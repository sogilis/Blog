---
title: Expérimentation LLVM
author: Tiphaine
date: 2014-02-20T10:01:00+00:00
featured_image: /wp-content/uploads/2016/04/2.Developpement-1.jpg
tumblr_sogilisblog_permalink:
  - http://sogilisblog.tumblr.com/post/77265527570/expérimentation-llvm
tumblr_sogilisblog_id:
  - 77265527570
pyre_show_first_featured_image:
  - no
pyre_portfolio_width_100:
  - default
pyre_image_rollover_icons:
  - default
pyre_post_links_target:
  - no
pyre_related_posts:
  - default
pyre_share_box:
  - default
pyre_post_pagination:
  - default
pyre_author_info:
  - default
pyre_post_meta:
  - default
pyre_post_comments:
  - default
pyre_slider_position:
  - default
pyre_slider_type:
  - no
pyre_avada_rev_styles:
  - default
pyre_display_header:
  - yes
pyre_header_100_width:
  - default
pyre_header_bg_full:
  - no
pyre_header_bg_repeat:
  - repeat
pyre_displayed_menu:
  - default
pyre_display_footer:
  - default
pyre_display_copyright:
  - default
pyre_footer_100_width:
  - default
pyre_sidebar_position:
  - default
pyre_page_bg_layout:
  - default
pyre_page_bg_full:
  - no
pyre_page_bg_repeat:
  - repeat
pyre_wide_page_bg_full:
  - no
pyre_wide_page_bg_repeat:
  - repeat
pyre_page_title:
  - default
pyre_page_title_text:
  - default
pyre_page_title_text_alignment:
  - default
pyre_page_title_100_width:
  - default
pyre_page_title_bar_bg_full:
  - default
pyre_page_title_bg_parallax:
  - default
pyre_page_title_breadcrumbs_search_bar:
  - default
fusion_builder_status:
  - inactive
avada_post_views_count:
  - 1991
sbg_selected_sidebar:
  - 'a:1:{i:0;s:1:"0";}'
sbg_selected_sidebar_replacement:
  - 'a:1:{i:0;s:0:"";}'
sbg_selected_sidebar_2:
  - 'a:1:{i:0;s:1:"0";}'
sbg_selected_sidebar_2_replacement:
  - 'a:1:{i:0;s:0:"";}'
categories:
  - DÉVELOPPEMENT
tags:
  - llvm
  - sogiday

---
**Aujourd’hui, nous avons continué dans notre nouvelle tradition des SogiDays. Un sujet que j’ai proposé concernait LLVM et avait pour but d’expérimenter la création d’un compilateur pour un micro-langage.**

&nbsp;

<!-- more -->

L’intérêt principal de <span style="text-decoration: underline;"><a href="http://llvm.org" target="_blank">LLVM</a></span> est qu’il est possible de générer facilement un interpréteur et un compilateur optimisé grâce à la représentation intermédiaire LLVM. Il est aussi possible, par exemple, d’exécuter son code en JavaScript en utilisant ASM-JS. Les possibilités sont multiples. Ensuite, cela permet de facilement découvrir différents aspects de la compilation. Ces sujets ne sont pas encode abordés, mais il peut être intéressant de voir comment compiler :

  * des closures (fonctions avec contexte)
  * des objets polymorphiques, avec vtables, interfaces, …
  * des continuations
  * l’introspection
  * des exceptions
  * expérimenter sur différentes manières de gérer les erreurs
  * implémenter `eval()` pour un langage compilé (cela implique un compilateur dans le runtime)
  * une gestion de l’interopérabilité entre langages

Les sujets sont presque inépuisables…

Au lieu d’écrire le compilateur en entier, la partie front-end (le parseur) et la partie back-end (génération de code machine) ont été réutilisées. Le parseur choisi est <span style="text-decoration: underline;"><a href="http://leon.bottou.org/projects/minilisp" target="_blank">miniexp</a></span> et la génération de code s’est faite directement en C++ avec LLVM. Maintenant, voyons comment s’est déroulée la journée.

&nbsp;

## **Infrastructure de compilation**

La compilation a été un peu laborieuse en début de journée, surtout en considérant le temps relativement court pour réaliser un prototype viable. La <span style="text-decoration: underline;"><a href="http://llvm.org/releases/3.3/docs/CMake.html" target="_blank">documentation LLVM sur CMake</a></span> n’est pas au point. Au lieu de cela, un fichier <span style="text-decoration: underline;"><a href="http://lists.cs.uiuc.edu/pipermail/llvmdev/2010-June/032412.html" target="_blank">FindLLVM.cmake</a></span> trouvé sur les listes de diffusion et utilisant directement `llvm-config` a été de la plus grande aide.

Au final, le `CMakeLists.txt` ressemble à :

<pre class="wp-code-highlight prettyprint">set(CMAKE_MODULE_PATH ${CMAKE_MODULE_PATH}
    "${CMAKE_CURRENT_SOURCE_DIR}/cmake/modules"
    "${LLVM_ROOT}/share/llvm/cmake")
# ./cmake/modules est l&#039;endoit où se trouve FindLLVM.cmake téléchargé
find_package(LLVM REQUIRED)
include(HandleLLVMOptions)

find_llvm_libs( ${LLVM_CONFIG_EXECUTABLE} "native bitwriter linker bitreader jit interpreter support ipo"
REQ_LLVM_LIBRARIES LLVM_NATIVE_OBJECTS )
exec_program(${LLVM_CONFIG_EXECUTABLE} ARGS --libdir OUTPUT_VARIABLE LLVM_LIBRARY_DIRS )
exec_program(${LLVM_CONFIG_EXECUTABLE} ARGS --includedir OUTPUT_VARIABLE LLVM_INCLUDE_DIRS )

add_definitions( ${LLVM_DEFINITIONS} )
include_directories( ${LLVM_INCLUDE_DIRS} )
link_directories( ${LLVM_LIBRARY_DIRS} )

add_executable(${PROJECT_NAME} ${SRC_LIST} ${LLVM_NATIVE_OBJECTS})
target_link_libraries(${PROJECT_NAME} ${REQ_LLVM_LIBRARIES})
</pre>

Le fichier `handleLLVMOptions.cmake` dans `/usr/share/llvm/cmake` est utile pour les options préprocesseur.

Finalement, une fois les détails réglés, CMake a su se faire oublier.

&nbsp;

## **Quel langage ?**

Le fichier `test.sx` suivant a été utile tout au long de la journée pour tester le compilateur. Les instructions étaient ajoutées au fur et à mesure dans la fonction main :

<pre class="wp-code-highlight prettyprint">(def main
 (fun
  (puts "Hello World")
  (printfi "n = %d" (+ 1 2))))
</pre>

Ce n’est pas grand chose, mais cela permet de démarrer un projet de compilateur.

Pour information, le code <span style="text-decoration: underline;"><a href="http://llvm.org/docs/LangRef.html" target="_blank">LLVM-IR</a></span> généré `test.ll` ressemble à :

<pre class="wp-code-highlight prettyprint">; ModuleID = &#039;top&#039;

@0 = private unnamed_addr constant [15 x i8] c"22Hello World22A0"
@1 = private unnamed_addr constant [10 x i8] c"22n = %d22A0"

define void @main() {
entry:
  call void @puts(i8* getelementptr inbounds ([15 x i8]* @0, i32 0, i32 0))
  %0 = add i32 1, 2
  call void (i8*, ...)* @printf(i8* getelementptr inbounds ([10 x i8]* @1, i32 0, i32 0), i32 %0)
  ret void
}

declare void @puts(i8*)

declare void @printf(i8*, ...)
</pre>

Ensuite, ce code est compilé en bytecode `test.bc` LLVM :

<pre class="wp-code-highlight prettyprint">llvm-as &lt;test.ll &gt;test.bc
</pre>

Puis en assembleur machine `test.S` :

<pre class="wp-code-highlight prettyprint">llc test.bc -o test.S
</pre>

Puis en exécutable :

<pre class="wp-code-highlight prettyprint">clang test.S -o test
</pre>

On peut aussi directement interpréter le bytecode avec une machine virtuelle :

<pre class="wp-code-highlight prettyprint">lli test.bc
</pre>

&nbsp;

## **L’implémentation**

L’implémentation est relativement simple et tient en quelques classes. L’architecture du code est relativement peu intéressante. Trouver la bonne représentation bytecode pour un code donné est facile. En effet, il existe sur Internet <span style="text-decoration: underline;"><a href="http://ellcc.org/demo/index.cgi" target="_blank">une démo LLVM</a></span> qui permet de compiler n’importe quel code C et d’en voir la représentation bytecode LLVM, ou encore mieux, les appels d’API LLVM pour générer le bytecode.

Ainsi, pour générer une des constantes, considérant `llvm::IRBuilder<> builder`, il faut exécuter :

<pre class="wp-code-highlight prettyprint">(llvm::Value*) builder.CreateGlobalStringPtr((std::string) string);
(llvm::Value*) llvm::ConstantInt::get(llvm::Type::getInt32Ty(builder.getContext()), (int) integer);
</pre>

Pour ajouter une instruction d’addition au flot d’instructions `llvm::BasicBlock *entry`, il faut :

<pre class="wp-code-highlight prettyprint">(llvm::Value*) llvm::BinaryOperator::Create(llvm::Instruction::Add, (llvm::Value*) a, (llvm::Value*) b, "",
entry);
</pre>

Dans un module `llvm::Module *module`, pour déclarer des fonctions :

<pre class="wp-code-highlight prettyprint">// void puts(i8*);
std::vector&lt;llvm::Type*&gt; putsFuncTypeArgs(1);
putsFuncTypeArgs[0] = builder.getInt8PtrTy();
llvm::FunctionType *putsFuncType = llvm::FunctionType::get(builder.getVoidTy(), llvm::makeArrayRef
(putsFuncTypeArgs), false);
llvm::Function *putsFunc = llvm::Function::Create(putsFuncType, llvm::Function::ExternalLinkage, "puts",
module);

// void printf(i8*,...);
std::vector&lt;llvm::Type*&gt; printfFuncTypeArgs(1);
printfFuncTypeArgs[0] = builder.getInt8PtrTy();
llvm::FunctionType *printfFuncType = llvm::FunctionType::get(builder.getVoidTy(), llvm::makeArrayRef
(printfFuncTypeArgs), true); // true if for vararg
llvm::Function *printfFunc = llvm::Function::Create(printfFuncType, llvm::Function::ExternalLinkage, "printf",
module);
</pre>

Et pour appeler ces fonctions :

<pre class="wp-code-highlight prettyprint">// puts
std::vector&lt;llvm::Value*&gt; putsFuncArgs(1);
putsFuncArgs[0] = (Value*);
llvm::CallInst::Create(putsFunc, llvm::makeArrayRef(putsFuncArgs), "", entry);

// printf avec un arguent entier en vararg
std::vector&lt;llvm::Value*&gt; printfFuncArgs(2);
printfFuncArgs[0] = (Value*);
printfFuncArgs[1] = (Value*);
llvm::CallInst::Create(printfFunc, llvm::makeArrayRef(printfFuncArgs), "", entry);
</pre>

Et finalement, le squelette de code pour créer un module :

<pre class="wp-code-highlight prettyprint">// Initialisation
llvm::LLVMContext&amp; context = llvm::getGlobalContext();
llvm::Module* module = new llvm::Module("top", context);

// Génération d&#039;une fonction main
llvm::IRBuilder&lt;&gt; builder(module-&gt;getContext());
llvm::FunctionType *funcType = llvm::FunctionType::get(builder.getVoidTy(), false);
llvm::Function *mainFunc = llvm::Function::Create(funcType, llvm::Function::ExternalLinkage, name, module);
llvm::BasicBlock *entry = llvm::BasicBlock::Create(module-&gt;getContext(), "entry", mainFunc);
builder.SetInsertPoint(entry);

// Génération des instructions ...

// Return de la fonction main
llvm::ReturnInst::Create(module-&gt;getContext(), entry);
builder.SetInsertPoint(entry);

// Génération de code finale
llvm::PassManager pm;
pm.add(llvm::createPrintModulePass(&amp;llvm::outs()));
pm.run(*module);
</pre>

Le code est disponible sur GitHub dans le projet <span style="text-decoration: underline;"><a href="https://github.com/sogilis/minisexp" target="_blank">minisexp</a></span>.

**Shanti**