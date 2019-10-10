---
title: Qt pour des applications desktop et mobiles simplement (5/7)
author: Tiphaine
date: 2014-05-13T07:20:00+00:00
featured_image: /wp-content/uploads/2016/05/Sogilis-produits.png
tumblr_sogilisblog_permalink:
  - http://sogilisblog.tumblr.com/post/85606263266/qt-pour-des-applications-desktop-et-mobiles-partie-5
tumblr_sogilisblog_id:
  - 85606263266
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
  - 2564
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

## **Score et status**

<!-- more -->

Le plateau est là, le jeu fonctionne. Il serait sympa désormais d&rsquo;afficher le score et l&rsquo;état du jeu (gagné / perdu).

On va commencer par afficher deux composants textes qui vont contenir le résultat pour le premier et le score pour le deuxième.
  
L&rsquo;ensemble va être placé au dessus du plateau et les deux champs sur la même ligne.
  
On va donc utiliser un `ColumnLayout` et un `RowLayout`.

Pour ça, commencez par ajouter `QtQuick.Layouts` à votre `qml` :

<pre class="wp-code-highlight prettyprint">import QtQtuick.Layouts 1.1
</pre>

Puis les layouts et les champs textes :

<pre class="wp-code-highlight prettyprint">Rectangle {
  //...
  ColumnLayout {
    anchors.fill: parent
    RowLayout {
      Text {
        text: "status"
        color: "#f3eaea"
        opacity: 0.3
        font.pointSize: 30
        font.family: "Verdana"
        Layout.fillWidth: true
      }
      Text {
        text: "score"
        color: "#f3eaea"
        opacity: 0.3
        font.pointSize: 30
        font.family: "Verdana"
      }
    }
  }
  Grid {
    //...
  }
}
</pre>

Bon comme vous le voyez, rien de très spécial ici ça reste simple et logique.

Côté `C++` il faut pouvoir récupérer la valeur du score et celle des status.

La première idée est de créer une méthode (je le fais pour le score, vous le ferez pour le reste 😉 ) `score` qui va interroger `board_`.

<pre class="wp-code-highlight prettyprint">// boardmodel.h
public:
  int score() const;

// boardmodel.cpp
int BoardModel::score() const {
  return board_.score();
}
</pre>

Si vous vous souvenez bien de l&rsquo;étape précédente, les méthodes de déplacement avaient été préfixées de `Q_INVOKABLE`. Ici pas besoin, nous allons faire autrement et transformer le tout en une _propriété_. Une propriété va être accessible par le QML comme une variable (et non une méthode), et nous allons définir 4 choses :

  * le nom de la variable avec son type
  * la méthode à appeler pour lire la variable
  * la méthode à appeler pour écrire la variable (optionnel)
  * le signal utilisé comme notification de mise à jour de la valeur (comme le
  
    `dataChanged` vu précédemment)

Dans notre cas il n&rsquo;y a pas de méthode d&rsquo;écriture mais vous noterez que cela vous permet d&rsquo;avoir un binding bi-directionnel, ce qui est quand même vraiment agréable.

On va donc appeler la variable `score`, son type est `int`, la méthode à appeler pour lire la valeur est `score` et comme signal on va faire original, `scoreChanged`.

<pre class="wp-code-highlight prettyprint">// boardmodel.h
class BoardModel : public QAbstractListModel
{
  Q_OBJECT
  Q_PROPERTY(int score READ score NOTIFY scoreChanged)

  //...

signals:
  void scoreChanged();

  //...
}
</pre>

Et voilà, vous pouvez maintenant remplacer `"score"` dans votre fichier `qml `par `board.score`. Trop facile, non ?

Par contre, vous pouvez constater que la valeur ne change pas… en effet, comme avant, il faut émettre le signal lorsque la valeur change pour demander son rafraichissement. De la même manière, un signal va être émit par la classe `Board `lorsque le score change, et nous allons juste propager ce signal vers le signal
  
`scoreChanged` que nous venons de créer.

<pre class="wp-code-highlight prettyprint">// board.h
signals:
  void scoreChanged();

// board.cpp
bool Board::slide(t_value array[kSize]) {
  //...
  score_ += mergeValue;
  emit scoreChanged();
  //...
}

// boardmodel.cpp
BoardModel::BoardModel(QObject *parent) :
  QAbstractListModel(parent)
{
  connect(&amp;board_, &amp;Board::boardChangedAfterMovement, this, &amp;BoardModel::onDataChanged);
  connect(&amp;board_, &amp;Board::scoreChanged, this, &amp;BoardModel::scoreChanged);
}
</pre>

Et voilà, rien de plus à faire, ça fonctionne déjà ! Agréable, non ?

Je vous laisse faire la suite pour les états de jeux (gagné / perdu).

&nbsp;

<img class="aligncenter" src="http://67.media.tumblr.com/e13c415ae3e84abaee217e823fb4c554/tumblr_inline_n48gchB3dB1sv6muh.png" alt="" />

&nbsp;

> git: tag <span style="text-decoration: underline;"><a href="https://github.com/sogilis/qt2048/tree/05_score_statuses" target="_blank">05_score_statuses</a></span>

**Yves**