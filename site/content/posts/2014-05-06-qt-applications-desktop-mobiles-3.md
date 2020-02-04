---
title: Qt pour des applications desktop et mobiles simplement (3/7)
author: Yves
date: 2014-05-06T08:05:00+00:00
image: /img/2016-04-2.Formations-e1461591900149.jpg
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

## Interface QML <a id="interface"></a>

Maintenant que notre plateau de jeu est fonctionnel et que nous avons les actions de base, nous pouvons commencer à les afficher.

Comme indiqué, l'affichage va se faire en utilisant les possibilités de QML.

### Board <a id="board"></a>

##### Affichage du plateau <a id="display"></a>

Pour commencer en douceur, on peut modifier le fichier `qml` pour afficher une grille de 4 cases de côté. Et pour ça il convient d'utiliser un objet… `Grid`

{{< highlight cpp >}}
import QtQuick 2.2
import QtQuick.Window 2.1

Window {
    visible: true
    width: 360
    height: 360

    Grid {
        y: 10
        anchors.horizontalCenter: parent.horizontalCenter
        rows: 4
        columns: 4
        spacing: 10

        Repeater {
            model: 16
            delegate: Rectangle {
                width: 70
                height: 70
                color: "#cbbeb1"
                Text {
                    text: index
                }
            }
        }
    }
}
{{< /highlight >}}

Ceci devrait vous donner une grille de 4 cases de côté, avec dans chacune son indice.

![](/img/tumblr_inline_n48ga47MGG1sv6muh.png)

L'une des premières choses est qu'on voit qu'il va falloir linéariser les coordonnées. La grille veut un index entre 0 et 15, notre modèle veut un couple (0..3)(0..3).

Pour permettre à l'interface d'afficher les données nous allons créé un objet dédié à la gestion du modèle et qui, par un mécanisme de notifications, pourra mettre à jour l'interface au moindre changement dans les données.

Comme le modèle attendu est une liste de donnée nous allons dériver de `QAbstractListModel`et nous allons l'appeler `BoardModel`. Pour plus de détails sur le fonctionnement des abstract models, vous pouvez aller voir les pages sur le principe de [Model/View Programming](http://qt-project.org/doc/qt-5/model-view-programming.html)

Commencez donc par ajouter une classe `BoardModel` à votre projet, faites la hériter de `QAbstractListModel`.

![](/img/tumblr_inline_n48gaeKJZ01sv6muh.png)

Pour que cela fonctionne il faut rajouter deux choses, un compteur d'éléments et un accès à la donnée, et émettre un signal lorsque les données changent.

Mais avant cela, il faut juste déclarer notre plateau de jeu. Pour ce faire c'est simple, rajoutez un membre privé de type `Board`.

{{< highlight cpp >}}
private:
  Board board_;
{{< /highlight >}}

Maintenant, implémentez l'accès au compteur d'éléments.

Dans le `.h` :

{{< highlight cpp >}}
public:
  int rowCount(const QModelIndex &parent = QModelIndex()) const;
{{< /highlight >}}

Dans le `.cpp` :

{{< highlight cpp >}}
int BoardModel::rowCount(const QModelIndex &parent) const {
  Q_UNUSED(parent)

  return kSize * kSize;
}
{{< /highlight >}}

`kSize` est défini dans `board.h`. N'oubliez pas qu'on a linéarisé le plateau 😉

La deuxième méthode à implémenter est l'accès à une donnée en fonction de son index.

Dans le `.h`

{{< highlight cpp >}}
public:
  QVariant data(const QModelIndex &index, int role = Qt::DisplayRole) const;
{{< /highlight >}}

Vous noterez qu'il est question de _role_. Il s'agit d'un mécanisme permettant de demander différents types de valeurs pour une même donnée. Par exemple demander la valeur, la couleur et le libellé d'une donnée. Pour cet exemple je ne vais pas l'utiliser et demande donc simplement la valeur à afficher.

Voici l'implémentation :

{{< highlight cpp >}}
QVariant BoardModel::data(const QModelIndex &index, int role) const {
    t_index x, y;
    if (index.row() < 0 || index.row() >= kSize * kSize) {
        return QVariant();
    }
    if (role == Qt::DisplayRole) {
        x = index.row() % kSize;
        y = index.row() / kSize;
        QString str = QString::number(board_.get(x, y));
        return str;
    }
    return QVariant();
}
{{< /highlight >}}

Le fonctionnement est très simple, si l'index est hors des bornes ou que le rôle demandé n'est pas l'affichage je retourne un `QVariant` vide. Sinon je récupère les deux coordonnées à partir de l'indice et récupère la donnée depuis le plateau.

Ceci permet d'obtenir l'ensemble des valeurs à afficher. Il ne reste plus qu'à fournir une instance de ce `BoardModel` au fichier QML. Pour ça on va simplement passer une instance en tant que propriété de contexte de notre viewer de QML.

Rajouter dans le `main.cpp` (par exemple avant le `load`) :

{{< highlight cpp >}}
BoardModel board;
engine.rootContext()->setContextProperty("board", &board);
{{< /highlight >}}

> Il faudra évidemment inclure `boardmodel.h` mais aussi `<QtQml>` dans le `main.cpp`.

De cette façon nous pouvons accéder à notre objet via la variable `board` dans le QML. `board` devient donc le `model` de notre `Repeater` et la valeur à afficher devient `display` :

{{< highlight cpp >}}
import QtQuick 2.2
import QtQuick.Window 2.1

Window {
    visible: true
    width: 360
    height: 360

    Grid {
        y: 10
        anchors.horizontalCenter: parent.horizontalCenter
        rows: 4
        columns: 4
        spacing: 10

        Repeater {
            model: board
            delegate: Rectangle {
                width: 70
                height: 70
                color: "#cbbeb1"
                Text {
                    text: display
                }
            }
        }
    }
}
{{< /highlight >}}

Et voilà, votre plateau de jeu est affiché. Vous avez les 16 cases avec normalement deux cases qui ont 2 ou 4 dedans et les autres 0.

![](/img/tumblr_inline_n48gawrFT61sv6muh.png)

#### Un peu de style <a id="style"></a>

Bon par contre c'est pas super sexy pour le moment… on va donc y remédier rapidement.

Voici une petite liste d'améliorations possibles :

1. ne pas afficher les zéros dans les cases (dans le jeux 0 signifie qu'il n'y a pas de tuile)
2. centrer les nombres, grossir, etc
3. avoir une couleur différente de tuile selon la valeur
4. ajouter une couleur de fond

Pour réaliser tout cela on va découper l'interface en plusieurs composants QML. Il faut savoir que si vous créez un fichier `Tile.qml` (notez bien la majuscule au début du fichier…) vous pouvez alors utiliser un nouveau composant `Tile` comme si vous utilisiez un `Rectangle` ou `Text`.

On va donc justement extraire l'affichage d'une tuile et s'occuper des points `1.`, `2.` et `3.`.

1. Au lieu de directement afficher la valeur, on va utiliser une fonction javascript qui va nous retourner la valeur ou une chaine vide si la valeur est `0`.
2. Ça c'est juste du positionnement QML et un peu de style.
3. Une fonction javascript va prendre la valeur à afficher et retourner la couleur souhaitée en fonction.

Et comme nous allons réaliser cela dans un autre fichier, un autre composant, il va falloir faire un lien entre la valeur issue du modèle du `Repeater` (`display`) et une propriété du composant (que j'ai nommé `value`). Voici donc le fichier QML `Tile.qml`

{{< highlight cpp >}}
import QtQuick 2.2

Rectangle {
    id: tile
    property int tileWidth: 70
    property string value: ""

    // retourn une chaine vide si 0, sinon la valeur
    function valueToText(value) {
        if (parseInt(value, 10) === 0) {
            return "";
        }
        return value;
    }

    // retourne la couleur en fonction de la valeur
    function valueToColor(value) {
        var v = parseInt(value, 10);
        var color;
        switch(v) {
        case 2:
            color = "#eee4da";
            break;
        case 4:
            color = "#eae0c8";
            break;
        case 8:
            color = "#f59563";
            break;
        case 16:
            color = "#3399ff";
            break;
        case 32:
            color = "#ffa333";
            break;
        case 64:
            color = "#cef030";
            break;
        case 128:
            color = "#e8d8ce";
            break;
        case 256:
            color = "#990303";
            break;
        case 512:
            color = "#6ba5de";
            break;
        case 1024:
            color = "#dcad60";
            break;
        case 2048:
            color = "#b60022";
            break;
        default:
            color = "#cbbeb1";
        }

        return color;
    }

    function fontSize(value) {
        var v = parseInt(value, 10);
        if (v < 1024) {
            return tileWidth / 2.5;
        }
        return tileWidth / 3;
    }

    width: tileWidth
    height: tileWidth
    color: valueToColor(value)
    radius: tileWidth / 14

    Text {
        text: valueToText(value)
        font.pointSize: fontSize(value)
        anchors.centerIn: parent
        color: "black"
    }
}
{{< /highlight >}}

Vous noterez aussi deux petites choses :

- la taille de la police est fonction de la valeur
- la taille de la tuile est paramétrée (pour pouvoir, dans la suite, s'adapter à la taille de la zone affichée…)

Pour visualiser le rendu, vous pouvez passer par le menu `Outils/Externe/Qt Quick/Prévisualisation Qt Quick 2`ce qui ouvrira une fenêtre avec votre QML. Et vous pouvez aussi modifier les propriétés `tileWidth` et `value` pour voir les différents rendus.

Maintenant que nous avons notre tuile, il faut l'afficher dans le plateau. Rien de plus simple, remplacez juste l'élément `delegate` par votre tuile tout en affectant la propriété `value` :

{{< highlight cpp >}}
Repeater {
  model: board
  delegate: Tile {
    value: display
  }
}
{{< /highlight >}}

Pour ce qui est du point `4.`, je vous laisse définir la couleur de fond à `#baaa9e`.

Vous devriez alors avoir un résultat similaire au suivant :

![](/img/tumblr_inline_n48gbdabr71sv6muh.png)

Plutôt simple, non ?

> git: tag [03_board_with_tiles](https://github.com/sogilis/qt2048/tree/03_board_with_tiles)
