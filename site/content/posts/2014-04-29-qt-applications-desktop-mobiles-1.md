---
title: Qt pour des applications desktop et mobiles simplement (1/7)
author: Yves
date: 2014-04-29T08:47:00+00:00
featured_image: /img/2015/03/Sogilis-Christophe-Levet-Photographe-7503.jpg
categories:
  - DÉVELOPPEMENT
tags:
  - c++
  - mobile
  - qt
  - qt quick
---

Chez [Sogilis](https://sogilis.fr), on aime bien les technologies qui nous rendent productif et qui nous permettent de se concentrer sur ce qui a vraiment de la valeur : la qualité de nos logiciels.

Certains de nos logiciels (par exemple dans le domaine médical) utilisent [Qt](http://qt-project.org).

Pour le moment les développements effectués utilisaient la bonne vieille interface de Qt. Faut dire que c'est plutôt intéressant, le rendu est bon sur les différents desktops, le designer est assez bien fait. Bref ça fonctionne bien.

Mais… (car il y a toujours un mais)

… il y a QtQuick !

Bon je vais pas vous faire une intro totale à QtQuick, vous trouverez par exemple pas mal d'informations sur le [wiki de Qt](http://qt-project.org/wiki/Qt_Quick).

Pour faire très simple c'est un framework permettant de créer des interfaces très personnalisables et dynamiques (contrairement aux widgets classiques) basées sur un langage déclaratif, `QML` qui ressemble un peu (de loin les yeux fermés dans le brouillard) à du json et dans lequel on peut injecter du javascript.

Dit comme ça c'est très web comme techno, et c'est pas faux.

![](/img/tumblr/tumblr_inline_n48g7nAIuG1sv6muh.jpg)

L'avantage c'est que le langage est facile, l'ajout de javascript permet de facilement gérer l'interactivité de l'interface (beaucoup plus facilement qu'en `C++`…) et pour ceux qui veulent il y a même un designer de fourni dans QtCreator. L'ensemble fait que la création d'interface peut aussi être assez facilement confiée à un designer ce qui est très sympa pour produire des applications desktop (ou mobiles) avec un bon niveau ergonomique et graphique. Disons que c'est du même niveau de complexité (peut-être même moins du fait de la richesse de certains composants) qu'une interface web et dans tous les cas c'est beaucoup plus simple que si on demandait de faire une interface à base de widgets (dès qu'on sort des composants de base ou qu'on souhaite mieux gérer le placement).

Et surtout, comme on est toujours en réalité dans Qt, cela n'empêche en rien d'avoir un cœur applicatif en `C++`.

Allez non, en fait il reste un dernier point intéressant : QtMobile. Il est aujourd'hui possible d'exécuter la même application que ce soit sur un ordinateur “classique” (mac, linux, windows) ou sur un smartphone ou une tablette (android, iOS). Et là ça en devient presque magique : plus besoin de redévelopper trois fois (ou plus) la même application pour l'utiliser partout !

Et c'est donc tout cela que nous allons voir dans cette série d'articles :

- créer une application avec un cœur applicatif en `C++
`
- avoir une interface en QML et voir la liaison entre ces deux parties (initialement l'objectif portait surtout sur ce point mais ça a un peu dérivé ;-))
- l'exécuter partout !

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

## L'application de base <a id="base-app"></a>

Pour explorer ces technologies, il fallait un exemple simple (le but n'est pas d'avoir une grande complexité métier) pour lequel on peut découpler interface et métier, qui soit intéressant aussi bien sur desktop que mobile. Ha oui, et fun aussi !

D'où l'intérêt de partir sur un 2048 (il parait que c'est à la mode…).

### Qt et application Qt Quick <a id="qt"></a>

#### Prérequis <a id="req"></a>

Pour commencer, si ce n'est pas déjà fait allez récupérer un Qt. Pour ma part j'ai utilisé un [Qt 5.3.0 beta](http://download.qt-project.org/development_releases/qt/5.3/5.3.0-beta/).

Si vous les souhaitez cela doit fonctionner aussi avec un Qt 5.2.1.

Attention il y a plusieurs versions différentes. Entre autre, si vous souhaitez pouvoir aller jusqu'au bout des articles, il vous faudra un mac et prendre la version _Qt 5.3.0 for Android and iOS (Mac)_. Sinon, vous pouvez vous contenter d'une version avec Android si vous êtes sous linux ou windows.

Ah oui, prenez votre temps, la version Android + iOS ça fait presque 1GB…

J'ai aussi utilisé [Qt Creator 3.1.0](https://qt-project.org/downloads#qt-creator).

Et d'ailleurs pour en rajouter, si vous êtes sous mac il vous faut xcode…

Bon je présupose dans la suite que vous avez réussi à l'installer, que vous savez lancer QtCreator et que vous avez des bases (pas besoin de choses très complexes) de `C++` voir si possible de `Qt`.

#### Créer un projet Qt Quick <a id="quick"></a>

Allez c'est parti, comme un tuto classique : création du projet :

![](/img/tumblr/tumblr_inline_n48ggyrfGl1sv6muh.png)

Pour ma part je l'ai appelé qt2048. Veillez juste à ne **surtout pas** l'appeler `2048`. Certains on essayé, ils ont eu mal ! Plus sérieusement, ça rend l'application inutilisable sous Android… mais l'erreur n'est pas toujours évidente à trouver.

![](/img/tumblr/tumblr_inline_n48g88Z2E41sv6muh.png)

Choisissez un ensemble de composant `Qt Quick 2.2` (si vous êtes sous Qt 5.2.1 utilisez un `Qt Quick 2.0` mais il y aura quelques ajustement à réaliser).

![](/img/tumblr/tumblr_inline_n4flfbB8PI1sv6muh.png)

Vient ensuite le moment de la sélection des Kits. Les kits représentent les types de compilations possibles. Par exemple vous pouvez faire une application `Qt4` et `Qt5`, etc. Si vous avez bien installé un _Qt for Android and iOS_ vous devriez avoir 3 kits pour Android (`armeabi`, `armeabi-v7a`, `x86`), 1 kit desktop (`clang 64bit` sous mac) et 2 kits pour iOS (un pour un iOS réel, un pour le simulateur).

Pour débuter je ne sélectionne que le kit desktop. Pourquoi ? Simplement car dans un premier temps je me concentre sur mon application et seulement à la fin je vais gérer les mobiles. Et c'est d'ailleurs un point qui est vraiment intéressant, il n'est pas nécessaire de partir dans un développement orienté mobile pour que cela fonctionne.

![](/img/tumblr/tumblr_inline_n4fqp7Lh6w1sv6muh.png)

Si vous le souhaitez vous pouvez tout mettre dans un dépôt git (ça peut être une bonne idée mine de rien…).

Vous trouverez d'ailleurs l'ensemble des sources liées à ces articles dans le dépôt Git suivant : [sogilis/qt2048](https://github.com/sogilis/qt2048) (les différentes étapes seront signalées dans l'article et correspondent à des tags dans le dépôt).

> _Astuce :_ ajoutez tout de suite un fichier `.gitignore` contenant `*.pro.user` pour ne pas versionner ce fichier.

#### Découverte rapide <a id="discover"></a>

Voici donc les fichiers que vous devriez avoir :

![](/img/tumblr/tumblr_inline_n4fqp7Lh6w1sv6muh.png)

Le fichier `main.cpp` doit ressembler à cela :

{{< highlight cpp >}}
#include <QGuiApplication>
#include <QQmlApplicationEngine>

int main(int argc, char \*argv[])
{
  QGuiApplication app(argc, argv);
  
  QQmlApplicationEngine engine;
  engine.load(QUrl(QStringLiteral("qrc:///main.qml")));
  
  return app.exec();
}
{{< /highlight >}}

En gros, il instancie une application Qml et charge un fichier qml représentant notre interface.

Le fichier `main.qml` contient lui notre interface :

import QtQuick 2.2

import QtQuick.Window 2.1

{{< highlight cpp >}}
Window {
  visible: true
  width: 360
  height: 360

  MouseArea {
    anchors.fill: parent
    onClicked: {
      Qt.quit();
    }
  }

  Text {
    text: qsTr("Hello World")
    anchors.centerIn: parent
  }
}
{{< /highlight >}}

Comme vous pouvez le voir c'est plutôt très lisible et compréhensible : un rectangle est dessiné et contient le texte _“Hello World”_. Une zone de capture des évènements de la souris est placée et qui lorsqu'on clique dedans ferme la fenêtre.

Bon je ne rentre pas dans tous les détails d'ancres et autres vous trouverez pour le coup de nombreuses ressources sur le sujet.

Un `cmd+r` plus tard et vous pouvez voir la fenêtre s'afficher et se fermer lors du clic (oui les raccourcis sont pour mac, mais vous pouvez toujours passer par les menus ou le bouton dans la barre de gauche).

Et voilà, vous avez votre première application Qt Quick qui fonctionne. Passons aux choses sérieuses… dans la deuxième partie consacrée au 2048 !

> git: tag [O1_project_creation](https://github.com/sogilis/qt2048/tree/O1_project_creation)
