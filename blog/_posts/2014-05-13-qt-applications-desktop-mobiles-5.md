---
title: Qt pour des applications desktop et mobiles simplement (5/7)
author: Yves
date: 2014-05-13T07:20:00+00:00
image: /img/2016-05-Sogilis-produits.png
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

### Score et status

Le plateau est là, le jeu fonctionne. Il serait sympa désormais d'afficher le score et l'état du jeu (gagné / perdu).

On va commencer par afficher deux composants textes qui vont contenir le résultat pour le premier et le score pour le deuxième. L'ensemble va être placé au dessus du plateau et les deux champs sur la même ligne. On va donc utiliser un `ColumnLayout` et un `RowLayout`.

Pour ça, commencez par ajouter `QtQuick.Layouts` à votre `qml` :

```cpp
import QtQtuick.Layouts 1.1
```

Puis les layouts et les champs textes :

```cpp
Rectangle {
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
```

Bon comme vous le voyez, rien de très spécial ici ça reste simple et logique.

Côté `C++` il faut pouvoir récupérer la valeur du score et celle des status.

La première idée est de créer une méthode (je le fais pour le score, vous le ferez pour le reste 😉 ) `score` qui va interroger `board_`.

```cpp
// boardmodel.h
public:
  int score() const;

// boardmodel.cpp
int BoardModel::score() const {
  return board_.score();
}
```

Si vous vous souvenez bien de l'étape précédente, les méthodes de déplacement avaient été préfixées de `Q_INVOKABLE`. Ici pas besoin, nous allons faire autrement et transformer le tout en une _propriété_. Une propriété va être accessible par le QML comme une variable (et non une méthode), et nous allons définir 4 choses :

- le nom de la variable avec son type
- la méthode à appeler pour lire la variable
- la méthode à appeler pour écrire la variable (optionnel)
- le signal utilisé comme notification de mise à jour de la valeur (comme le `dataChanged` vu précédemment)

Dans notre cas il n'y a pas de méthode d'écriture mais vous noterez que cela vous permet d'avoir un binding bi-directionnel, ce qui est quand même vraiment agréable.

On va donc appeler la variable `score`, son type est `int`, la méthode à appeler pour lire la valeur est `score` et comme signal on va faire original, `scoreChanged`.

```cpp
// boardmodel.h
class BoardModel : public QAbstractListModel
{
  Q_OBJECT
  Q_PROPERTY(int score READ score NOTIFY scoreChanged)

  //...

signals:
  void scoreChanged();

  //...
}
```

Et voilà, vous pouvez maintenant remplacer `"score"` dans votre fichier `qml`par `board.score`. Trop facile, non ?

Par contre, vous pouvez constater que la valeur ne change pas… en effet, comme avant, il faut émettre le signal lorsque la valeur change pour demander son rafraichissement. De la même manière, un signal va être émit par la classe `Board`lorsque le score change, et nous allons juste propager ce signal vers le signal `scoreChanged` que nous venons de créer.

```cpp
// board.h
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
  connect(&board_, &Board::boardChangedAfterMovement, this, &BoardModel::onDataChanged);
  connect(&board_, &Board::scoreChanged, this, &BoardModel::scoreChanged);
}
```

Et voilà, rien de plus à faire, ça fonctionne déjà ! Agréable, non ?

Je vous laisse faire la suite pour les états de jeux (gagné / perdu).

![](/img/tumblr_inline_n48gchB3dB1sv6muh.png)

> git: tag [05_score_statuses](https://github.com/sogilis/qt2048/tree/05_score_statuses)
