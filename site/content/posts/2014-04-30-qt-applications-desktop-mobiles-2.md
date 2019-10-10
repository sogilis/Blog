---
title: Qt pour des applications desktop et mobiles simplement (2/7)
author: Tiphaine
date: 2014-04-30T08:12:00+00:00
featured_image: /wp-content/uploads/2014/04/Sogilis-Christophe-Levet-Photographe-7433.jpg
tumblr_sogilisblog_permalink:
  - http://sogilisblog.tumblr.com/post/84307433806/qt-pour-des-applications-desktop-et-mobiles
tumblr_sogilisblog_id:
  - 84307433806
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
  - 2780
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

## **2048**

Maintenant que notre application QtQuick fonctionne intéressons nous à notre 2048.

&nbsp;

## **2048.c**

Le but étant d&rsquo;explorer des technologies, pas de développer un jeu, je me suis donc basé sur une implémentation du 2048 en `c` que vous pouvez <span style="text-decoration: underline;"><a href="https://github.com/mevdschee/2048.c" target="_blank">trouver ici</a></span>.

C&rsquo;est une implémentation en console pour Linux. Bon ça fonctionne aussi sous mac 😉

Le code est relativement simple, il y a une matrice 4&#215;4 qui représente le plateau. Les mouvements sont simplifiés puisque seul le mouvement vers le haut est implémenté. Les autres mouvements sont une combinaison de rotation vers la droite et de déplacement vers le haut (une rotation, un déplacement, 3 rotations donne un déplacement vers la gauche par exemple).

J&rsquo;ai gardé les principes de base, juste quelques petites modifications mineurs entre autre au niveau de ces déplacements.

&nbsp;

## **2048 en Qt**

J&rsquo;ai donc ajouté une classe `Board` qui hérite de `QObject`. Il est bienvenue d&rsquo;hériter de `QObject` car ça apporte plein de choses, comme les signaux et slots.

Voici le _header_ de cette classe.

<pre class="wp-code-highlight prettyprint">#ifndef BOARD_H
#define BOARD_H

#include &lt;QObject&gt;
#include &lt;QStringList&gt;

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
</pre>

Au niveau des méthodes publiques rien de très complexe :

  * une méthode qui affiche dans la console le contenu du plateau
  * quatre méthodes de déplacement
  * une méthode pour récupérer la valeur d&rsquo;une case (tuile) en fonction des coordonnées
  * une méthode pour récupérer le score
  * deux méthodes pour savoir si le jeux est fini et si on a gagné
  * une méthode d&rsquo;init

Je ne détaille pas vraiment les méthodes privées ni l&rsquo;implémentation, ce n&rsquo;est pas tellement le sujet et github est là.

Juste histoire de voir que tout fonctionne bien j&rsquo;ai changé le `main` comme suit :

<pre class="wp-code-highlight prettyprint">int main(int argc, char *argv[])
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
</pre>

C&rsquo;est pas super beau mais ça permet de se rendre compte que oui ça fonctionne.

**Apparté C++11**

Petit apparté rapide. Normalement vous devriez avoir un warning du genre :

> /Users/yves/Projects/Qt/qt2048/board.cpp:93: avertissement : ‘auto’ type specifier is a C++11 extension [-Wc++11-extensions]
  
> auto time = QTime::currentTime();
  
> ^

C&rsquo;est normal, j&rsquo;utilise `auto` qui vient de `C++11`. Il faut donc l&rsquo;activer
  
dans le fichier `qt2048.pro` :

<pre class="wp-code-highlight prettyprint">CONFIG+=c++11
</pre>

> git: tag <span style="text-decoration: underline;"><a href="https://github.com/sogilis/qt2048/tree/O2_2048" target="_blank">02_2048</a></span>

**Yves**