---
title: Notre workflow Git, pourquoi, comment
author: Tiphaine
date: 2014-12-02T09:03:45+00:00
featured_image: /wp-content/uploads/2016/04/1.Produits.jpg
tumblr_sogilisblog_permalink:
  - http://sogilisblog.tumblr.com/post/104148375576/notre-workflow-git-pourquoi-comment
tumblr_sogilisblog_id:
  - 104148375576
pyre_show_first_featured_image:
  - no
pyre_portfolio_width_100:
  - default
pyre_image_rollover_icons:
  - default
pyre_post_links_target:
  - no
pyre_related_posts:
  - default
pyre_share_box:
  - default
pyre_post_pagination:
  - default
pyre_author_info:
  - default
pyre_post_meta:
  - default
pyre_post_comments:
  - default
pyre_slider_position:
  - default
pyre_slider_type:
  - no
pyre_avada_rev_styles:
  - default
pyre_display_header:
  - yes
pyre_header_100_width:
  - default
pyre_header_bg_full:
  - no
pyre_header_bg_repeat:
  - repeat
pyre_displayed_menu:
  - default
pyre_display_footer:
  - default
pyre_display_copyright:
  - default
pyre_footer_100_width:
  - default
pyre_sidebar_position:
  - default
pyre_page_bg_layout:
  - default
pyre_page_bg_full:
  - no
pyre_page_bg_repeat:
  - repeat
pyre_wide_page_bg_full:
  - no
pyre_wide_page_bg_repeat:
  - repeat
pyre_page_title:
  - default
pyre_page_title_text:
  - default
pyre_page_title_text_alignment:
  - default
pyre_page_title_100_width:
  - default
pyre_page_title_bar_bg_full:
  - default
pyre_page_title_bg_parallax:
  - default
pyre_page_title_breadcrumbs_search_bar:
  - default
fusion_builder_status:
  - inactive
avada_post_views_count:
  - 12802
sbg_selected_sidebar:
  - 'a:1:{i:0;s:1:"0";}'
sbg_selected_sidebar_replacement:
  - 'a:1:{i:0;s:0:"";}'
sbg_selected_sidebar_2:
  - 'a:1:{i:0;s:1:"0";}'
sbg_selected_sidebar_2_replacement:
  - 'a:1:{i:0;s:0:"";}'
categories:
  - DÉVELOPPEMENT
tags:
  - git
  - workflow

---
**Depuis l&rsquo;avènement d&rsquo;outils de gestion de code source de bonne qualité (<span style="text-decoration: underline;"><a href="http://git-scm.com/" target="_blank">Git</a></span> et <span style="text-decoration: underline;"><a href="http://mercurial.selenic.com/" target="_blank">mercurial</a></span> principalement) et surtout qui ne vous brident — presque — plus, vous pouvez enfin laisser libre court à votre imagination concernant votre flux de travail. Branches, rebase, merge…. Oui mais pour que le tout reste utilisable, surtout lorsque vous travaillez à plusieurs, il convient de régir tout ceci mais aussi de tenter de le conformer le plus possible à vos contraintes réelles — développement, production, tests…. Bref, il convient de définir un flux de travail — un _workflow_.**

&nbsp;

<img class="aligncenter size-full wp-image-1820" src="http://sogilis.com/wp-content/uploads/2014/12/tumblr_inline_nflo1khSyE1sv6muh.png" alt="tumblr_inline_nflo1khSyE1sv6muh" width="477" height="275" srcset="http://sogilis.com/wp-content/uploads/2014/12/tumblr_inline_nflo1khSyE1sv6muh.png 477w, http://sogilis.com/wp-content/uploads/2014/12/tumblr_inline_nflo1khSyE1sv6muh-300x173.png 300w" sizes="(max-width: 477px) 100vw, 477px" />

<!-- more -->

Plutôt que de simplement vous présenter notre workflow, vous trouverez ici le _pourquoi_ et le _comment_, c&rsquo;est au final ce qui est le plus important.

  * Un workflow c&rsquo;est quoi, et ça sert à quoi ? 
      * Et tu as des exemples ?
  * Un workflow doit répondre à nos besoins 
      * Les objectifs
      * Les contraintes
  * Le résultat 
      * En résumé
  * La mise en œuvre
  * Et en pratique ?
  * À suivre
  * Pour aller plus loin

&nbsp;

## **Un workflow c&rsquo;est quoi, et ça sert à quoi ?**

Lorsque vous développez un logiciel, au début tout est facile. Ça ressemble à un historique linéaire, c&rsquo;est simple, c&rsquo;est clair. Et c&rsquo;est facile à utiliser. Voici par exemple la séquence de commandes que vous pouvez utiliser.

<pre class="wp-code-highlight prettyprint">hack
hack
...
git add -p # vous utilisez -p, non ?
git commit
...
hack
...
git add -p
git commit
...
</pre>

Bon, ça c&rsquo;est cool, c&rsquo;est quand vous êtes tout seul.

Ensuite, le problème c&rsquo;est que si on ne fait pas attention ça devient tout autre chose. Vous travaillez à plusieurs et, avec les meilleurs attentions du monde, vous voulez vous mettre à jour genre, tout le temps. Et allez, c&rsquo;est parti pour un florilège de `pull`, `push` parfois avec des fusions ce qui peut aussi ramener un certain nombre de conflits.

<pre class="wp-code-highlight prettyprint">hack
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
</pre>

Le problème, c&rsquo;est que le résultat devient quelque peu… différent de ce qui était escompté. Pourtant, vous utilisez Git, on vous a toujours dit que les branches c&rsquo;étaient bien, qu&rsquo;il ne faut pas avoir peur des fusions, etc. L&rsquo;un des difficultés provient du fait que, lorsqu&rsquo;on utilise des <span style="text-decoration: underline;"><a href="http://en.wikipedia.org/wiki/Distributed_revision_control" target="_blank">DVCS</a></span> à plusieurs — ou pas d&rsquo;ailleurs — on crée automatiquement des branches divergentes même si il est d&rsquo;usage d&rsquo;avoir toujours une référence nommée et partagée (_master_ soug Git). Et forcément, s&rsquo;il y a branches divergentes et qu&rsquo;on utilise Git de base, il y a forcément une prolifération du nombre de fusion puisqu&rsquo;on tente, naturellement, de se maintenir à jour par rapport à la base de code commune. Voici par exemple le résultat qu&rsquo;on peut obtenir.

<img class="aligncenter size-full wp-image-1832" src="http://sogilis.com/wp-content/uploads/2014/12/tumblr_inline_nez8kcKWWl1sv6muh.png" alt="tumblr_inline_nez8kcKWWl1sv6muh" width="364" height="750" srcset="http://sogilis.com/wp-content/uploads/2014/12/tumblr_inline_nez8kcKWWl1sv6muh.png 364w, http://sogilis.com/wp-content/uploads/2014/12/tumblr_inline_nez8kcKWWl1sv6muh-146x300.png 146w" sizes="(max-width: 364px) 100vw, 364px" />

Pour info c&rsquo;est un vrai historique hein 😉

Vous pouvez tout de suite voir les problèmes. L&rsquo;historique devient très difficile à lire. Tentez par exemple de suivre une branche et les commits associés. C&rsquo;est loin d&rsquo;être évident. Imaginez alors lorsque vous devez faire du debug pour trouver dans tout ceci _le_ commit qui a entrainé une régression. Et si vous regardez bien précisément vous pouvez y voir émerger une cause : le nombre de commit de fusion par rapport au nombre total de commit. Il y a des fusions dans tous les sens, pour se synchroniser, pour fusionner des fonctionnalités en cours de développement. Et il est facile d&rsquo;imaginer que derrière ces commits se cachent quelques conflits.

Et si on en revenait à la question : _« un workflow c&rsquo;est quoi, et ça sert à quoi ? »_

Un workflow — dans notre cas pour Git — c&rsquo;est surtout la définition de comment on travaille en collaboration avec notre outil de gestion de sources et avec les autres personnes. Quelles sont les règles, mais surtout dans quel but. Il ne s&rsquo;agit surtout pas de contraindre inutilement les possibilités. Mais pour ce faire, la première chose à se demander c&rsquo;est justement quelles sont nos contraintes.

### <span style="text-decoration: underline;"><strong>Et tu as des exemples ?</strong></span>

En fait, il y en a plein.

Dans les plus connus, si vous avez des développements en production avec branche de maintenance et autres, que vous faites du <span style="text-decoration: underline;"><a href="http://semver.org/" target="_blank">SemVer</a></span> par exemple, il y a <span style="text-decoration: underline;"><a href="http://nvie.com/posts/a-successful-git-branching-model/" target="_blank">Git Flow</a></span> :

<img class="aligncenter size-full wp-image-1822" src="http://sogilis.com/wp-content/uploads/2014/12/tumblr_inline_nez8ktrbKd1sv6muh.png" alt="tumblr_inline_nez8ktrbKd1sv6muh" width="494" height="717" srcset="http://sogilis.com/wp-content/uploads/2014/12/tumblr_inline_nez8ktrbKd1sv6muh.png 494w, http://sogilis.com/wp-content/uploads/2014/12/tumblr_inline_nez8ktrbKd1sv6muh-207x300.png 207w" sizes="(max-width: 494px) 100vw, 494px" />
  
Vous pouvez trouver plus d&rsquo;infos sur le lien précédent, sur le <span style="text-decoration: underline;"><a href="https://github.com/nvie/gitflow" target="_blank">projet Github</a></span> ou chez <span style="text-decoration: underline;"><a href="https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow" target="_blank">Atlassian</a></span>.

A noter qu&rsquo;il existe une variante pour <span style="text-decoration: underline;"><a href="http://mercurial.selenic.com/" target="_blank">mercurial</a></span>, <span style="text-decoration: underline;"><a href="https://bitbucket.org/yujiewu/hgflow/wiki/Home" target="_blank">hgflow</a></span>. Ces deux workflow sont d&rsquo;ailleurs utilisables directement dans <span style="text-decoration: underline;"><a href="http://www.sourcetreeapp.com/" target="_blank">SourceTree</a></span>, le client <span style="text-decoration: underline;"><a href="http://git-scm.com/" target="_blank">Git</a></span> et <span style="text-decoration: underline;"><a href="http://mercurial.selenic.com/" target="_blank">mercurial</a></span> édité par <span style="text-decoration: underline;"><a href="https://fr.atlassian.com/" target="_blank">Atlassian</a></span>.

L&rsquo;autre workflow très courant aujourd&rsquo;hui c&rsquo;est le <span style="text-decoration: underline;"><a href="https://guides.github.com/introduction/flow/index.html" target="_blank">Github Flow</a></span>.

<img class="aligncenter size-full wp-image-1833" src="http://sogilis.com/wp-content/uploads/2014/12/tumblr_inline_nez8l9PRWV1sv6muh.png" alt="tumblr_inline_nez8l9PRWV1sv6muh" width="500" height="173" srcset="http://sogilis.com/wp-content/uploads/2014/12/tumblr_inline_nez8l9PRWV1sv6muh.png 500w, http://sogilis.com/wp-content/uploads/2014/12/tumblr_inline_nez8l9PRWV1sv6muh-300x104.png 300w" sizes="(max-width: 500px) 100vw, 500px" />

&nbsp;

Il est très pratique si vous êtes dans le cadre de déploiement continu et si vous utilisez des systèmes comme <span style="text-decoration: underline;"><a href="https://github.com/" target="_blank">Github</a></span> / <span style="text-decoration: underline;"><a href="https://bitbucket.org" target="_blank">bitbucket</a></span> / <span style="text-decoration: underline;"><a href="https://www.atlassian.com/software/stash" target="_blank">stash</a></span> / autre solution d&rsquo;hébergement avec code review et pull request.

&nbsp;

## **Un workflow doit répondre à nos besoins**

Alors, s&rsquo;il existe déjà des workflow, pourquoi ne pas en utiliser un déjà décrit ?

Déjà avant de savoir si on peut utiliser un workflow existant, il convient de savoir quels sont les objectifs visés et quelles sont nos contraintes. Ensuite, par l&rsquo;étude de ceux-ci il devient possible de déterminer un workflow, soit un nouveau soit un existant.

Mais dans tous les cas un workflow se doit de nous aider, jamais de nous limiter ni nous empêcher de travailler.

### <span style="text-decoration: underline;"><strong>Les objectifs</strong></span>

Nous voulons pouvoir :

  1. tester facilement chaque fonctionnalité “unitairement” (vous verrez un peu plus tard que c&rsquo;est un point beaucoup plus complexe qu&rsquo;il n&rsquo;y parait…)
  2. avoir un historique très lisible pour pouvoir naviguer facilement dedans lors de la découverte de mauvais comportements
  3. pouvoir désactiver une fonctionnalité très facilement
  4. avoir le détail (les étapes) de chaque fonctionnalité

### **<span style="text-decoration: underline;">Les contraintes</span>**

Certains points à prendre en compte :

  * pour le moment il n&rsquo;y a pas de branches de production, maintenance, etc., mais ça pourra arriver un jour
  * le corollaire c&rsquo;est que pour le moment la branch principale doit toujours être stable
  * il y a 7 (pour le moment) développeurs
  * sprints de 2 semaines
  * développement de logiciel mobile et de logiciel embarqué sur un drone (et là ça change tout…)

&nbsp;

## **Le résultat**

Je vais reprendre les objectifs et essayer de placer en face de chacun une “règle” Git, en prenant en compte si besoin nos contraintes.

&nbsp;

  * **Tester unitairement chaque fonctionnalité** :
  
    Bon là c&rsquo;est simple, tout le monde me dira _« chaque fonctionnalité dans une branche dédiée »_. Oui. Mais je vous répondrai _« mais le code est dédié à un drone »_.La branche pour une fonctionnalité (_feature branch_ ou _topic branch_) c&rsquo;est bien, à une condition importante, c&rsquo;est qu&rsquo;il existe un moyen de valider si cette branche est ok ou non avant de pouvoir l&rsquo;intégrer dans le tronc commun. En général là on va parler de tests unitaires, d&rsquo;intégration continue, etc. On a tout ça. Mais ça ne suffit pas. En effet, dans notre cas les tests unitaires, les tests de plus haut niveau, les simulations, l&rsquo;intégration continue, tout ceci ne remplace pas — en tout cas pour le moment — des essais en vol, en extérieur. Le succès ou l&rsquo;échec de notre code dépend aussi de différents matériels, de conditions extérieures — que se passe-t-il lorsque le GPS ou la communication est dégradé en plein vol parce qu&rsquo;il y a des nuages ? — et pire, de ressentis visuels. Et plus que tout ceci, nous ne pouvons pas réaliser les tests en continu. Il faut se déplacer à l&rsquo;extérieur pour réaliser les tests et dépendre alors de la météo. Donc nous souhaitons pouvoir tester plusieurs fonctionnalités d&rsquo;un coup si c&rsquo;est possible.Le résultat pour nous c&rsquo;est tout de même une branche par fonctionnalité — what else? — plus une branche d&rsquo;intégration spécifique à chaque itération. Lorsque nous partons en essais, la branche d&rsquo;intégration comporte l&rsquo;ensemble des fonctionnalités à jour ce qui permet, si tout se passe bien, de valider l&rsquo;ensemble. Les fonctionnalités qui sont ok sont ensuite intégrées dans la branche principale `master`. Si jamais cela se passe mal, il est possible de générer très facilement des versions pour chaque fonctionnalité et tester, valider ou invalider chacune.

&nbsp;

  * **Avoir un historique lisible** :
  
    L&rsquo;objectif est vraiment de pouvoir naviguer facilement dans l&rsquo;historique, essentiellement pour y rechercher la cause d&rsquo;un mauvais comportement qui n&rsquo;aurait pas été mis en évidence par les tests automatisés.La première solution à mettre en place c&rsquo;est de limiter au maximum les commits “sans valeur”, par exemple les commits de synchronisation avec l’_upstream_, et garantir le meilleur rapport signal/bruit possible. Pour ça c&rsquo;est assez facile, il suffit d&rsquo;interdir les `pull/merge` de synchronisation. Si on souhaite tout de même bénéficier d&rsquo;améliorations qui sont dans le tronc commun, il faut utiliser `rebase` ce qui linéarise l&rsquo;historique.La deuxième chose c&rsquo;est d&rsquo;éviter au maximum les croisements de branches. La solution passe également par l&rsquo;utilisation systématique de `rebase` avant d&rsquo;intégrer les changements.Ceci doit permettre de ne pas avoir de commits inutiles et donc de pouvoir lire facilement l&rsquo;historique car plus linéaire, moins plat de spaghettis.

&nbsp;

  * **Pouvoir désactiver une fonctionnalité** :
  
    Le scénario est le suivant : on détecte après coup une fonctionnalité qui pose problème (ou simplement on veut supprimer une fonctionnalité).Il faut alors pouvoir visualiser très rapidement la fonctionnalité et l&rsquo;ensemble de ses modifications. La pire chose qui existerait c&rsquo;est de faire du merge en _fast forward_, c&rsquo;est-à-dire une linéarisation des commits de la branche. On les rajoute simplement au-dessus du tronc commun. Si on fait ça — et ceux qui ont fait du `svn` (pouah !) connaissent très bien — il devient très compliqué d&rsquo;identifier l&rsquo;ensemble des modifications liées à une fonctionnalité. Et donc il devient très compliqué de les annuler.La solution est donc d&rsquo;avoir tant que possible un unique commit pour chaque intégration de fonctionnalité dans le tronc commun. Si cela est fait, on peut annuler facilement par la réalisation d&rsquo;un commit inversé. Vous pouvez utiliser directement la commande <a href="https://www.atlassian.com/git/tutorials/undoing-changes/git-revert/" target="_blank"><code>git revert</code></a> pour le faire.A ce moment de décision, vous avez deux choix :</p> 
      * faire des merges systématiquement sans _fast forward_ : `git merge --no-ff`
      * faire des merges avec fusion de tous les commits en un seul : `<code>git merge --squash`</code>

&nbsp;

  * **Avoir le détail de chaque fonctionnalité** :
  
    Pour pouvoir débugger plus facilement mais aussi simplement relire et comprendre les modifications, il est intéressant de garder présentes les étapes de développement.

&nbsp;

Ceci interdit donc l&rsquo;utilisation de `merge --squash` au profit de `merge --no-ff`. En effet, dans ce cas nous avons un commit de merge mais la branche et donc le détail des opérations restent visibles.
  
Par contre, souvenez-vous, on parlait un peu plus haut d&rsquo;historique propre. Dans ce cas la bonne pratique, avant de réaliser la fusion, est de nettoyer l&rsquo;historique de la branche. Je vous encourage donc vivement l&rsquo;utilisation de <a href="https://www.atlassian.com/git/tutorials/rewriting-history/git-rebase-i" target="_blank"><code>rebase --interactive</code></a> voir même de <a href="https://coderwall.com/p/hh-4ea/git-rebase-autosquash" target="_blank"><code>rebase -i --autosquash</code></a> — ça c&rsquo;est une pratique qu&rsquo;elle est bien ! Le but est d&rsquo;améliorer les messages, fusionner certains commits entre eux voir même les réordonner ou les supprimer.

Le rebase va obliger à réécrire l&rsquo;historique et donc probablement à forcer les `push` mais ce n&rsquo;est pas grave, c&rsquo;est une bonne chose d&rsquo;avoir un historique propre.

&nbsp;

### **<span style="text-decoration: underline;">En résumé</span>**

  * une branche par fonctionnalité
  * une branche d&rsquo;intégration par itération
  * synchronisation uniquement par _rebase_
  * _rebase_ obligatoire avant intégration
  * fusion sans _fast forward_ obligatoire
  * nettoyage des branches avec du _rebase_ interactif

&nbsp;

## **La mise en œuvre**

Vous vous souvenez de l&rsquo;historique horrible du début de l&rsquo;article ? Maintenant voici ce que cela donne :

<img class="aligncenter size-full wp-image-1823" src="http://sogilis.com/wp-content/uploads/2014/12/tumblr_inline_nez8lrqrff1sv6muh.png" alt="tumblr_inline_nez8lrqrff1sv6muh" width="418" height="638" srcset="http://sogilis.com/wp-content/uploads/2014/12/tumblr_inline_nez8lrqrff1sv6muh.png 418w, http://sogilis.com/wp-content/uploads/2014/12/tumblr_inline_nez8lrqrff1sv6muh-197x300.png 197w" sizes="(max-width: 418px) 100vw, 418px" />

Ceci est une capture du vrai résultat, sur le même projet. Bon ok vous n&rsquo;avez pas les commentaires des commits, mais voici ce qu&rsquo;on peut en tirer :

  * l&rsquo;historique est clair et lisible, il est tout à fait possible de le comprendre et de se déplacer dedans sans craintes
  * l&rsquo;historique nous offre deux niveaux de détails : 
      * l&rsquo;intégration de chaque fonctionnalité / bug / …
      * le détail de chaque fonctionnalité / bug / …
  * étant donné qu&rsquo;il est facile d&rsquo;identifier le commit d&rsquo;intégration d&rsquo;une fonctionnalité, il est aussi facile de l&rsquo;annuler
  * on voit que chaque fonctionnalité a été réalisée dans une branche dédiée, ce qui permet de la tester unitairement
  * comme chaque branche a subit un `rebase` avant d&rsquo;être fusionnée, il n&rsquo;y a pas de croisements de branches, ce qui améliore la lisibilité
  * une branche d&rsquo;intégration par itération est créée, puis si tout est ok, fusionnée dans `master`. Vous le voyez avec `origin/integ` qui a été fusionné (en _fast forward_, c&rsquo;est le seul cas) dans `origin/master` et tout ce qui est au-dessus est dans `origin/integ-it2.7` et non dans `master` car l&rsquo;itération est en cours. Evidemment il pourrait y avoir des branches non fusionnées dans `integ-it2.7`.

### <span style="text-decoration: underline;"><strong>Et en pratique ?</strong></span>

Voici les quelques commandes / principes que nous utilisons pour mettre en œuvre ce workflow.

  1. On suppose qu&rsquo;on débute une itération, `master` est propre. Par défaut toutes les branches vont avoir initialement comme origine `master`. <pre class="wp-code-highlight prettyprint">git checkout master
git checkout -b integ
</pre>

  2. Pour une fonctionnalité donnée, on crée une branche pour bosser dedans. <pre class="wp-code-highlight prettyprint">git checkout master
git checkout -b feature/my-super-cool-feature
</pre>
    
    Nos branches sont préfixées pour améliorer la lisibilité :
    
      * `feature/` pour les fonctionnalités
      * `bug/` pour les anomalies
      * `refactor/` pour ce qui est lié à du pur refactoring (on en a beaucoup puisqu&rsquo;on se base sur un existant pas toujours propre…)
  3. On développe dans la branche. <pre class="wp-code-highlight prettyprint">git checkout feature/my-super-cool-feature
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
git push # avec -u pour configurer l&#039;upstream la première fois
...
</pre>

  4. S&rsquo;il est nécessaire de se synchroniser, on rebase. Attention, j&rsquo;insiste sur le nécessaire, si ce n&rsquo;est pas obligatoire on ne le fait pas maintenant. <pre class="wp-code-highlight prettyprint">git checkout integ # je suppose que je suis dans ma branche de fonctionnalité
git pull # comme on ne développe jamais dans master et qu&#039;on fast forward master
         # on peut laisser le pull sans rebase
git checkout -
git rebase -
</pre>
    
    A ce moment, pour pousser mes modifications sur le serveur il faut que j&rsquo;écrase la branche distante. Comme ce n&rsquo;est qu&rsquo;une branche de fonctionnalité et qu&rsquo;il n&rsquo;y a pas plusieurs personnes — hors binome — qui travaille dessus, c&rsquo;est permis.
    
    <pre class="wp-code-highlight prettyprint">git push -f
</pre>

  5. Fusion dans la branche d&rsquo;intégration. Pour commencer on se synchronise et rebase avec, cf `4.`Ensuite on s&rsquo;occupe de nettoyer la branche, avec `rebase -i` voir `rebase -i --autosquash` si vous avez pensé à l&rsquo;utiliser. Enfin, on fusionne sans faire de fast forward. <pre class="wp-code-highlight prettyprint">git checkout integ
git pull
git checkout -
git rebase -

git merge --no-ff integ
</pre>
    
    Concernant le message de commit il y a deux choix. Soit le nom de la branche est déjà explicite et ok, soit on met un beau message bien propre qui indique la fonctionnalité qu&rsquo;on vient d&rsquo;intégrer (à préférer).
    
    Evidemment on pousse la branche d&rsquo;intégration sur le serveur.</li> 
    
      * Si les tests automatiques et non ont montré que la fonctionnalité ainsi que la branche integ sont ok, on peut fusionner integ dans master. <pre class="wp-code-highlight prettyprint">git checkout master
git merge --ff
git push
</pre>
        
        Etant donné qu&rsquo;on vient de faire une fusion _fast forward_ de `integ`, il n&rsquo;est pas nécessaire de faire un `rebase` ou autre de cette dernière.</li> 
        
          * On nettoie un peu nos branches, c&rsquo;est-à-dire qu&rsquo;on ne garde pas sur le serveur de branches fusionnées et terminées, histoire de garder un ensemble lisible. <pre class="wp-code-highlight prettyprint">git branch -d feature/my-super-cool-feature
git push origin --delete feature/my-super-cool-feature</pre></ol> 
        
        &nbsp;
        
        ## **À suivre**
        
        Aujourd&rsquo;hui le workflow tel que défini est une aide précieuse dans notre développement. Il reste des points toujours délicats autour de la branche d&rsquo;intégration. L&rsquo;idéal serait de pouvoir valider nos modifications plus facilement, et donc de fusionner directement dans `master` et ne plus avoir cette branche intermédiaire. Mais cela est directement lié au métier et non une simple contrainte d&rsquo;outillage.
        
        Si nous voulions aller plus loin, il serait possible d&rsquo;utiliser des _pull requests_ entre les branches de fonctionnalité et la branche d&rsquo;intégration, voir entre la branche d&rsquo;intégration et `master`. Actuellement nous ne faisons pas de revue systématique mais travaillons beaucoup par binômage et en tournant sur tous les aspects du code. Le problème des _pull requests_ est que la fusion depuis <span style="text-decoration: underline;"><a href="https://github.com/" target="_blank">Github</a></span> ne permet pas de facilement faire un rebase avant. Il faudrait le faire en dehors de l&rsquo;outil, ce qui n&rsquo;est pas terrible. Il existe par contre des forges qui permettent de réaliser ce type d&rsquo;opérations.
        
        Que pensez-vous de ce workflow ? Lequel utilisez-vous de votre côté, et surtout pourquoi ?
        
        &nbsp;
        
        ## **Pour aller plus loin**
        
        Si vous souhaitez aller plus loin, ou juste apprendre Git, nous <span style="text-decoration: underline;"><a href="http://sogilis.com/formations" target="_blank">donnons des formations Git</a></span>.
        
        Et si vous n&rsquo;êtes pas rassasiés, voici une petite collection de liens à suivre :
        
          * Git Flow 
              * <span style="text-decoration: underline;"><a href="http://nvie.com/posts/a-successful-git-branching-model/" target="_blank">A successful Git branching model</a></span>
              * <span style="text-decoration: underline;"><a href="https://github.com/nvie/gitflow" target="_blank">GitFlow</a></span>
              * <span style="text-decoration: underline;"><a href="https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow" target="_blank">GitFlow by Atlassian</a></span>
          * <span style="text-decoration: underline;"><a href="https://bitbucket.org/yujiewu/hgflow/wiki/Home" target="_blank">Hg Flow</a></span>
          * <span style="text-decoration: underline;"><a href="https://guides.github.com/introduction/flow/index.html" target="_blank">Github flow</a></span>
          * <span style="text-decoration: underline;"><a href="https://www.atlassian.com/git/tutorials/undoing-changes/git-revert/" target="_blank">Git revert</a></span>
          * Git rebase 
              * <span style="text-decoration: underline;"><a href="https://www.atlassian.com/git/tutorials/rewriting-history/git-rebase" target="_blank">chez Atlassian</a></span>
              * <span style="text-decoration: underline;"><a href="http://git-scm.com/book/fr/Les-branches-avec-Git-Rebaser" target="_blank">doc Git</a></span>
          * Git rebase -i 
              * <span style="text-decoration: underline;"><a href="https://www.atlassian.com/git/tutorials/rewriting-history/git-rebase-i" target="_blank">chez Atlassian</a></span>
              * <span style="text-decoration: underline;"><a href="http://git-scm.com/book/en/Git-Tools-Rewriting-History" target="_blank">doc Git</a></span>
          * Git rebase -i –autosquash 
              * <span style="text-decoration: underline;"><a href="https://coderwall.com/p/hh-4ea" target="_blank">protip Coderwall</a></span>
              * <span style="text-decoration: underline;"><a href="http://fle.github.io/git-tip-keep-your-branch-clean-with-fixup-and-autosquash.html" target="_blank">keep your branch clean with fixup and autosquash</a></span>
          * Git rerere 
              * <span style="text-decoration: underline;"><a href="http://git-scm.com/blog/2010/03/08/rerere.html" target="_blank">doc Git</a></span>
              * <span style="text-decoration: underline;"><a href="http://hypedrivendev.wordpress.com/2013/08/30/git-rerere-ma-commande-preferee/" target="_blank">Git rerere ma commande préférée</a></span>
          * Si vous voulez comprendre pourquoi et comment utiliser rebase et avoir un historique propre, je vous conseille vivement <span style="text-decoration: underline;"><a href="http://www.mail-archive.com/dri-devel@lists.sourceforge.net/msg39091.html" target="_blank">ce post de Linus Torvalds sur la lkml</a></span>. C&rsquo;est plein de bons conseils pour bien utiliser Git.
        
        &nbsp;
        
        <div>
          <img class="alignleft" src="http://www.gravatar.com/avatar/2405b32ff817cd55c9e5404e004b048b.png" alt="Yves Brissaud" width="143" height="143" /><i class="fa fa-user"></i>
        </div>
        
        <div style="text-align: left;">
          <a href="mailto:yves+blog@sogilis.com" target="_blank">Yves Brissaud</a><br /> <a href="http://twitter.com/_crev_" target="_blank"><span class="share-link-twitter"><i class="fa fa-twitter"></i> _crev_</span></a><br /> <a href="https://github.com/eunomie" target="_blank"><i class="fa fa-github"></i> eunomie</a><br /> <a href="https://plus.google.com/112813954986166280487?rel=author" target="_blank"><span class="share-link-google-plus"><i class="fa fa-google-plus"></i> +YvesBrissaud</span></a>
        </div>
        
        <div style="text-align: left;">
        </div>
        
        <div style="text-align: left;">
        </div>
        
        <div style="text-align: left;">
        </div>