---
title: Qt pour des applications desktop et mobiles simplement (4/7)
author: Yves
date: 2014-05-07T08:26:00+00:00
image: /img/2014-08-Sogilis-Christophe-Levet-Photographe-7517.jpg
categories:
  - Développement logiciel
tags:
  - c++
  - mobile
  - qt
  - qt quick
---

Suite de la découverte de la programmation desktop et mobile avec Qt.

## Sommaire

- [L'application de base](./2014-04-29-qt-applications-desktop-mobiles-1.md#base-app)
  - [Qt et application Qt Quick](./2014-04-29-qt-applications-desktop-mobiles-1.md#qt)
    - [Prérequis](./2014-04-29-qt-applications-desktop-mobiles-1.md#req)
    - [Créer un projet Qt Quick](./2014-04-29-qt-applications-desktop-mobiles-1.md#quick)
    - [Découverte rapide](./2014-04-29-qt-applications-desktop-mobiles-1.md#discover)
  - [2048](./2014-04-30-qt-applications-desktop-mobiles-2.md#2048)
    - [2048.c](./2014-04-30-qt-applications-desktop-mobiles-2.md#c)
    - [2048 en Qt](./2014-04-30-qt-applications-desktop-mobiles-2.md#qt)
- [Interface QML](./2014-05-06-qt-applications-desktop-mobiles-3.md#interface)
  - [Board](./2014-05-06-qt-applications-desktop-mobiles-3.md#board)
    - [Affichage du plateau](./2014-05-06-qt-applications-desktop-mobiles-3.md#display)
    - [Un peu de style](./2014-05-06-qt-applications-desktop-mobiles-3.md#style)
    - [Déplacement et jeu](./2014-05-07-qt-applications-desktop-mobiles-4.md)
  - [Score et status](./2014-05-13-qt-applications-desktop-mobiles-5.md)
  - [Responsive design](./2014-05-14-qt-applications-desktop-mobiles-6.md)
- [Et pour les mobiles](./2014-05-15-qt-applications-desktop-mobiles-7.md#mobile)
  - [Gestures](./2014-05-15-qt-applications-desktop-mobiles-7.md#gestures)
  - [iOS](./2014-05-15-qt-applications-desktop-mobiles-7.md#ios)
  - [Android](./2014-05-15-qt-applications-desktop-mobiles-7.md#android)
- [Fin ?](./2014-05-15-qt-applications-desktop-mobiles-7.md#end)

#### Déplacement et jeu

Bon, c'est bien joli mais par contre ça serait plutôt cool de pouvoir jouer, non ?

Le fonctionnement est très simple. Il faut écouter le clavier et sur les touches correspondantes aux flèches exécuter les déplacements demandés.

Il faut définir un _handler_ sur l'évènement d'appuis de touche et tester la touche :

```cpp
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
```

La propriété `focus` permet de donner le focus à l'item et donc d'écouter les entrées. Et comme il n'est pas possible de le faire au niveau de l'objet `Window`un `Rectangle` a été introduit en lui spécifiant de remplir tout le parent via `anchors.fill: parent`.

Jusque là c'était la partie la plus évidente. Par contre, comment appeler les méthodes `move{Up,Right,Down,Left}` de notre objet `C++` `Board` ?

Nous allons utiliser l'objet `BoardModel` qui existe déjà (oui c'est pas forcément la meilleure architecture mais pour comprendre les concepts c'est pas mal) et lui ajouter les méthodes correspondantes. Mais ça ne suffit pas pour les appeler depuis le QML. Pour ce faire il faut les rendre invocables, via la macro `Q_INVOKABLE` :

```cpp
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
```

Dans ce cas, vous pouvez remplir le `switch` avec les appels, par exemple `board.moveLeft();`

Si vous exécutez le programme, vous verrez… qu'il ne se passe rien. Et pourtant, pas de bugs à l'horizon. Si vous tracez le code vous verrez même que le déplacement est bien effectué dans la classe `Board`. Mais alors on aurait oublié quelque chose ?

Et oui, car le principe de QML est entre autre de reposer sur l'excellent système des signaux/slots de Qt. Si rien ne se passe c'est en réalité juste que vous ne voyez rien, que la vue n'est pas rafraichie. Et pour la rafraichir il suffit de notifier que la donnée a changée en utilisant un signal, logique non ?

Bon, la première implémentation naïve est d'émettre le signal `dataChanged` depuis les méthodes `move*` de `BoardModel`. Par exemple pour `moveUp` :

```cpp
void BoardModel::moveUp() {
  board_.moveUp();
  emit dataChanged(createIndex(0, 0), createIndex(rowCount() - 1, 0));
}
```

Et voilà, cela fonctionne ! Votre 2048 est utilisable !

![](/img/tumblr_inline_n48gbsuxvD1sv6muh.png)

Par contre je sais pas vous, mais je trouve que c'est pas si génial. L'un des points négatifs est qu'on demande à rafraichir la vue même si le déplacement n'a pas été possible. Bon ok, on pourrait regarder le retour de `board_.moveUp()`mais on peut faire autrement. Qui sait mieux que `Board` si les données ont changées ou non ? Dans ce cas on peut laisser `Board` émettre un signal lorsque les données changent, et `BoardModel` va venir s'enregistrer sur ce signal. Ainsi cela devient de plus en plus une sorte de proxy dédié à présenter notre modèle à l'interface et on supprime au maximum la logique qu'il contient.

On va donc créer un signal dans `Board` et l'émettre lorsque le déplacement a été effectué :

```cpp
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
```

Au niveau de `BoardModel` on va créer un slot `onDataChanged` qui va émettre le signal `dataChanged`. Et on va connecter le signal `boardChangedAfterMovement`de `Board` au slot créé.

```cpp
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
```

Evidemment, les méthodes `move*` reviennent comme précédemment avec juste l'appel à `board_`.

L'avantage est qu'on a vraiment un découplage entre l'interface qui va aller lancer une exécution et le rafraichissement qui intervient ou non suivant le résultat de l'action.

> git: tag [04_board_moves](https://github.com/sogilis/qt2048/tree/04_board_moves)
