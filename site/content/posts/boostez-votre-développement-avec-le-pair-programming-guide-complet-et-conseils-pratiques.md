---
title: "Boostez votre développement avec le Pair Programming : Guide complet et
  conseils pratiques"
author: Simon Berlendis
date: 2024-07-22T08:00:04.281Z
description: Le pair programming, popularisé par Kent Beck dans Extreme
  Programming (2004), consiste à travailler en binôme sur une tâche de
  développement, partageant un poste de travail. Très prisée dans le milieu du
  software craftsmanship, cette méthode promet une amélioration de la qualité du
  code et une meilleure collaboration, mais elle soulève aussi des questions.
  Découvrez dans ce document pourquoi le pair programming pourrait transformer
  votre manière de coder, comment l'implémenter efficacement et les pièges à
  éviter pour en tirer le meilleur parti.
tags:
  - dev
---


**Présentation**

Le pair programming est une pratique très populaire dans le milieu de software craftmanship. Popularisé par Kent Beck dans Extreme Programming (2004), son principe est assez simple : travailler à deux sur une même tâche de développement, généralement en partageant le même poste de travail. Pourtant, sa pratique fait parfois débat. Est-ce que ça vaut le coup de le mettre en place ? Comment ? Quels sont les pièges à éviter ? Ce document cherche à résumer nos connaissances sur ce sujet.

**Table des matières :**

* Présentation
* Avantages et Inconvénients
* Différentes formes de pair programming
* Quelques astuces et pièges à éviter
* Ressources additionnelles sur le sujet

**Avantages et Inconvénients**

Plusieurs études académiques ont cherché à évaluer l'impact du pair programming, en particulier sur la qualité du code produit, sur la vitesse de développement et sur les individus qui ont participé. Cette partie résume les conclusions de ces études en se basant en grande partie sur la méta-analyse qui a été publiée sur ce sujet \[Hannay et al].

**Qualité**

L'ensemble des études académiques montrent que le pair programming améliore significativement la qualité du code produit, en particulier pour les développeurs juniors et intermédiaires, et surtout pour les problèmes complexes. Le développement en binôme permet en effet de confronter plus de choix d'architecture différents et donc de prendre le choix le plus adéquat. Il permet également de faire collaborer des personnes avec différentes compétences techniques et différentes compréhensions sur la tâche à résoudre. Le travail par pair incite aussi à maintenir un haut niveau de qualité sur son code et une revue plus importante du code écrit. Cette amélioration de la qualité s'accompagne aussi par une réduction du nombre de bugs, de la dette technique et une meilleure maintenabilité sur le code produit.

**Vitesse de développement**

Les études académiques ont également cherché à évaluer l'impact du pair programming sur la vitesse de développement. Bien que les tâches faites en paires soient résolues plus rapidement, le temps effectif de réalisation de la tâche en paire reste en moyenne plus long du fait que deux personnes travaillent sur la même tâche plutôt qu'une. Néanmoins, ces études montrent que la complexité du problème et l'expérience des développeuses ou développeurs peuvent influencer positivement ce résultat, rendant la vitesse de développement assez similaire. Les personnes juniors ont en effet tendance à être beaucoup plus rapides en binôme que seules, et travailler à deux permet de mieux appréhender les problèmes très complexes et d'arriver plus rapidement à la solution. De plus, la qualité du code produit en paire permet de compenser ce temps de développement en réduisant le temps dédié à la résolution de bugs ou à la réduction de la dette technique, même si aucune étude ne permet d'évaluer cette compensation au niveau d'un projet de développement.

**Partage de connaissances**

Le pair programming est également une méthode efficace pour partager des connaissances et des pratiques au sein d'une équipe. Les développeurs et développeuses apprennent davantage sur la rédaction de code de qualité en travaillant avec une autre personne dans un environnement propice à l'échange d'expériences. C'est par exemple un très bon moyen pour un développeur ou développeuse qui intègre une nouvelle équipe de prendre connaissance des pratiques de l'équipe et du contexte dans lequel elle ou il va travailler, ainsi que de monter en compétence sur les connaissances techniques essentielles du projet. C'est également une pratique qui permet de partager les différentes pratiques de développement et d'harmoniser ces pratiques au sein d'une équipe de développement. Enfin, cela permet d'augmenter le taux d'appropriation du code (pour un même morceau de code donné, plus de personnes savent le décrire), ce qui a des conséquences bénéfiques sur la flexibilité de l'équipe en termes de répartition des tâches et la réduction du risque en cas de départ d'un collaborateur.

**Team-building**

Pour certains, le pair programming permet d'améliorer la cohésion d'une équipe et la satisfaction au travail en amenant plus de lien social. Elle permettrait également de faciliter la communication dans une équipe. Ceci n'est néanmoins pas forcément systématique. Le travail en binôme ne convient pas forcément à tous les profils de développeuses ou développeurs, et des difficultés relationnelles ou de communication peuvent parfois apparaître entre collègues.

⚠ En conclusion, le pair programming permet surtout d'améliorer la qualité du code produit et à mieux partager des connaissances au sein d'une équipe. Néanmoins, il ne permet en général pas de réduire le temps effectif de développement, en particulier pour les tâches simples. Le gain global au sein d'un projet dépend donc beaucoup du contexte du projet et de ses objectifs. Pour un projet court de type “Proof-of-concept”, cette pratique ne sera pas forcément recommandée, alors qu'elle aura tout à fait sa place dans un projet long et complexe avec un fort niveau de qualité demandé.

**Différentes formes de pair programming**

Il y a différentes façons de pratiquer le pair programming, dont certaines peuvent mieux s'adapter à votre façon de travailler et à la situation. Cette partie présente quelques-unes des formes de pair programming les plus connues. Cette partie a été librement inspirée de la formation sur le TDD à Sogilis, dont les autrices et auteurs sont (il me semble) Coralie Rachex et Victor Lambret.

**Le couple conducteur-navigateur**

Cette forme repose sur deux rôles tournants. L'un est le "pilote" (ou "driver") et rédige le code, tout en exposant la solution qu'il a en tête. L'autre, le "copilote" (ou "navigateur"), observe et effectue une revue de code en direct, sans être passif : il suit le pilote avec attention, signalant les erreurs, prenant note de problèmes à résoudre, de tests unitaires à prévoir ; il a une vision du travail avec du recul. Dans l'idéal, ces deux rôles sont échangés fréquemment.

La façon la plus classique de mettre en place cette pratique est tout simplement de s'asseoir côte à côte devant le même écran d'ordinateur. Il est aussi possible que le navigateur utilise son propre PC pour faire des recherches sur Internet ou même réaliser des maquettes en direct. Le navigateur peut également utiliser un papier et un crayon, ou un tableau blanc, pour réaliser ces maquettes, notamment lorsqu'une portion importante du travail a trait au design architectural ou d'interfaces utilisateur.

**Le ping-pong pair programming**

Cette forme de pair programming est souvent mise en œuvre dans un contexte de Test Driven Development (TDD) puisqu'elle consiste à ce que dans le binôme, une personne écrit un test, et l'autre écrit le code pour que le test passe. Les changements de rôles se font tout naturellement à la fin d'un micro cycle de TDD.

**Le strong-style pairing**

Cette méthode consiste à obliger celui qui rédige le code à ne rien faire tant que le navigateur ne lui a pas communiqué de tâches. Le conducteur doit toujours demander l'avis de la personne qui l'accompagne avant de faire quoi que ce soit. Les échanges de place se font dès que l'un des développeurs ou développeuses a une idée : c'est à l'autre de la transcrire en code ("Pour qu'une idée aille de votre tête à l'ordinateur, il faut qu'elle passe par les mains de quelqu'un d'autre" !).

En mettant en place cette pratique de strong-style pair programming, chaque programmeur ou programmeuse est impliqué dans le processus de développement, en particulier le navigateur qui peut parfois avoir tendance à prendre son rôle à la légère avec les autres méthodes. C'est également un très bon modèle lorsque l'on souhaite faire monter en compétence une personne. Le navigateur en tant que sachant ne peut pas toucher le clavier donc il est obligé d'expliquer clairement à son binôme et ce dernier assimile beaucoup mieux les infos en rédigeant le code lui-même.

**Quelques astuces et pièges à éviter**

**Éviter les tâches faciles ou rébarbatives**

Selon les études académiques, le pair programming devient beaucoup moins efficace quand les tâches sont simples et rébarbatives. En revanche, cette pratique permet de produire du code de meilleure qualité pour les tâches complexes qui nécessitent de la créativité et une variété de compétences techniques.

**N'hésitez pas à alterner avec des sessions de partage de tâches si besoin**

Lorsque la tâche complexe sur laquelle vous travaillez donne lieu à des sous-tâches plus faciles, n'hésitez pas à séparer le travail en deux quand c'est nécessaire et donc à arrêter la session de pair programming. On peut ensuite reprendre la session lorsque ces tâches ont été réalisées et que vous êtes prêts à vous attaquer à la suite du problème (avec une possible revue du travail fait). Ce partage des tâches est d'ailleurs plus facile si chacun est côte à côte sur son PC. À deux, on aura moins facilement tendance à diverger.

**Ne pas forcer les personnes à pairer**

Certaines personnes préfèrent tout simplement travailler seules ou peuvent avoir des difficultés relationnelles avec d'autres personnes. Les forcer à travailler avec quelqu'un n'est pas forcément une bonne idée. Le pair programming ne convient pas à tout le monde.

Pour les personnes qui ne sont pas à l'aise avec cette pratique mais qui veulent quand même tester, privilégiez des sessions courtes. Parfois certaines personnes pensent préférer travailler seules alors qu'elles ne sont juste pas à l'aise avec le fait de passer plusieurs jours d'affilée avec quelqu'un.

**Avoir une bonne paire de développeurs ou développeuses**

Pour que le pair programming fonctionne correctement, il faut que les deux développeurs ou développeuses aient un bon niveau technique sur la tâche à réaliser et qu'ils ou elles s'entendent bien. Si les deux ne parlent pas la même langue ou n'ont pas les mêmes connaissances, ce sera beaucoup plus compliqué. En revanche, il n'est pas nécessaire que les deux aient le même niveau : un binôme expérimenté / junior fonctionne aussi très bien tant que le junior est à l'aise sur les compétences de base à mettre en œuvre.

**Changer de binôme de temps en temps**

Les binômes peuvent varier d'un projet à l'autre, mais aussi au sein d'un même projet. En changeant régulièrement de partenaire, les développeuses et développeurs pourront apprendre plus et s'approprier plus de portions de code. Cela permet aussi d'échanger sur les bonnes pratiques. Les changements de binôme peuvent par exemple avoir lieu au moment de commencer une nouvelle fonctionnalité ou d'entamer une nouvelle semaine de développement.

**Préparer un plan B**

Comme expliqué plus haut, le pair programming ne permet pas toujours d'être plus rapide que le développement en solo. Si le projet n'avance pas assez vite, envisagez de repasser à un mode de développement plus classique où chacun est responsable de ses tâches, mais où la qualité du code est maintenue grâce à des pratiques de revues de code régulières (pull requests par exemple).

**Ressources additionnelles sur le sujet**

### Sur la pratique du pair programming

* *All I Really Need to Know about Pair Programming I Learned In Kindergarten* (Laurie A. Williams, 2001)
* *Strengthening the Case for Pair-Programming* (Laurie A. Williams, 2000)
* *Pair Programming: Reconciling Pair Programming Research with Reality* (David P. W. Binkley et Dawn Lawrie, 2007)
* *A Human-Centric Justification for Pair Programming* (Ally Pullan, 2003)

### Sur l'organisation du développement logiciel en général

* *Extreme Programming Explained* (Kent Beck, 2004)
* *Growing Object-Oriented Software, Guided by Tests* (Steve Freeman et Nat Pryce, 2009)
* *The Pragmatic Programmer: From Journeyman to Master* (Andy Hunt et Dave Thomas, 1999)