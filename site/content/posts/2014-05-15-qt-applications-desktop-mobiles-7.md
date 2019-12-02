---
title: Qt pour des applications desktop et mobiles simplement (7/7)
author: Yves
date: 2014-05-15T07:42:00+00:00
image: /img/2016/04/1.Design.jpg
categories:
  - DÉVELOPPEMENT
tags:
  - c++
  - mobile
  - qt
  - qt quick
---

Suite et fin de la découverte de la programmation desktop et mobile avec Qt.

# Sommaire

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

# Et pour les mobiles ? <a id="mobile"></a>

L'application est désormais pleinement fonctionnelle. Ok on pourrait rajouter des choses, comme un menu lorsqu'on gagne / perd. Mais le but n'est pas de partir dans l'exploration de tout ce qui est possible en QML. Rappelez vous, on devait parler de mobile non ?

Voici donc comment transformer votre application _desktop_ en une application mobile.

## Gestures <a id="gestures"></a>

L'un des premiers points si on parle de mobile est de se poser des questions (en tout cas sur une application du genre) sur la joueabilité. Pour le moment nous utilisons le clavier. Mais sur mobile ? Nous allons simplement utiliser les évênements de _souris_. Pour cette application pas besoin de multi-touch, gérer les glissement est suffisant. Et comme Qt c'est cool, on va faire tout ça uniquement dans le QML. C'est plutôt un bon point car il est possible d'utiliser du JavaScript et non du C++ mais aussi car on garde notre code métier indépendant le plus possible de l'implémentation de l'interface.

Pour pouvoir récupérer les évênements nous allons rajouter un objet `MouseArea`. C'est un objet transparent destiné à recevoir les actions de la souris (ou de votre doigt, finalement les actions d'un pointeur).

On va donc faire que cet objet recouvre toute notre application et traque les glissements suivant les quatres directions souhaitées. Et une fois un glissement détecté, nous allons appeler, comme pour le clavier, `board.moveUp();`, `board.moveRight();` etc.

Voici le code qui a été ajouté à la vue :

{{< highlight cpp >}}
property int gesture_swipeLeft: 0;
property int gesture_swipeRight: 1;
property int gesture_swipeUp: 2;
property int gesture_swipeDown: 3;

function getGesture(startX, startY, endX, endY, areaWidth, areaHeight) {
  var deltaX = endX - startX;
  var right = deltaX > 0;
  var moveX = Math.abs(deltaX);

  var deltaY = endY - startY;
  var down = deltaY > 0;
  var moveY = Math.abs(deltaY);

  var minimumFactor = 0.25;

  var relativeHorizontal = moveX / areaWidth;
  var relativeVertical = moveY / areaHeight;

  if (relativeHorizontal < minimumFactor &&
      relativeVertical < minimumFactor) {
    return;
  }

  var horizontal = relativeHorizontal > relativeVertical;

  if (horizontal) {
    if (right) {
      return gesture_swipeRight;
    }
    return gesture_swipeLeft;
  }
  if (down) {
    return gesture_swipeDown;
  }
  return gesture_swipeUp;
}

MouseArea {
  id: mouseArea
  anchors.fill: parent

  property int startX: 0
  property int startY: 0

  onPressed: {
    startX = mouseX;
    startY = mouseY;
  }

  onReleased: {
    var gesture = getGesture(startX, startY,
                             mouseX, mouseY,
                             mouseArea.width, mouseArea.height);
    switch(gesture) {
    case gesture_swipeUp:
      board.moveUp();
      break;
    case gesture_swipeRight:
      board.moveRight();
      break;
    case gesture_swipeDown:
      board.moveDown();
      break;
    case gesture_swipeLeft:
      board.moveLeft();
      break;
    }
  }
}
{{< /highlight >}}

Petite explication de texte. Lors de l'appui sur la zone je garde en mémoire les coordonnées. Lors du relachement je calcule l'action réalisée (est-ce qu'il s'agit d'un glissement suffisant, ici 25% de l'écran, et si oui dans quelle direction).

Ce calcul est extrait dans une méthode dédié pour plus de lisibilité. Enfin, en fonction du type de déplacement je commande le plateau de jeu comme réalisé au clavier.

Et tout ceci est à ajouter à la fin de l'objet `Window`. Alors, plutôt simple non ?

> git: [tag 07_gestures](https://github.com/sogilis/qt2048/tree/07_gestures)

Ce qui est plutôt intéressant également est que vous noterez qu'il n'y a aucun code spécifique à une plateforme mobile… Vous pouvez donc le tester tout de suite sans déployer sur un mobile.

## iOS <a id="ios"></a>

La première chose à faire pour pouvoir tester sous iOS est d'installer le kit correspondant.

Rendez-vous dans la vue _Projets_ de QtCreator et ajoutez le kit correspondant. Si vous avez fait une installation avec une version Android + iOS vous devriez avoir au moins deux kits Android et deux kits iOS. Sélectionnez le kit `iphonesimulator-clang` qui vous permettra d'exécuter dans le simulator d'iOS fourni par XCode. Pour pouvoir faire la même chose sur un matériel Apple, il vous faudra le certificat de développeur pour signer votre code.

![](/img/tumblr/tumblr_inline_n48gd62cYl1sv6muh.png)

> oui j'ai des kits 5.2.1 + 5.3.0 beta

Si vous le souhaitez, vous pouvez (dans la partie _Exécuter_) sélectionner le type de machine que vous souhaitez émuler, j'ai pris un iPad pour voir.

Et ensuite ?

Il vous reste juste à exécuter votre application en choisissant la bonne cible.

![](/img/tumblr/tumblr_inline_n48gdd2NyQ1sv6muh.png)

Alors, ce n'était pas si compliqué, non ?

![](/img/tumblr/tumblr_inline_n48gdo5kkP1sv6muh.png)

Vous noterez donc qu'il n'y a eu absolument aucune modification au niveau des sources, juste une recompliation. Et là vous pouvez vraiment commencer à profiter de Qt et QML sachant que cela va fonctionner quelque soit la destination !

## Android <a id="android"></a>

Sous Android ? En fait c'est quasiment comme sous iOS.

Mais il va falloir installer / configurer vos SDK et NDK android. Allez dans les préférences et pointez votre SDK et NDK. Et commez Qt est sympa il vous aide même à les télécharger si besoin.

Il vous faut aussi un JDK.

> Tip : Sous Mac le chemin par défaut est faux, il faut mettre `/System/Library/Java/JavaVirtualMachines/1.6.0.jdk/Contents/Home`

Ainsi que ant.

![](/img/tumblr/tumblr_inline_n48gdvtyai1sv6muh.png)

Vous pouvez directement lancer _AVD Manager_ et gérer vos simulateurs ou le faire lors de l'exécution de votre projet.

Sélectionnez ensuite le kit correspondant dans votre projet : `Android pour armeabi-v7a`et exécutez-le.

Il va vous proposer les simulateurs ou matériels android connectés correspondant à votre version d'ABI :

![](/img/tumblr/tumblr_inline_n48ges1Zyn1sv6muh.png)

Si jamais les devices que vous voyez sont tous en non compatible c'est probablement que vous n'êtes pas en Qt Creator 3.1.0. Dans ce cas, dans l’_environnement de compilation_ du kit rajoutez la variable d'environnement suivante :

{{< highlight cpp >}}
ANDROID_TARGET_ARCH=default/armeabi-v7a
{{< /highlight >}}

En effet, dans les SDK précédents l'architecture cible était `armeabi-v7a`, désormais c'est `default/armeabi-v7a` et les anciennes versions de Qt Creator se trompaient donc dans le test.

Il ne vous reste plus qu'à sélectionné le matériel/simulateur que vous voulez et cliquer sur `ok`. Et attendre que Android se lance aussi…

![](/img/tumblr/tumblr_inline_n48gegRF0Y1sv6muh.png)

# Fin ? <a id="end"></a>

Voici, avec un petit exemple assez simple, comment développer une application vraiment multi plateforme, que ce soit pour Windows, Mac et Linux (même si ça n'a pas vraiment été évoqué ici) mais surtout iOS et Android.

Surtout, ce qui est tout de même assez bluffant, c'est qu'il n'y a eu aucune modification de réalisée pour que cela fonctionne partout. Enfin à part le fait de gérer les déplacement par la souris (mais qui n'est pas spécifique au mobile), si on avait placé quatre boutons il n'y aurait pas eu du tout de modifications.

Pour aller plus loin il serait intéressant de continuer à manipuler l'interface. L'interface réalisée permet d'être adaptable aux dimensions de l'écran. Ce qui serait encore mieux serait que l'interface s'adapte parfaitement à l'orientation de l'écran. Par exemple lorsqu'on passe en paysage il faudrait que le score et le statut soit sur un côté du plateau de jeu et non au dessus, afin d'avoir le plateau le plus grand possible. Ceci est envisageable en modifiant les ancres des objets de l'interface en fonction de l'orientation, que l'ont peut récupérer via un objet `Screen`

Au final il est donc possible d'envisager le développement d'applications bureau et mobiles avec un surcoût relativement faible et surtout sans avoir besoin de coder trois fois (ou plus) la même application, ce qui outre la perte de temps serait aussi prendre des risques en terme de fiabilité (trois fois plus de code à maintenir par exemple).

![](/img/tumblr/tumblr_inline_n48gf2wObf1sv6muh.png)
