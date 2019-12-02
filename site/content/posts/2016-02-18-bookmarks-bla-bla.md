---
title: De tout, de rien, des bookmarks, du bla bla
author: Yves Brissaud
date: 2016-02-18T13:49:31+00:00
image: /img/2016/04/1.Formations.jpg
categories:
  - DÉVELOPPEMENT
tags:
  - clojure
  - go
  - javascript
  - veille

---
Petit aperçu commenté de notre veille de ces derniers jours. Le principe n'est pas de vous fournir une suite de lien mais plutôt que ces liens racontent une histoire, ce qui nous intéresse ou nous interpelle. Mais tout de même, pour les plus pressés, la liste de l'ensemble des liens est dispo à la fin de l'article.

# Un peu de contenu

## Méthodes, langages et bonnes pratiques

S'il est un point qui nous tient vraiment à cœur, c'est celui d'écrire du code maintenable et qui tende à comporter le moins (zéro si possible) de bugs.

Si on prend l'aspect maintenabilité, il existe en réalité différentes visions qui s'affrontent ou se complètent selon les cas. Si on prend le développement objet il y a tout ce qui tourne autour d’_Object Calisthenics_, de _SOLID_ par exemple.

Néanmoins, il existe d'autres approches. Un article que j'ai lu cette semaine apporte un autre éclairage sur le sujet, très _pragmatique_ j'ai trouvé et très en accord avec les pratiques que nous mettons en place dans divers projets : (Write code that is easy to delete, not easy to extend[http://programmingisterrible.com/post/139222674273/write-code-that-is-easy-to-delete-not-easy-to]. C'est un article que je vous recommande vraiment de lire.

Et pour illustrer un peu plus le principe, je vais juste vous parler de ce que nous avons réalisé dans un projet actuel. Pour placer un peu le contexte, nous participons au développement des applications mobile d’[Hexo+](http://hexoplus.com), une caméra volante autonome. Vous comprendrez donc que la sécurité est un sujet hautement critique. Lorsque nous avons entrepris de refondre toute la gestion des alertes (l'ensemble des actions à réaliser lorsque le drone n'a plus de batterie, de GPS, perdu la connexion, etc.) il s'agissait de faire cela de la meilleure manière et avec le moins de régressions possibles. La solution _classique_ aurait été de se lancer petit à petit dans un _refactoring_ des classes concernées, de transformer le comportement jusqu'à avoir quelque chose qui convienne à nouveau. Sauf que cela représente un très gros travail, plutôt en mode _big bang_ (le logiciel devient inutilisable tant que cela n'est pas terminé). Au contraire, nous avons commencé… par ne rien toucher ! Nous avons monté une deuxième architecture de gestion des alertes en parallèle. Pendant un temps, les deux systèmes fonctionnaient d'ailleurs de concert. Puis, lorsque le nouveau système s'est avéré suffisament avancé, nous avons simplement débranché et supprimé l'ancien. Au final, nous avons portés la notion de maintenabilité et d'évolutivité non pas au niveau des objets, mais bien au niveau du système (ce qui compte au final). Mais, et c'est aussi le propos de l'article, cela n'est possible que si nous sommes capables de supprimer l'ancien code. Plus ce code sera dur à supprimer (parce qu'il est présent partout, parce qu'il est mal découpé, etc.) plus la tâche sera ardue.

Ecrire un code qui pourra facilement être supprimé est l'une des choses les plus importantes pour faire évoluer en douceur un système entier.

Une fois que vous êtes dans cette optique, il vous reste à écrire du code qui réalise réellement ce qu'on attend de lui. Et là… c'est loin d'être simple.

Prenons un exemple qui d'apparence est trivial :

> Étant donné une liste de valeur et une valeur, retourne l'index de la valeur dans la liste ou indique qu'elle n'est pas présente dans la liste.

Je suis certain que vous avez déjà réalisé un code du genre. Et que ça n'a pris que quelques lignes. Facile. Maintenant, que vous indique votre code en terme de documentation, de robustesse aux cas limites, de spécifications, de garanties d'exécution normale, etc. ? Vous pensez que votre code est bon ? Je vous suggère dans ce cas d'aller tout de suite lire cet article sur les [Tests vs Types](http://kevinmahoney.co.uk/articles/tests-vs-types/) et vous devriez voir qu'en réalité c'est loin d'être trivial. Et lorsqu'on voit l'effort qui peut être nécessaire pour un code d'apparence si simple, que penser d'un code plus complexe ?

Si vous voulez d'ailleurs aller un peu plus loin, vous pouvez aller lire ce [tutoriel à propos de SPARK 2014](http://docs.adacore.com/spark2014-docs/html/ug/tutorial.html) qui tente de répondre à exactement la même spécification, cette fois ci en allant jusqu'à la preuve. Très instructif encore une fois du travail nécessaire pour garantir qu'une si petite portion de code fera bien ce qui a été demandé.

Histoire de rester dans des sujets connexes, connaissez-vous la règle numéro 1 des choses à ne pas faire de Joel Spolsky ?

> [Rewrite your software from scratch](http://www.joelonsoftware.com/articles/fog0000000069.html)

David Heinemeier Hansson (créateur de Ruby on Rails, Basecamp, etc.) n'est quant à lui pas d'accord. Et il vous explique pourquoi (et comment ils ont réécrit plusieurs fois Basecamp) [dans cette vidéo](http://businessofsoftware.org/2015/10/david-heinemeier-hansson-rewrite-basecamp-business-of-software-conference-video-dhh-bos2015/).

## JavaScript

Si vous avez déjà fait du javaScript (_What else?_), vous avez nécessairement été confronté à la problématique de _bind_ et au fait que _this_ n'a pas le même comportement que dans la plupart des langages habituels. Après pas mal de bricolages, on est arrivé à avoir une solution correcte en _ES5_ :

{{< highlight js >}}
$('.some-link').on('click', view.reset.bind(view))
{{< /highlight >}}

Avec la méthode `bind` présente sur les objets on peut ainsi s'assurer que la méthode `reset` de `view` sera bien appelée sur l'objet `view` et non sur l'objet DOM derrière `$('.some-link')`. Cette méthode `bind` est quand même une grande avancée. Mais _ES7_ va encore plus loin (même si ce n'est pour le moment qu'une proposition) :

{{< highlight js >}}
$('.some-link').on('click', ::view.reset)
{{< /highlight >}}

L'introduction de l'opérateur `::` réalise justement la même chose que le `bind` précédent avec une plus grande lisibilité et de manière un peu moins verbeuse. Si vous voulez en savoir un peu plus sur cet opérateur (qui ne fait pas que le `bind`), je vous suggère d'aller lire [cet article](https://babeljs.io/blog/2015/05/14/function-bind).

Toujours du côté des nouveautés Javascript, si vous avez un peu suivi ce qui se passe depuis quelque temps (ok, ces dernières années en fait), le code que nous écrivons est de plus en plus tourné vers de l'asynchrone (parfois à l'excès malheureusement). Et qui dit code asynchrone dit souvent code difficile à tester. C'est sur ce point qu'une nouvelle bibliothèque de test est sortie avec pour nom le très explicite [painless](https://taylorhakes.com/posts/introducing-painless-testing-library/). Elle nous promet d'être plus rapide et surtout de faciliter le test du code contenant des _promises_, _async/await_, _generators_ et autres nouveautés _ES6/ES7_.

Sur le même segment est aussi apparu [AVA](https://github.com/sindresorhus/ava) de [Sindre Sorhus](https://github.com/sindresorhus). Plus rapide, adaptée à toutes les nouveautés du langage mais aussi avec le point particulier d'exécuter les tests en isolation pour éviter tout effet de bord et s'adapter au matériel actuel pour de meilleurs performances.

## Clojure

Chez Sogilis, nous utilisons de nombreux langages différents. Et s'il en est un qui sort un peu du lot par son style c'est bien Clojure. Fonctionnel, bourré de parenthèse (Lisp signifie bien _Lots of Irritating Single Parentheses_, non ?) mais tellement expressif et concis qu'il est difficile de ne pas tomber sous le charme 🙂

Et justement, si vous vouliez savoir comment il est possible de passer d'un magnifique amas de ces parenthèses à un bytecode pour JVM (et que vous avez quelques heures devant vous…), voici un magnifique article sur le sujet : [Clojure Compilation: Parenthetical Prose to Bewildering Bytecode](http://blog.ndk.io/clojure-compilation.html).

Toujours à propos de Clojure, voici un petit tutoriel très bien amené qui présente comment [réaliser une interface d'administration de blog](http://dimafeng.com/2015/11/16/clojurescript-om/) à base de [Om](https://github.com/omcljs/om) et de ClojureScript. [Om](https://github.com/omcljs/om) est un binding ClojureScript pour react. Le code présenté est plutôt intéressant, ce que j'ai apprécié est la concision et la facilité de traitement des requêtes asynchrones, un peu comme on ferait avec [async/await en ES7](https://jakearchibald.com/2014/es7-async-functions/), mais ici au travers de channels et, surtout, sans _promises_. Finalement comme si on utilisais des [goroutines](https://tour.golang.org/concurrency/1).

S'il est une notion centrale à clojure et l'ensemble des langages fonctionnels, c'est bien l'immutabilité. Néanmoins, savoir l'expliquer simplement n'est pas toujours aisé. Voici un article qui se propose d’[expliquer l'immutabilité à partir d'un post de blog](https://medium.com/@roman01la/explaining-immutability-2aedc221b4c0#.973tcxnmt). Plutôt réussi, il devrait vous permettre de comprendre la base ou de la faire comprendre facilement.

## Go

Un autre des langages plutôt en vogue par chez nous est Go. Un point qui peut être déroutant au début lorsqu'on vient de Ruby, Node.js ou autre est l'absence d'un gestionnaire de paquet dédié au langage. Et lorsque je lis [So you want to write a package manager](https://medium.com/@sdboyer/so-you-want-to-write-a-package-manager-4ae9c17d9527) je me dis que finalement c'est très (très) loin d'être trivial. Mais cela permet aussi de mettre en exergue les problèmes que d'autres gestionnaires peuvent avoir (bien que parlant de Go, cet article est très généraliste). Par exemple, `bower` n'avait pas d'équivalent aux fichiers de lock permettant de reproduire une installation d'un poste à l'autre.

A l'autre bout de la chaine, il y a l'exécution et la mise à jour des programmes. [overseer](https://github.com/jpillora/overseer) est une bibliothèque qui agit sur cette partie critique en production : monitorer, redémarrer et mettre à jour des binaires Go. Attention, il n'est pas encore à un stade utilisable en production (ou à vos risques et périls) mais à surveiller et garder sous le coude dès qu'il sera prêt.

Je ne sais pas si on vous l'a déjà dit, mais à Sogilis on aime bien Git. A tel point d'ailleurs qu'on donne des formations sur le sujet depuis des années. Et à tel point aussi qu'on l'utilise dans nos applications, y compris en tant que base de données. Sur le marché, en général la solution est d'utiliser un binding au dessus de la [libgit2](https://libgit2.github.com/). La plupart des langages en ont, Go y compris. Néanmoins, une nouvelle bibliothèque a vu le jour récemment, et elle ne se base justement pas sur libgit2. Attention tout de même, elle n'est faite que pour de la lecture, il n'y a pas d'écriture possible avec. Il s'agit de [go-git](https://github.com/src-d/go-git) et elle est utilisée par _source{d}_ qui entre autre analyse l'ensemble des dépôts de github ! A tester plus en avant et voir ce que ça apporte réellement de plus (ou de moins) que le binding Go qui existait déjà.

## Sécurité

Un point toujours central dans la sécurité de nos applications est la manière dont on stocke et compare les mots de passe. Hors de question ici de les garder en clair dans une base ! Par contre, régulièrement les bonnes pratiques changent ou, simplement, de nouvelles bibliothèques apparaissent pour nous faciliter la vie (et hors de question ici de réinventer la roue). Voici donc un article qui vous présente [les bonnes manières de stocker un mot de passe en 2016](https://paragonie.com/blog/2016/02/how-safely-store-password-in-2016) et ceci dans 6 langages différents.

## Divers

En tant que développeur, nous avons souvent tendance à nous cacher derrière la technique, derrière la création d'outils et non leur usage. Pourtant, il est nécessaire d'avoir conscience que l'usage fait de nos développements peut avoir des impacts non négligeables, autant dans des bons que des mauvais côtés. C'est (une partie au moins) du [message que Stéphane Bortzmeyer](http://www.infoq.com/fr/presentations/come-to-dark-side) a tenté de faire passer lors du Mix-IT 2015.

Dans un tout autre registre, regardez comment un réseau de neurones entraîné sur des milliers de photos arrive à [coloriser des images noir et blanc](http://tinyclouds.org/colorize/). C'est fascinant et plutôt juste comme résultat !

Et comme on [apprécie les Lego](https://twitter.com/_crev_/status/643708426841915392), on ne peut que rester admiratif devant cette machine tout en Lego qui [plie et lance un avion en papier](https://www.youtube.com/watch?v=jU7dFrxvPKA) !

# Liste des liens

## Méthodes, langages, etc.

* [Write code that is easy to delete, not easy to extend](http://programmingisterrible.com/post/139222674273/write-code-that-is-easy-to-delete-not-easy-to)
* [Tests vs Types](http://kevinmahoney.co.uk/articles/tests-vs-types/)
* [Spark tutorial](http://docs.adacore.com/spark2014-docs/html/ug/tutorial.html)

## Javascript

* [Funcion Bind Syntax](https://babeljs.io/blog/2015/05/14/function-bind)
* [Painless Javascript Testing](https://taylorhakes.com/posts/introducing-painless-testing-library/)
* [AVA Futuristic test runner](https://github.com/sindresorhus/ava)

## Clojure

* [Clojure Compilation: Parenthetical Prose to Bewildering Bytecode](http://blog.ndk.io/clojure-compilation.html)
* [Om](https://github.com/omcljs/om)
* [ClojureScript: Real world app](http://dimafeng.com/2015/11/16/clojurescript-om/)
* [Explaining immutability](https://medium.com/@roman01la/explaining-immutability-2aedc221b4c0#.973tcxnmt)

## Go

* [So you want to write a package manager](https://medium.com/@sdboyer/so-you-want-to-write-a-package-manager-4ae9c17d9527#.31qplbih0)
* [overseer](https://github.com/jpillora/overseer)
* [libgit2](https://libgit2.github.com/)
* [go-git A low level and highly extensible git client library](https://github.com/src-d/go-git)

## Sécurité

* [How to safely store password in 2016](https://paragonie.com/blog/2016/02/how-safely-store-password-in-2016)

## Divers

* [[Mix-IT 2015] Come to the dark side de Stéphane Bortzmeyer](http://www.infoq.com/fr/presentations/come-to-dark-side)
* [Re-pigmentation de photographies](http://tinyclouds.org/colorize/)
* [Lego Paper Plane Machine](https://www.youtube.com/watch?v=jU7dFrxvPKA)

![](https://www.gravatar.com/avatar/2405b32ff817cd55c9e5404e004b048b.png)
