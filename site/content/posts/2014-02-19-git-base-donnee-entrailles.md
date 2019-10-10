---
title: Et si vous regardiez Git comme une base de donnée ? – Les entrailles
author: Tiphaine
date: 2014-02-19T14:58:00+00:00
featured_image: /wp-content/uploads/2016/04/Sogilis-Christophe-Levet-Photographe-7898.jpg
tumblr_sogilisblog_permalink:
  - http://sogilisblog.tumblr.com/post/77176154799/et-si-vous-regardiez-git-comme-une-base-de-donnée
tumblr_sogilisblog_id:
  - 77176154799
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
  - 2964
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
  - code
  - développement
  - git
  - sogiday

---
**Aujourd&rsquo;hui, tout le monde ou presque utilise <span style="text-decoration: underline;"><a title="Git" href="http://git-scm.org" target="_blank">Git</a></span> comme outil de gestion des sources. Mais n&rsquo;avez-vous jamais pensé à utiliser Git pour autre chose que gérer vos codes sources ?**

<!-- more -->

Pour ma part c&rsquo;est, entre autre, la lecture de <span style="text-decoration: underline;"><a title="Pro Git" href="http://git-scm.com/book" target="_blank">progit</a></span> et du <span style="text-decoration: underline;"><a title="Pro Git - Chapter 9 : Git Internals" href="http://git-scm.com/book/en/Git-Internals" target="_blank">chapitre dédié aux entrailles de Git</a></span> qui a commencé à m&rsquo;y faire penser. En effet, si vous regardez (vraiment) bien, git peut être vu comme une “simple” base de donnée clé/valeur. Bon ok, simple mais avec tout de même une gestion de l&rsquo;historique, faut pas oublier ce qui fait l&rsquo;essence de Git quand même. Et c&rsquo;est là tout l&rsquo;intérêt de la chose.

Lors du dernier <span style="text-decoration: underline;"><a title="Présentation des Sogidays chez Sogilis" href="http://sogilis.com/blog/sogiday/" target="_blank">Sogiday</a></span>_, _nous avons eu l&rsquo;occasion de travailler sur ce point : utiliser Git comme moteur de stockage pour une application.

Voici donc la première partie relatant cette exploration : les entrailles deGit !

&nbsp;

## **Et si on commençait en parlant un peu de Git quand même ?**

Pourquoi vouloir utiliser Git pour stocker des données (autre que du code) ? C&rsquo;est pas faute d&rsquo;avoir un grand nombre de bases de données disponibles.

&nbsp;

<img class="aligncenter" src="http://replygif.net/i/1220.gif" alt="" />

&nbsp;

Oui, mais. Il y a plein de choses sympa avec Git. La première étant évidemment l&rsquo;accès à l&rsquo;historique. Pouvoir remonter dans le temps peut être vraiment intéressant suivant les données que l&rsquo;on manipule. Et avec Git c&rsquo;est en standard (c&rsquo;est un peu le but…).

Mais Git permet aussi de facilement gérer la réplication. Il suffit de faire un clone.

Git est aussi plutôt pratique pour scripter des actions. Si on souhaite envoyer une notification à chaque fois qu&rsquo;une donnée est modifiée, il suffit d&rsquo;utiliser les hooks.

Une autre raison est de pouvoir imaginer sauvegarder des données simplement dans une branche d&rsquo;un dépôt de code. Par exemple que les bugs, le backlog, les choses à faire, votre kanban, etc., peuvent être persistés directement dans une branche de votre dépôt, juste à côté de votre code. Ces données deviennent donc synchrônes de votre code, vous clonez votre logiciel vous avez automatiquement les choses à faire. Sympa, non ?

Et puis ça semble fun aussi !

&nbsp;

<img class="aligncenter" src="http://replygif.net/i/244.gif" alt="" />

## 

## **Enregistrer une donnée dans Git**

La première étape est de pouvoir enregistrer une donnée dans Git.

La version naïve serait la suivante :

  * créer un fichier dans un dépôt Git
  * écrire les données qu&rsquo;on souhaite dans le fichier
  * committer le fichier

Ok, ça fonctionne. Par contre, ce n&rsquo;est quand même pas génial. Il faut gérer les fichiers à la main. Faire des commits et autre. En gros, juste écrire un _wrapper_ au dessus des commandes _haut niveau_ de Git.

Le problème, c&rsquo;est qu&rsquo;on n&rsquo;est pas tellement au niveau du stockage des données, on est au niveau du stockage des fichiers. Et c&rsquo;est pas exactement pareil. Et surtout, Git nous offre des outils bien plus précis.

Git permet de créer des `blobs` de données, sans manipuler des fichiers. Et ça c&rsquo;est cool.

&nbsp;

## **Git, clés et valeurs**

Allez, un petit exemple :

<pre class="wp-code-highlight prettyprint">$ echo &#039;{"hello":"world!"}&#039; | git hash-object -w --stdin
5be7403d30e5ecca8454ccd65391603a3adaf128
</pre>

Et là, j&rsquo;ai un `blob`. Alors oui, en vrai un fichier a été créé :

<pre class="wp-code-highlight prettyprint">$ find .git/objects -type f
.git/objects/5b/e7403d30e5ecca8454ccd65391603a3adaf128
</pre>

Et on peut évidemment demander à git de nous afficher la valeur correspondant à ce hash :

<pre class="wp-code-highlight prettyprint">$ git cat-file -p 5be7403d30e5ecca8454ccd65391603a3adaf128
{"hello":"world!"}
</pre>

Nous avons alors une base de donnée clé/valeur ! Pour une valeur on nous donne une clé, et si on demande à Git la valeur de la clé, il nous la donne. C&rsquo;était pas si dur quand même 🙂

Enfin presque.

Le problème est que si nous changeons la valeur… la clé va changer. Et là nous sommes face à un sérieux problème. Comment accéder correctement à une valeur si la clé change tout le temps ?

&nbsp;

## **Promenons-nous dans les bois, pendant que…**

En effet, la solution se trouve derrière un arbre.

<pre class="wp-code-highlight prettyprint">$ git update-index --add --cacheinfo 100644 
  5be7403d30e5ecca8454ccd65391603a3adaf128 1.json
$ git write-tree
3445f005406e920e5f91d2ff312c2a43794f97b0
</pre>

Nous venons de créer un `tree` qui pointe vers notre `blob`. Mais surtout, nous venons d&rsquo;ajouter une clé, `1.json`, qui elle ne devrait pas bouger à chaque modification de valeur.

Et histoire que tout soit bien enregistré, nous pouvons commiter le `tree` ce qui va permettre de l&rsquo;horodater, d&rsquo;ajouter un message lors de la création.

<pre class="wp-code-highlight prettyprint">$ git commit-tree -m &#039;add 1&#039; 3445f005406e920e5f91d2ff312c2a43794f97b0
3782de116baa41923d371e979034251d797a9d5a
</pre>

Histoire de vous assurer que tout s&rsquo;est bien passé comme prévu, vous pouvez demander à Git de vous afficher les informations liées à ce hash :

<pre class="wp-code-highlight prettyprint">$ git show 3782de116baa41923d371e979034251d797a9d5a
commit 3782de116baa41923d371e979034251d797a9d5a
Author: Yves Brissaud &lt;…@…&gt;
Date:   Tue Feb 11 11:47:35 2014 +0100

add 1

diff --git a/1.json b/1.json
new file mode 100644
index 0000000..5be7403
--- /dev/null
+++ b/1.json
@@ -0,0 +1 @@
+{"hello":"world!"}
</pre>

Il manque enfin une dernière chose : il nous faut une référence pour pouvoir y accéder facilement.

<pre class="wp-code-highlight prettyprint">$ git update-ref refs/heads/master 3782de116baa41923d371e979034251d797a9d5a
</pre>

Si on regarde le fichier `.git/refs/heads/master` nous avons bien le commit créé :

<pre class="wp-code-highlight prettyprint">$ cat .git/refs/heads/master
3782de116baa41923d371e979034251d797a9d5a
</pre>

Nous avons donc la structure suivante :

![Structure git][1]

Ok c&rsquo;est bien joli tout ça, mais on va pas maintenant devoir faire un `checkout` et lire le fichier à la main quand même ? Evidemment non, sinon ça ne servirait à rien et le côté _base de données_ serait assez peu pratique.

<pre class="wp-code-highlight prettyprint">$ git show master:1.json
{"hello":"world!"}
</pre>

## 

## **Tree et blobs en chaine**

Alors, plutôt simple, non ? Maintenant, pour bien comprendre comment cela fonctionne, faisons la même chose avec une clé plus complexe.

Au lieu d&rsquo;enregistrer mon blob sous `1.json` je vais le faire sous `items/json/1.json` :

<pre class="wp-code-highlight prettyprint">$ git update-index --add --cacheinfo 100644 
  5be7403d30e5ecca8454ccd65391603a3adaf128 items/json/1.json
$ git write-tree
7eccf3dc9a845af20fca5f41c9d0f5077e167c12
</pre>

A ce moment on ne voit pas beaucoup de différences. Et pourtant ! Si vous regardez dans le répertoire `.git/objects` vous n&rsquo;avez pas 2 objets (le blob et le tree) mais 4 :

<pre class="wp-code-highlight prettyprint">$ find .git/objects -type f
.git/objects/34/45f005406e920e5f91d2ff312c2a43794f97b0
.git/objects/5b/e7403d30e5ecca8454ccd65391603a3adaf128
.git/objects/7b/b488cbad32ad64e1a625920685f59322e9951f
.git/objects/7e/ccf3dc9a845af20fca5f41c9d0f5077e167c12
</pre>

Pour commencer à explorer, regardons ce qui est derrière `7eccf3dc9a845af20fca5f41c9d0f5077e167c12` :

<pre class="wp-code-highlight prettyprint">$ git show -p 7eccf3dc9a845af20fca5f41c9d0f5077e167c12
tree 7eccf3dc9a845af20fca5f41c9d0f5077e167c12

items/
</pre>

Nous avons bien un `tree`, comme précédemment. Mais celui-ci contient uniquement `items/` comme enfant, et non `items/json/1.json` par exemple.

Visualisons alors l&rsquo;arbre :

<pre class="wp-code-highlight prettyprint">git ls-tree -r -t 7eccf3dc9a845af20fca5f41c9d0f5077e167c12
040000 tree 7bb488cbad32ad64e1a625920685f59322e9951f  items
040000 tree 3445f005406e920e5f91d2ff312c2a43794f97b0  items/json
100644 blob 5be7403d30e5ecca8454ccd65391603a3adaf128  items/json/1.json
</pre>

Voici donc ce qui se cache derrière. Notre arbre contient un enfant `items`. Qui est un arbre contenant un enfant `json`. Qui est un arbre contenant un blob `1.json`. Vous pouvez aussi faire un `show` sur chaque hash pour voir le détail.

Vous pouvez alors créer un commit et mettre à jour master :

<pre class="wp-code-highlight prettyprint">$ git commit-tree -m &#039;add 1&#039; 7eccf3dc9a845af20fca5f41c9d0f5077e167c12
1838b5ba48b0f811d30ced3f249687e1780c544e
$ git update-ref refs/heads/master 1838b5ba48b0f811d30ced3f249687e1780c544e
</pre>

La structure est donc désormais ainsi :

![Structure git hiérarchie][2]

Bien évidemment vous pouvez toujours récupérer le contenu par votre clé :

<pre class="wp-code-highlight prettyprint">$ git show master:items/json/1.json
{"hello":"world!"}
</pre>

## 

## **Conclusion**

Cette première partie à la découverte (succinte) de Git est terminée. Vous avez pu voir que git nous offre réellement la possibilité d&rsquo;utiliser ses couches internes et nous expose son modèle de stockage. Ceci permet d&rsquo;imaginer de nouvelles utilisations de git et surtout autrement qu&rsquo;en wrappant les commandes Git de haut niveau ce qui serait ni agréable, ni fiable, ni amusant.

<span style="text-decoration: underline;"><a href="http://sogilis.com/blog/git-base-donnee-ruby/" target="_blank">Le prochain article</a></span> vous permettra de réaliser la même chose qu&rsquo;ici mais intégré dans un code Ruby.

Un dernier point sur git avant de se quitter. Sogilis dispense aussi des <span style="text-decoration: underline;"><a href="http://sogilis.com/formations/" target="_blank">formations Git</a></span> !

&nbsp;

## **Ressources**

  * <span style="text-decoration: underline;"><a href="http://opensoul.org/2011/09/01/git-the-nosql-database/" target="_blank">Git: the NoSQL database</a></span> par Brandon Keepers
  * <span style="text-decoration: underline;"><a href="http://vimeo.com/44458223" target="_blank">Vidéo Git : the NoSQL database</a></span> par Brandon Keepers
  * <span style="text-decoration: underline;"><a title="Pro Git - Chapter 9 : Git Internals" href="http://git-scm.com/book/en/Git-Internals" target="_blank">Git Internals : Chapitre 9 de Pro Git</a></span>

**Yves**

 [1]: http://66.media.tumblr.com/3db4a26ac339ea068f96de5ecea2f176/tumblr_inline_n0vyfg5SJf1sv6muh.png
 [2]: http://66.media.tumblr.com/7f18ea0122e2eaa803e1777183244874/tumblr_inline_n0vyg2SID51sv6muh.png