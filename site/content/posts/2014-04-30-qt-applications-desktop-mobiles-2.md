---
title: Qt pour des applications desktop et mobiles simplement (2/7)
author: Yves
date: 2014-04-30T08:12:00+00:00
image: /img/2014-04-Sogilis-Christophe-Levet-Photographe-7433.jpg
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

### 2048 <a id="2048"></a>

Maintenant que notre application QtQuick fonctionne intéressons nous à notre 2048.

#### 2048.c <a id="c"></a>

Le but étant d'explorer des technologies, pas de développer un jeu, je me suis donc basé sur une implémentation du 2048 en `c` que vous pouvez [trouver ici](https://github.com/mevdschee/2048.c).

C'est une implémentation en console pour Linux. Bon ça fonctionne aussi sous mac 😉

Le code est relativement simple, il y a une matrice 4*4 qui représente le plateau. Les mouvements sont simplifiés puisque seul le mouvement vers le haut est implémenté. Les autres mouvements sont une combinaison de rotation vers la droite et de déplacement vers le haut (une rotation, un déplacement, 3 rotations donne un déplacement vers la gauche par exemple).

J'ai gardé les principes de base, juste quelques petites modifications mineurs entre autre au niveau de ces déplacements.

#### 2048 en Qt <a id="qt"></a>

J'ai donc ajouté une classe `Board` qui hérite de `QObject`. Il est bienvenue d'hériter de `QObject` car ça apporte plein de choses, comme les signaux et slots.

Voici le _header_ de cette classe.

{{< highlight cpp >}}
#ifndef BOARD_H
#define BOARD_H

#include <QObject>
#include <QStringList>

typedef int8_t t_index;
typedef uint16_t t_value;
typedef uint32_t t_score;
static const t_index kSize = 4;
static const t_value kValueOfLastTile = 2048;

class Board : public QObject {
    Q_OBJECT

public:
    explicit Board(QObject *parent = 0);

    void print() const;

    bool moveUp();
    bool moveRight();
    bool moveDown();
    bool moveLeft();

    t_value get(const t_index x, const t_index y) const;
    t_score score() const;
    bool gameEnded();
    bool win();

signals:

public slots:

private:
    t_value board_[kSize][kSize];
    t_score score_;
    t_value higherTile_;

    enum Directions {
        Up = 0,
        Left,
        Down,
        Right
    };

    void initGame();
    void initRand();
    t_value nextTileValue() const;
    void addRandomTile();

    bool move(Directions direction);
    bool moveTilesUpwards();
    void waitAndAddTile();

    void rotateToRight();
    bool slide(t_value array[kSize]);
    t_index findTarget(t_value array[kSize], const t_index pos, const t_index stop) const;
    bool findPairDown() const;
    t_value countEmpty() const;
};

#endif // BOARD_H
{{< /highlight >}}

Au niveau des méthodes publiques rien de très complexe :

- une méthode qui affiche dans la console le contenu du plateau
- quatre méthodes de déplacement
- une méthode pour récupérer la valeur d'une case (tuile) en fonction des coordonnées
- une méthode pour récupérer le score
- deux méthodes pour savoir si le jeux est fini et si on a gagné
- une méthode d'init

Je ne détaille pas vraiment les méthodes privées ni l'implémentation, ce n'est pas tellement le sujet et github est là.

Juste histoire de voir que tout fonctionne bien j'ai changé le `main` comme suit :

{{< highlight cpp >}}
int main(int argc, char *argv[])
{
    Q_UNUSED(argc)
    Q_UNUSED(argv)

    Board board;
    board.print();
    board.moveUp();
    board.print();
    board.moveRight();
    board.print();
    board.moveUp();
    board.print();
    board.moveRight();
    board.print();

    return 0;
}
{{< /highlight >}}

C'est pas super beau mais ça permet de se rendre compte que oui ça fonctionne.

**Apparté C++11**

Petit apparté rapide. Normalement vous devriez avoir un warning du genre :

> /Users/yves/Projects/Qt/qt2048/board.cpp:93: avertissement : ‘auto’ type specifier is a C++11 extension [-Wc++11-extensions] auto time = QTime::currentTime(); ^

C'est normal, j'utilise `auto` qui vient de `C++11`. Il faut donc l'activer dans le fichier `qt2048.pro` :

{{< highlight cpp >}}
CONFIG+=c++11
{{< /highlight >}}

