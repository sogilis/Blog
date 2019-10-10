---
title: Qt pour des applications desktop et mobiles simplement (7/7)
author: Tiphaine
date: 2014-05-15T07:42:00+00:00
featured_image: /wp-content/uploads/2016/04/1.Design.jpg
tumblr_sogilisblog_permalink:
  - http://sogilisblog.tumblr.com/post/85801901176/qt-pour-des-applications-desktop-et-mobiles-partie-7
tumblr_sogilisblog_id:
  - 85801901176
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
  - 3552
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
Suite et fin de la découverte de la programmation desktop et mobile avec Qt.

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

## **Et pour les mobiles ?**

<!-- more -->

L&rsquo;application est désormais pleinement fonctionnelle. Ok on pourrait rajouter des choses, comme un menu lorsqu&rsquo;on gagne / perd. Mais le but n&rsquo;est pas de partir dans l&rsquo;exploration de tout ce qui est possible en QML. Rappelez vous, on devait parler de mobile non ?

Voici donc comment transformer votre application _desktop_ en une application mobile.

&nbsp;

## **Gestures**

L&rsquo;un des premiers points si on parle de mobile est de se poser des questions (en tout cas sur une application du genre) sur la joueabilité. Pour le moment nous utilisons le clavier. Mais sur mobile ? Nous allons simplement utiliser les évênements de _souris_. Pour cette application pas besoin de multi-touch, gérer les glissement est suffisant. Et comme Qt c&rsquo;est cool, on va faire tout ça uniquement dans le QML. C&rsquo;est plutôt un bon point car il est possible
  
d&rsquo;utiliser du JavaScript et non du C++ mais aussi car on garde notre code métier indépendant le plus possible de l&rsquo;implémentation de l&rsquo;interface.

Pour pouvoir récupérer les évênements nous allons rajouter un objet `MouseArea`. C&rsquo;est un objet transparent destiné à recevoir les actions de la souris (ou de votre doigt, finalement les actions d&rsquo;un pointeur).

On va donc faire que cet objet recouvre toute notre application et traque les glissements suivant les quatres directions souhaitées. Et une fois un glissement détecté, nous allons appeler, comme pour le clavier, `board.moveUp();`,
  
`board.moveRight();` etc.

Voici le code qui a été ajouté à la vue :

<pre class="wp-code-highlight prettyprint">property int gesture_swipeLeft: 0;
property int gesture_swipeRight: 1;
property int gesture_swipeUp: 2;
property int gesture_swipeDown: 3;

function getGesture(startX, startY, endX, endY, areaWidth, areaHeight) {
  var deltaX = endX - startX;
  var right = deltaX &gt; 0;
  var moveX = Math.abs(deltaX);

  var deltaY = endY - startY;
  var down = deltaY &gt; 0;
  var moveY = Math.abs(deltaY);

  var minimumFactor = 0.25;

  var relativeHorizontal = moveX / areaWidth;
  var relativeVertical = moveY / areaHeight;

  if (relativeHorizontal &lt; minimumFactor &amp;&amp;
      relativeVertical &lt; minimumFactor) {
    return;
  }

  var horizontal = relativeHorizontal &gt; relativeVertical;

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
</pre>

Petite explication de texte. Lors de l&rsquo;appui sur la zone je garde en mémoire les coordonnées. Lors du relachement je calcule l&rsquo;action réalisée (est-ce qu&rsquo;il s&rsquo;agit d&rsquo;un glissement suffisant, ici 25% de l&rsquo;écran, et si oui dans quelle direction).
  
Ce calcul est extrait dans une méthode dédié pour plus de lisibilité. Enfin, en fonction du type de déplacement je commande le plateau de jeu comme réalisé au clavier.

Et tout ceci est à ajouter à la fin de l&rsquo;objet `Window`. Alors, plutôt simple non ?

> git: tag 07_gestures

Ce qui est plutôt intéressant également est que vous noterez qu&rsquo;il n&rsquo;y a aucun code spécifique à une plateforme mobile… Vous pouvez donc le tester tout de suite sans déployer sur un mobile.

&nbsp;

## **iOS**

La première chose à faire pour pouvoir tester sous iOS est d&rsquo;installer le kit correspondant.

Rendez-vous dans la vue _Projets_ de QtCreator et ajoutez le kit correspondant. Si vous avez fait une installation avec une version Android + iOS vous devriez avoir au moins deux kits Android et deux kits iOS. Sélectionnez le kit
  
`iphonesimulator-clang` qui vous permettra d&rsquo;exécuter dans le simulator d&rsquo;iOS fourni par XCode. Pour pouvoir faire la même chose sur un matériel Apple, il vous faudra le certificat de développeur pour signer votre code.

&nbsp;

<img class="aligncenter" src="http://65.media.tumblr.com/5503511a01a70e639ee8bbdebb72589a/tumblr_inline_n48gd62cYl1sv6muh.png" alt="" />

&nbsp;

> oui j&rsquo;ai des kits 5.2.1 + 5.3.0 beta

Si vous le souhaitez, vous pouvez (dans la partie _Exécuter_) sélectionner le type de machine que vous souhaitez émuler, j&rsquo;ai pris un iPad pour voir.

Et ensuite ?

Il vous reste juste à exécuter votre application en choisissant la bonne cible.

&nbsp;

<img class="aligncenter" src="http://66.media.tumblr.com/4f6f2e3a9e624baefd8ebf9c1230bbd1/tumblr_inline_n48gdd2NyQ1sv6muh.png" alt="" />

&nbsp;

Alors, ce n&rsquo;était pas si compliqué, non ?

&nbsp;

<img class="aligncenter" src="http://67.media.tumblr.com/282e986319124779c051dd1725ce002a/tumblr_inline_n48gdo5kkP1sv6muh.png" alt="" />

&nbsp;

Vous noterez donc qu&rsquo;il n&rsquo;y a eu absolument aucune modification au niveau des sources, juste une recompliation. Et là vous pouvez vraiment commencer à profiter de Qt et QML sachant que cela va fonctionner quelque soit la destination !

&nbsp;

## **Android**

Sous Android ? En fait c&rsquo;est quasiment comme sous iOS.

Mais il va falloir installer / configurer vos SDK et NDK android. Allez dans les préférences et pointez votre SDK et NDK. Et commez Qt est sympa il vous aide même à les télécharger si besoin.

Il vous faut aussi un JDK.

> Tip : Sous Mac le chemin par défaut est faux, il faut mettre
  
> `/System/Library/Java/JavaVirtualMachines/1.6.0.jdk/Contents/Home`

Ainsi que ant.

&nbsp;

<img class="aligncenter" src="http://66.media.tumblr.com/988ace9fbc5a431b58ca39c99bea4eb2/tumblr_inline_n48gdvtyai1sv6muh.png" alt="" />

&nbsp;

Vous pouvez directement lancer _AVD Manager_ et gérer vos simulateurs ou le faire lors de l&rsquo;exécution de votre projet.

Sélectionnez ensuite le kit correspondant dans votre projet : `Android pour armeabi-v7a `et exécutez-le.

Il va vous proposer les simulateurs ou matériels android connectés correspondant à votre version d&rsquo;ABI :

&nbsp;

<img class="aligncenter" src="http://65.media.tumblr.com/870a15847637f1c042bd9368656cb97d/tumblr_inline_n48ges1Zyn1sv6muh.png" alt="" />

&nbsp;

Si jamais les devices que vous voyez sont tous en non compatible c&rsquo;est probablement que vous n&rsquo;êtes pas en Qt Creator 3.1.0. Dans ce cas, dans l’_environnement de compilation_ du kit rajoutez la variable d&rsquo;environnement suivante :

<pre class="wp-code-highlight prettyprint">ANDROID_TARGET_ARCH=default/armeabi-v7a
</pre>

En effet, dans les SDK précédents l&rsquo;architecture cible était `armeabi-v7a`, désormais c&rsquo;est `default/armeabi-v7a` et les anciennes versions de Qt Creator se trompaient donc dans le test.

Il ne vous reste plus qu&rsquo;à sélectionné le matériel/simulateur que vous voulez et cliquer sur `ok`. Et attendre que Android se lance aussi…

&nbsp;

<img class="aligncenter" src="http://66.media.tumblr.com/988ace9fbc5a431b58ca39c99bea4eb2/tumblr_inline_n48gegRF0Y1sv6muh.png" alt="" />

&nbsp;

## **Fin ?**

Voici, avec un petit exemple assez simple, comment développer une application vraiment multi plateforme, que ce soit pour Windows, Mac et Linux (même si ça n&rsquo;a pas vraiment été évoqué ici) mais surtout iOS et Android.

Surtout, ce qui est tout de même assez bluffant, c&rsquo;est qu&rsquo;il n&rsquo;y a eu aucune modification de réalisée pour que cela fonctionne partout. Enfin à part le fait de gérer les déplacement par la souris (mais qui n&rsquo;est pas spécifique au mobile), si on avait placé quatre boutons il n&rsquo;y aurait pas eu du tout de modifications.

Pour aller plus loin il serait intéressant de continuer à manipuler l&rsquo;interface. L&rsquo;interface réalisée permet d&rsquo;être adaptable aux dimensions de l&rsquo;écran. Ce qui serait encore mieux serait que l&rsquo;interface s&rsquo;adapte parfaitement à l&rsquo;orientation de l&rsquo;écran. Par exemple lorsqu&rsquo;on passe en paysage il faudrait que le score et le statut soit sur un côté du plateau de jeu et non au dessus, afin d&rsquo;avoir le plateau le plus grand possible. Ceci est envisageable en modifiant les ancres des objets de l&rsquo;interface en fonction de l&rsquo;orientation, que l&rsquo;ont peut récupérer via un objet `Screen`

Au final il est donc possible d&rsquo;envisager le développement d&rsquo;applications bureau et mobiles avec un surcoût relativement faible et surtout sans avoir besoin de coder trois fois (ou plus) la même application, ce qui outre la perte de temps serait aussi prendre des risques en terme de fiabilité (trois fois plus de code à maintenir par exemple).

&nbsp;

<img class="aligncenter" src="http://66.media.tumblr.com/dbe21392be37f58a4b06096eccceb5bf/tumblr_inline_n48gf2wObf1sv6muh.png" alt="" />

&nbsp;

**Yves**