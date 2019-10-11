---
title: Qt pour des applications desktop et mobiles simplement (1/7)
author: Tiphaine
date: 2014-04-29T08:47:00+00:00
featured_image: /wp-content/uploads/2015/03/Sogilis-Christophe-Levet-Photographe-7503.jpg
tumblr_sogilisblog_permalink:
  - http://sogilisblog.tumblr.com/post/84210368626/qt-pour-des-applications-desktop-et-mobiles
tumblr_sogilisblog_id:
  - 84210368626
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
  - 8168
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
**Chez <span style="text-decoration: underline;"><a href="http://sogilis.com" target="_blank">Sogilis</a></span>, on aime bien les technologies qui nous rendent productif et qui nous permettent de se concentrer sur ce qui a vraiment de la valeur : la qualité de nos logiciels.**

&nbsp;

Certains de nos logiciels (par exemple dans le domaine médical) utilisent <span style="text-decoration: underline;"><a href="http://qt-project.org" target="_blank">Qt</a></span>.

Pour le moment les développements effectués utilisaient la bonne vieille interface de Qt. Faut dire que c&rsquo;est plutôt intéressant, le rendu est bon sur les différents desktops, le designer est assez bien fait. Bref ça fonctionne bien.

Mais… (car il y a toujours un mais)

… il y a QtQuick !

<!-- more -->

Bon je vais pas vous faire une intro totale à QtQuick, vous trouverez par exemple pas mal d&rsquo;informations sur le <span style="text-decoration: underline;"><a href="http://qt-project.org/wiki/Qt_Quick" target="_blank">wiki de Qt</a></span>.
  
Pour faire très simple c&rsquo;est un framework permettant de créer des interfaces très personnalisables et dynamiques (contrairement aux widgets classiques) basées sur un langage déclaratif, `QML` qui ressemble un peu (de loin les yeux fermés dans le brouillard) à du json et dans lequel on peut injecter du javascript.
  
Dit comme ça c&rsquo;est très web comme techno, et c&rsquo;est pas faux.

&nbsp;

<img class="aligncenter" src="http://67.media.tumblr.com/fc4d3faed895e45458e09be9a11c079c/tumblr_inline_n48g7nAIuG1sv6muh.jpg" alt="" />

&nbsp;

L&rsquo;avantage c&rsquo;est que le langage est facile, l&rsquo;ajout de javascript permet de facilement gérer l&rsquo;interactivité de l&rsquo;interface (beaucoup plus facilement qu&rsquo;en `C++`…) et pour ceux qui veulent il y a même un designer de fourni dans QtCreator. L&rsquo;ensemble fait que la création d&rsquo;interface peut aussi être assez facilement confiée à un designer ce qui est très sympa pour produire des applications desktop (ou mobiles) avec un bon niveau ergonomique et graphique. Disons que c&rsquo;est du même niveau de complexité (peut-être même moins du fait de la richesse de certains composants) qu&rsquo;une interface web et dans tous les cas c&rsquo;est beaucoup plus simple que si on demandait de faire une interface à base de widgets (dès qu&rsquo;on sort des composants de base ou qu&rsquo;on souhaite mieux gérer le placement).

Et surtout, comme on est toujours en réalité dans Qt, cela n&#8217;empêche en rien d&rsquo;avoir un cœur applicatif en `C++`.

Allez non, en fait il reste un dernier point intéressant : QtMobile. Il est aujourd&rsquo;hui possible d&rsquo;exécuter la même application que ce soit sur un ordinateur “classique” (mac, linux, windows) ou sur un smartphone ou une tablette (android, iOS). Et là ça en devient presque magique : plus besoin de redévelopper trois fois (ou plus) la même application pour l&rsquo;utiliser partout !

Et c&rsquo;est donc tout cela que nous allons voir dans cette série d&rsquo;articles :

  * créer une application avec un cœur applicatif en `C++<br />
` 
  * avoir une interface en QML et voir la liaison entre ces deux parties (initialement
  
    l&rsquo;objectif portait surtout sur ce point mais ça a un peu dérivé ;-))
  * l&rsquo;exécuter partout !

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
  * <a href="http://sogilis.com/blog/qt-applications-desktop-mobiles-7/" target="_blank">Android</a><a href="http://blog.sogilis.com/post/85801901176/qt-pour-des-applications-desktop-et-mobiles-partie-7#android" target="_blank"><br /> </a>

Fin ?

## **L&rsquo;application de base**

Pour explorer ces technologies, il fallait un exemple simple (le but n&rsquo;est pas d&rsquo;avoir une grande complexité métier) pour lequel on peut découpler interface et métier, qui soit intéressant aussi bien sur desktop que mobile. Ha oui, et fun aussi !

D&rsquo;où l&rsquo;intérêt de partir sur un 2048 (il parait que c&rsquo;est à la mode…).

&nbsp;

### **Qt et application Qt Quick**

&nbsp;

**<span style="text-decoration: underline;">Prérequis</span>**

Pour commencer, si ce n&rsquo;est pas déjà fait allez récupérer un Qt. Pour ma part j&rsquo;ai utilisé un <span style="text-decoration: underline;"><a href="http://download.qt-project.org/development_releases/qt/5.3/5.3.0-beta/" target="_blank">Qt 5.3.0 beta</a></span>.
  
Si vous les souhaitez cela doit fonctionner aussi avec un Qt 5.2.1.

Attention il y a plusieurs versions différentes. Entre autre, si vous souhaitez pouvoir aller jusqu&rsquo;au bout des articles, il vous faudra un mac et prendre la version _Qt 5.3.0 for Android and iOS (Mac)_. Sinon, vous pouvez vous contenter d&rsquo;une version avec Android si vous êtes sous linux ou windows.

Ah oui, prenez votre temps, la version Android + iOS ça fait presque 1GB…

J&rsquo;ai aussi utilisé <span style="text-decoration: underline;"><a href="https://qt-project.org/downloads#qt-creator" target="_blank">Qt Creator 3.1.0</a></span>.

Et d&rsquo;ailleurs pour en rajouter, si vous êtes sous mac il vous faut xcode…

Bon je présupose dans la suite que vous avez réussi à l&rsquo;installer, que vous savez lancer QtCreator et que vous avez des bases (pas besoin de choses très complexes) de `C++` voir si possible de `Qt`.

&nbsp;

**<span style="text-decoration: underline;">Créer un projet Qt Quick</span>**

Allez c&rsquo;est parti, comme un tuto classique : création du projet :

<img class="aligncenter" src="http://67.media.tumblr.com/64e2a6efd8dc676592bafd94635a6a26/tumblr_inline_n48ggyrfGl1sv6muh.png" alt="" />

&nbsp;

Pour ma part je l&rsquo;ai appelé qt2048. Veillez juste à ne **surtout pas** l&rsquo;appeler `2048`. Certains on essayé, ils ont eu mal ! Plus sérieusement, ça rend l&rsquo;application inutilisable sous Android… mais l&rsquo;erreur n&rsquo;est pas toujours évidente à trouver.

&nbsp;

<img class="aligncenter" src="http://66.media.tumblr.com/515122547cefb57b9f0aabf2c4bc8ba6/tumblr_inline_n48g88Z2E41sv6muh.png" alt="" />

&nbsp;

Choisissez un ensemble de composant `Qt Quick 2.2` (si vous êtes sous Qt 5.2.1 utilisez un `Qt Quick 2.0` mais il y aura quelques ajustement à réaliser).

&nbsp;

<img class="aligncenter" src="http://67.media.tumblr.com/a52336cc41d90e92f48bbd44bd75be2b/tumblr_inline_n4flfbB8PI1sv6muh.png" alt="" />

&nbsp;

Vient ensuite le moment de la sélection des Kits. Les kits représentent les types de compilations possibles. Par exemple vous pouvez faire une application `Qt4` et `Qt5`, etc. Si vous avez bien installé un _Qt for Android and iOS_ vous devriez avoir 3 kits pour Android (`armeabi`, `armeabi-v7a`, `x86`), 1 kit desktop (`clang 64bit` sous mac) et 2 kits pour iOS (un pour un iOS réel, un pour le simulateur).

Pour débuter je ne sélectionne que le kit desktop. Pourquoi ? Simplement car dans un premier temps je me concentre sur mon application et seulement à la fin je vais gérer les mobiles. Et c&rsquo;est d&rsquo;ailleurs un point qui est vraiment intéressant, il n&rsquo;est pas nécessaire de partir dans un développement orienté mobile pour que cela fonctionne.

&nbsp;

<img class="aligncenter" src="http://66.media.tumblr.com/a49efb203a49740d6e5a9a309c0ca41c/tumblr_inline_n4fqp7Lh6w1sv6muh.png" alt="" />

&nbsp;

Si vous le souhaitez vous pouvez tout mettre dans un dépôt git (ça peut être une bonne idée mine de rien…).

Vous trouverez d&rsquo;ailleurs l&rsquo;ensemble des sources liées à ces articles dans le dépôt Git suivant : <span style="text-decoration: underline;"><a href="https://github.com/sogilis/qt2048" target="_blank">sogilis/qt2048</a></span> (les différentes étapes seront signalées dans l&rsquo;article et correspondent à des tags dans le dépôt).

> _Astuce :_ ajoutez tout de suite un fichier `.gitignore` contenant `*.pro.user`
  
> pour ne pas versionner ce fichier.

&nbsp;

**<span style="text-decoration: underline;">Découverte rapide</span>**

Voici donc les fichiers que vous devriez avoir :

<img class="aligncenter" src="http://67.media.tumblr.com/a49efb203a49740d6e5a9a309c0ca41c/tumblr_inline_n4flg2eIHC1sv6muh.png" alt="" />

&nbsp;

Le fichier `main.cpp` doit ressembler à cela :

<pre class="wp-code-highlight prettyprint">#include &lt;QGuiApplication&gt;
#include &lt;QQmlApplicationEngine&gt;

int main(int argc, char *argv[])
{
    QGuiApplication app(argc, argv);

    QQmlApplicationEngine engine;
    engine.load(QUrl(QStringLiteral("qrc:///main.qml")));

    return app.exec();
}
</pre>

En gros, il instancie une application Qml et charge un fichier qml représentant notre interface.

Le fichier `main.qml` contient lui notre interface :

import QtQuick 2.2
  
import QtQuick.Window 2.1

<pre class="wp-code-highlight prettyprint">Window {
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
</pre>

Comme vous pouvez le voir c&rsquo;est plutôt très lisible et compréhensible : un rectangle est dessiné et contient le texte _“Hello World”_. Une zone de capture des évènements de la souris est placée et qui lorsqu&rsquo;on clique dedans ferme la fenêtre.

Bon je ne rentre pas dans tous les détails d&rsquo;ancres et autres vous trouverez pour le coup de nombreuses ressources sur le sujet.

Un `cmd+r` plus tard et vous pouvez voir la fenêtre s&rsquo;afficher et se fermer lors du clic (oui les raccourcis sont pour mac, mais vous pouvez toujours passer par les menus ou le bouton dans la barre de gauche).

Et voilà, vous avez votre première application Qt Quick qui fonctionne. Passons aux choses sérieuses… dans la deuxième partie consacrée au 2048 !

> git: tag <span style="text-decoration: underline;"><a href="https://github.com/sogilis/qt2048/tree/O1_project_creation" target="_blank">O1_project_creation</a></span>

**Yves**