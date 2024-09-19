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