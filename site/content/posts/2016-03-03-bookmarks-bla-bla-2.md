---
title: "De tout, de rien, des bookmarks, du bla bla #2"
author: Yves Brissaud
date: 2016-03-03T10:40:50+00:00
image: /img/2016/04/2.Developpement-1.jpg
categories:
  - DÉVELOPPEMENT
tags:
  - elm
  - google
  - javascript
  - veille

---
Voici un aperçu de notre veille de ces deux dernières semaines. Cet article fait suite [au précédent](http://sogilis.com/blog/bookmarks-bla-bla/) et que j'espère être le début d'une série régulière.

Comme le nom l'indique, vous trouverez de tout et de rien, principalement autour du développement (langages, infrastructure) mais aussi design (CSS, SVG), méthodes (Story Map, _capabilities_). Plus qu'une suite de liens, vous trouverez ici une histoire. Cette histoire raconte, de manière subjective, les éléments qui nous ont conduit à s'intéresser à ces différents sujets. Et pour ceux qui s'intéressent plus aux liens qu'au voyage, l'ensemble des liens est présenté en liste à la fin de l'article.

Bonne lecture !

## Un peu de contenu

### Langages

Je sais pas vous, mais je trouve que ces dernières années sont vraiment intéressantes en termes de langages de programmation. Nous avons vu arriver (ou simplement devenir plus visible) Go, Rust, Elixir, Scala, Elm, Clojure, etc. Programmation fonctionnelle, programmation réactive, nouveaux modèles objets, tant de changements (ou remises au goût du jour) qui font basculer des équipes sur une technologie ou une autre. Une nouvelle technologie, un peu moins courante que les autres, est une façon de monter des équipes différemment, notamment avec des profils plus experts. Néanmoins, que donnent ces équipes dans le temps ? Voici par exemple le témoignage de CrowdStrike qui [migre de Scala à Golang](http://jimplush.com/talk/2015/12/19/moving-a-team-from-scala-to-golang/). Ce n'est pas nécessairement à généraliser, mais il est intéressant de voir que ce qui peut séduire dans un premier temps peut aussi se retourner contre vous par la suite. Et au-delà de la beauté, pureté d'un langage, il est un facteur à ne pas sous-estimer : la productivité.

D'un autre côté, se concentrer sur ces nouveaux langages, surtout ceux un peu à la marge (Elixir, Elm, etc.) peut se révéler être une bonne idée pour recruter une équipe différemment. En ciblant [là où la plupart des devs ne sont pas](https://medium.com/@cameronp/the-best-way-to-build-a-dev-team-go-where-the-devs-aren-t-d3f226cfe749), vous ciblez directement un certain type de profils. De fait, vous éliminez immédiatement beaucoup de développeurs pour vous concentrer sur ceux qui sont capables d'apprendre de nouvelles plateformes, de nouveaux langages. Vous offrez également un élément important dans un métier qui nécessite une certaine dose de créativité : du _fun_ ! Comment espérez-vous avoir des membres d'équipe créatifs, motivés, passionnés si vous restez enfermés dans un ennui persistant, en choisissant au contraire des technologies basiques, connues ? Non pas que ces technologies soient foncièrement mauvaises, mais il me parait évident qu'il est nécessaire d'avoir une certaine adéquation entre les profils recherchés pour une équipe et les technologies choisies, indépendemment de savoir si la technologie est suffisamment _mainstream_ pour passer à l'échelle.

Et en parlant de _fun_, voici une petite amélioration à Git, totalement inutile donc totalement indispensable, vous permettant d’[indiquer vos émotions dans vos commits](https://github.com/savala/git-feeling) ! Plus sérieusement, je me dis qu'il faudrait faire la même chose pour les [messages de commit d'atom](https://github.com/atom/atom/blob/master/CONTRIBUTING.md#git-commit-messages).

![Atom Git Commit Messages][1]

Attention, c'est beaucoup plus utile qu'il n'y parait 😉 Pouvoir visualiser en un clin d'oeil la portée d'un commit est on ne peut plus intéressant.

Histoire de rester dans les nouveaux langages et dans les emoji, il m'est très difficile de résister à recoder nos projets dans ce nouveau et, je n'en doute pas une seconde, très productif langage : [Emojicode](http://www.emojicode.org/) !

![Emojicode][2]

### Web

Il existe, depuis longtemps, de très nombreuses études, articles, blog post, sur la criticité de réaliser des sites web rapides. Avec l'avènement des applications web, des single page app, le problème est encore plus central aujourd'hui. Néanmoins, le temps moyen de chargement semble être toujours autour de 5 secondes sur desktop et 8 secondes sur mobile. Quand on sait que [66% des utilisateurs n'attendent que 4 secondes](http://www.yottaa.com/company/blog/application-optimization/the-four-second-syndrome/), j'espère que vous comprendrez l'avantage significatif de réaliser des applications réellement rapides à charger.

### JavaScript

JavaScript continue encore et encore d'évoluer. Néanmoins, il existe souvent un décallage entre ce que le langage propose et ce qui est supporté par les navigateurs, un peu dans tous les sens. Quoi qu'il en soit vous serez ravis d'apprendre que de nouvelles [méthodes sur les objets sont arrivées dans Chrome](https://twitter.com/malyw/status/704972953029623808) :

{{< highlight js >}}
const obj = {0: 'a', 1: 'b', 2: 'c' };
Object.keys(obj);
// ["0", "1", "2"]
Object.values(obj);
// ["a", "b", "c"]
Object.entries(obj);
// [["0", "a"], ["1", "b"], ["2", "c"]]
{{< /highlight >}}

> I believe JavaScript is usually not a good choice for server side applications.
>
> – [The Node.js Event Loop is A Damn Mess](http://sheldonkreger.com/the-nodejs-event-loop-is-a-damn-mess.html)

Un point de vue un peu contraire à l'avis ambiant, mais j'ai trouvé l'article réellement intéressant et assez en phase avec l'impression que j'en ai.

En partie sur le même sujet, je vous suggère d'aller lire l'article de [Bruno Michel](https://github.com/nono) [« Et si JavaScript allait droit dans le mur ? »](https://linuxfr.org/users/nono/journaux/et-si-javascript-allait-droit-dans-le-mur). Il pose un certain nombre de problèmes de JavaScript ou de son écosystème et présente également divers langages intéressant, traduits en JavaScript (comme Elm) ou non (comme Elixir).

Si vous souhaitez avoir un aperçu rapide de différents langages qui compilent en JavaScript, allez voir [JS/Alt](http://rahulsom.github.io/jsalt/). Il présente un même code (un calcul de sinus à base de factoriel et puissances) dans 6 langages :

* Classical JavaScript (ES5)
* Modern JavaScript (ES6)
* CoffeeScript
* GrooScript
* scala.js
* Purescript
* ClojureScript
* TypeScript

Et pour aller encore un peu plus loin, voici une [version écrite en Elm](https://gist.github.com/eunomie/bd4d8d491d686580167b) que j'ai testé pour l'occasion. Il y a deux versions, à base de `sum`/`map` ou à base de `foldl`, je n'ai pas réussi à me décider sur la meilleure approche. Voici la version `foldl` :

{{< highlight elm >}}
import List exposing (foldl)

pow : Float -> Float -> Float
pow num p =
  if p == 0 then
    1
  else if p > 0 then
    num * (pow num (p - 1))
  else
    1 / num * (pow num (p + 1))

fact : Float -> Float
fact x = if x  Float
sine x =
  foldl (i sum -> sum + (pow -1 i) * (pow x (i * 2 + 1)) / (fact (i * 2 + 1))) 0 [0..9]
{{< /highlight >}}

### CSS, SVG

Allez voir ce magnifique [tigre en SVG](http://codepen.io/eslam-nasser/pen/VexqvG) ! C'est juste vraiment impressionnant, d'autant plus qu'il n'est fait aucun usage de Javascript.

![][3]

### Infrastructure

Lorsque vous avez des gros besoins de fiabilité pour héberger des applications, en général vous pratiquez du _failover_. Par exemple, vous déployez vos applications dans deux data centers. L'un est actif, l'autre en attente de problème sur le premier. Dans chacun des deux cas, vous avez aussi prévu une certaine marche pour rattraper d'éventuels pics de charge, entre autres. Vous arrivez en substance à trois fois les ressources uniques nécessaires pour le fonctionnement. A contrario, vous pouvez imaginer des systèmes répartis sur plusieurs sites, trois par exemple. Chacun traite une partie de l'application et chacun a ses propres ressources en attente. Rien que le fait de passer sur trois sites est déjà un gain, un peu lorsque vous passez d'un raid 1 à un raid 5. Mais surtout, vous réduisez les ressources inutilisées, [l'exemple de Google](http://highscalability.com/blog/2016/2/23/googles-transition-from-single-datacenter-to-failover-to-a-n.html) indique un passage 300% à 170% de ressources utilisées. Je vous laisse imaginer les gains qui peuvent en résulter !

### Misc

Voici un très intéressant article sur la façon dont sont gérées [les inventions de Google](http://rue89.nouvelobs.com/2016/02/28/secret-inventions-google-tuons-projets-263297) : en allant plus loin que juste « échoue vite et recommence » qui ne permet pas toujours de faire les bons choix. Avoir une culture de l'échec peut être quelque chose de positif. Encore faut-il avoir de la méthode pour que l'échec soit exploitable. L'un des points clés semble être de prendre à bras le corps les éléments les plus risqués en premier. Rien ne sert de passer du temps (et des risques d'échecs) sur des éléments triviaux si le problème clé n'est pas traité. Il faut s'attaquer là où ça fait mal, tout de suite.

> C’est ça le secret, s’attaquer aux aspects les plus difficiles du problème en premier. Se demander joyeusement : « Comment allons-nous tuer notre projet aujourd’hui ? »

Si le sujet vous intéresse, je vous conseille également d'aller jeter un oeil sur la série d'articles écrits par [Simon](https://twitter.com/simondenier) sur nos réflexions quant à la découverte et l'amorçage de projet :

* [Le problème avec les story maps](http://sogilis.com/blog/decouverte-amorcage-projet-storymap/)
* [Planifier des capacités et des risques](http://sogilis.com/blog/decouverte-amorcage-projet-planifier/)
* [Qu'avons-nous appris de la planification par capacités](http://sogilis.com/blog/decouverte-et-amorcage-de-projet-quavons-nous/)

Voici un extrait tout à fait en lien avec les méthodes appliquées chez _X_ :

> Par nature, la capacité différenciante du projet est celle que personne n'a jamais fait. Elle est donc risquée : vous ne savez donc pas combien cela va coûter ni si cela va marcher. Cela tombe bien. Comme vous ne voulez probablement pas prendre tous les risques d'un seul coup, **pourquoi ne pas commencer par l'aspect de votre projet qui apporte la valeur et qui peut en même temps le faire échouer ?**

Et pour finir cet veille, voici un article basé sur des interviews de certains des ingénieurs les plus productifs de Facebook, indiquant quelles sont les pistes mises en oeuvre pour atteindre de bons niveaux de productivité : [How to Level up as a Developer](https://medium.freecodecamp.com/how-to-level-up-as-a-developer-87344584777c)

* Level 1: Reduce Unnecessary Distractions
* Level 2: Write “Better” Diffs
* Level 3: Being a Team Player
* Level 4: Organize & Hustle

## Liste de liens

### Langages

* [Moving a team from Scala to Golang](http://jimplush.com/talk/2015/12/19/moving-a-team-from-scala-to-golang/)
* [The best way to build a dev team: Go where the devs aren’t](https://medium.com/@cameronp/the-best-way-to-build-a-dev-team-go-where-the-devs-aren-t-d3f226cfe749)
* [Have emojis dictate your commit messages](https://github.com/savala/git-feeling)
* [Atom Git Commit Messages](https://github.com/atom/atom/blob/master/CONTRIBUTING.md#git-commit-messages)
* [Emojicode](http://www.emojicode.org/)

### Web

* [The Four Seconds Syndrome — How Latency Impacts User Behavior](http://www.yottaa.com/company/blog/application-optimization/the-four-second-syndrome/)

### Javascript

* (Object.values(), Object.entries() and Object.getOwnPropertyDescriptors() landed in Chrome.)[https://twitter.com/malyw/status/704972953029623808]
* [The Node.js Event Loop is a Damn Mess](http://sheldonkreger.com/the-nodejs-event-loop-is-a-damn-mess.html)
* [Et si JavaScript allait droit dans le mur ?](https://linuxfr.org/users/nono/journaux/et-si-javascript-allait-droit-dans-le-mur)
* [JS/Alt](http://rahulsom.github.io/jsalt/)
* [JS/Alt Elm version](https://gist.github.com/eunomie/bd4d8d491d686580167b)

### CSS, SVG

* [Tigre](http://codepen.io/eslam-nasser/pen/VexqvG)

### Infrastructure

* [Google’s Transition From Single Datacenter, To Failover, To A Native Multihome Architecture](http://highscalability.com/blog/2016/2/23/googles-transition-from-single-datacenter-to-failover-to-a-n.html)

### Misc

* [Le secret des inventions de Google ? Nous tuons nos projets](http://rue89.nouvelobs.com/2016/02/28/secret-inventions-google-tuons-projets-263297)
* [le problème avec les story maps](http://blog.sogilis.com/post/109977013776/d%C3%A9couverte-et-amor%C3%A7age-de-projet-le-probl%C3%A8me)
* [planifier des capacités et des risques](http://blog.sogilis.com/post/110635674876/d%C3%A9couverte-et-amor%C3%A7age-de-projet-planifier-des)
* [qu'avons-nous appris de la planification par capacités](http://blog.sogilis.com/post/111473929716/d%C3%A9couverte-et-amor%C3%A7age-de-projet-quavons-nous)
* [How to Level up as a Developer](https://medium.freecodecamp.com/how-to-level-up-as-a-developer-87344584777c)

[1]: https://67.media.tumblr.com/4e8e610a765d515139c83dc932c21070/tumblr_inline_o3glitq8841sv6muh_500.png
[2]: https://65.media.tumblr.com/d01433967c51343c087a92b8a1e1c8bb/tumblr_inline_o3glit0sNk1sv6muh_500.png
[3]: https://66.media.tumblr.com/fc1aa83fbbcd44a53c57fb8aa83be904/tumblr_inline_o3glitBxNN1sv6muh_500.jpg
