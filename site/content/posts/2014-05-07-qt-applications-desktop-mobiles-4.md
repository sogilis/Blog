---
title: Qt pour des applications desktop et mobiles simplement (4/7)
author: Yves
date: 2014-05-07T08:26:00+00:00
featured_image: /img/2014/08/Sogilis-Christophe-Levet-Photographe-7517.jpg
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

## Sommaire

- [L'application de base]({{< relref "posts/2014-04-29-qt-applications-desktop-mobiles-1.md#base-app" >}})
  - [Qt et application Qt Quick]({{< relref "posts/2014-04-29-qt-applications-desktop-mobiles-1.md#qt" >}})
    - [Prérequis]({{< relref "posts/2014-04-29-qt-applications-desktop-mobiles-1.md#req" >}})
    - [Créer un projet Qt Quick]({{< relref "posts/2014-04-29-qt-applications-desktop-mobiles-1.md#quick" >}})
    - [Découverte rapide]({{< relref "posts/2014-04-29-qt-applications-desktop-mobiles-1.md#discover" >}})
  - [2048]({{< relref "posts/2014-04-30-qt-applications-desktop-mobiles-2.md#2048" >}})
    - [2048.c]({{< relref "posts/2014-04-30-qt-applications-desktop-mobiles-2.md#c" >}})
    - [2048 en Qt]({{< relref "posts/2014-04-30-qt-applications-desktop-mobiles-2.md#qt" >}})
- [Interface QML]({{< relref "posts/2014-05-06-qt-applications-desktop-mobiles-3.md#interface" >}})
  - [Board]({{< relref "posts/2014-05-06-qt-applications-desktop-mobiles-3.md#board" >}})
    - [Affichage du plateau]({{< relref "posts/2014-05-06-qt-applications-desktop-mobiles-3.md#display" >}})
    - [Un peu de style]({{< relref "posts/2014-05-06-qt-applications-desktop-mobiles-3.md#style" >}})
    - [Déplacement et jeu]({{< ref "posts/2014-05-07-qt-applications-desktop-mobiles-4.md" >}})
  - [Score et status]({{< ref "posts/2014-05-13-qt-applications-desktop-mobiles-5.md" >}})
  - [Responsive design]({{< ref "posts/2014-05-14-qt-applications-desktop-mobiles-6.md" >}})
- [Et pour les mobiles]({{< relref "posts/2014-05-15-qt-applications-desktop-mobiles-7.md#mobile" >}})
  - [Gestures]({{< relref "posts/2014-05-15-qt-applications-desktop-mobiles-7.md#gestures" >}})
  - [iOS]({{< relref "posts/2014-05-15-qt-applications-desktop-mobiles-7.md#ios" >}})
  - [Android]({{< relref "posts/2014-05-15-qt-applications-desktop-mobiles-7.md#android" >}})
- [Fin ?]({{< relref "posts/2014-05-15-qt-applications-desktop-mobiles-7.md#end" >}})

#### Déplacement et jeu

Bon, c'est bien joli mais par contre ça serait plutôt cool de pouvoir jouer, non ?

Le fonctionnement est très simple. Il faut écouter le clavier et sur les touches correspondantes aux flèches exécuter les déplacements demandés.

Il faut définir un _handler_ sur l'évènement d'appuis de touche et tester la touche :

{{< highlight cpp >}}
Window {
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
{{< /highlight >}}

La propriété `focus` permet de donner le focus à l'item et donc d'écouter les entrées. Et comme il n'est pas possible de le faire au niveau de l'objet `Window`un `Rectangle` a été introduit en lui spécifiant de remplir tout le parent via `anchors.fill: parent`.

Jusque là c'était la partie la plus évidente. Par contre, comment appeler les méthodes `move{Up,Right,Down,Left}` de notre objet `C++` `Board` ?

Nous allons utiliser l'objet `BoardModel` qui existe déjà (oui c'est pas forcément la meilleure architecture mais pour comprendre les concepts c'est pas mal) et lui ajouter les méthodes correspondantes. Mais ça ne suffit pas pour les appeler depuis le QML. Pour ce faire il faut les rendre invocables, via la macro `Q_INVOKABLE` :

{{< highlight cpp >}}
// BoardModel.h
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
{{< /highlight >}}

Dans ce cas, vous pouvez remplir le `switch` avec les appels, par exemple `board.moveLeft();`

Si vous exécutez le programme, vous verrez… qu'il ne se passe rien. Et pourtant, pas de bugs à l'horizon. Si vous tracez le code vous verrez même que le déplacement est bien effectué dans la classe `Board`. Mais alors on aurait oublié quelque chose ?

Et oui, car le principe de QML est entre autre de reposer sur l'excellent système des signaux/slots de Qt. Si rien ne se passe c'est en réalité juste que vous ne voyez rien, que la vue n'est pas rafraichie. Et pour la rafraichir il suffit de notifier que la donnée a changée en utilisant un signal, logique non ?

Bon, la première implémentation naïve est d'émettre le signal `dataChanged` depuis les méthodes `move*` de `BoardModel`. Par exemple pour `moveUp` :

{{< highlight cpp >}}
void BoardModel::moveUp() {
  board_.moveUp();
  emit dataChanged(createIndex(0, 0), createIndex(rowCount() - 1, 0));
}
{{< /highlight >}}

Et voilà, cela fonctionne ! Votre 2048 est utilisable !

![](/img/tumblr/tumblr_inline_n48gbsuxvD1sv6muh.png)

Par contre je sais pas vous, mais je trouve que c'est pas si génial. L'un des points négatifs est qu'on demande à rafraichir la vue même si le déplacement n'a pas été possible. Bon ok, on pourrait regarder le retour de `board_.moveUp()`mais on peut faire autrement. Qui sait mieux que `Board` si les données ont changées ou non ? Dans ce cas on peut laisser `Board` émettre un signal lorsque les données changent, et `BoardModel` va venir s'enregistrer sur ce signal. Ainsi cela devient de plus en plus une sorte de proxy dédié à présenter notre modèle à l'interface et on supprime au maximum la logique qu'il contient.

On va donc créer un signal dans `Board` et l'émettre lorsque le déplacement a été effectué :

{{< highlight cpp >}}
// board.h
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
{{< /highlight >}}

Au niveau de `BoardModel` on va créer un slot `onDataChanged` qui va émettre le signal `dataChanged`. Et on va connecter le signal `boardChangedAfterMovement`de `Board` au slot créé.

{{< highlight cpp >}}
// boardmodel.h
public slots:
  void onDataChanged();

// boardmodel.cpp
BoardModel::BoardModel(QObject *parent) :
  QAbstractListModel(parent) {
  connect(&board_, &Board::boardChangedAfterMovement, this, &BoardModel::onDataChanged);
}

void BoardModel::onDataChanged() {
  emit dataChanged(createIndex(0, 0), createIndex(rowCount() - 1, 0));
}
{{< /highlight >}}

Evidemment, les méthodes `move*` reviennent comme précédemment avec juste l'appel à `board_`.

L'avantage est qu'on a vraiment un découplage entre l'interface qui va aller lancer une exécution et le rafraichissement qui intervient ou non suivant le résultat de l'action.

> git: tag [04_board_moves](https://github.com/sogilis/qt2048/tree/04_board_moves)