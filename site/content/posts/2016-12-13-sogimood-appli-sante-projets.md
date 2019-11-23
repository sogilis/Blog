---
title: "SogiMood : l’appli qui surveille la santé de l'ensemble de nos projets"
author: Marien Fressinaud
date: 2016-12-13T10:15:45+00:00
featured_image: /wp-content/uploads/2016/05/Sogilis-Christophe-Levet-Photographe-8218.jpg
categories:
  - DÉVELOPPEMENT
tags:
  - agile
  - amélioration continue
  - développement

---
Nous publions aujourd’hui, sous licence libre, une application utilisée en interne pour surveiller notre activité : SogiMood. Explications sur l’outil.

## Un besoin de visibilité

Au sein de Sogilis, nous surveillons notre activité à travers un point hebdomadaire qui nous permet de nous assurer que les projets sur lesquels nous travaillons s'enchaînent correctement et se portent bien. Lorsque j'ai pris en charge la gestion de ce point à la fin du mois de juillet, j'ai ressenti le besoin d’un outil permettant de synthétiser son contenu tout en offrant une alternative visuelle à nos comptes-rendus, écrits jusqu’à présent.

Je voulais être capable de voir d'un coup d'œil sur quelle période s'étalait chaque projet, indiquer quelques informations utiles (qui bosse dessus ? en quoi consiste le projet ? quel est le prochain jalon important ?), ainsi que surveiller la santé du projet.

## SogiMood, pour mieux piloter les projets

Comme je sais que la meilleure façon de ne jamais commencer un logiciel est de passer **_trop_** _de temps_ à le _penser_, j'ai développé un premier prototype en à peine 4h à l'aide de la techno que j'utilise aujourd'hui le plus : [ReactJS](https://facebook.github.io/react/). Ce fut l'occasion de tester [create-react-app](https://github.com/facebookincubator/create-react-app) qui venait tout juste d'être publié et qui m'a permis de démarrer très rapidement sans me soucier de la mise en place de l'environnement de développement. Est ainsi né [SogiMood](https://github.com/sogilis/SogiMood).

![sogimood 0.1-alpha](/img/2016/12/Capture-d’écran-2016-12-02-à-18.07.05-1024x560.png)

_La v0.1-alpha, extrêmement basique. Afin de ne pas dévoiler les clients avec lesquels nous travaillons, les noms de projets ont été remplacés par des titres de dessins animés Pixar._

En deux mois de travail en pointillé sur cet outil et rejoint par [Alexandre](https://twitter.com/_dumontal) qui a développé le backend (écrit en Go), je suis arrivé à une version qui me satisfaisait en termes de fonctionnalités.

![sogimood 0.6](/img/2016/12/Capture-d’écran-2016-12-02-à-18.21.39-1024x592.png)

_La 0.6 qui devient aujourd'hui la 1.0._

Les fonctionnalités implémentées sont :

* renseigner les informations essentielles d'un projet : nom, description, date de début et fin de contrat et date de fin réestimée ;
* visualiser la période sur laquelle les projets s'étendent (sur une année au maximum) en mettant en évidence le retard constaté ;
* indiquer chaque semaine l'enthousiasme du client, le moral des équipes et la santé financière pour chaque projet. De plus, il est possible d'ajouter des notes et des jalons.

La santé se mesure ainsi sur les trois objectifs que nous devons atteindre en tant que salarié : être rentable, enthousiasmer le client et s'éclater au boulot. Ces trois variables agrégées donnent un indicateur global pour la semaine.

## Le principe de sollicitation d'avis en action : le choix de la licence

Dernièrement, Christophe nous a présenté le principe de sollicitation d'avis qu'il souhaitait appliquer à Sogilis. Ce principe part du constat que le consensus est impossible à atteindre au sein d'une société et pose le principe du « c'est celui qui fait qui décide »… à condition de prendre l'avis des collègues spécialistes dans le domaine concerné et celui de ceux que la décision concerne.

Comme SogiMood est avant tout un projet personnel développé pour m’amuser (bien qu'utilisé au sein de Sogilis), j'étais parti du principe que le choix de la licence n'intéresserait pas forcément les foules. Développant moi-même [quelques logiciels libres](https://github.com/marienfressinaud) sur mon temps libre, je partais sur une licence MIT… lorsqu'on me suggéra une licence Apache vis-à-vis des brevets… puis une licence type GPL car non-permissive. D'un choix unilatéral, on est donc passé à une sollicitation d'avis. J'ai donc pris le temps d'étudier le pour et le contre et le choix s'est révélé plus compliqué que prévu. Les licences considérées étaient les suivantes :

* MIT (licence permissive) : les droits sont larges et les contraintes très faibles. Elle a l'avantage d'être l'une des plus connues et les gens n'ont généralement pas besoin de se poser de questions quant à l'usage qu'ils peuvent faire du code ;
* Apache (licence permissive) : similaire à la MIT dans les faits, elle est toutefois conseillée par la FSF pour sa clause sur les brevets ;
* AGPL (licence non-permissive) : plus contraignante que les deux précédentes car elle oblige à redistribuer les modifications faites au logiciel sous licence libre, y compris si l’accès au logiciel est fait via un serveur (ce qui fait sa différence avec la licence GPL).

Je suis toutefois resté sur le choix de la MIT qui est, selon moi, parfaitement adaptée à une lib ou une petite application qui n'a pas vocation à grossir. Il y a peu de chances que nous soyons confronté à des problèmes de brevet et je trouve que l'AGPL est moins « accueillante » vis-à-vis des contributions. J'utiliserais par contre volontiers cette dernière dans un contexte de société éditrice d'un logiciel open source. En revanche, SogiMood est un outil simple utilisé en interne et qui n'a pas la vocation de nous nourrir. C’est pourquoi j’ai préféré le libérer autant que possible !

## Les évolutions prévues

Aucune évolution n’est prévue pour le moment. Le but est aujourd’hui d’utiliser SogiMood pour voir s'il est adapté à nos besoins et usages. Jusqu’à maintenant, nous sommes assez peu à l'utiliser et le tenir à jour. En tant qu’utilisateur principal, les fonctionnalités proposées me suffisent, car elles répondent à mon besoin de visibilité sur les projets de Sogilis.

## Vous souhaitez contribuer ?

Si on ne prévoit pas de faire évoluer le logiciel, il en est peut-être autrement de votre côté ! Si vous avez des idées, si vous trouvez des bugs, si vous souhaitez forker le projet ou simplement si vous cherchez un petit projet en React pour vous faire la main, la porte est grande ouverte. On ne promet pas de pouvoir répondre à tous les tickets de façon régulière, mais on fera de notre mieux.

Voici quelques liens qui peuvent être utiles :

* [Le dépôt de code](https://github.com/sogilis/SogiMood)
* [Le bugtracker](https://github.com/sogilis/SogiMood/issues)

[Marien Fressinaud](https://twitter.com/berumuron)
