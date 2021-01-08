---
title: Micro frontend
author: Benoit et Willy
date: 2021-01-08
image:
categories:
    - FRONTEND
tags:
    - micro-frontend
    - micro
    - frontend
    - front
---

Le mode de développement en micro-service a rapidement été adopté pour les services backend des applications web, typiquement via un découpage des services en blocs métiers. La préconisation pour la réalisation de ces services est une implémentation de type REST, qui permet un découplage complet entre la partie cliente (Web User Interface) d’un produit, et la partie backend qui gère les données.
Malgré ce découpage en micro-services backend, la possibilité d’une application cliente (ou front) monolithique était toujours possible.

Le micro-frontend vient alors en aide. C’est un style d’architecture dans lequel des **sous-produits fronts indépendants** sont **composées ensemble pour former un tout plus grand**.
Si l’approche DDD (Domain Driven Design), voyez les sous-produits comme les sous-domaines d’un domaine.
Pour cela, chaque sous-produit d’un produit applicatif est sous la responsabilité **d’une seule équipe fullstack autonome**, et n’a ainsi pas besoin de se coordonner avec quelqu’un d’autre pour le mettre en production.
Ainsi, celle-ci a donc la responsabilité **du backend et du frontend**, on y trouve donc des développeurs fullstack et/ou des développeurs backend et/ou des développeurs frontend.
Dans cette architecture, le plus important va être de livrer de bout-en-bout en étant totalement indépendant.

![micro-frontend](/img/2021-01-08-micro-frontend/micro-frontend.png)

Les premiers avantages à relevés sont « l'indépendance opérationnelle » ou « l’indépendance au runtime » :

- généralement l’équipe à son propre dépôt de code source et peut déployer ses services indépendamment les uns des autres, en choisissant les technologies qu’elle souhaite mettre en place (exemple : Go pour le backend et ReactJS pour le frontend pour le sous-produit A).

- l’équipe à sa propre suite de tests automatisés et une pipeline de livraison vers la production.

De cette manière, une seule équipe peut prendre par exemple la charge d’ajout d’une fonctionnalité au produit, et l’amener par ses propres moyens vers une livraison finale, sans impacter les autres équipes. Le tout de manière fullstack.
Le produit général se retrouve avec des bases de codes plus petites, plus cohérentes et maintenables. Mais aussi avec des équipes découplées et autonomes permettant de gagner en évolutivité. Tout cela favorise une mise à jour, une mise à niveau ou une réécriture des parties du frontend, bien plus progressive qu’auparavant.

Quel est le coût d’une telle architecture ? Il peut y avoir des fragmentations dans la manière dont les équipes travaillent et qui peut être causée par l’autonomie qui leurs sont accordées.
Plus les équipes augmentent, plus il devient difficile de s’assurer que les connaissances sont transférées et que les équipes ne deviennent pas cloisonnées.

## Comment gérer la cohérence du style ?

Si dans un micro-frontend A, la feuille de style dit `a { color: red; }` et que celle du micro-frontend B dit que `a { color: blue; }`, une des deux équipes sera forcément déçue.
Dans ce mode d’architecture, et par le fait que le CSS est un langage héréditaire et en cascade, si tous les sélecteurs écrits par les équipes sont rassemblées en une page, un problème se pose. Comment rendre le CSS plus maniable ?

Le plus important est de trouver un moyen de s’assurer que les développeurs codent leurs styles indépendamment les uns des autres, et que la composition de ces styles en une seule application est prévisible.
Depuis quelques années, plusieurs approches ont été inventées pour faire cela :

- avoir une convention de dénomination stricte :
par exemple avec la [syntaxe BEM](http://getbem.com/) qui s’assure que les sélecteurs sont appliqués seulement aux endroits prévus (dans un composant par exemple)

- l’utilisation d’un préprocesseur, comme [SASS](https://sass-lang.com/) ou [LESS](http://lesscss.org/)

- appliquer les styles programmatiquement avec des modules CSS ou avec du CSS-in-JS, pour garantir que les styles sont appliqués juste au bon endroit

- l’utilisation du [shadow DOM](https://developer.mozilla.org/fr/docs/Web/Web_Components/Using_shadow_DOM) avec des [Web Component](https://developer.mozilla.org/fr/docs/Web/Web_Components) par exemple

## Peut-on utiliser une bibliothèque de composants partagés

Visuellement, il est clair qu’il faut mettre de l’importance sur la cohérence visuelle entre les micro-frontends. Une bibliothèque de composants UI partagés et réutilisables est en général une bonne préconisation. Cette bibliothèque de composants sert de guide de style (styleguide) collaboratif entre les acteurs du produit à développer.
Cependant, avant d’utiliser un composant front de ce styleguide, il va devoir être pensé, puis créer, remanier, ou repenser encore. Difficile alors d’attendre qu’une autre équipe mette en place un composant, de comprendre comment il fonctionne, pour ensuite l’implémenter ailleurs où là base de code est peut être complètement différente.
Il est donc préférable de remplir encore la case de l’autonomie d’équipe, et de les laisser créer leurs propres composants chez eux au fur et à mesure qu’ils en ont besoin.
Il peut y avoir des duplications, mais une fois qu’elles sont devenues évidentes au niveau du modèle, c’est à ce moment-là qu’il est intéressant de récolter tout ça et de l’inscrire dans une bibliothèque partagée.
Ici, on parle bien uniquement de composants qui ont une **logique UI** (icônes, étiquettes, boutons, fonts, grilles, champs de recherche etc…). La bibliothèque ne doit pas contenir de logique métier (ou de domaine). Ces dernières appartiennent aux codes métiers du micro-frontend, pas à la bibliothèque.

Émerge de cela un modèle de bibliothèque de composants avec un **gardien** ou **guilde** (une personne ou une équipe) qui va arbitrer et cultiver l’outil pour que la collaboration front entre les équipes se déroule bien. Il faut que les contributions à cette bibliothèque soient de bonne qualité, avec de la cohérence, et une bonne validité. Cela permet de consommer l’outil convenablement sans que les équipes se marchent dessus.

## Charte graphique commune entre micro-frontends

Le cas d'une bibliothèque de composants partagées est pensable dans de grosses applications, avec plusieurs pages et où il est possible de visualiser plusieurs composants qui peuvent être réutilisés de partout.
Prenons l'exemple d'un site de commerce de produit en tout genre. La charte graphique a été réalisé par une équipe d'UX/UI et a été fourni à tous les équipes de développement.

En terme de micro-frontends, nous pouvons identifier :
- une équipe en charge du processus de panier/paiement
- une autre qui s'occupe de la page produit
- une autre de la page d'accueil qui affiche tous les produits.

De plus, sur la page produit, il est indiqué dans la charte d'afficher une liste de produit similaire.
Afficher un produit revient alors à afficher son image, son intitulé, son prix et un lien dirigeant vers sa propre page. La façon d'afficher un produit va être conduit par l'équipe de la page d'accueil qui en a besoin et de celle de la page produit qui en a besoin aussi pour les produits similaires.
Chacun va donc créer son composant avec les règles qui lui sont propres. Ensuite, plusieurs personnes ont la responsabilité de déployer ce composant dans une bibliothèque, en fusionnant les règles définies par les deux autres équipes, et en respectant la charte initiale. Il serira donc de composant de référence indiquant à toutes les équipes ses marges, padding, tailles, fonts etc...

## L'anarchie des micro-frontends

De plus en plus, les systèmes en micro-frontends gagnent en popularité. Mais ils sont parfois mal utilisée voir complètement abusée. Un biais serait de s'en service d'excuse pour mélanger les technologies et les outils, laissant lieu à une complexité indéniable. L'utilisation de plusieurs framework (ReactJS, VueJS, Angular), ou sur la manière dont le style est mis en place (une application avec SASS, l'autre en BEM, ou encore avec du CSS-in-JS) déteriore la cohérence technique de l'application globale.
Là où les équipes sont complètement autonomne dans un système micro-frontend, il faut quand même essayer de standardiser les approches et les technologies utilisées.

## Sources :
- [Micro Frontends - extending the microservice idea to frontend development](https://micro-frontends.org/)
- [Micro frontend - Martinfowler](https://martinfowler.com/articles/micro-frontends.html)
- [Micro frontend - Article - Thoughworks](https://www.thoughtworks.com/radar/techniques/micro-frontends)
- [Micro frontend - Podcast - Thoughworks](https://www.thoughtworks.com/podcasts/micro-frontends)
- [Micro frontend anarchy - Article - Thoughworks](https://www.thoughtworks.com/radar/techniques/micro-frontend-anarchy)
- [De l'application monolithique aux architectures microservices - Julien Dubreuil - Freelance spécialisé Drupal, architecte web et développeur Drupal - ScrumMaster](https://juliendubreuil.fr/blog/developpement/de-application-monolithique-aux-architectures-microservices-ou-orientees-composants/#:~:text=A%20mon%20sens%2C%20le%20principal,r%C3%A9alis%C3%A9es%20dans%20une%20seule%20technologie.&text=Au%20fil%20du%20temps%2C%20cette,modulaire%20pr%C3%A9vue%20%C3%A0%20l'origine)
- [Que signifie architecture monolithique? - Definition IT de Whatis.fr](https://whatis.techtarget.com/fr/definition/architecture-monolithique)
- [Architectures micro-services : objectifs, bénéfices et défis - Partie 1](https://www.technologies-ebusiness.com/enjeux-et-tendances/architectures-micro-services-objectifs-benefices-defis-partie-1)
- [Donnez un Microfrontend à vos Microservices | by Yann L | Medium](https://medium.com/@ylerjen/donnez-un-microfrontend-%C3%A0-vos-microservices-f6c422b2bb46)
- [Micro Frontend: le casse tête des micro services étendu au FrontEnd ! (Audrey Neveu) - YouTube](https://www.youtube.com/watch?v=f6_99ExOvWs)
