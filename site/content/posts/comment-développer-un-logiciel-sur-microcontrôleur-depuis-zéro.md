---
title: Comment développer un logiciel sur microcontrôleur depuis zéro ?
author: Florian Ferrier
date: 2024-09-19T07:54:56.720Z
description: L'objectif de cet article est de présenter et d'expliquer les
  différentes étapes à réaliser pour construire et exécuter un programme
  informatique sur un microcontrôleur (firmware).
tags:
  - dev
---
L'objectif de cet article est de présenter et d'expliquer les différentes étapes à réaliser pour construire et exécuter un programme informatique sur un microcontrôleur (firmware).

Cet article va donc aborder des notions de matériel (hardware), de logiciel (software) mais également intégrer des notions de développement logiciel avec les tests.

Une carte d'évaluation pour microcontrôleur sera utilisée comme support de présentation (la Nucleo-F446 de chez STMicroelectronics) et l'environnement de développement est disponible sur le GitHub public de Sogilis : <https://github.com/sogilis/sogilis-katalog/tree/main/nucleo-board-from-scratch>.

## Introduction

Pour contextualiser, il faut d'abord se poser la question suivante :

#### **Qu'est-ce qu'un microcontrôleur et pourquoi l'utilise-t-on en masse aujourd'hui ?**

Un microcontrôleur (MCU) est un circuit intégré qui rassemble les éléments essentiels d'un ordinateur :

* Un processeur (CPU) qui est responsable de l'exécution du programme.
* De la mémoire (ROM et RAM) pour stocker les variables et le programme.
* Une horloge pour cadencer les instructions du processeur.
* Des interfaces d'entrées et de sorties (IO) pour communiquer avec l'extérieur.

Tous ces éléments communiquent entre eux par des bus de données et d'adresses.

![](/img/untitled-11-.png)

Mais à la différence des ordinateurs, le microcontrôleur se caractérise par un plus haut degré d'intégration, une plus faible consommation électrique, une vitesse de fonctionnement plus faible, mais surtout un coût réduit.

Le domaine de prédilection des microcontrôleurs est celui des systèmes embarqués comme, par exemple, des contrôleurs de moteur, de l'électroménager, les télécommunications ou encore l'internet des objets (IoT).

## Carte d'évaluation

Pour programmer rapidement un microcontrôleur (faire du **prototypage rapide**), les constructeurs vendent des cartes d'évaluation, dont STMicroelectronics avec sa gamme Nucleo-Board.

La carte d'évaluation utilisée ici est une Nucleo-F446 et elle dispose des éléments suivants :

* Une sonde de débogage et de programmation : ST-Link (en vert)
* Un microcontrôleur : STM32F446RE (en bleu clair)
* Des boutons (en rose)
* Des LEDs
* Des pins d'entrées et sorties : IO (en bleu foncé)

![](/img/untitled-12-.png)

Les caractéristiques techniques de la carte sont décrites dans le User Manuel (UM1724) fourni par ST-Microelectronics : [UM1724 - User Manual for Nucleo-Board](https://www.st.com/content/ccc/resource/technical/document/user_manual/98/2e/fa/4b/e0/82/43/b7/DM00105823.pdf/files/DM00105823.pdf/jcr:content/translations/en.DM00105823.pdf).

## Microcontrôleur

L’élément central de la carte d’évaluation Nucleo-F446 est le **microcontrôleur** STM32F446RE, ce dernier dispose d’un grand nombre de périphérique et intègre un processeur du type **ARM Cortex-M4** 32-bits avec le type de mémoire suivant :

* 512 kBytes de Flash
* 128 kBytes de SRAM

La **Flash** est un type de **mémoire morte** (EEPROM souvent abbrévié en ROM) qui permet d’avoir une grande capacité de stockage non volatile ce qui signifie qu’il n’y a pas de perte de données lors de la mise hors tension du système. C’est dans cette zone mémoire que le code sera chargé.

La **SRAM** (Static Random-Access Memory) est un type de **mémoire vive** qui permet un accès rapide aux données mais volatile ce qui signifie une perte des données lors de la mise hors tension du système.

![](/img/untitled-13-.png)

Les documentations techniques sont fourni par ST-Microelectronics :

* Le [Reference Manual (RM0390)](https://www.st.com/resource/en/reference_manual/rm0390-stm32f446xx-advanced-armbased-32bit-mcus-stmicroelectronics.pdf) qui donne les explications pour utiliser la mémoire et les périphériques du microcontrôleur.
* Le [Programming Manual (PM0214)](https://www.st.com/content/ccc/resource/technical/document/programming_manual/6c/3a/cb/e7/e4/ea/44/9b/DM00046982.pdf/files/DM00046982.pdf/jcr:content/translations/en.DM00046982.pdf) qui donne une description complète du processeur STM32 Cortex-M4 avec le jeux d’instructions et les périphériques du processeur.

## Démarrage de la carte

A la mise sous tension de la carte, le processeur effectue une suite d’opérations élémentaires avant d’exécuter le programme, cette séquence est appelé **séquence d’amorçage** (*boot*).

Une configuration matérielle permet de choisir quel type d’opération seront effectuées (*boot* *mode* avec les pins BOOT0 et BOOT1).

![](/img/rm0390-boot-conf.png)

Par défaut, la configuration BOOT0 est défini ce qui signifie que c’est la zone de mémoire principal en Flash qui est sélectionnée. Une autre configuration possible serait celle qui permet de reprogrammer le programme avec l’UART, l’I2C, le SPI ou encore l’USB-DFU.

![](/img/rm0390-memory-map.png)

![](/img/rm0390-memory-map-2.png)

Les emplacements mémoire dans le mode *Main Flash Memory* sont donc les suivant :

* SRAM : A l’adresse 0x20000000 de taille 128kB
* Flash : A l’adresse 0x08000000 de taille 512kB

Lors du *boot* en mode *Main Flash Memory*, les données stockées dans la zone mémoire de la Flash seront en miroir dans la zone mémoire commençant à l’adresse 0x00000000.

A la mise sous-tension (ou après un redémarrage) de la carte, le processeur lève une **interruption** matérielle : ***RESET***.

![](/img/pm0214-exception-types.png)

Après cette interruption, le processeur va donc utiliser la table des vecteurs (vector table) pour charger certains registres. Cette table doit être chargée en mémoire lors de la programmation de la carte. Elle doit contenir les adresses mémoires pour les différentes fonctions d’interruptions (handler).

![](/img/pm0214-vector-table.png)

Le processeur va alors charger les registres dans l’ordre suivant :

* Le registre MSP (Main Stack Pointer) avec la valeur stockée à l’adresse 0x00000000.
* Le registre PC (Program Counter) avec la valeur stockée à l’adresse 0x00000004.

Durant l’exécution du programme, le registre MSP contient l’adresse de la pile et le registre PC contient l’adresse de l’instruction en cours.

Donc au démarrage de la carte, le registre MSP va pointer sur le début de la pile et le registre PC sur l’adresse mémoire de la fonction *Reset*.

![](/img/pm0214-on-reset.png)

La gestion des données est définie dans un fichier de configuration pour l’éditeur de lien (linker). Il décrit les emplacements de données dans les zones mémoires :

![](/img/présentation-sans-titre.png)

La fonction *Reset* est la porte d’entrée dans notre application et elle doit être en charge de:

* Copier la section .data de la ROM (aussi appelé Flash) vers la RAM
* Initialiser les variables de la section .bss à 0
* Appeler la fonction *main()*

## Environnement de développement

Avant l’écriture de ligne de code, il faut mettre en place son **environnement de développement**. Pour le développement sur microcontrôleur, les outils et les processus sont installés sur une machine **hôte** (*host machine*) qui n’est rien d’autre qu’un ordinateur. Le logiciel est ainsi construit (*cross-compiling*) sur une machine différente puis téléversé (*flash*) vers la **cible** (*target machine*) avant d’être exécuté par cette dernière.

![](/img/untitled-14-.png)

L’environnement de développement présenté dans cet article est celui du kata ***[nucleo-board-from-scratch](https://github.com/sogilis/sogilis-katalog/tree/main/nucleo-board-from-scratch/C)*** sur le dépôt de sogilis.

Il intègre les outils suivants :

![](/img/minimalist-black-white-modern-thanks-for-watching-youtube-outro-video-24-.png)

Le choix des outils s’est tourné vers des solutions **open-source** qui sont largement utilisé dans le monde de l’industrie.

L’installation des outils se fait dans un environnement **Linux** (Ubuntu:22.04) ou avec **Docker**, le projet contient un dockerfile pour construire une image Docker contenant tout les outils nécessaire.

La suite de commande pour compiler, exécuter le code ou autre sont explicités dans le fichier *[Readme.md](http://Readme.md)* présent à la racine du projet.

L’**arborescence** du projet est la suivante :

```c
.
├── Readme.md
├── CMakelists.txt
├── Dockerfile
├── cmake
│   ├── cmocka.cmake
│   ├── stm32f446retx.cmake
│   ├── toolchain-arm-none-eabi.cmake
│   └── toolchain-native.cmake
├── config
│   ├── nucleo-f446re.resc
│   ├── nucleo-f446re.repl
│   ├── stm32f446retx.cfg
│   └── stm32f446retx.ld
├── lib
│   ├── CMakeLists.txt
│   └── led
│        ├── CMakeLists.txt
│        ├── led.h
│        └── led.c
├── src
│   ├── CMakeLists.txt
│   └── main.c
└── test
    ├── CMakeLists.txt
    └── led
         └── test_led.c
```

Il n’existe pas de **convention** de nommage ou d’organisation de dossier. Cependant, il est préférable de les définir avant de commencer à développer.

Ici, le choix a été fait de garder le fichier *main.c* dans le dossier *src*. La gestion de la LED est mise dans un sous-dossier séparé dans le dossier *lib.* Les tests sont séparés du code source de l’application avec une organisation par module. Le dossier *cmake* contient des directives pour la construction de CMake et le dossier *config* contient des fichiers de configuration pour les outils OpenOCD, Renode et l’éditeur de lien.

## Gestion de la LED utilisateur

La **gestion** de la **LED** utilisateur sur la carte d’évaluation sera prise comme exemple pour faire une démonstration sur la programmation du microcontrôleur.

Mais avant l’écriture de ligne de commande, il faut regarder du côté de la documentation technique pour voir comment **gérer** les **entrées/sorties** (*IO*) du microcontrôleur.

Pour cela, le microcontrôleur possède un périphérique d’entrée et de sortie : **GPIO** et la LED utilisateur est connecté à la pin GPIOA5 sur la carte d’évaluation.

La documentation du microcontrôleur nous donne la configuration du GPIO en sortie (*output*) :

![](/img/rm0390-gpio.png)

Pour pouvoir faire varier l’état de ce GPIO, il faut suivre les étapes suivantes :

1. Activer l’horloge périphérique (registre RCC_AHB1ENR)
2. Configurer la pin GPIO en *output* (registre GPIOA_MODER)
3. Configurer la pin GPIO en *push-pull* (registre GPIOA_OTYPER)
4. Configurer la pin GPIO en *low-speed* (registre GPIOA_OSPEEDR)
5. Configurer la pin GPIO en *no pull-up/down* (registre GPIOA_PUPDR)
6. Mettre la pin GPIO à l’état bas (registre GPIOA_ODR)

D’un point de vue du code, l’**accès** aux **périphériques** se fait par des **adresses mémoires** de **32 bits** dans le cadre de notre microcontrôleur. Pour cela il y a plusieurs méthodes :

La première méthode consiste à déclarer des **pointeurs** mais cette solution fait utiliser la mémoire RAM :

```c
volatile uint32_t *GPIOA_MODER = 0x40020000;
volatile uint32_t *GPIOA_OTYPER = 0x40020004;
volatile uint32_t *GPIOA_OSPEEDR = 0x40020008;
volatile uint32_t *GPIOA_PUPDR = 0x4002000C;
volatile uint32_t *GPIOA_ODR = 0x40020014;
```

La deuxième méthode consiste à déférencer des pointeurs :

```c
#define RCC_AHB1ENR (*(volatile uint32_t *)0x40023830)
#define GPIOA_MODER (*(volatile uint32_t *)0x40020000)
#define GPIOA_OTYPER (*(volatile uint32_t *)0x40020004)
#define GPIOA_OSPEEDR (*(volatile uint32_t *)0x40020008)
#define GPIOA_PUPDR (*(volatile uint32_t *)0x4002000C)
#define GPIOA_ODR (*(volatile uint32_t *)0x40020014)
```

La troisième méthode est d’utilisé un pointeur de structure :

```c
/* 3ème méthode - Pointeur de structure */
typedef struct { 
  volatile uint32_t MODER; /* Offset: 0x0 */
  volatile uint32_t OTYPER; /* Offset: 0x4 */
  volatile uint32_t OSPEEDR; /* Offset: 0x8 */
  volatile uint32_t PUPDR; /* Offset: 0xC */
  volatile uint32_t IDR; /* Offset: 0x10 */
  volatile uint32_t ODR; /* Offset: 0x14 */
} gpio_s;
#define GPIOA (*(gpio_s*)(0x40020000))
```

STMicroelectronics met à disposition une bibliothèque HAL (Hardware Abstraction Layer) open-source qui à pour objectif de faciliter la vie des développeurs en réduisant les efforts, le temps et les coûts ([Lien vers Github](https://github.com/STMicroelectronics/stm32f4xx_hal_driver)). Cette HAL utilise les méthodes 2 et 3 pour définir l’accès aux périphériques. Cependant, dans le cadre de notre article, le choix a été fait de ne pas l’utiliser.

***Le mot-clés volatile permet d’éviter les optimisations du compilateur sur la variable et que le programme veut accéder à une variable qui peut être modifiée par le matériel.***

La configuration du GPIO avec l’accès aux périphériques par des pointeurs de structure devient donc le suivant :

```c
#define RCC_AHB1ENR (*(volatile uint32_t *)0x40023830)

typedef struct { 
  volatile uint32_t MODER; /* Offset: 0x0 */
  volatile uint32_t OTYPER; /* Offset: 0x4 */
  volatile uint32_t OSPEEDR; /* Offset: 0x8 */
  volatile uint32_t PUPDR; /* Offset: 0xC */
  volatile uint32_t IDR; /* Offset: 0x10 */
  volatile uint32_t ODR; /* Offset: 0x14 */
} gpio_s;
#define GPIOA (*(gpio_s*)(0x40020000))

/* Enable periph clock for GPIOA port */
RCC_AHB1ENR |= (0b1 << 0);

/* GPIOA5 as Output */
GPIOA.MODER &= ~(0b11 << 10);
GPIOA.MODER |= (0b01 << 10);

/* GPIOA5 on Push-Pull */
GPIOA.OTYPER &= ~(0b1 << 5);

/* GPIOA5 on Low speed */
GPIOA.OSPEEDR &= ~(0b11 << 10);

/* GPIOA5 on No pull-up/pull-down */
GPIOA.PUPDR &= ~(0b11 << 10);

/* GPIOA5 on low level */
GPIOA.ODR &= ~(0b1 << 5);

/* GPIOA5 on high level */
GPIOA.ODR |= (0b1 << 5);
```

L’accès aux adresses mémoires du microcontrôleur permet un contrôle bas niveau du matériel.

Dans le cas d’un *refactoring*, on aurait tendance à déclarer la fonction suivante pour changer l’état de la LED :

```c
typedef enum {
    USER_LED_STATE_OFF = 0,
    USER_LED_STATE_ON = 1,
} userLed_state_e;

void userLed_set(userLed_state_e state) {
	switch (state)
	{
	case USER_LED_STATE_OFF:
		GPIOA.ODR &= ~(0b1 << 5);
		break;
	case USER_LED_STATE_ON:
		GPIOA.ODR |= (0b1 << 5);
		break;
	default:
		break;
	}
}
```

Ces lignes de code ne sont pas directement utilisable comme tels mais doivent être intégrées dans une fonction *main()* et un fichier de liens (voir section **Démarrage de la carte**).

Le code ne peut donc pas être testé sur le matériel.

En revanche, il est tout à fait faisable de tester ce code sur la machine hôte, ce mécanisme est appelé **test en natif**.

## Test en natif

Les tests en natif sont pratique pour **tester** rapidement des modules de code sur la machine **hôte** (et non pas le *firmware* complet). Ils ont l’avantage de pouvoir être exécuté rapidement, d’être indépendant du matériel cible et de donner un feedback rapide aux développeurs.

***Dans le cadre de la pratique du TDD, les développeurs vont privilégier ce type de méchanisme de test.***

Cependant, il nécessite d’avoir une seconde *toolchain* pour pouvoir compiler les binaires de test qui seront exécutés sur la machine hôte. Des **divergences** peuvent exister entre les configurations matérielles des deux machines comme par exemple la taille des registres, des adresses mémoires et d’*endianness* (qui désigne la manière dont les ordinateurs organisent les octets pour constituer des nombres avec soit les bits de points fort *MSB* en premier ou les bits de poids faible *LSB* en premier).

De plus, pour simuler les registres matériels, une configuration **complexe** est nécessaire et donc les avantages deviennent plus limités.

## Adaptation pour les tests

L’accès aux adresses mémoires du microcontrôleur n’est pas possible lorsqu’on compile les tests puisqu’ils sont compilés en natif. Les adresses des périphériques pointeront alors vers une zone mémoire de la machine hôte ce qui peut proposer un comportement non prévue. Il est donc nécessaire de **redéfinir** ces adresses vers une zone mémoire permis.

```c
#ifndef UTEST
#define RCC_AHB1ENR (*(volatile uint32_t *)0x40023830)
#define GPIOA (*(gpio_s*)(0x40020000))
#else
extern volatile uint32_t RCC_AHB1ENR;
extern gpio_s GPIOA;
#endif
```

La déclaration de la structure GPIOA se fait donc de la manière suivante dans le fichier de test :

```c
typedef struct { 
  volatile uint32_t MODER;
  volatile uint32_t OTYPER;
  volatile uint32_t OSPEEDR;
  volatile uint32_t PUPDR;
  volatile uint32_t IDR;
  volatile uint32_t ODR; 
} gpio_s;
gpio_s GPIOA = {0};
volatile uint32_t RCC_AHB1ENR = 0;
```

## Mock avec CMocka

Le *framework* CMocka permet en plus d’écrire des tests unitaires, de ***mocker*** des objets. Cette fonctionalité permet d’imiter le comportement d’objets réels en vérifiant les paramètres attendues et de retourner un état contrôler depuis le test.

Dans notre cas, on peut mocker la fonction `userLed_set()` de cette manière :

```c
void mock_assert_call_userLed_set(userLed_state_e state) {
    expect_function_call(userLed_set);
    expect_value(userLed_set, state, state);
}
void userLed_set(userLed_state_e state) {
    function_called();
    check_expected(state);
}
```

## Conclusion

Le développement logiciel sur microcontrôleur varie d’un développement traditionnel sur ordinateur. Il faut prendre en compte la forte **dépendance** du matériel et adapté ses implémentations en conséquence. Néanmoins, il est possible de mettre en place des mécanismes pour pouvoir faire des tests en **natifs** et donc **accélérer** les boucles de **feedback**.

Cet article a traité du développement logiciel sur microcontrôleur en partant de zéro mais sans aborder les notions de mise en place d’un environnement de travail ni même dans la mise en place d’un système d’exploitation temps réel (*RTOS*).

### Ressources

La section suivante regroupe les documentations des différents outils présentés ici mais également les articles utilisés.

#### **Documentations**

* [UM1724 - User Manual for Nucleo-Board](https://www.st.com/content/ccc/resource/technical/document/user_manual/98/2e/fa/4b/e0/82/43/b7/DM00105823.pdf/files/DM00105823.pdf/jcr:content/translations/en.DM00105823.pdf)
* [RM0390 - Reference Manual for STM32F446xx](https://www.st.com/resource/en/reference_manual/rm0390-stm32f446xx-advanced-armbased-32bit-mcus-stmicroelectronics.pdf)
* [PM0214 - Programming Manual for STM32 Cortex-M4](https://www.st.com/content/ccc/resource/technical/document/programming_manual/6c/3a/cb/e7/e4/ea/44/9b/DM00046982.pdf/files/DM00046982.pdf/jcr:content/translations/en.DM00046982.pdf)
* [Arm Cortex-M4 Processor Technical Reference Manual](https://developer.arm.com/documentation/100166/0001)
* [ARMv7-M Architecture Reference Manual](https://developer.arm.com/documentation/ddi0403/latest/)
* [AN2606 - STM32 microcontroller system memory boot mode](https://www.st.com/resource/en/application_note/cd00167594-stm32-microcontroller-system-memory-boot-mode-stmicroelectronics.pdf)
* [CMake Reference Documentation](https://cmake.org/cmake/help/latest/)
* [CMocka Website](https://medium.com/@csrohit/stm32-startup-script-in-c-b01e47c55179)
* [Openocd User Guide](https://openocd.org/doc/html/Running.html)
* [PyTest Website](https://docs.pytest.org/en/8.0.x/)

#### **Articles**

* [Baremetal from zero to blink](https://www.linuxembedded.fr/2021/02/bare-metal-from-zero-to-blink)
* [From Zero to main(): Bare metal C](https://interrupt.memfault.com/blog/zero-to-main-1)
* [From Zero to main(): Demystifying Firmware Linker Scripts](https://interrupt.memfault.com/blog/how-to-write-linker-scripts-for-firmware)
* [From Zero to main(): How to Write a Bootloader from Scratch](https://interrupt.memfault.com/blog/how-to-write-a-bootloader-from-scratch)
* [From Zero to main(): Bootstrapping libc with Newlib](https://interrupt.memfault.com/blog/boostrapping-libc-with-newlib#from-zero-to-main-bootstrapping-libc-with-newlib)
* [From Zero to main(): Bare metal Rust](https://interrupt.memfault.com/blog/zero-to-main-rust-1)
* [A General Overview of What Happens Before main()](https://embeddedartistry.com/blog/2019/04/08/a-general-overview-of-what-happens-before-main/)
* [Blink - say Hello to the World](https://www.codeinsideout.com/blog/stm32/blink/#hardware)
* [Embedded C/C++ Unit Testing Basics](https://interrupt.memfault.com/blog/unit-testing-basics)
* [STM32 Startup script in C++](https://medium.com/@csrohit/stm32-startup-script-in-c-b01e47c55179)
* [What do linkers do](https://stackoverflow.com/questions/3322911/what-do-linkers-do)
* [An Introduction to Modern CMake](https://medium.com/@csrohit/stm32-startup-script-in-c-b01e47c55179)
* [OpenOCD from scratch](https://www.linuxembedded.fr/2018/08/openocd-from-scratch)
* [Accessing Registers In C](https://www.embedded.com/device-registers-in-c/)
* [Bitwise operations on device registers](https://www.embedded.com/bitwise-operations-on-device-registers/)
* [Sizing and aligning device registers](https://www.embedded.com/sizing-and-aligning-device-registers/)
* [Unit Test How? Registers](https://vandervoord.net/blog/2015/5/24/unit-test-how-registers)

#### Glossaire

* CPU : Central Processing Unit
* EEPROM : Electrically-Erasable Programmable Read-Only Memory
* GPIO : General Purpose Input/Output
* HSI : High-Speed Internal
* IO : Input/Output
* IOT : Internet Of Things
* JTAG : Joint Test Action Group
* kB : kilo-Bytes
* LSB : Least Significant Bit
* MCU : MicroController Unit
* MSB : Most Significant Bit
* MSP : Main Stack Pointer
* PC : Program Counter
* PWM : Pulse-Width Modulation
* RAM : Random-Access Memory
* ROM : Read-Only Memory
* RTOS : Real Time Operating System
* SRAM : Static Random-Access Memory
* TDD : Test-Driven Development
* UT : Unit Test