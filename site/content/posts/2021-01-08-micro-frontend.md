---
title: Micro frontend
author: Benoit et Willy
date: 2021-01-08
image: /img/2021-01-08-micro-frontend/microfrontend-thumbnail.jpeg
altimage: "'Crayons de couleur' by Supernico26 is licensed under CC BY 2.0"
categories:
    - FRONTEND
tags:
    - micro-frontend
    - micro
    - frontend
    - front
---

L'architecture micro-service a rapidement été adoptée pour les services backend des applications web, typiquement en découpant ces services en différents blocs métiers. Généralement, ces services reposent sur une implémentation de type REST. Ceci  permet un découplage complet entre la partie cliente (Web User Interface) d’un produit et la partie backend qui gère les données.
Cependant, et grâce au découplage apporté par l'intertace REST, ce découpage en micro-services backend n'influence en rien l'architecture de la partie cliente (ou front).
Cette problématique est aussi présente sur des applications frontend monolothique. C'est encore l'architecture que l'on retrouve malheuresement le plus souvent dans les logiciels Web.

Le micro-frontend propose alors une approche différente. C’est un style d’architecture dans lequel des **sous-produits fronts indépendants** sont **composées ensemble pour former un tout plus grand**.
Par exemple, avec l’approche DDD (Domain Driven Design), on peut voir les sous-produits comme des "sous-domaines" (bounded context) d’un domaine.
Dans une architecture micro-frontend, chaque sous-produit est indépendant, et peut potentiellement être sous la responsabilité **d’une seule équipe autonome**. Ainsi, on limite au maximum les interactions entre les équipes concernant son cycle de vie (déploiement, mise en production, mise à jours, etc.). Toute problématique d'intégration avec les autres sous-produits et les équipes qui en ont la charge est alors éliminée.
Ainsi, celle-ci a donc la responsabilité **du backend et du frontend**, on y trouve donc des développeurs fullstack et/ou des développeurs backend et/ou des développeurs frontend.
Dans cette architecture, le plus important va être de livrer de bout-en-bout en étant totalement indépendant.

![micro-frontend](/img/2021-01-08-micro-frontend/micro-frontend.png)

Les premiers avantages à relevés sont « l'indépendance opérationnelle » ou « l’indépendance au runtime » :

- généralement l’équipe à son propre dépôt de code source et peut déployer ses services indépendamment les uns des autres, en choisissant les technologies qu’elle souhaite mettre en place (exemple : Go pour le backend et ReactJS pour le frontend pour le sous-produit A).

- l’équipe à sa propre suite de tests automatisés et une pipeline de livraison vers la production.

De cette manière, une seule équipe peut prendre par exemple la charge d’ajout d’une fonctionnalité au produit, et l’amener par ses propres moyens vers une livraison finale, sans impacter les autres équipes. Le tout de manière fullstack.
Le produit général se retrouve avec des bases de codes plus petites, plus cohérentes et maintenables. Mais aussi avec des équipes découplées et autonomes permettant de gagner en évolutivité. Tout cela favorise une mise à jour, une mise à niveau ou une réécriture des parties du frontend, bien plus progressive qu’auparavant.

Quel est le coût d’une telle architecture ? Il peut y avoir des fragmentations dans la manière dont les équipes travaillent et qui peut être causée par l’autonomie qui leurs sont accordées.
Plus les équipes augmentent, plus il devient difficile de s’assurer que les connaissances sont transférées et que le code ne devienne pas trop hétérogène entre les équipes.

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
Il peut y avoir des duplications, mais une fois qu’elles sont devenues évidentes au niveau de la modélisation graphique, c’est à ce moment-là qu’il est intéressant de récolter tout ça et de l’inscrire dans une bibliothèque partagée.
Ici, on parle bien uniquement de composants qui ont une **logique UI** (marges, icônes, étiquettes, boutons, fonts, grilles, champs de recherche etc…). La bibliothèque ne doit pas contenir de logique métier (ou de domaine). Ces dernières appartiennent aux codes métiers du micro-frontend, pas à la bibliothèque.

Émerge de cela un modèle de bibliothèque de composants avec un **gardien** ou **guilde** (une personne ou une équipe) qui va arbitrer et cultiver l’outil pour que la collaboration front entre les équipes se déroule bien. Il faut que les contributions à cette bibliothèque soient de bonne qualité, avec de la cohérence, et une bonne validité. Cela permet de consommer l’outil convenablement sans que les équipes se marchent dessus.

## Charte graphique commune entre micro-frontends

Le cas d'une bibliothèque de composants partagés est recommandable dans de grosses applications, avec plusieurs pages, et où il est possible d'identifier plusieurs composants pouvant être réutilisés de partout.

Prenons l'exemple d'un site de commerce de produit en tout genre. La maquette et la charte graphique ont été réalisées par une équipe d'UX/UI et ont été fournies à toutes les équipes de développement.

En terme de micro-frontends, nous pouvons identifier :
- une équipe A qui s'occupe de la page produit
- une équipe B qui s'occupe de la page d'accueil affichant tous les produits.
- une équipe C en charge du processus de panier/paiement

De plus, sur la page produit, il est indiqué dans la maquette d'afficher une liste de produits similaires.

Afficher un produit revient à afficher un bloc contenant son image, son intitulé, son prix et un lien dirigeant vers sa propre page.

La façon d'afficher ces produits va être conduit par l'équipe A qui en a besoin pour sa page d'accueil, et par l'équipe B qui en a besoin aussi pour les produits similaires.
Chacune des équipes va donc créer son propre composant produit, avec ses propres règles. Ensuite, une équipe annexe, a la responsabilité de fusionner les règles du composant définies par les équipes A et B en respectant la charte initiale. Cette fusion va donner aux équipes de développement un composant produit de référence, disponible dans une bibliothèque qui leurs est accessible.
Cette équipe annexe n'est même pas dans l'obligation de fournir un composant de référence dans une bibliothèque, mais peut simplement emettre aux équipes de développement les règles CSS (padding, marging, fonts, taille etc...) qui doivent être respectées.

## L'anarchie des micro-frontends

L'architecture en micro-frontend gagne de plus en plus en popularité. Mais elle est parfois mal utilisée, voir utilisée avec abus. Un biais commun, est le mélange de technologies et d'outils, laissant place à une complexité indéniable comme par exemple l'utilisation de plusieurs frameworks structurants (`React`, `Vue`, `Angular`) ou diversifier à outrance la gestion du style (une application avec SASS, l'autre en BEM, ou encore avec du CSS-in-JS). Tout cela déteriore la cohérence technique de l'application globale.
Même si les équipes sont complètement autonomes dans un système micro-frontend, il faut tout de même essayer de standardiser les approches et les technologies utilisées.

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
