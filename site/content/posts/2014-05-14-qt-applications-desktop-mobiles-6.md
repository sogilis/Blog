---
title: Qt pour des applications desktop et mobiles simplement (6/7)
author: Tiphaine
date: 2014-05-14T07:54:00+00:00
featured_image: /wp-content/uploads/2015/03/Sogilis-Christophe-Levet-Photographe-7461.jpg
tumblr_sogilisblog_permalink:
  - http://sogilisblog.tumblr.com/post/85705563931/qt-pour-des-applications-desktop-et-mobiles-partie-6
tumblr_sogilisblog_id:
  - 85705563931
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
  - 3397
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
  - c++
  - mobile
  - qt
  - qt quick

---
Suite de la découverte de la programmation desktop et mobile avec Qt.

<a href="#base_app" target="_blank">L&rsquo;application de base</a>

  * <a href="#qt" target="_blank">Qt et application Qt Quick</a>

  1. <a href="#req" target="_blank">Prérequis</a>
  2. <a href="#quick" target="_blank">Créer un projet Qt Quick</a>
  3. <a href="#discover" target="_blank">Découverte rapide</a>

  * <a href="http://blog.sogilis.com/post/84307433806/qt-pour-des-applications-desktop-et-mobiles-simplement#a2048" target="_blank">2048</a>

  1. <a href="http://sogilis.com/blog/qt-applications-desktop-mobiles-1/" target="_blank">2048.c</a>
  2. <a href="http://sogilis.com/blog/qt-applications-desktop-mobiles-1/" target="_blank">2048 en Qt<br /> </a>

<a href="http://sogilis.com/blog/qt-applications-desktop-mobiles-1/" target="_blank">Interface QML</a>

  * <a href="http://sogilis.com/blog/qt-applications-desktop-mobiles-1/" target="_blank">Board</a>

  1. <a href="http://blog.sogilis.com/post/84907918476/qt-pour-des-applications-desktop-et-mobiles-simplement-p#display" target="_blank">Affichage du plateau</a>
  2. <a href="http://sogilis.com/blog/qt-applications-desktop-mobiles-1/" target="_blank">Un peu de style</a>
  3. <a href="http://sogilis.com/blog/qt-applications-desktop-mobiles-4/" target="_blank">Déplacement et jeu</a>

  * <a href="http://sogilis.com/blog/qt-applications-desktop-mobiles-5/" target="_blank">Score et status</a>
  * <a href="http://sogilis.com/blog/qt-applications-desktop-mobiles-6/" target="_blank">Responsive design</a>

<a href="http://sogilis.com/blog/qt-applications-desktop-mobiles-7/" target="_blank">Et pour les mobiles</a>

  * <a href="http://sogilis.com/blog/qt-applications-desktop-mobiles-7/" target="_blank">Gestures</a>
  * <a href="http://sogilis.com/blog/qt-applications-desktop-mobiles-7/" target="_blank">iOS</a>
  * <a href="http://sogilis.com/blog/qt-applications-desktop-mobiles-7/" target="_blank">Android</a>

&nbsp;

## **Responsive design**

<!-- more -->

Maintenant que nous avons une application fonctionnelle, on peut imaginer aller un peu plus loin et exploiter les possibilités de QML.

Par exemple il est possible de rentre l&rsquo;ensemble de notre interface proportionnelle à la zone affichée. Ainsi lorsque vous redimensionnez la fenêtre votre jeu occupe toujours l&rsquo;espace disponible. Finalement c&rsquo;est un peu comme faire
  
une interface vectorielle.

Lorsque nous avons créé l&rsquo;objet QML `Tile`, nous avons laissé la possibilité de paramétrer la taille d&rsquo;une tuile avec la propriété `tileWidth`. Et la taille du texte dans la tuile est également fonction de cette propriété. Si nous la
  
faisons varier (en lui affectant non plus une valeur mais une fonction) alors l&rsquo;ensemble pourra varier également.

De la même manière il est possible de remplacer les valeurs en dur (police, grille) au niveau du `mail.qml`.

Par exemple, pour faire varier la taille du texte du status et du score, remplaçons l&rsquo;actuel.

<pre class="wp-code-highlight prettyprint">font.pointSize: 30
</pre>

par

<pre class="wp-code-highlight prettyprint">font.pointSize: Math.min(main.width, main.height) / 12
</pre>

Et pour que cela fonctionne, il faut rajouter `main` comme `id` à notre `Window`.

Ainsi, lorsque la hauteur ou largeur de la fenêtre changera, la taille du texte sera modifiée en conséquence.

Pour le plateau, nous allons faire quasiment la même chose :

<pre class="wp-code-highlight prettyprint">Rectangle {
  id: mainBoard
  Layout.fillHeight: true
  Layout.fillWidth: true

  function step() {
    return Math.min(mainBoard.width, mainBoard.height) / 33;
  }

  width: 330
  height: 330
  color: "#baaa9e"

  Grid {
    y: mainBoard.step()
    anchors.horizontalCenter: parent.horizontalCenter
    rows: 4
    columns: 4
    spacing: mainBoard.step()

    Repeater {
      id: boardRepeater
      model: board
      delegate: Tile {
        value: display
        tileWidth: mainBoard.step() * 7
      }
    }
  }
}
</pre>

Vous noterez juste que j&rsquo;ai introduit un nouveau `Rectangle`. Celui-ci occupe toute la place disponible (via `Layout.fillWidth` et `Layout.fillHeight`) et permet surtout de très facilement centrer horizontalement le plateau.

&nbsp;

<img class="aligncenter" src="http://67.media.tumblr.com/01d874e3cd633f2f0c03f7795f339449/tumblr_inline_n48gcutXVJ1sv6muh.png" alt="" />

&nbsp;

> git: tag <span style="text-decoration: underline;"><a href="https://github.com/sogilis/qt2048/tree/06_responsive" target="_blank">06_responsive</a></span>

**Yves**