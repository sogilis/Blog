---
title: 'SogiMood : l’appli qui surveille la santé de l&rsquo;ensemble de nos projets'
author: Tiphaine
date: 2016-12-13T10:15:45+00:00
featured_image: /wp-content/uploads/2016/05/Sogilis-Christophe-Levet-Photographe-8218.jpg
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
  - 17197
sbg_selected_sidebar:
  - 'a:1:{i:0;s:1:"0";}'
sbg_selected_sidebar_replacement:
  - 'a:1:{i:0;s:12:"Blog Sidebar";}'
sbg_selected_sidebar_2:
  - 'a:1:{i:0;s:1:"0";}'
sbg_selected_sidebar_2_replacement:
  - 'a:1:{i:0;s:0:"";}'
categories:
  - DÉVELOPPEMENT
tags:
  - agile
  - amélioration continue
  - développement
format: image

---
**Nous publions aujourd’hui, sous licence libre, une application utilisée en interne pour surveiller notre activité : SogiMood. Explications sur l’outil.**

&nbsp;

## **Un besoin de visibilité**

Au sein de Sogilis, nous surveillons notre activité à travers un point hebdomadaire qui nous permet de nous assurer que les projets sur lesquels nous travaillons s&rsquo;enchaînent correctement et se portent bien. Lorsque j&rsquo;ai pris en charge la gestion de ce point à la fin du mois de juillet, j&rsquo;ai ressenti le besoin d’un outil permettant de synthétiser son contenu tout en offrant une alternative visuelle à nos comptes-rendus, écrits jusqu’à présent.

Je voulais être capable de voir d&rsquo;un coup d&rsquo;œil sur quelle période s&rsquo;étalait chaque projet, indiquer quelques informations utiles (qui bosse dessus ? en quoi consiste le projet ? quel est le prochain jalon important ?), ainsi que surveiller la santé du projet.

&nbsp;

## **SogiMood, pour mieux piloter les projets**

Comme je sais que la meilleure façon de ne jamais commencer un logiciel est de passer **_trop_** _de temps_ à le _penser_, j&rsquo;ai développé un premier prototype en à peine 4h à l&rsquo;aide de la techno que j&rsquo;utilise aujourd&rsquo;hui le plus : <span style="text-decoration: underline;"><a href="https://facebook.github.io/react/">ReactJS</a></span>. Ce fut l&rsquo;occasion de tester <span style="text-decoration: underline;"><a href="https://github.com/facebookincubator/create-react-app">create-react-app</a></span> qui venait tout juste d&rsquo;être publié et qui m&rsquo;a permis de démarrer très rapidement sans me soucier de la mise en place de l&rsquo;environnement de développement. Est ainsi né <span style="text-decoration: underline;"><a href="https://github.com/sogilis/SogiMood">SogiMood</a></span>.

<img class="aligncenter size-large wp-image-1406" src="http://sogilis.com/wp-content/uploads/2016/12/Capture-d’écran-2016-12-02-à-18.07.05-1024x560.png" alt="sogimood 0.1-alpha" width="669" height="366" srcset="http://sogilis.com/wp-content/uploads/2016/12/Capture-d’écran-2016-12-02-à-18.07.05-1024x560.png 1024w, http://sogilis.com/wp-content/uploads/2016/12/Capture-d’écran-2016-12-02-à-18.07.05-300x164.png 300w, http://sogilis.com/wp-content/uploads/2016/12/Capture-d’écran-2016-12-02-à-18.07.05-768x420.png 768w, http://sogilis.com/wp-content/uploads/2016/12/Capture-d’écran-2016-12-02-à-18.07.05.png 1280w" sizes="(max-width: 669px) 100vw, 669px" />

_La v0.1-alpha, extrêmement basique. Afin de ne pas dévoiler les clients avec lesquels nous travaillons, les noms de projets ont été remplacés par des titres de dessins animés Pixar._

En deux mois de travail en pointillé sur cet outil et rejoint par <span style="text-decoration: underline;"><a href="https://twitter.com/_dumontal">Alexandre</a></span> qui a développé le backend (écrit en Go), je suis arrivé à une version qui me satisfaisait en termes de fonctionnalités.

<img class="aligncenter size-large wp-image-1407" src="http://sogilis.com/wp-content/uploads/2016/12/Capture-d’écran-2016-12-02-à-18.21.39-1024x592.png" alt="sogimood 0.6" width="669" height="387" srcset="http://sogilis.com/wp-content/uploads/2016/12/Capture-d’écran-2016-12-02-à-18.21.39-1024x592.png 1024w, http://sogilis.com/wp-content/uploads/2016/12/Capture-d’écran-2016-12-02-à-18.21.39-300x173.png 300w, http://sogilis.com/wp-content/uploads/2016/12/Capture-d’écran-2016-12-02-à-18.21.39-768x444.png 768w, http://sogilis.com/wp-content/uploads/2016/12/Capture-d’écran-2016-12-02-à-18.21.39.png 1384w" sizes="(max-width: 669px) 100vw, 669px" />

_La 0.6 qui devient aujourd&rsquo;hui la 1.0._

Les fonctionnalités implémentées sont :

  * renseigner les informations essentielles d&rsquo;un projet : nom, description, date de début et fin de contrat et date de fin réestimée ;
  * visualiser la période sur laquelle les projets s&rsquo;étendent (sur une année au maximum) en mettant en évidence le retard constaté ;
  * indiquer chaque semaine l&rsquo;enthousiasme du client, le moral des équipes et la santé financière pour chaque projet. De plus, il est possible d&rsquo;ajouter des notes et des jalons.

La santé se mesure ainsi sur les trois objectifs que nous devons atteindre en tant que salarié : être rentable, enthousiasmer le client et s&rsquo;éclater au boulot. Ces trois variables agrégées donnent un indicateur global pour la semaine.

&nbsp;

## **Le principe de sollicitation d&rsquo;avis en action : le choix de la licence**

Dernièrement, Christophe nous a présenté le principe de sollicitation d&rsquo;avis qu&rsquo;il souhaitait appliquer à Sogilis. Ce principe part du constat que le consensus est impossible à atteindre au sein d&rsquo;une société et pose le principe du « c&rsquo;est celui qui fait qui décide »… à condition de prendre l&rsquo;avis des collègues spécialistes dans le domaine concerné et celui de ceux que la décision concerne.

Comme SogiMood est avant tout un projet personnel développé pour m’amuser (bien qu&rsquo;utilisé au sein de Sogilis), j&rsquo;étais parti du principe que le choix de la licence n&rsquo;intéresserait pas forcément les foules. Développant moi-même <span style="text-decoration: underline;"><a href="https://github.com/marienfressinaud">quelques logiciels libres</a></span> sur mon temps libre, je partais sur une licence MIT… lorsqu&rsquo;on me suggéra une licence Apache vis-à-vis des brevets… puis une licence type GPL car non-permissive. D&rsquo;un choix unilatéral, on est donc passé à une sollicitation d&rsquo;avis. J&rsquo;ai donc pris le temps d&rsquo;étudier le pour et le contre et le choix s&rsquo;est révélé plus compliqué que prévu. Les licences considérées étaient les suivantes :

  * MIT (licence permissive) : les droits sont larges et les contraintes très faibles. Elle a l&rsquo;avantage d&rsquo;être l&rsquo;une des plus connues et les gens n&rsquo;ont généralement pas besoin de se poser de questions quant à l&rsquo;usage qu&rsquo;ils peuvent faire du code ;
  * Apache (licence permissive) : similaire à la MIT dans les faits, elle est toutefois conseillée par la FSF pour sa clause sur les brevets ;
  * AGPL (licence non-permissive) : plus contraignante que les deux précédentes car elle oblige à redistribuer les modifications faites au logiciel sous licence libre, y compris si l’accès au logiciel est fait via un serveur (ce qui fait sa différence avec la licence GPL).

Je suis toutefois resté sur le choix de la MIT qui est, selon moi, parfaitement adaptée à une lib ou une petite application qui n&rsquo;a pas vocation à grossir. Il y a peu de chances que nous soyons confronté à des problèmes de brevet et je trouve que l&rsquo;AGPL est moins « accueillante » vis-à-vis des contributions. J&rsquo;utiliserais par contre volontiers cette dernière dans un contexte de société éditrice d&rsquo;un logiciel open source. En revanche, SogiMood est un outil simple utilisé en interne et qui n&rsquo;a pas la vocation de nous nourrir. C’est pourquoi j’ai préféré le libérer autant que possible !

&nbsp;

## **Les évolutions prévues**

Aucune évolution n’est prévue pour le moment. Le but est aujourd’hui d’utiliser SogiMood pour voir s&rsquo;il est adapté à nos besoins et usages. Jusqu’à maintenant, nous sommes assez peu à l&rsquo;utiliser et le tenir à jour. En tant qu’utilisateur principal, les fonctionnalités proposées me suffisent, car elles répondent à mon besoin de visibilité sur les projets de Sogilis.

&nbsp;

## **Vous souhaitez contribuer ?**

Si on ne prévoit pas de faire évoluer le logiciel, il en est peut-être autrement de votre côté ! Si vous avez des idées, si vous trouvez des bugs, si vous souhaitez forker le projet ou simplement si vous cherchez un petit projet en React pour vous faire la main, la porte est grande ouverte. On ne promet pas de pouvoir répondre à tous les tickets de façon régulière, mais on fera de notre mieux.

Voici quelques liens qui peuvent être utiles :

  * <span style="text-decoration: underline;"><a href="https://github.com/sogilis/SogiMood">Le dépôt de code</a></span>
  * <span style="text-decoration: underline;"><a href="https://github.com/sogilis/SogiMood/issues">Le bugtracker</a></span>

<span style="text-decoration: underline;"><a href="https://twitter.com/berumuron">Marien Fressinaud</a></span>