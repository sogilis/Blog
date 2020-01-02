---
title: Notre workflow Git, pourquoi, comment
author: Yves Brissaud
date: 2014-12-02T09:03:45+00:00
image: /img/2016/04/1.Produits.jpg
categories:
  - DÉVELOPPEMENT
tags:
  - git
  - workflow

---
Depuis l'avènement d'outils de gestion de code source de bonne qualité ([Git](http://git-scm.com/) et [mercurial](http://mercurial.selenic.com/) principalement) et surtout qui ne vous brident — presque — plus, vous pouvez enfin laisser libre court à votre imagination concernant votre flux de travail. Branches, rebase, merge…. Oui mais pour que le tout reste utilisable, surtout lorsque vous travaillez à plusieurs, il convient de régir tout ceci mais aussi de tenter de le conformer le plus possible à vos contraintes réelles — développement, production, tests…. Bref, il convient de définir un flux de travail — un _workflow_.

![](/img/2014/12/tumblr_inline_nflo1khSyE1sv6muh.png)

Plutôt que de simplement vous présenter notre workflow, vous trouverez ici le _pourquoi_ et le _comment_, c'est au final ce qui est le plus important.

- Un workflow c'est quoi, et ça sert à quoi ?
  - Et tu as des exemples ?
- Un workflow doit répondre à nos besoins
  - Les objectifs
  - Les contraintes
- Le résultat
  - En résumé
- La mise en œuvre
- Et en pratique ?
- À suivre
- Pour aller plus loin

# Un workflow c'est quoi, et ça sert à quoi ?

Lorsque vous développez un logiciel, au début tout est facile. Ça ressemble à un historique linéaire, c'est simple, c'est clair. Et c'est facile à utiliser. Voici par exemple la séquence de commandes que vous pouvez utiliser.

{{< highlight bash >}}
hack
hack
...
git add -p # vous utilisez -p, non ?
git commit
...
hack
...
git add -p
git commit
...
{{< /highlight >}}

Bon, ça c'est cool, c'est quand vous êtes tout seul.

Ensuite, le problème c'est que si on ne fait pas attention ça devient tout autre chose. Vous travaillez à plusieurs et, avec les meilleurs attentions du monde, vous voulez vous mettre à jour genre, tout le temps. Et allez, c'est parti pour un florilège de `pull`, `push` parfois avec des fusions ce qui peut aussi ramener un certain nombre de conflits.

{{< highlight bash >}}
hack
hack
...
git pull
# merge
git commit
git push
...
git pull
# merge
...
git pull
# merge
...
git commit
...
{{< /highlight >}}

Le problème, c'est que le résultat devient quelque peu… différent de ce qui était escompté. Pourtant, vous utilisez Git, on vous a toujours dit que les branches c'étaient bien, qu'il ne faut pas avoir peur des fusions, etc. L'un des difficultés provient du fait que, lorsqu'on utilise des [DVCS](http://en.wikipedia.org/wiki/Distributed_revision_control) à plusieurs — ou pas d'ailleurs — on crée automatiquement des branches divergentes même si il est d'usage d'avoir toujours une référence nommée et partagée (_master_ soug Git). Et forcément, s'il y a branches divergentes et qu'on utilise Git de base, il y a forcément une prolifération du nombre de fusion puisqu'on tente, naturellement, de se maintenir à jour par rapport à la base de code commune. Voici par exemple le résultat qu'on peut obtenir.

![](/img/2014/12/tumblr_inline_nez8kcKWWl1sv6muh.png)

Pour info c'est un vrai historique hein 😉

Vous pouvez tout de suite voir les problèmes. L'historique devient très difficile à lire. Tentez par exemple de suivre une branche et les commits associés. C'est loin d'être évident. Imaginez alors lorsque vous devez faire du debug pour trouver dans tout ceci _le_ commit qui a entrainé une régression. Et si vous regardez bien précisément vous pouvez y voir émerger une cause : le nombre de commit de fusion par rapport au nombre total de commit. Il y a des fusions dans tous les sens, pour se synchroniser, pour fusionner des fonctionnalités en cours de développement. Et il est facile d'imaginer que derrière ces commits se cachent quelques conflits.

Et si on en revenait à la question : _« un workflow c'est quoi, et ça sert à quoi ? »_

Un workflow — dans notre cas pour Git — c'est surtout la définition de comment on travaille en collaboration avec notre outil de gestion de sources et avec les autres personnes. Quelles sont les règles, mais surtout dans quel but. Il ne s'agit surtout pas de contraindre inutilement les possibilités. Mais pour ce faire, la première chose à se demander c'est justement quelles sont nos contraintes.

### Et tu as des exemples ?

En fait, il y en a plein.

Dans les plus connus, si vous avez des développements en production avec branche de maintenance et autres, que vous faites du [SemVer](http://semver.org/) par exemple, il y a [Git Flow](http://nvie.com/posts/a-successful-git-branching-model/) :

![](/img/2014/12/tumblr_inline_nez8ktrbKd1sv6muh.png)

Vous pouvez trouver plus d'infos sur le lien précédent, sur le [projet Github](https://github.com/nvie/gitflow) ou chez [Atlassian](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow).

A noter qu'il existe une variante pour [mercurial](http://mercurial.selenic.com/), [hgflow](https://bitbucket.org/yujiewu/hgflow/wiki/Home). Ces deux workflow sont d'ailleurs utilisables directement dans [SourceTree](http://www.sourcetreeapp.com/), le client [Git](http://git-scm.com/) et [mercurial](http://mercurial.selenic.com/) édité par [Atlassian](https://fr.atlassian.com/).

L'autre workflow très courant aujourd'hui c'est le [Github Flow](https://guides.github.com/introduction/flow/index.html).

![](/img/2014/12/tumblr_inline_nez8l9PRWV1sv6muh.png)

Il est très pratique si vous êtes dans le cadre de déploiement continu et si vous utilisez des systèmes comme [Github](https://github.com/) / [bitbucket](https://bitbucket.org) / autre solution d'hébergement avec code review et pull request.

## Un workflow doit répondre à nos besoins

Alors, s'il existe déjà des workflow, pourquoi ne pas en utiliser un déjà décrit ?

Déjà avant de savoir si on peut utiliser un workflow existant, il convient de savoir quels sont les objectifs visés et quelles sont nos contraintes. Ensuite, par l'étude de ceux-ci il devient possible de déterminer un workflow, soit un nouveau soit un existant.

Mais dans tous les cas un workflow se doit de nous aider, jamais de nous limiter ni nous empêcher de travailler.

### Les objectifs

Nous voulons pouvoir :

* tester facilement chaque fonctionnalité “unitairement” (vous verrez un peu plus tard que c'est un point beaucoup plus complexe qu'il n'y parait…)
* avoir un historique très lisible pour pouvoir naviguer facilement dedans lors de la découverte de mauvais comportements
* pouvoir désactiver une fonctionnalité très facilement
* avoir le détail (les étapes) de chaque fonctionnalité

### Les contraintes

Certains points à prendre en compte :

* pour le moment il n'y a pas de branches de production, maintenance, etc., mais ça pourra arriver un jour
* le corollaire c'est que pour le moment la branch principale doit toujours être stable
* il y a 7 (pour le moment) développeurs
* sprints de 2 semaines
* développement de logiciel mobile et de logiciel embarqué sur un drone (et là ça change tout…)

## Le résultat

Je vais reprendre les objectifs et essayer de placer en face de chacun une “règle” Git, en prenant en compte si besoin nos contraintes.

1. **Tester unitairement chaque fonctionnalité** :
  Bon là c'est simple, tout le monde me dira _« chaque fonctionnalité dans une branche dédiée »_. Oui. Mais je vous répondrai _« mais le code est dédié à un drone »_.La branche pour une fonctionnalité (_feature branch_ ou _topic branch_) c'est bien, à une condition importante, c'est qu'il existe un moyen de valider si cette branche est ok ou non avant de pouvoir l'intégrer dans le tronc commun. En général là on va parler de tests unitaires, d'intégration continue, etc. On a tout ça. Mais ça ne suffit pas. En effet, dans notre cas les tests unitaires, les tests de plus haut niveau, les simulations, l'intégration continue, tout ceci ne remplace pas — en tout cas pour le moment — des essais en vol, en extérieur. Le succès ou l'échec de notre code dépend aussi de différents matériels, de conditions extérieures — que se passe-t-il lorsque le GPS ou la communication est dégradé en plein vol parce qu'il y a des nuages ? — et pire, de ressentis visuels. Et plus que tout ceci, nous ne pouvons pas réaliser les tests en continu. Il faut se déplacer à l'extérieur pour réaliser les tests et dépendre alors de la météo. Donc nous souhaitons pouvoir tester plusieurs fonctionnalités d'un coup si c'est possible.Le résultat pour nous c'est tout de même une branche par fonctionnalité — what else? — plus une branche d'intégration spécifique à chaque itération. Lorsque nous partons en essais, la branche d'intégration comporte l'ensemble des fonctionnalités à jour ce qui permet, si tout se passe bien, de valider l'ensemble. Les fonctionnalités qui sont ok sont ensuite intégrées dans la branche principale `master`. Si jamais cela se passe mal, il est possible de générer très facilement des versions pour chaque fonctionnalité et tester, valider ou invalider chacune.

2. **Avoir un historique lisible** :
  L'objectif est vraiment de pouvoir naviguer facilement dans l'historique, essentiellement pour y rechercher la cause d'un mauvais comportement qui n'aurait pas été mis en évidence par les tests automatisés.La première solution à mettre en place c'est de limiter au maximum les commits “sans valeur”, par exemple les commits de synchronisation avec l’_upstream_, et garantir le meilleur rapport signal/bruit possible. Pour ça c'est assez facile, il suffit d'interdir les `pull/merge` de synchronisation. Si on souhaite tout de même bénéficier d'améliorations qui sont dans le tronc commun, il faut utiliser `rebase` ce qui linéarise l'historique.La deuxième chose c'est d'éviter au maximum les croisements de branches. La solution passe également par l'utilisation systématique de `rebase` avant d'intégrer les changements.Ceci doit permettre de ne pas avoir de commits inutiles et donc de pouvoir lire facilement l'historique car plus linéaire, moins plat de spaghettis.

3. **Pouvoir désactiver une fonctionnalité** :
  Le scénario est le suivant : on détecte après coup une fonctionnalité qui pose problème (ou simplement on veut supprimer une fonctionnalité).Il faut alors pouvoir visualiser très rapidement la fonctionnalité et l'ensemble de ses modifications. La pire chose qui existerait c'est de faire du merge en _fast forward_, c'est-à-dire une linéarisation des commits de la branche. On les rajoute simplement au-dessus du tronc commun. Si on fait ça — et ceux qui ont fait du `svn` (pouah !) connaissent très bien — il devient très compliqué d'identifier l'ensemble des modifications liées à une fonctionnalité. Et donc il devient très compliqué de les annuler.La solution est donc d'avoir tant que possible un unique commit pour chaque intégration de fonctionnalité dans le tronc commun. Si cela est fait, on peut annuler facilement par la réalisation d'un commit inversé. Vous pouvez utiliser directement la commande [`git revert`](https://www.atlassian.com/git/tutorials/undoing-changes/git-revert/) pour le faire. A ce moment de décision, vous avez deux choix :
  * faire des merges systématiquement sans _fast forward_ : `git merge --no-ff`
  * faire des merges avec fusion de tous les commits en un seul : `<code>git merge --squash`

4. **Avoir le détail de chaque fonctionnalité** :
  Pour pouvoir débugger plus facilement mais aussi simplement relire et comprendre les modifications, il est intéressant de garder présentes les étapes de développement.

Ceci interdit donc l'utilisation de `merge --squash` au profit de `merge --no-ff`. En effet, dans ce cas nous avons un commit de merge mais la branche et donc le détail des opérations restent visibles.

Par contre, souvenez-vous, on parlait un peu plus haut d'historique propre. Dans ce cas la bonne pratique, avant de réaliser la fusion, est de nettoyer l'historique de la branche. Je vous encourage donc vivement l'utilisation de [`rebase --interactive`](https://www.atlassian.com/git/tutorials/rewriting-history/git-rebase-i) voir même de [`rebase -i --autosquash`](https://coderwall.com/p/hh-4ea/git-rebase-autosquash) — ça c'est une pratique qu'elle est bien ! Le but est d'améliorer les messages, fusionner certains commits entre eux voir même les réordonner ou les supprimer.

Le rebase va obliger à réécrire l'historique et donc probablement à forcer les `push` mais ce n'est pas grave, c'est une bonne chose d'avoir un historique propre.

### En résumé

* une branche par fonctionnalité
* une branche d'intégration par itération
* synchronisation uniquement par _rebase_
* _rebase_ obligatoire avant intégration
* fusion sans _fast forward_ obligatoire
* nettoyage des branches avec du _rebase_ interactif

## La mise en œuvre

Vous vous souvenez de l'historique horrible du début de l'article ? Maintenant voici ce que cela donne :

![](/img/2014/12/tumblr_inline_nez8lrqrff1sv6muh.png)

Ceci est une capture du vrai résultat, sur le même projet. Bon ok vous n'avez pas les commentaires des commits, mais voici ce qu'on peut en tirer :

* l'historique est clair et lisible, il est tout à fait possible de le comprendre et de se déplacer dedans sans craintes
* l'historique nous offre deux niveaux de détails :
  * l'intégration de chaque fonctionnalité / bug / …
  * le détail de chaque fonctionnalité / bug / …
* étant donné qu'il est facile d'identifier le commit d'intégration d'une fonctionnalité, il est aussi facile de l'annuler
* on voit que chaque fonctionnalité a été réalisée dans une branche dédiée, ce qui permet de la tester unitairement
* comme chaque branche a subit un `rebase` avant d'être fusionnée, il n'y a pas de croisements de branches, ce qui améliore la lisibilité
* une branche d'intégration par itération est créée, puis si tout est ok, fusionnée dans `master`. Vous le voyez avec `origin/integ` qui a été fusionné (en _fast forward_, c'est le seul cas) dans `origin/master` et tout ce qui est au-dessus est dans `origin/integ-it2.7` et non dans `master` car l'itération est en cours. Evidemment il pourrait y avoir des branches non fusionnées dans `integ-it2.7`.

### Et en pratique ?

Voici les quelques commandes / principes que nous utilisons pour mettre en œuvre ce workflow.

1. On suppose qu'on débute une itération, `master` est propre. Par défaut toutes les branches vont avoir initialement comme origine `master`.
  {{< highlight bash >}}
  git checkout master
  git checkout -b integ
  {{< /highlight >}}

2. Pour une fonctionnalité donnée, on crée une branche pour bosser dedans.
  {{< highlight bash >}}
  git checkout master
  git checkout -b feature/my-super-cool-feature
  {{< /highlight >}}

  Nos branches sont préfixées pour améliorer la lisibilité :
  * `feature/` pour les fonctionnalités
  * `bug/` pour les anomalies
  * `refactor/` pour ce qui est lié à du pur refactoring (on en a beaucoup puisqu'on se base sur un existant pas toujours propre…)

3. On développe dans la branche.
  {{< highlight bash >}}
  git checkout feature/my-super-cool-feature
  ...
  hack
  ...
  git add -p
  git commit
  ...
  hack
  ...
  git add -p
  git commit
  ...
  git push # avec -u pour configurer l'upstream la première fois
  ...
  {{< /highlight >}}

4. S'il est nécessaire de se synchroniser, on rebase. Attention, j'insiste sur le nécessaire, si ce n'est pas obligatoire on ne le fait pas maintenant.
  {{< highlight bash >}}
  git checkout integ # je suppose que je suis dans ma branche de fonctionnalité
  git pull # comme on ne développe jamais dans master et qu'on fast forward master
          # on peut laisser le pull sans rebase
  git checkout -
  git rebase -
  {{< /highlight >}}

  A ce moment, pour pousser mes modifications sur le serveur il faut que j'écrase la branche distante. Comme ce n'est qu'une branche de fonctionnalité et qu'il n'y a pas plusieurs personnes — hors binome — qui travaille dessus, c'est permis.

  {{< highlight bash >}}
  git push -f
  {{< /highlight >}}

5. Fusion dans la branche d'intégration. Pour commencer on se synchronise et rebase avec, cf `4.`Ensuite on s'occupe de nettoyer la branche, avec `rebase -i` voir `rebase -i --autosquash` si vous avez pensé à l'utiliser. Enfin, on fusionne sans faire de fast forward.
  {{< highlight bash >}}
  git checkout integ
  git pull
  git checkout -
  git rebase -

  git merge --no-ff integ
  {{< /highlight >}}

  Concernant le message de commit il y a deux choix. Soit le nom de la branche est déjà explicite et ok, soit on met un beau message bien propre qui indique la fonctionnalité qu'on vient d'intégrer (à préférer).

  Evidemment on pousse la branche d'intégration sur le serveur.

6. Si les tests automatiques et non ont montré que la fonctionnalité ainsi que la branche integ sont ok, on peut fusionner integ dans master.
  {{< highlight bash >}}
  git checkout master
  git merge --ff
  git push
  {{< /highlight >}}

  Etant donné qu'on vient de faire une fusion _fast forward_ de `integ`, il n'est pas nécessaire de faire un `rebase` ou autre de cette dernière.

7. On nettoie un peu nos branches, c'est-à-dire qu'on ne garde pas sur le serveur de branches fusionnées et terminées, histoire de garder un ensemble lisible.
  {{< highlight bash >}}
  git branch -d feature/my-super-cool-feature
  git push origin --delete feature/my-super-cool-feature
  {{< /highlight >}}

## À suivre
=======

Aujourd'hui le workflow tel que défini est une aide précieuse dans notre développement. Il reste des points toujours délicats autour de la branche d'intégration. L'idéal serait de pouvoir valider nos modifications plus facilement, et donc de fusionner directement dans `master` et ne plus avoir cette branche intermédiaire. Mais cela est directement lié au métier et non une simple contrainte d'outillage.

Si nous voulions aller plus loin, il serait possible d'utiliser des _pull requests_ entre les branches de fonctionnalité et la branche d'intégration, voir entre la branche d'intégration et `master`. Actuellement nous ne faisons pas de revue systématique mais travaillons beaucoup par binômage et en tournant sur tous les aspects du code. Le problème des _pull requests_ est que la fusion depuis [Github](https://github.com/) ne permet pas de facilement faire un rebase avant. Il faudrait le faire en dehors de l'outil, ce qui n'est pas terrible. Il existe par contre des forges qui permettent de réaliser ce type d'opérations.

Que pensez-vous de ce workflow ? Lequel utilisez-vous de votre côté, et surtout pourquoi ?

## Pour aller plus loin

Si vous souhaitez aller plus loin, ou juste apprendre Git, nous [donnons des formations Git](https://sogilis.com/contact.html).

Et si vous n'êtes pas rassasiés, voici une petite collection de liens à suivre :

* Git Flow
  * [A successful Git branching model](http://nvie.com/posts/a-successful-git-branching-model/)
  * [GitFlow](https://github.com/nvie/gitflow)
  * [GitFlow by Atlassian](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)
* [Hg Flow](https://bitbucket.org/yujiewu/hgflow/wiki/Home)
* [Github flow](https://guides.github.com/introduction/flow/index.html)
* [Git revert](https://www.atlassian.com/git/tutorials/undoing-changes/git-revert/)
* Git rebase
  * [chez Atlassian](https://www.atlassian.com/git/tutorials/rewriting-history/git-rebase)
  * [doc Git](http://git-scm.com/book/fr/Les-branches-avec-Git-Rebaser)
* Git rebase -i
  * [chez Atlassian](https://www.atlassian.com/git/tutorials/rewriting-history/git-rebase-i)
  * [doc Git](http://git-scm.com/book/en/Git-Tools-Rewriting-History)
* Git rebase -i –autosquash
  * [protip Coderwall](https://coderwall.com/p/hh-4ea)
  * [keep your branch clean with fixup and autosquash](http://fle.github.io/git-tip-keep-your-branch-clean-with-fixup-and-autosquash.html)
* Git rerere
  * [doc Git](http://git-scm.com/blog/2010/03/08/rerere.html)
  * [Git rerere ma commande préférée](http://hypedrivendev.wordpress.com/2013/08/30/git-rerere-ma-commande-preferee/)
* Si vous voulez comprendre pourquoi et comment utiliser rebase et avoir un historique propre, je vous conseille vivement [ce post de Linus Torvalds sur la lkml](http://www.mail-archive.com/dri-devel@lists.sourceforge.net/msg39091.html). C'est plein de bons conseils pour bien utiliser Git.
