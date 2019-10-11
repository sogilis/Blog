---
title: 'Compression, reconstruction d&rsquo;images et calculs au-delà de la troisième dimension'
author: Tiphaine
date: 2016-10-25T08:00:22+00:00
featured_image: /wp-content/uploads/2015/10/Sogilis-Christophe-Levet-Photographe-7461.jpg
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
  - 2975
sbg_selected_sidebar:
  - 'a:1:{i:0;s:1:"0";}'
sbg_selected_sidebar_replacement:
  - 'a:1:{i:0;s:12:"Blog Sidebar";}'
sbg_selected_sidebar_2:
  - 'a:1:{i:0;s:1:"0";}'
sbg_selected_sidebar_2_replacement:
  - 'a:1:{i:0;s:0:"";}'
categories:
  - DÉVELOPPEMENT
tags:
  - développement

---
**Ce billet présente l&rsquo;algorithme PCA (Principal Component Analysis, ou encore analyse en composantes principales). Il s’agit d’une technique mathématique qui identifie et explique la corrélation d&rsquo;un ensemble de données discrètes. Cet article pose les bases de cet algorithme et détaille une de ses applications pour la reconstruction d’image.**

&nbsp;

## **Le PCA : une méthode, plein d&rsquo;applications !**

<span style="font-weight: 400;">L&rsquo;analyse en composantes principales est </span>**une technique d&rsquo;analyse et de visualisation de données qui est populaire dans un très grand nombre de domaines** <span style="font-weight: 400;">qui n&rsquo;ont, </span>_<span style="font-weight: 400;">a priori,</span>_ <span style="font-weight: 400;">pas grand chose à voir entre eux. En effet, on retrouve l&rsquo;algorithme PCA en économie, en biologie, mais aussi en physique, en mathématiques (évidemment), en apprentissage automatique (machine learning), sans oublier les sciences sociales ou encore la finance. Pour être bref, le PCA est utilisé dans à peu près tous les domaines qui manipulent des données quantifiables et qui ont besoin de faire des statistiques pour trouver une structure, un modèle dans la donnée, afin d&rsquo;être en mesure d&rsquo;expliquer leur provenance et leurs fluctuations.</span>

<span style="font-weight: 400;">D&rsquo;autre part, il s&rsquo;agit d&rsquo;</span>**une technique qui est relativement simple à appréhender**<span style="font-weight: 400;">, pourvu qu&rsquo;on soit à l&rsquo;aise avec certains fondamentaux mathématiques (notions de matrices, d&rsquo;espaces vectoriels et de statistiques). C&rsquo;est ce qui explique d’ailleurs pourquoi le PCA a été utilisé dans des domaines si différents.</span>

&nbsp;

## **Principal Component Analysis**

<span style="font-weight: 400;">L&rsquo;analyse en composantes principales (PCA) est une technique statistique qui se charge d&rsquo;expliciter la covariance d&rsquo;un ensemble de données. La représentation de la donnée en amont est laissée à la discrétion de l&rsquo;utilisateur, et nous reviendrons dessus dans un cas d&rsquo;utilisation concret plus loin dans ce billet. En particulier, </span>**le PCA permet de déterminer les axes** <span style="font-weight: 400;">(</span>_<span style="font-weight: 400;">ie</span>_ <span style="font-weight: 400;">les directions) </span>**selon lesquels le jeu de données varie le plus**<span style="font-weight: 400;">. Il s&rsquo;agit d&rsquo;une méthode qui permet d&rsquo;éliminer la corrélation des données et de trouver une représentation moins redondante, plus compacte, de la même information.</span>

**Les calculs mis en œuvre lors de l&rsquo;application du PCA reposent essentiellement sur des notions d&rsquo;algèbre linéaire.** <span style="font-weight: 400;">Cet article se veut didactique et présente le principe via différents schémas, en laissant un peu de côté le détail des formules mathématiques. En pratique, cet algorithme est disponible dans de nombreuses librairies d&rsquo;algèbre linéaire, pour un vaste panel de langages de programmation. Il n&rsquo;est donc pas nécessaire de le réimplémenter pour construire de nouveaux algorithmes par dessus.</span>

<span style="font-weight: 400;">Dans un soucis de clarification (et surtout parce que l&rsquo;esprit humain n&rsquo;est pas vraiment habitué à se représenter les choses au-delà de trois dimensions),</span> **la technique du PCA sera présentée dans un espace en deux dimensions**<span style="font-weight: 400;">. Le jeu de données initial est donc un ensemble de points entièrement définis par leurs coordonnées dans un repère usuel (i,j).</span>

<span style="font-weight: 400;">Il faut garder en tête que le PCA repose sur des calculs d&rsquo;algèbre linéaire valables pour un nombre quelconque de dimensions (on parle aussi </span>_<span style="font-weight: 400;">d&rsquo;algèbre linéaire en dimension finie</span>_<span style="font-weight: 400;">) et que</span> **le PCA peut être utilisé sur des données représentées par autant de coordonnées que l&rsquo;on veut**<span style="font-weight: 400;">. En d&rsquo;autres termes, on peut faire tourner cette méthode aussi bien sur des points en deux dimensions que sur des échantillons sanguins décrits par des centaines de paramètres différents (concentration d&rsquo;un type d&rsquo;enzyme, taux de plaquettes&#8230;). L&rsquo;application de cette technique à la compression et à la reconstruction d&rsquo;images manipule par exemple des </span>_<span style="font-weight: 400;">points</span>_ <span style="font-weight: 400;">qui ont plus de 10 000 coordonnées différentes (le nombre de pixels dans chaque image), comme nous le verrons dans la prochaine section.</span>

<span style="font-weight: 400;">Intuitivement, la technique du PCA permet de </span>**trouver un repère** <span style="font-weight: 400;">(de l&rsquo;espace dans lequel on travaille) </span>**qui minimise le degré de corrélation des données**<span style="font-weight: 400;">. Dans la figure suivante, cela revient à trouver le repère (u,v) centré sur le point moyen du jeu de données alors qu&rsquo;on ne connaît que les points dans le repère initial (i,j).</span>

<img class="aligncenter size-full wp-image-1330" src="http://sogilis.com/wp-content/uploads/2016/10/data-representation.png" alt="data-representation" width="895" height="354" srcset="http://sogilis.com/wp-content/uploads/2016/10/data-representation.png 895w, http://sogilis.com/wp-content/uploads/2016/10/data-representation-300x119.png 300w, http://sogilis.com/wp-content/uploads/2016/10/data-representation-768x304.png 768w" sizes="(max-width: 895px) 100vw, 895px" />

<span style="font-weight: 400;">Le principe du PCA est plutôt simple, puisqu&rsquo;</span>**on travaille sur un objet en particulier : la matrice de covariance du jeu de données**<span style="font-weight: 400;">. Cette matrice décrit le degré de corrélation de chaque coordonnée des points du jeu de données, c&rsquo;est-à-dire que les coefficients de cette matrice sont des mesures représentant à quel point telle coordonnée est couplée à telle autre coordonnée pour les échantillons observés. La méthode usuelle pour construire la matrice de covariance consiste à créer une matrice qui a pour chaque ligne un point du jeu de données. On recentre le jeu de données autour de la moyenne, et on multiplie la transposée de la matrice par elle-même pour en déduire la matrice de covariance (à un facteur de normalisation près).</span>

<span style="font-weight: 400;">Des théorèmes mathématiques bien connus &#8211; dont un de mes favoris, le</span><span style="text-decoration: underline;"><a href="https://fr.wikipedia.org/wiki/Th%C3%A9or%C3%A8me_spectral"> <span style="font-weight: 400;">théorème spectral</span></a></span> <span style="font-weight: 400;">&#8211; garantissent que </span>**cette matrice de covariance est diagonalisable**<span style="font-weight: 400;">, qu&rsquo;on peut via ses vecteurs propres en déduire une base orthonormale de l&rsquo;espace, et qu&rsquo;ils sont en plus dirigés dans les directions où les données varient le plus. Dans notre cas, il s&rsquo;agit de la base (u,v). </span>**Ces vecteurs propres u et v**<span style="font-weight: 400;">, puisqu&rsquo;ils décrivent les directions dans lesquelles les données sont le plus dispersées, </span>**sont appelés** **composantes principales**<span style="font-weight: 400;">. Par ailleurs, il faut savoir qu&rsquo;à chaque vecteur propre est associée une valeur propre (</span>_<span style="font-weight: 400;">eigenvector</span>_ <span style="font-weight: 400;">et </span>_<span style="font-weight: 400;">eigenvalue</span>_ <span style="font-weight: 400;">en anglais) et qu&rsquo;un vecteur propre contribue d&rsquo;autant plus à la variabilité des données que sa valeur propre associée est grande (relativement aux autres valeurs propres).</span>

<span style="font-weight: 400;">On est donc capable, en sortie de PCA, de connaître les principaux axes de dispersion des données, mais aussi de savoir quels axes décrivent le mieux cette dispersion. </span>**Ces informations ouvrent la voie à des représentations plus compactes, et moins redondantes des données**<span style="font-weight: 400;">. Souvent, les données observées disposent d&rsquo;une structure cachée que le PCA fait ressortir. On se rend alors compte que les données peuvent être représentées différemment tout en conservant un degré de précision raisonnable. Par exemple, dans la figure suivante, on se rend compte qu&rsquo;on a tout intérêt à représenter les données uniquement selon l&rsquo;axe u, puisque l&rsquo;axe v décrit très peu la dispersion du jeu de données.</span>

<img class="aligncenter size-full wp-image-1335" src="http://sogilis.com/wp-content/uploads/2016/10/dimensionality-reduction.png" alt="dimensionality-reduction" width="895" height="354" srcset="http://sogilis.com/wp-content/uploads/2016/10/dimensionality-reduction.png 895w, http://sogilis.com/wp-content/uploads/2016/10/dimensionality-reduction-300x119.png 300w, http://sogilis.com/wp-content/uploads/2016/10/dimensionality-reduction-768x304.png 768w" sizes="(max-width: 895px) 100vw, 895px" />

<span style="font-weight: 400;">Supposons que notre jeu de données compte 1 000 points (de deux coordonnées chacun). Il faut donc 2 000 valeurs dans le repère (i,j) pour décrire totalement le jeu de données. Après le PCA, il faut 1 004 valeurs distinctes :</span>

<li style="font-weight: 400;">
  <span style="font-weight: 400;">2 valeurs pour décaler l&rsquo;origine du repère sur la moyenne des points ;</span>
</li>
<li style="font-weight: 400;">
  <span style="font-weight: 400;">2 valeurs pour décrire l&rsquo;axe u ;</span>
</li>
<li style="font-weight: 400;">
  <span style="font-weight: 400;">1 000 valeurs pour décrire les abscisses de chaque point sur l&rsquo;axe u.</span>
</li>

<span style="font-weight: 400;">On a donc réduit de moitié l&rsquo;espace nécessaire pour stocker les données. Le gain est d&rsquo;autant plus intéressant si les données ont beaucoup de composantes principales qui ne contribuent pas à leur dispersion. Cette technique est souvent nommée « </span>**réduction de complexité**<span style="font-weight: 400;"> » dans la littérature.</span>

&nbsp;

## **Une application : compression et reconstruction d&rsquo;images**

<span style="font-weight: 400;">La compression et la reconnaissance d&rsquo;images forment un pan de l&rsquo;apprentissage automatique (</span>_<span style="font-weight: 400;">machine learning</span>_<span style="font-weight: 400;">) dans lequel </span>**le** **PCA est largement utilisé**<span style="font-weight: 400;">, notamment </span>**pour réduire le nombre de variables nécessaires à la représentation &#8211; et donc au stockage, en mémoire vive ou sur disque &#8211; d&rsquo;une image**<span style="font-weight: 400;">.</span>

<span style="font-weight: 400;">Avant d&rsquo;aller plus loin, il est nécessaire de poser certains prérequis qui vont garantir que les pixels des images seront très corrélés. Par conséquent, le recours au PCA n&rsquo;en sera que plus utile et les résultats seront plus faciles à appréhender visuellement. On pose donc les prérequis suivants :</span>

<li style="font-weight: 400;">
  <span style="font-weight: 400;">les images manipulées sont à la même résolution ;</span>
</li>
<li style="font-weight: 400;">
  <span style="font-weight: 400;">le contenu des images est relativement similaire d&rsquo;une image à l&rsquo;autre.</span>
</li>

<span style="font-weight: 400;">Afin de prendre en compte les suppositions précédentes, </span>**nous travaillerons avec le trombinoscope ci-dessous**<span style="font-weight: 400;">. Chaque image est à la résolution 92 x 128 et est en nuances de gris (pour chaque pixel, il y a une seule valeur sur 8 bits qui décrit la nuance de gris). Ce jeu d&rsquo;images est disponible sur le web, il s&rsquo;agit d&rsquo;ailleurs d&rsquo;un échantillon d&rsquo;une base d&rsquo;images bien plus importante utilisée dans un bon nombre d&rsquo;articles de recherche.</span>

<img class="aligncenter size-full wp-image-1331" src="http://sogilis.com/wp-content/uploads/2016/10/Têtes-one.png" alt="tetes-one" width="724" height="150" srcset="http://sogilis.com/wp-content/uploads/2016/10/Têtes-one.png 724w, http://sogilis.com/wp-content/uploads/2016/10/Têtes-one-300x62.png 300w" sizes="(max-width: 724px) 100vw, 724px" />

<span style="font-weight: 400;">En terme de représentation, chaque image est une matrice de taille 92 x 128, qui contient des entiers entre 0 et 255 (les nuances de gris de chaque pixel). On peut aussi voir chaque image sous un autre angle : au lieu de la représenter par une matrice, on peut la modéliser par une seule ligne (en mettant toutes les lignes qui composent l&rsquo;image bout à bout). Chaque point (ou </span>_<span style="font-weight: 400;">vecteur</span>_<span style="font-weight: 400;">, en algèbre linéaire ce sont les mêmes notions) obtenu a alors 92 x 128 = 11 776 coordonnées. Nous allons donc lancer le PCA dans un espace à 11 776 dimensions !</span>

**On construit donc notre matrice représentant le jeu de données** <span style="font-weight: 400;">en plaçant, pour chaque ligne, le point correspondant à chaque image. Cette matrice a donc une taille de 6 x 11 776 (il y a 6 images en tout). On multiplie la transposée par elle-même, on normalise par le nombre d&rsquo;images, et on obtient la fameuse matrice de covariance de taille 11 776 x 11 776 à diagonaliser ! On constate qu&rsquo;on est déjà bien sorti du cadre de l&rsquo;exemple avec les points en deux dimensions, et que ces calculs peuvent vite devenir coûteux. Heureusement, la grande majorité des librairies d&rsquo;algèbre linéaire sont optimisées pour les calculs matriciels, via le recours à des </span>_<span style="font-weight: 400;">sparse matrices</span>_<span style="font-weight: 400;">, à certaines heuristiques de calculs ou encore en déportant le calcul sur GPU.</span>

<span style="font-weight: 400;">Une fois la diagonalisation terminée, le PCA nous retourne une liste de six vecteurs propres (car il y a six images distinctes dans le jeu de données) avec les valeurs propres associées. Ces vecteurs propres sont nécessairement de taille 11 776 = 92 x 128, la même taille que les images initiales. Et si on les imprimait, pour voir à quoi elles ressemblent ? Ci-dessous sont présentées les images par ordre décroissant de valeur propre.</span>

<img class="aligncenter size-full wp-image-1332" src="http://sogilis.com/wp-content/uploads/2016/10/Têtes-two.png" alt="tetes-two" width="725" height="148" srcset="http://sogilis.com/wp-content/uploads/2016/10/Têtes-two.png 725w, http://sogilis.com/wp-content/uploads/2016/10/Têtes-two-300x61.png 300w" sizes="(max-width: 725px) 100vw, 725px" />

<span style="font-weight: 400;">Intéressant, n&rsquo;est-ce pas ? </span>**Ces images** **montrent les directions dans lesquelles les images initiales varient le plus.** <span style="font-weight: 400;">Plusieurs caractéristiques sont remarquables :</span>

<li style="font-weight: 400;">
  <span style="font-weight: 400;">la dernière </span><i><span style="font-weight: 400;">image propre</span></i><span style="font-weight: 400;"> contribue très peu à expliquer la donnée (elle est toute « bruitée ») ;</span>
</li>
<li style="font-weight: 400;">
  <span style="font-weight: 400;">les autres images propres cristallisent plusieurs caractéristiques de l&rsquo;image (la couleur du fond, la teinte du visage, l&rsquo;importance des lunettes ou des rides).</span>
</li>

<span style="font-weight: 400;">Rien qu&rsquo;avec ces images, le PCA permet de classer les images initiales par rapport à des images </span>_<span style="font-weight: 400;">de référence</span>_<span style="font-weight: 400;">. On peut alors représenter chaque image initiale dans le repère formé par les </span>_<span style="font-weight: 400;">images propres</span>_<span style="font-weight: 400;">, qui du coup se ramène à 6 coordonnées (contre 11 776 initialement). Il est donc plus facile d&rsquo;étudier la donnée car il y a bien moins de variables à considérer).</span>

**La reconstruction de la troisième image du jeu de données est montrée ci-dessous**<span style="font-weight: 400;">, en appliquant successivement chaque composante principale à la précédente image. Il y a 7 images en tout, parce qu&rsquo;on part de l&rsquo;</span>_<span style="font-weight: 400;">image moyenne</span>_ <span style="font-weight: 400;">(calculée en faisant la moyenne des nuances de gris des images initiales) et en appliquant successivement chacune des 6 composantes principales.</span>

<img class="aligncenter size-full wp-image-1333" src="http://sogilis.com/wp-content/uploads/2016/10/Têtes-three.png" alt="tetes-three" width="727" height="302" srcset="http://sogilis.com/wp-content/uploads/2016/10/Têtes-three.png 727w, http://sogilis.com/wp-content/uploads/2016/10/Têtes-three-300x125.png 300w" sizes="(max-width: 727px) 100vw, 727px" />

<span style="font-weight: 400;">La reconstruction fonctionne, donc les mathématiques ne mentent pas ! Plus sérieusement, on remarque que les deux dernières reconstructions n&rsquo;apportent pas énormément de valeur à l&rsquo;image. On peut donc encoder l&rsquo;image avec seulement ses quatre principales composantes et conserver ses caractéristiques. Quel est </span>**le gain en terme d&rsquo;espace de stockage**<span style="font-weight: 400;">, pour toutes les images, en ne gardant que les quatre principales composantes ? Sans PCA, on a besoin de 6 x 11 776 = 70 656 octets (valeurs de 8 bits).</span>

<span style="font-weight: 400;">Avec PCA, on a besoin de stocker 58 904 octets :</span>

<li style="font-weight: 400;">
  <span style="font-weight: 400;">l&rsquo;image moyenne et les 4 vecteurs propres, soit 11 776 x (1 + 4) = 58 880 octets ;</span>
</li>
<li style="font-weight: 400;">
  <span style="font-weight: 400;">pour chaque image, sa représentation dans le repère des vecteurs propres, soit 6 x 4 octets.</span>
</li>

<span style="font-weight: 400;">Ce qui réalise un taux de compression de 16,63% sans pour autant perdre le contenu de l&rsquo;image. La qualité est dégradée évidemment, mais cela a en pratique peu d&rsquo;impact (en apprentissage automatique notamment) car </span>**l&rsquo;essence même de l&rsquo;image est préservée**<span style="font-weight: 400;">.</span>

&nbsp;

## **En résumé**

<span style="font-weight: 400;">Nous avons vu que la matrice de covariance issue du jeu de données initial est diagonalisable. L&rsquo;algorithme permet de récupérer une base de vecteurs propres de cette matrice de covariance ainsi que les valeurs propres associées. </span>**Plus grande est la valeur propre, plus le vecteur propre correspondant décrit l&rsquo;axe selon lequel les données sont le plus dispersées** <span style="font-weight: 400;">(et par conséquent décrit mieux le jeu de données).</span>

<span style="font-weight: 400;">Dans ce billet, nous avons introduit les concepts sur lesquels repose le PCA. Cette procédure mathématique cherche à </span>**décorréler les données pour en trouver les axes de variation prépondérants**<span style="font-weight: 400;">. Comme nous l&rsquo;avons vu, l&rsquo;analyse en composantes principales est applicable </span>_<span style="font-weight: 400;">a priori</span>_ <span style="font-weight: 400;">sur des données de provenances diverses. Elle permet d&rsquo;en déceler la structure, d&rsquo;expliquer la manière dont elles sont liées les unes avec les autres. Les applications de cette technique sont larges, et nous en avons détaillé une, axée sur la compression et la reconstruction d&rsquo;un ensemble d&rsquo;images.</span>

<span style="font-weight: 400;">C&rsquo;est tout pour aujourd&rsquo;hui !</span>

<span style="text-decoration: underline;"><a href="https://twitter.com/_dumontal"><span style="font-weight: 400;">Alexandre Dumont</span></a></span>

## **Références**

<li style="font-weight: 400;">
  <span style="text-decoration: underline;"><a href="http://setosa.io/ev/principal-component-analysis/"><span style="font-weight: 400;">Visualisation en 3D du PCA (en, html)</span></a></span>
</li>
<li style="font-weight: 400;">
  <span style="text-decoration: underline;"><a href="https://www.cs.princeton.edu/picasso/mats/PCA-Tutorial-Intuition_jp.pdf"><span style="font-weight: 400;">Analyse du bruit d&rsquo;un jeu de données et décomposition par valeurs singulières (en, pdf)</span></a></span>
</li>
<li style="font-weight: 400;">
  <span style="text-decoration: underline;"><a href="https://en.wikipedia.org/wiki/Principal_component_analysis"><span style="font-weight: 400;">Article détaillé sur Wikipedia (en, html)</span></a></span>
</li>