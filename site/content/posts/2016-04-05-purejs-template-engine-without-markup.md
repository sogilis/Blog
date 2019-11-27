---
title: "pure.js: template engine without markup"
author: Shanti
date: 2016-04-05T09:49:45+00:00
image: /img/2016/04/1.Produits.jpg
categories:
  - DÉVELOPPEMENT
tags:
  - pure.js
  - template

---
**Ces derniers dojo, on a vu des langages vraiment sympa : Clojure avec OM et Elm. Par contre, il y a un petit truc qui me chiffonne : les templates.**

Autant faire du template en Lisp, ça passe assez bien. C'est fait pour ça. Mais avec Elm, ce n'est vraiment pas joli (mon opinion seulement). D'un point de vue propreté, je serais plus à l'aise avec du markup séparé du code. Comme ce qu'on faisait en xHTML à l'époque où ça existait. Le mantra c'était : séparer la logique (JS) de la sémantique (html) de la présentation (CSS). Et j'aime toujours ce mantra.

Pour vous aider à cette séparation, je vous propose **[pure.js](https://beebole.com/pure/), un moteur de template sans markup**.

C'est du HTML sans même un attribut spécifique.

Comment ça marche ?

* Soit la structure JSON est très proche du markup : pure.js va directement remplir les balises HTML avec le contenu du JSON.
* Soit la structure est un peu différente – comme c'est souvent le cas si le JSON n'est pas spécifique au markup : on a un JSON intermédiaire qui permet de dire à quel nœud HTML chaque objet JSON doit être mappé. Le mapping se fait avec des sélecteurs CSS.

[Allez voir](https://beebole.com/pure/), il y a un exemple simple en haut pour comprendre comment ça marche.

Dans la même veine, il existe aussi [Weld](https://github.com/tmpvar/weld). Il a cependant l'air moins puissant.
