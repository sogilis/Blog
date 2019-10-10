---
title: Qt pour des applications desktop et mobiles simplement (3/7)
author: Tiphaine
date: 2014-05-06T08:05:00+00:00
featured_image: /wp-content/uploads/2016/04/2.Formations-e1461591900149.jpg
tumblr_sogilisblog_permalink:
  - http://sogilisblog.tumblr.com/post/84907918476/qt-pour-des-applications-desktop-et-mobiles-simplement-p
tumblr_sogilisblog_id:
  - 84907918476
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
  - 2977
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

## 

## **Interface QML**

Maintenant que notre plateau de jeu est fonctionnel et que nous avons les actions de base, nous pouvons commencer à les afficher.

Comme indiqué, l&rsquo;affichage va se faire en utilisant les possibilités de QML.

&nbsp;

## Board

&nbsp;

### <span style="text-decoration: underline;">Affichage du plateau</span>

Pour commencer en douceur, on peut modifier le fichier `qml` pour afficher une grille de 4 cases de côté. Et pour ça il convient d&rsquo;utiliser un objet… `Grid`

<pre class="wp-code-highlight prettyprint">import QtQuick 2.2
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
</pre>

Ceci devrait vous donner une grille de 4 cases de côté, avec dans chacune son indice.

&nbsp;

<img class="aligncenter" src="http://67.media.tumblr.com/5ab2b652e36ee3d34bd099a1f5c745cb/tumblr_inline_n48ga47MGG1sv6muh.png" alt="" />

&nbsp;

L&rsquo;une des premières choses est qu&rsquo;on voit qu&rsquo;il va falloir linéariser les coordonnées. La grille veut un index entre 0 et 15, notre modèle veut un couple (0..3)(0..3).

Pour permettre à l&rsquo;interface d&rsquo;afficher les données nous allons créé un objet dédié à la gestion du modèle et qui, par un mécanisme de notifications, pourra mettre à jour l&rsquo;interface au moindre changement dans les données.

Comme le modèle attendu est une liste de donnée nous allons dériver de `QAbstractListModel `et nous allons l&rsquo;appeler `BoardModel`. Pour plus de détails sur le fonctionnement des abstract models, vous pouvez aller voir les pages sur le principe de <span style="text-decoration: underline;"><a href="http://qt-project.org/doc/qt-5/model-view-programming.html" target="_blank">Model/View Programming</a></span>

Commencez donc par ajouter une classe `BoardModel` à votre projet, faites la hériter de `QAbstractListModel`.

&nbsp;

<img class="aligncenter" src="http://67.media.tumblr.com/e82e505b0517e413f0db9dd8c30649e3/tumblr_inline_n48gaeKJZ01sv6muh.png" alt="" />

&nbsp;

Pour que cela fonctionne il faut rajouter deux choses, un compteur d&rsquo;éléments et un accès à la donnée, et émettre un signal lorsque les données changent.

Mais avant cela, il faut juste déclarer notre plateau de jeu. Pour ce faire c&rsquo;est simple, rajoutez un membre privé de type `Board`.

<pre class="wp-code-highlight prettyprint">private:
  Board board_;
</pre>

Maintenant, implémentez l&rsquo;accès au compteur d&rsquo;éléments.

Dans le `.h` :

<pre class="wp-code-highlight prettyprint">public:
  int rowCount(const QModelIndex &amp;parent = QModelIndex()) const;
</pre>

Dans le `.cpp` :

<pre class="wp-code-highlight prettyprint">int BoardModel::rowCount(const QModelIndex &amp;parent) const {
  Q_UNUSED(parent)

  return kSize * kSize;
}
</pre>

`kSize` est défini dans `board.h`. N&rsquo;oubliez pas qu&rsquo;on a linéarisé le plateau 😉

La deuxième méthode à implémenter est l&rsquo;accès à une donnée en fonction de son index.

Dans le `.h`

<pre class="wp-code-highlight prettyprint">public:
  QVariant data(const QModelIndex &amp;index, int role = Qt::DisplayRole) const;
</pre>

Vous noterez qu&rsquo;il est question de _role_. Il s&rsquo;agit d&rsquo;un mécanisme permettant de demander différents types de valeurs pour une même donnée. Par exemple demander la valeur, la couleur et le libellé d&rsquo;une donnée. Pour cet exemple je ne vais pas l&rsquo;utiliser et demande donc simplement la valeur à afficher.

Voici l&rsquo;implémentation :

<pre class="wp-code-highlight prettyprint">QVariant BoardModel::data(const QModelIndex &amp;index, int role) const {
    t_index x, y;
    if (index.row() &lt; 0 || index.row() &gt;= kSize * kSize) {
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
</pre>

Le fonctionnement est très simple, si l&rsquo;index est hors des bornes ou que le rôle demandé n&rsquo;est pas l&rsquo;affichage je retourne un `QVariant` vide. Sinon je récupère les deux coordonnées à partir de l&rsquo;indice et récupère la donnée depuis le plateau.

Ceci permet d&rsquo;obtenir l&rsquo;ensemble des valeurs à afficher. Il ne reste plus qu&rsquo;à fournir une instance de ce `BoardModel` au fichier QML. Pour ça on va simplement passer une instance en tant que propriété de contexte de notre viewer de QML.

Rajouter dans le `main.cpp` (par exemple avant le `load`) :

<pre class="wp-code-highlight prettyprint">BoardModel board;
engine.rootContext()-&gt;setContextProperty("board", &amp;board);
</pre>

> Il faudra évidemment inclure `boardmodel.h` mais aussi `<QtQml> dans le`main.cpp\`.

De cette façon nous pouvons accéder à notre objet via la variable `board` dans le QML. `board` devient donc le `model` de notre `Repeater` et la valeur à afficher devient `display` :

<pre class="wp-code-highlight prettyprint">import QtQuick 2.2
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
</pre>

Et voilà, votre plateau de jeu est affiché. Vous avez les 16 cases avec normalement deux cases qui ont 2 ou 4 dedans et les autres 0.

&nbsp;

<img class="aligncenter" src="http://67.media.tumblr.com/7b9ec9a48123ef35e497aba3c24bc381/tumblr_inline_n48gawrFT61sv6muh.png" alt="" />

&nbsp;

## **Un peu de style**

Bon par contre c&rsquo;est pas super sexy pour le moment… on va donc y remédier rapidement.

Voici une petite liste d&rsquo;améliorations possibles :

  1. ne pas afficher les zéros dans les cases (dans le jeux 0 signifie qu&rsquo;il n&rsquo;y a
  
    pas de tuile)
  2. centrer les nombres, grossir, etc
  3. avoir une couleur différente de tuile selon la valeur
  4. ajouter une couleur de fond

Pour réaliser tout cela on va découper l&rsquo;interface en plusieurs composants QML.
  
Il faut savoir que si vous créez un fichier `Tile.qml` (notez bien la majuscule
  
au début du fichier…) vous pouvez alors utiliser un nouveau composant `Tile`
  
comme si vous utilisiez un `Rectangle` ou `Text`.

On va donc justement extraire l&rsquo;affichage d&rsquo;une tuile et s&rsquo;occuper des points
  
`1.`, `2.` et `3.`.

  1. Au lieu de directement afficher la valeur, on va utiliser une fonction
  
    javascript qui va nous retourner la valeur ou une chaine vide si la valeur
  
    est ``.
  2. Ça c&rsquo;est juste du positionnement QML et un peu de style.
  3. Une fonction javascript va prendre la valeur à afficher et retourner
  
    la couleur souhaitée en fonction.

Et comme nous allons réaliser cela dans un autre fichier, un autre composant, il
  
va falloir faire un lien entre la valeur issue du modèle du `Repeater` (`display`)
  
et une propriété du composant (que j&rsquo;ai nommé `value`). Voici donc le fichier QML `Tile.qml`

<pre class="wp-code-highlight prettyprint">import QtQuick 2.2

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
        if (v &lt; 1024) {
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
</pre>

Vous noterez aussi deux petites choses :

  * la taille de la police est fonction de la valeur
  * la taille de la tuile est paramétrée (pour pouvoir, dans la suite, s&rsquo;adapter
  
    à la taille de la zone affichée…)

Pour visualiser le rendu, vous pouvez passer par le menu `Outils/Externe/Qt Quick/Prévisualisation Qt Quick 2 `ce qui ouvrira une fenêtre avec votre QML. Et vous pouvez aussi modifier les propriétés `tileWidth` et `value` pour voir les différents rendus.

Maintenant que nous avons notre tuile, il faut l&rsquo;afficher dans le plateau. Rien de plus simple, remplacez juste l&rsquo;élément `delegate` par votre tuile tout en affectant la propriété `value` :

<pre class="wp-code-highlight prettyprint">Repeater {
  model: board
  delegate: Tile {
    value: display
  }
}
</pre>

Pour ce qui est du point `4.`, je vous laisse définir la couleur de fond à `#baaa9e`.

Vous devriez alors avoir un résultat similaire au suivant :

&nbsp;

<img class="aligncenter" src="http://67.media.tumblr.com/5c8cd5bf964d7a732df7cffd5e00e61c/tumblr_inline_n48gbdabr71sv6muh.png" alt="" />

&nbsp;

Plutôt simple, non ?

> git: tag <span style="text-decoration: underline;"><a href="https://github.com/sogilis/qt2048/tree/03_board_with_tiles" target="_blank">03_board_with_tiles</a></span>

**Yves**