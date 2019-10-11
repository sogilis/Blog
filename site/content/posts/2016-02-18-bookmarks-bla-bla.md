---
title: De tout, de rien, des bookmarks, du bla bla
author: Tiphaine
date: 2016-02-18T13:49:31+00:00
featured_image: /wp-content/uploads/2016/04/1.Formations.jpg
tumblr_sogilisblog_permalink:
  - http://sogilisblog.tumblr.com/post/139541500666/de-tout-de-rien-des-bookmarks-du-bla-bla
tumblr_sogilisblog_id:
  - 139541500666
avada_post_views_count:
  - 2346
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
  - clojure
  - go
  - javascript
  - veille

---
**Petit aperçu commenté de notre veille de ces derniers jours. Le principe n&rsquo;est pas de vous fournir une suite de lien mais plutôt que ces liens racontent une histoire, ce qui nous intéresse ou nous interpelle. Mais tout de même, pour les plus pressés, la liste de l&rsquo;ensemble des liens est dispo à la fin de l&rsquo;article.**

<!-- more -->

## Un peu de contenu

### Méthodes, langages et bonnes pratiques

S&rsquo;il est un point qui nous tient vraiment à cœur, c&rsquo;est celui d&rsquo;écrire du code maintenable et qui tende à comporter le moins (zéro si possible) de bugs.

Si on prend l&rsquo;aspect maintenabilité, il existe en réalité différentes visions qui s&rsquo;affrontent ou se complètent selon les cas. Si on prend le développement objet il y a tout ce qui tourne autour d’_Object Calisthenics_, de _SOLID_ par exemple.

Néanmoins, il existe d&rsquo;autres approches. Un article que j&rsquo;ai lu cette semaine apporte un autre éclairage sur le sujet, très _pragmatique_ j&rsquo;ai trouvé et très en accord avec les pratiques que nous mettons en place dans divers projets : <span style="text-decoration: underline;"><a title="Write code that is easy to delete, not easy to extend" href="http://programmingisterrible.com/post/139222674273/write-code-that-is-easy-to-delete-not-easy-to" target="_blank">Write code that is easy to delete, not easy to extend</a></span>. C&rsquo;est un article que je vous recommande vraiment de lire.

Et pour illustrer un peu plus le principe, je vais juste vous parler de ce que nous avons réalisé dans un projet actuel. Pour placer un peu le contexte, nous participons au développement des applications mobile d’<a href="http://hexoplus.com" target="_blank">Hexo+</a>, une caméra volante autonome. Vous comprendrez donc que la sécurité est un sujet hautement critique. Lorsque nous avons entrepris de refondre toute la gestion des alertes (l&rsquo;ensemble des actions à réaliser lorsque le drone n&rsquo;a plus de batterie, de GPS, perdu la connexion, etc.) il s&rsquo;agissait de faire cela de la meilleure manière et avec le moins de régressions possibles. La solution _classique_ aurait été de se lancer petit à petit dans un _refactoring_ des classes concernées, de transformer le comportement jusqu&rsquo;à avoir quelque chose qui convienne à nouveau. Sauf que cela représente un très gros travail, plutôt en mode _big bang_ (le logiciel devient inutilisable tant que cela n&rsquo;est pas terminé). Au contraire, nous avons commencé… par ne rien toucher ! Nous avons monté une deuxième architecture de gestion des alertes en parallèle. Pendant un temps, les deux systèmes fonctionnaient d&rsquo;ailleurs de concert. Puis, lorsque le nouveau système s&rsquo;est avéré suffisament avancé, nous avons simplement débranché et supprimé l&rsquo;ancien. Au final, nous avons portés la notion de maintenabilité et d&rsquo;évolutivité non pas au niveau des objets, mais bien au niveau du système (ce qui compte au final). Mais, et c&rsquo;est aussi le propos de l&rsquo;article, cela n&rsquo;est possible que si nous sommes capables de supprimer l&rsquo;ancien code. Plus ce code sera dur à supprimer (parce qu&rsquo;il est présent partout, parce qu&rsquo;il est mal découpé, etc.) plus la tâche sera ardue.

Ecrire un code qui pourra facilement être supprimé est l&rsquo;une des choses les plus importantes pour faire évoluer en douceur un système entier.

Une fois que vous êtes dans cette optique, il vous reste à écrire du code qui réalise réellement ce qu&rsquo;on attend de lui. Et là… c&rsquo;est loin d&rsquo;être simple.

Prenons un exemple qui d&rsquo;apparence est trivial :

> Étant donné une liste de valeur et une valeur, retourne l&rsquo;index de la valeur dans la liste ou indique qu&rsquo;elle n&rsquo;est pas présente dans la liste.

Je suis certain que vous avez déjà réalisé un code du genre. Et que ça n&rsquo;a pris que quelques lignes. Facile. Maintenant, que vous indique votre code en terme de documentation, de robustesse aux cas limites, de spécifications, de garanties d&rsquo;exécution normale, etc. ? Vous pensez que votre code est bon ? Je vous suggère dans ce cas d&rsquo;aller tout de suite lire cet article sur les <span style="text-decoration: underline;"><a title="Tests vs Types" href="http://kevinmahoney.co.uk/articles/tests-vs-types/" target="_blank">Tests vs Types</a></span> et vous devriez voir qu&rsquo;en réalité c&rsquo;est loin d&rsquo;être trivial. Et lorsqu&rsquo;on voit l&rsquo;effort qui peut être nécessaire pour un code d&rsquo;apparence si simple, que penser d&rsquo;un code plus complexe ?

Si vous voulez d&rsquo;ailleurs aller un peu plus loin, vous pouvez aller lire ce <span style="text-decoration: underline;"><a href="http://docs.adacore.com/spark2014-docs/html/ug/tutorial.html" target="_blank">tutoriel à propos de SPARK 2014</a></span> qui tente de répondre à exactement la même spécification, cette fois ci en allant jusqu&rsquo;à la preuve. Très instructif encore une fois du travail nécessaire pour garantir qu&rsquo;une si petite portion de code fera bien ce qui a été demandé.

Histoire de rester dans des sujets connexes, connaissez-vous la règle numéro 1 des choses à ne pas faire de Joel Spolsky ?

> <span style="text-decoration: underline;"><a href="http://www.joelonsoftware.com/articles/fog0000000069.html" target="_blank">Rewrite your software from scratch</a></span>

David Heinemeier Hansson (créateur de Ruby on Rails, Basecamp, etc.) n&rsquo;est quant à lui pas d&rsquo;accord. Et il vous explique pourquoi (et comment ils ont réécrit plusieurs fois Basecamp) <span style="text-decoration: underline;"><a href="http://businessofsoftware.org/2015/10/david-heinemeier-hansson-rewrite-basecamp-business-of-software-conference-video-dhh-bos2015/" target="_blank">dans cette vidéo</a></span>.

### <span style="text-decoration: underline;"><strong>JavaScript</strong></span>

Si vous avez déjà fait du javaScript (_What else?_), vous avez nécessairement été confronté à la problématique de _bind_ et au fait que _this_ n&rsquo;a pas le même comportement que dans la plupart des langages habituels. Après pas mal de bricolages, on est arrivé à avoir une solution correcte en _ES5_ :

<pre class="wp-code-highlight prettyprint">$(&#039;.some-link&#039;).on(&#039;click&#039;, view.reset.bind(view))
</pre>

Avec la méthode `bind` présente sur les objets on peut ainsi s&rsquo;assurer que la méthode `reset` de `view` sera bien appelée sur l&rsquo;objet `view` et non sur l&rsquo;objet DOM derrière `$('.some-link')`. Cette méthode `bind` est quand même une grande avancée. Mais _ES7_ va encore plus loin (même si ce n&rsquo;est pour le moment qu&rsquo;une proposition) :

<pre class="wp-code-highlight prettyprint">$(&#039;.some-link&#039;).on(&#039;click&#039;, ::view.reset)
</pre>

L&rsquo;introduction de l&rsquo;opérateur `::` réalise justement la même chose que le `bind` précédent avec une plus grande lisibilité et de manière un peu moins verbeuse. Si vous voulez en savoir un peu plus sur cet opérateur (qui ne fait pas que le `bind`), je vous suggère d&rsquo;aller lire <span style="text-decoration: underline;"><a title="Function Bind Syntax" href="https://babeljs.io/blog/2015/05/14/function-bind" target="_blank">cet article</a></span>.

Toujours du côté des nouveautés Javascript, si vous avez un peu suivi ce qui se passe depuis quelque temps (ok, ces dernières années en fait), le code que nous écrivons est de plus en plus tourné vers de l&rsquo;asynchrone (parfois à l&rsquo;excès malheureusement). Et qui dit code asynchrone dit souvent code difficile à tester. C&rsquo;est sur ce point qu&rsquo;une nouvelle bibliothèque de test est sortie avec pour nom le très explicite <span style="text-decoration: underline;"><a title="Painless Javascript Testing" href="https://taylorhakes.com/posts/introducing-painless-testing-library/" target="_blank">painless</a></span>. Elle nous promet d&rsquo;être plus rapide et surtout de faciliter le test du code contenant des _promises_, _async/await_, _generators_ et autres nouveautés _ES6/ES7_.

Sur le même segment est aussi apparu <span style="text-decoration: underline;"><a title="AVA Futuristic test runner" href="https://github.com/sindresorhus/ava" target="_blank">AVA</a></span> de <span style="text-decoration: underline;"><a href="https://github.com/sindresorhus" target="_blank">Sindre Sorhus</a></span>. Plus rapide, adaptée à toutes les nouveautés du langage mais aussi avec le point particulier d&rsquo;exécuter les tests en isolation pour éviter tout effet de bord et s&rsquo;adapter au matériel actuel pour de meilleurs performances.

### <span style="text-decoration: underline;"><strong>Clojure</strong></span>

Chez Sogilis, nous utilisons de nombreux langages différents. Et s&rsquo;il en est un qui sort un peu du lot par son style c&rsquo;est bien Clojure. Fonctionnel, bourré de parenthèse (Lisp signifie bien _Lots of Irritating Single Parentheses_, non ?) mais tellement expressif et concis qu&rsquo;il est difficile de ne pas tomber sous le charme 🙂

Et justement, si vous vouliez savoir comment il est possible de passer d&rsquo;un magnifique amas de ces parenthèses à un bytecode pour JVM (et que vous avez quelques heures devant vous…), voici un magnifique article sur le sujet : <span style="text-decoration: underline;"><a title="Clojure Compilation: Parenthetical Prose to Bewildering Bytecode" href="http://blog.ndk.io/clojure-compilation.html" target="_blank">Clojure Compilation: Parenthetical Prose to Bewildering Bytecode</a></span>.

Toujours à propos de Clojure, voici un petit tutoriel très bien amené qui présente comment <span style="text-decoration: underline;"><a title="ClojureScript: Real world app" href="http://dimafeng.com/2015/11/16/clojurescript-om/" target="_blank">réaliser une interface d&rsquo;administration de blog</a></span> à base de <span style="text-decoration: underline;"><a href="https://github.com/omcljs/om" target="_blank">Om</a></span> et de ClojureScript. <span style="text-decoration: underline;"><a href="https://github.com/omcljs/om" target="_blank">Om</a></span> est un binding ClojureScript pour react. Le code présenté est plutôt intéressant, ce que j&rsquo;ai apprécié est la concision et la facilité de traitement des requêtes asynchrones, un peu comme on ferait avec <span style="text-decoration: underline;"><a href="https://jakearchibald.com/2014/es7-async-functions/" target="_blank">async/await en ES7</a></span>, mais ici au travers de channels et, surtout, sans _promises_. Finalement comme si on utilisais des <span style="text-decoration: underline;"><a href="https://tour.golang.org/concurrency/1" target="_blank">goroutines</a></span>.

S&rsquo;il est une notion centrale à clojure et l&rsquo;ensemble des langages fonctionnels, c&rsquo;est bien l&rsquo;immutabilité. Néanmoins, savoir l&rsquo;expliquer simplement n&rsquo;est pas toujours aisé. Voici un article qui se propose d’<span style="text-decoration: underline;"><a title="Explaining immutability" href="https://medium.com/@roman01la/explaining-immutability-2aedc221b4c0#.973tcxnmt" target="_blank">expliquer l&rsquo;immutabilité à partir d&rsquo;un post de blog</a></span>. Plutôt réussi, il devrait vous permettre de comprendre la base ou de la faire comprendre facilement.

### **<span style="text-decoration: underline;">Go</span>**

Un autre des langages plutôt en vogue par chez nous est Go. Un point qui peut être déroutant au début lorsqu&rsquo;on vient de Ruby, Node.js ou autre est l&rsquo;absence d&rsquo;un gestionnaire de paquet dédié au langage. Et lorsque je lis <span style="text-decoration: underline;"><a title="So you want to write a package manager" href="https://medium.com/@sdboyer/so-you-want-to-write-a-package-manager-4ae9c17d9527" target="_blank">So you want to write a package manager</a></span> je me dis que finalement c&rsquo;est très (très) loin d&rsquo;être trivial. Mais cela permet aussi de mettre en exergue les problèmes que d&rsquo;autres gestionnaires peuvent avoir (bien que parlant de Go, cet article est très généraliste). Par exemple, `bower` n&rsquo;avait pas d&rsquo;équivalent aux fichiers de lock permettant de reproduire une installation d&rsquo;un poste à l&rsquo;autre.

A l&rsquo;autre bout de la chaine, il y a l&rsquo;exécution et la mise à jour des programmes. <span style="text-decoration: underline;"><a title="Monitorable, gracefully restarting, self-upgrading binaries in Go" href="https://github.com/jpillora/overseer" target="_blank">overseer</a></span> est une bibliothèque qui agit sur cette partie critique en production : monitorer, redémarrer et mettre à jour des binaires Go. Attention, il n&rsquo;est pas encore à un stade utilisable en production (ou à vos risques et périls) mais à surveiller et garder sous le coude dès qu&rsquo;il sera prêt.

Je ne sais pas si on vous l&rsquo;a déjà dit, mais à Sogilis on aime bien Git. A tel point d&rsquo;ailleurs qu&rsquo;on donne des formations sur le sujet depuis des années. Et à tel point aussi qu&rsquo;on l&rsquo;utilise dans nos applications, y compris en tant que base de données. Sur le marché, en général la solution est d&rsquo;utiliser un binding au dessus de la <span style="text-decoration: underline;"><a href="https://libgit2.github.com/" target="_blank">libgit2</a></span>. La plupart des langages en ont, Go y compris. Néanmoins, une nouvelle bibliothèque a vu le jour récemment, et elle ne se base justement pas sur libgit2. Attention tout de même, elle n&rsquo;est faite que pour de la lecture, il n&rsquo;y a pas d&rsquo;écriture possible avec. Il s&rsquo;agit de <span style="text-decoration: underline;"><a title="A low level and highly extensible git client library" href="https://github.com/src-d/go-git" target="_blank">go-git</a></span> et elle est utilisée par _source{d}_ qui entre autre analyse l&rsquo;ensemble des dépôts de github ! A tester plus en avant et voir ce que ça apporte réellement de plus (ou de moins) que le binding Go qui existait déjà.

### <span style="text-decoration: underline;"><strong>Sécurité</strong></span>

Un point toujours central dans la sécurité de nos applications est la manière dont on stocke et compare les mots de passe. Hors de question ici de les garder en clair dans une base ! Par contre, régulièrement les bonnes pratiques changent ou, simplement, de nouvelles bibliothèques apparaissent pour nous faciliter la vie (et hors de question ici de réinventer la roue). Voici donc un article qui vous présente <span style="text-decoration: underline;"><a title="How to safely store password in 2016" href="https://paragonie.com/blog/2016/02/how-safely-store-password-in-2016" target="_blank">les bonnes manières de stocker un mot de passe en 2016</a></span> et ceci dans 6 langages différents.

### **<span style="text-decoration: underline;">Divers</span>**

En tant que développeur, nous avons souvent tendance à nous cacher derrière la technique, derrière la création d&rsquo;outils et non leur usage. Pourtant, il est nécessaire d&rsquo;avoir conscience que l&rsquo;usage fait de nos développements peut avoir des impacts non négligeables, autant dans des bons que des mauvais côtés. C&rsquo;est (une partie au moins) du <span style="text-decoration: underline;"><a title="[Mix-IT 2015] Come to the dark side de Stéphane Bortzmeyer" href="http://www.infoq.com/fr/presentations/come-to-dark-side" target="_blank">message que Stéphane Bortzmeyer</a></span> a tenté de faire passer lors du Mix-IT 2015.

Dans un tout autre registre, regardez comment un réseau de neurones entraîné sur des milliers de photos arrive à <span style="text-decoration: underline;"><a title="Réseaux de neurones et re-pigmentation de photographies" href="http://tinyclouds.org/colorize/" target="_blank">coloriser des images noir et blanc</a></span>. C&rsquo;est fascinant et plutôt juste comme résultat !

Et comme on <span style="text-decoration: underline;"><a href="https://twitter.com/_crev_/status/643708426841915392" target="_blank">apprécie les Lego</a></span>, on ne peut que rester admiratif devant cette machine tout en Lego qui <span style="text-decoration: underline;"><a title="Lego Paper Plane Machine" href="https://www.youtube.com/watch?v=jU7dFrxvPKA" target="_blank">plie et lance un avion en papier</a></span> !

## **Liste des liens**

### **Méthodes, langages, etc.**

  * <span style="text-decoration: underline;"><a title="Write code that is easy to delete, not easy to extend" href="http://programmingisterrible.com/post/139222674273/write-code-that-is-easy-to-delete-not-easy-to" target="_blank">Write code that is easy to delete, not easy to extend</a></span>
  * <span style="text-decoration: underline;"><a title="Tests vs Types" href="http://kevinmahoney.co.uk/articles/tests-vs-types/" target="_blank">Tests vs Types</a></span>
  * <span style="text-decoration: underline;"><a href="http://docs.adacore.com/spark2014-docs/html/ug/tutorial.html" target="_blank">Spark tutorial</a></span>

### **Javascript**

  * <span style="text-decoration: underline;"><a title="Function Bind Syntax" href="https://babeljs.io/blog/2015/05/14/function-bind" target="_blank">Funcion Bind Syntax</a></span>
  * <span style="text-decoration: underline;"><a title="Painless Javascript Testing" href="https://taylorhakes.com/posts/introducing-painless-testing-library/" target="_blank">Painless Javascript Testing</a></span>
  * <span style="text-decoration: underline;"><a title="AVA Futuristic test runner" href="https://github.com/sindresorhus/ava" target="_blank">AVA Futuristic test runner</a></span>

### **Clojure**

  * <span style="text-decoration: underline;"><a title="Clojure Compilation: Parenthetical Prose to Bewildering Bytecode" href="http://blog.ndk.io/clojure-compilation.html" target="_blank">Clojure Compilation: Parenthetical Prose to Bewildering Bytecode</a></span>
  * <span style="text-decoration: underline;"><a href="https://github.com/omcljs/om" target="_blank">Om</a></span>
  * <span style="text-decoration: underline;"><a title="ClojureScript: Real world app" href="http://dimafeng.com/2015/11/16/clojurescript-om/" target="_blank">ClojureScript: Real world app</a></span>
  * <span style="text-decoration: underline;"><a title="Explaining immutability" href="https://medium.com/@roman01la/explaining-immutability-2aedc221b4c0#.973tcxnmt" target="_blank">Explaining immutability</a></span>

### **Go**

  * <span style="text-decoration: underline;"><a href="https://medium.com/@sdboyer/so-you-want-to-write-a-package-manager-4ae9c17d9527#.31qplbih0" target="_blank">So you want to write a package manager</a></span>
  * <span style="text-decoration: underline;"><a title="Monitorable, gracefully restarting, self-upgrading binaries in Go" href="https://github.com/jpillora/overseer" target="_blank">overseer</a></span>
  * <span style="text-decoration: underline;"><a href="https://libgit2.github.com/" target="_blank">libgit2</a></span>
  * <span style="text-decoration: underline;"><a title="A low level and highly extensible git client library" href="https://github.com/src-d/go-git" target="_blank">go-git A low level and highly extensible git client library</a></span>

### **Sécurité**

  * <span style="text-decoration: underline;"><a title="How to safely store password in 2016" href="https://paragonie.com/blog/2016/02/how-safely-store-password-in-2016" target="_blank">How to safely store password in 2016</a></span>

### **Divers**

  * <span style="text-decoration: underline;"><a title="[Mix-IT 2015] Come to the dark side de Stéphane Bortzmeyer" href="http://www.infoq.com/fr/presentations/come-to-dark-side" target="_blank">[Mix-IT 2015] Come to the dark side de Stéphane Bortzmeyer</a></span>
  * <span style="text-decoration: underline;"><a title="Réseaux de neurones et re-pigmentation de photographies" href="http://tinyclouds.org/colorize/" target="_blank">Re-pigmentation de photographies</a></span>
  * <span style="text-decoration: underline;"><a title="Lego Paper Plane Machine" href="https://www.youtube.com/watch?v=jU7dFrxvPKA" target="_blank">Lego Paper Plane Machine</a></span>

<div>
  <img class="alignleft" src="http://www.gravatar.com/avatar/2405b32ff817cd55c9e5404e004b048b.png" alt="Yves Brissaud" width="118" height="118" /><i class="fa fa-user"></i>
</div>

<div>
  <span style="text-decoration: underline;"><a href="mailto:yves+blog@sogilis.com" target="_blank">Yves Brissaud</a></span><br /> <span style="text-decoration: underline;"> <a href="http://twitter.com/_crev_" target="_blank"><span class="share-link-twitter"><i class="fa fa-twitter"></i> _crev_</span></a></span><br /> <span style="text-decoration: underline;"> <a href="https://github.com/eunomie" target="_blank"><i class="fa fa-github"></i> eunomie</a></span><br /> <span style="text-decoration: underline;"> <a href="https://plus.google.com/112813954986166280487?rel=author" target="_blank"><span class="share-link-google-plus"><i class="fa fa-google-plus"></i> +YvesBrissaud</span></a></span>
</div>