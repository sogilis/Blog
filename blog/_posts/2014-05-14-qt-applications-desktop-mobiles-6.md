---
title: Qt pour des applications desktop et mobiles simplement (6/7)
author: Yves
date: 2014-05-14T07:54:00+00:00
image: /img/2015-03-Sogilis-Christophe-Levet-Photographe-7461.jpg
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

### Responsive design

Maintenant que nous avons une application fonctionnelle, on peut imaginer aller un peu plus loin et exploiter les possibilités de QML.

Par exemple il est possible de rentre l'ensemble de notre interface proportionnelle à la zone affichée. Ainsi lorsque vous redimensionnez la fenêtre votre jeu occupe toujours l'espace disponible. Finalement c'est un peu comme faire une interface vectorielle.

Lorsque nous avons créé l'objet QML `Tile`, nous avons laissé la possibilité de paramétrer la taille d'une tuile avec la propriété `tileWidth`. Et la taille du texte dans la tuile est également fonction de cette propriété. Si nous la faisons varier (en lui affectant non plus une valeur mais une fonction) alors l'ensemble pourra varier également.

De la même manière il est possible de remplacer les valeurs en dur (police, grille) au niveau du `mail.qml`.

Par exemple, pour faire varier la taille du texte du status et du score, remplaçons l'actuel.

```cpp
font.pointSize: 30
```

par

```cpp
font.pointSize: Math.min(main.width, main.height) / 12
```

Et pour que cela fonctionne, il faut rajouter `main` comme `id` à notre `Window`.

Ainsi, lorsque la hauteur ou largeur de la fenêtre changera, la taille du texte sera modifiée en conséquence.

Pour le plateau, nous allons faire quasiment la même chose :

```cpp
Rectangle {
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
```

Vous noterez juste que j'ai introduit un nouveau `Rectangle`. Celui-ci occupe toute la place disponible (via `Layout.fillWidth` et `Layout.fillHeight`) et permet surtout de très facilement centrer horizontalement le plateau.

![](/img/tumblr_inline_n48gcutXVJ1sv6muh.png)

> git: tag [06_responsive](https://github.com/sogilis/qt2048/tree/06_responsive)
