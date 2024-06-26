---
title: Quelles sont les bonnes pratiques en développement embarqué ?
author: "Florian Ferrier "
date: 2024-06-26T12:16:38.108Z
description: Les systèmes embarqués deviennent de plus en plus complexes,
  augmentant les risques logiciels. Conçus pour des applications spécifiques,
  ils nécessitent une attention particulière pour assurer qualité et fiabilité.
  Découvrez comment les pratiques de développement évoluent pour répondre à ces
  défis.
image: /img/minimalist-black-white-modern-thanks-for-watching-youtube-outro-video-15-.png
tags:
  - dev
---
# I﻿ntroduction

Les systèmes embarqués tendent à être de plus en plus **complexes** ce qui **augmente** le **risque** lié aux composants logiciels. Pour rappel, ils sont conçus pour une application **spécifique**, ce qui en fait des ordinateurs avec un matériel **adapté** et dont l’utilisation ne va pas changer durant la durée de vie du produit. Ils sont souvent déployés de manière **définitive**. De plus, le coût de résolution d’un bug évolue de manière exponentielle en fonction de sa détection dans le processus de développement (étude de Barry Boehm dans “*Software Engineering economics*”).

Le cycle de vie du développement logiciel en embarqué utilisé de manière générale s’apparente à une cascade (on retrouve souvent le mot “*waterfall*” dans la littérature) :

1. Définition des besoins utilisateurs et des risques
2. Traduction de ces besoins en spécifications fonctionnelles
3. Conception technique globale
4. Conception technique détaillée
5. Programmation
6. Validation par des tests manuels

Avec ce mode de fonctionnement, les **tests** interviennent relativement **tard** dans le processus de développement et sont de nature exclusivement **fonctionnelle** (ou de **validation**). Et les **équipes** de **développement** sont **séparées** des **équipes** de **test**. Les conséquences de ce mode de développement sont l’augmentation des **risques** et des **retards** dans la livraison.

# O﻿bjectifs et bonnes pratiques

Les bonnes pratiques dans le monde du développement logiciel cherchent donc à **limiter** les **risques** et les **retards** de livraison mais aussi à **améliorer** de façon globale la **qualité** du code.

Les principaux objectifs de la mise en place des bonnes pratiques sont donc les suivants :

* **Améliorer** la gestion des **risques** liés au code
* **Assurer** la **qualité**, la **fiabilité** et la **performance** du code
* **Détecter** et **éliminer** les **bugs** le plus **rapidement** possible

# Problématiques de la mise en place des pratiques courantes du développement logiciel

Le monde du développement logiciel au sens large (application native sur ordinateur, web …) a mis en place des **méthodes** de **travail** et des **bonnes** **pratiques** pour répondre aux problématiques courantes. Cependant, la mise en place de ces concepts dans le domaine de l’embarqué est **limitée** par certains aspects :

* La **dépendance** très forte entre le **matériel** et le **logiciel** (on parle de **co-conception**)
* L’**indisponibilité** du matériel en début de projet et/ou limitation à son accès
* **La limitation** des **ressources** matérielles par rapport au poste de travail standard

# **Règles et normes de codage**

Le principal **langage** utilisé pour programmer les systèmes embarqués est le **C**. Dans ce langage, le développeur a une grande liberté notamment pour gérer la mémoire donc une utilisation incorrecte peut entraîner des **problèmes** et des **vulnérabilités**. Les normes de codage ont donc été introduites pour limiter les possibilités offertes par le langage et de standardiser la façon de coder.

Les principaux effets de ces normes sont **l’amélioration** de la **maintenabilité**, de la **portabilité** et de la **fiabilité** du code. Ainsi que l’amélioration de la **sécurité** et de la **sûreté** du code.

Il existe différents normes et standards qui peuvent mener à de la certification :

* [Misra C](https://misra.org.uk/) : Motor Industry Software Reliability Association
* [SEI Cert C](https://wiki.sei.cmu.edu/confluence/display/seccode/SEI+CERT+Coding+Standards) : Software Engineering Institute Certificate
* [Barr C](https://barrgroup.com/embedded-systems/books/embedded-c-coding-standard)
* [Autosar](https://www.autosar.org/) : AUTomotive Open System ARchitecture

Pour vérifier les règles de codage, il faut utiliser un **analyseur statique** de code avec notamment des outils comme [cppcheck](https://cppcheck.sourceforge.io/), [codeSonar](https://codesecure.com/our-products/codesonar/), [SonarQube](https://www.sonarsource.com/products/sonarqube/), [Coverity](https://scan.coverity.com/), [QAC](https://www.perforce.com/products/helix-qac).

Pour automatiser le formatage du code, il existe des outils comme [uncrustify](https://github.com/uncrustify/uncrustify) et [clang-format](https://clang.llvm.org/docs/ClangFormat.html).

# **Stratégie de tests**

Dans le processus de développement “*waterfall*”, il n’y a pas vraiment de stratégie de tests à proprement parler. Après l’écriture du code, le développeur **teste** son implémentation de façon **manuelle**, Grenning nomme ça le DLP (*Debug Later Programming*). Ensuite un testeur (différent du développeur) va effectuer des tests manuels pour valider (ou non) une certaine quantité de fonctionnalité au niveau système.

Il est donc nécessaire de mettre en place une stratégie de tests pour pouvoir détecter les bugs au plus tôt et éviter la régression. Généralement, le début du projet commence par la définition de l’architecture système, qui découche sur l’écriture de scénarios de tests systèmes, puis de tests d’intégration et enfin de tests unitaires (UT en anglais).

Dans le contexte embarqué, il est parfois **difficile** voire impossible de faire tourner un **framework** de **test** directement sur **cible**. De plus, les **tests** **unitaires** ont besoin d’avoir un temps d’exécution très **rapide** et **automatisé**. Tandis que les **tests** **systèmes** et **fonctionnels** sont plus **longs** et sont parfois réalisés de manière **manuelle** (lorsque l’automatisation est trop compliquée voire impossible).

Il est donc nécessaire de faire tourner des jeux de **test** en **natif** et sur **cible** en arbitrant (suivant le contexte) sur le choix à faire.

# Les tests en natif

Ils impliquent de **compiler** et d’**exécuter** les tests sur l’environnement **hôte** grâce à un *framework* de test. Cette technique permet d’avoir un **feedback** très **rapide** sur le code écrit. La stratégie est basée sur des **pilotes** **virtuels** qui simulent (*mock* en anglais) le matériel. Les limites sont qu’il n’y a pas de garantie sur le comportement des pilotes virtuels (identiques à celui du matériel réel). Le développeur n’est donc pas certain que le code exécuté sur la machine hôte fonctionnera de la même manière que sur la cible matérielle. Les tests en natif sont particulièrement utiles pour les tests d’intégration et les UT. Pour automatiser les UT, il existe des frameworks tels que :

* [Unity](https://www.throwtheswitch.org/unity)
* [Cmocka](https://cmocka.org/)
* [CppUTest](https://cpputest.github.io/)
* [GoogleTest](https://google.github.io/googletest/)

# Les tests sur cible

Ils impliquent l’utilisation des **vrais pilotes** matériels. Le vrai **compilateur** est utilisé avec l’environnement **matériel réel**. Par contre, les **cycles** de test sont beaucoup plus **longs** et la configuration est souvent **impossible** à tout **automatiser**. Cependant, dans certains cas on peut également vouloir faire tourner un *framework* de test directement sur la cible. Pour automatiser les tests systèmes et fonctionnels (parfois appelé d’acceptance) il existe les framework tel que [Robot Framework](https://robotframework.org/) et [Cucumber](https://cucumber.io/).

# **Test-Driven Development**

Une des méthodes de travail du monde du logiciel est le **TDD** (*Test-Driven Development*) et pourtant elle est très **peu** **présente** dans le développement **embarqué**. Le TDD est une **pratique** qui vise à écrire en **premier** les **tests** puis à passer par **l’implémentation** du code en suivant un cycle avec de **petites** **itérations**. Le code produit tend à être mieux conçus et facile à intégrer. Dans le contexte de l’embarqué, il permet aussi un **découpage** du **matériel** et du **logiciel**, le développeur est amené à travailler sans la cible matérielle.

Le TDD permet également de faire de **l’encapsulation,** le développeur se focalise sur les **interfaces** et le **comportement** **extérieur** du code et non plus sur son implémentation (on parle de *Design By Contract*).

Les **UT** sont à la base du TDD qui permet de donner un **feedback** **rapide** au développeur. Une des bonnes pratiques d’écriture des UT est la méthode **FIRST** pour *Fast, Independent, Repeatable, Self-validating and Timely*.

Cependant, il existe de nombreux biais et pièges dans l’utilisation des tests, Martin Fowler parle des [Test Cancer](https://martinfowler.com/bliki/TestCancer.html) et Edsger Dijkstra rappelle que les tests sont utiles pour démontrer la présence de bugs mais inutiles pour justifier l’absence de bugs.

# **Intégration Continue**

Les **UT** sont des tests facilement **automatisable** et **intégrable** dans une logique **d’intégration** **continue**. C’est une méthode de développement de logiciel par laquelle les développeurs intègrent **régulièrement** leurs **modifications** de code. La construction automatique du système permet au code de **grossir** en terme de **fonctionnalités** et de taille de façon **contrôlée**.

Les différentes étapes de la CI peuvent être séquencée suivant ces différentes tâches (*job* en anglais) :

* ***Build*** – La tâche de construction permet de compiler le firmware et/ou générer les binaires de livraison.
* ***Analysis*** – Cette tâche permet d’analyser statiquement le code. Les analyses typiques incluent la complexité cyclomatique, les métriques de code et les règles de codage.
* ***Testing*** – Cette tâche consiste à effectuer tous les tests nécessaires à la livraison du produit. Il peut s'agir de tests unitaires, fonctionnels, d'intégration, de système et de performance.
* ***Reporting*** – La tâche de rapport rassemblera les résultats des tâches précédentes pour fournir des informations sur la réussite de la construction, les résultats de l'analyse, la couverture et les résultats des tests, etc.
* ***Merge*** – Cette tâche fusionnera la nouvelle fonctionnalité dans la branche de déploiement lorsque tous les travaux auront abouti. Il s'agit souvent d'une tâche humaine, mais elle peut également être automatisée.
* ***Deployment*** – Lorsque la tâche de *merge* se termine avec succès, la tâche de déploiement s'exécute et lance le processus de déploiement sur le terrain. Le déploiement interagit généralement avec un logiciel de déploiement de flotte qui peut envoyer des microprogrammes aux appareils sur le terrain. Elle est parfois difficilement automatisable et restera manuelle.

# **Design Patterns**

Pour faire face aux problèmes de conception logicielle, il existe des **solutions** **standard** qui permettent de ne pas réinventer la roue, ce sont les *design patterns*. Un catalogue est disponible sur le site d’*Embedded Artistry* pour lister les design patterns utiles dans le contexte de l’embarqué : <https://embeddedartistry.com/fieldatlas/design-pattern-catalogue/>.

On peut également se référer au livre de Bruce Douglass : *Design Patterns.* Il décrit notamment les design patterns pour l’interaction avec le matériel avec notamment :

* *Hardware Proxy Pattern* : C’est un module logiciel qui permet l’accès à un élément matériel avec l’encapsulation de ce dernier.
* *Hardware Adapter Pattern* : Il fournit une adaptation à une interface matérielle (souvent un *driver*) déjà existante (dérivé de *Adapter Pattern*).

Il référence aussi des designs patterns pour la gestion des ressources et des machines d’état (*FSM* en anglais) très utilisée dans le contexte de l’embarqué.

Dans son ouvrage : *Test-Driven Development for Embedded C,* James W. Grenning utilise la méthode SOLID avec les principes suivants :

* Single responsibility
* Open/Closed
* Liskov substitution
* Interface segregation
* Dependency inversion

Avec les *design patterns* : *single-instance module* et *multi-instance module* pour favoriser la modularité et l’encapsulation des données. Ceci permet d’intégrer plus facilement les modules dans le processus d’intégration continue avec des tests totalement automatisés.

Dans ses travaux, Micheal Karlesky propose une architecture modulaire avec le MCH (pour *Model Conductor Hardware*) qui est similaire au *design pattern* MVP (pour *Model View Presenter*) :

* Model : Il modélise le système, maintient l’état du système et fournit une interface. Il est seulement connecté au *conductor* et donc il n’a pas d’interaction directe avec le *hardware*.
* Conductor : Il dirige le flux de données entre le *model* et le *hardware* et il est sans état.
* Hardware : C’est une couche d’abstraction sur le matériel physique. L’état peut être les registres matériels ou un *flag* fixé par une fonction d’interruptions ou une autre routine matérielle.

En résumé, il existe beaucoup de *design patterns*, le choix doit donc se faire en fonction des besoins métiers et d’architectures du système.

# Ressources

* <https://www.researchgate.net/publication/291135562_Test-Driven_Development_of_Embedded_Software>
* <https://www.researchgate.net/publication/261282763_Effective_Test_Driven_Development_for_Embedded_Software>
* <https://www.researchgate.net/publication/228711578_Mocking_the_embedded_world_Test-driven_development_continuous_integration_and_design_patterns>
* <https://www.researchgate.net/publication/290633122_Test-Driven_Development_as_a_Reliable_Embedded_Software_Engineering_Practice>
* Test-Driven Development for Embedded C by James W. Grenning
* Design Patterns for Embedded Systems in C by Bruce Powel Douglass
* Embedded C Coding Standard by Michael Barr
* <https://ldra.com/capabilities/coding-standard-compliance/>
* <https://www.embedded.com/how-to-define-your-ideal-embedded-ci-cd-pipeline/>

# Glossaire

* AUTOSAR : AUTomotive Open System ARchitecture
* CI : Continuous Integration
* DLP : Debug Later Programming
* FSM : Finite-State Machine
* MCH : Model Conductor Hardware
* MISRA : Motor Industry Software Reliability Association
* MVP : Model Viewer Presenter
* TDD : Test-Driven Development
* UT : Unit Test