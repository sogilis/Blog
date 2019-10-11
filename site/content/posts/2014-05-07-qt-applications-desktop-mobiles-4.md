---
title: Qt pour des applications desktop et mobiles simplement (4/7)
author: Tiphaine
date: 2014-05-07T08:26:00+00:00
featured_image: /wp-content/uploads/2014/08/Sogilis-Christophe-Levet-Photographe-7517.jpg
tumblr_sogilisblog_permalink:
  - http://sogilisblog.tumblr.com/post/85006927096/qt-pour-des-applications-desktop-et-mobiles-partie-4
tumblr_sogilisblog_id:
  - 85006927096
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
  - 2641
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

&nbsp;

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

## **Déplacement et jeu**

<!-- more -->

Bon, c&rsquo;est bien joli mais par contre ça serait plutôt cool de pouvoir jouer, non ?

Le fonctionnement est très simple. Il faut écouter le clavier et sur les touches correspondantes aux flèches exécuter les déplacements demandés.

Il faut définir un _handler_ sur l&rsquo;évènement d&rsquo;appuis de touche et tester la touche :

<pre class="wp-code-highlight prettyprint">Window {
    //...
    Rectangle {
      anchors.fill: parent
      focus: true
      Keys.onPressed: {
        switch (event.key) {
        case Qt.Key_Up:
        case Qt.Key_Right:
        case Qt.Key_Down:
        case Qt.Key_Left:
        }
      }

      Grid {
        //...
      }
    }
}
</pre>

La propriété `focus` permet de donner le focus à l&rsquo;item et donc d&rsquo;écouter les entrées. Et comme il n&rsquo;est pas possible de le faire au niveau de l&rsquo;objet `Window `un `Rectangle` a été introduit en lui spécifiant de remplir tout le parent via
  
`anchors.fill: parent`.

Jusque là c&rsquo;était la partie la plus évidente. Par contre, comment appeler les méthodes `move{Up,Right,Down,Left}` de notre objet `C++` `Board` ?

Nous allons utiliser l&rsquo;objet `BoardModel` qui existe déjà (oui c&rsquo;est pas forcément la meilleure architecture mais pour comprendre les concepts c&rsquo;est pas mal) et lui ajouter les méthodes correspondantes. Mais ça ne suffit pas pour les appeler depuis le QML. Pour ce faire il faut les rendre invocables, via la macro `Q_INVOKABLE` :

<pre class="wp-code-highlight prettyprint">// BoardModel.h
public:
  Q_INVOKABLE void moveUp();
  Q_INVOKABLE void moveRight();
  Q_INVOKABLE void moveDown();
  Q_INVOKABLE void moveLeft();

// BoardModel.cpp
void BoardModel::moveUp() {
  board_.moveUp();
}

void BoardModel::moveRight() {
  board_.moveRight();
}

void BoardModel::moveDown() {
  board_.moveDown();
}

void BoardModel::moveLeft() {
  board_.moveLeft();
}
</pre>

Dans ce cas, vous pouvez remplir le `switch` avec les appels, par exemple `board.moveLeft();`

Si vous exécutez le programme, vous verrez… qu&rsquo;il ne se passe rien. Et pourtant, pas de bugs à l&rsquo;horizon. Si vous tracez le code vous verrez même que le déplacement est bien effectué dans la classe `Board`. Mais alors on aurait oublié quelque chose ?

Et oui, car le principe de QML est entre autre de reposer sur l&rsquo;excellent système des signaux/slots de Qt. Si rien ne se passe c&rsquo;est en réalité juste que vous ne voyez rien, que la vue n&rsquo;est pas rafraichie. Et pour la rafraichir il suffit de
  
notifier que la donnée a changée en utilisant un signal, logique non ?

Bon, la première implémentation naïve est d&rsquo;émettre le signal `dataChanged` depuis les méthodes `move*` de `BoardModel`. Par exemple pour `moveUp` :

<pre class="wp-code-highlight prettyprint">void BoardModel::moveUp() {
  board_.moveUp();
  emit dataChanged(createIndex(0, 0), createIndex(rowCount() - 1, 0));
}
</pre>

Et voilà, cela fonctionne ! Votre 2048 est utilisable !

&nbsp;

<img class="aligncenter" src="http://67.media.tumblr.com/f513096e2fceed09bb75c1575c765904/tumblr_inline_n48gbsuxvD1sv6muh.png" alt="" />

&nbsp;

Par contre je sais pas vous, mais je trouve que c&rsquo;est pas si génial. L&rsquo;un des points négatifs est qu&rsquo;on demande à rafraichir la vue même si le déplacement n&rsquo;a pas été possible. Bon ok, on pourrait regarder le retour de `board_.moveUp() `mais on peut faire autrement. Qui sait mieux que `Board` si les données ont changées
  
ou non ? Dans ce cas on peut laisser `Board` émettre un signal lorsque les données changent, et `BoardModel` va venir s&rsquo;enregistrer sur ce signal. Ainsi cela devient de plus en plus une sorte de proxy dédié à présenter notre modèle à
  
l&rsquo;interface et on supprime au maximum la logique qu&rsquo;il contient.

On va donc créer un signal dans `Board` et l&rsquo;émettre lorsque le déplacement a été effectué :

<pre class="wp-code-highlight prettyprint">// board.h
signals:
  void boardChangedAfterMovement();

// board.cpp
bool Board::move(Directions direction) {
  //...
  if (success) {
    addRandomTile();
    emit boardChangedAfterMovement();
  }
  //...
}
</pre>

Au niveau de `BoardModel` on va créer un slot `onDataChanged` qui va émettre le signal `dataChanged`. Et on va connecter le signal `boardChangedAfterMovement `de `Board` au slot créé.

<pre class="wp-code-highlight prettyprint">// boardmodel.h
public slots:
  void onDataChanged();

// boardmodel.cpp
BoardModel::BoardModel(QObject *parent) :
  QAbstractListModel(parent) {
  connect(&amp;board_, &amp;Board::boardChangedAfterMovement, this, &amp;BoardModel::onDataChanged);
}

void BoardModel::onDataChanged() {
  emit dataChanged(createIndex(0, 0), createIndex(rowCount() - 1, 0));
}
</pre>

Evidemment, les méthodes `move*` reviennent comme précédemment avec juste l&rsquo;appel à `board_`.

L&rsquo;avantage est qu&rsquo;on a vraiment un découplage entre l&rsquo;interface qui va aller lancer une exécution et le rafraichissement qui intervient ou non suivant le résultat de l&rsquo;action.

> git: tag <span style="text-decoration: underline;"><a href="https://github.com/sogilis/qt2048/tree/04_board_moves" target="_blank">04_board_moves</a></span>

**Yves**