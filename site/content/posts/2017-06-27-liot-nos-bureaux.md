---
title: Expérimentation de l’IOT dans les bureaux Sogilis
author: Tiphaine
date: -001-11-30T00:00:00+00:00
draft: true
featured_image: /wp-content/uploads/2017/06/node_closed.jpg
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
  - 2
sbg_selected_sidebar:
  - 'a:1:{i:0;s:1:"0";}'
sbg_selected_sidebar_replacement:
  - 'a:1:{i:0;s:12:"Blog Sidebar";}'
sbg_selected_sidebar_2:
  - 'a:1:{i:0;s:1:"0";}'
sbg_selected_sidebar_2_replacement:
  - 'a:1:{i:0;s:0:"";}'
categories:
  - Non classé

---
Les objets connectés sont de plus en plus présents autour de nous et font partie des axes sur lesquels Sogilis souhaite montrer son savoir faire et mettre en avant son expertise. Après une sollicitation de l&rsquo;avis des membres de la BU systèmes critiques sur le meilleur moyen d’aborder cette thématique au sein de l&rsquo;équipe nous avons décidé d’instrumenter les bureaux avec différents capteurs et actionneurs.

# <span style="font-weight: 400;">Le choix du matériel</span>

Etant donné que l’expérience n’est pas destinée à être vendue mais représente juste une preuve de concept nous avons décidé de mettre en place une solution à faible coût.
  
L’idée initiale est d’équiper 5 bureaux de capteurs de température et de luminosité, de surveiller l’arrosage des plantes ainsi que la température de l’aquarium. Le budget avoisine les 120€.
  
Pour centraliser les données remontées nous avons choisi un Raspberry Pi 3. Les capteurs quant à eux sont reliés pour chaque zone de mesure à un arduino. La transmission se fait sans fil à l’aide des modules NRF24.

<img class="aligncenter size-medium wp-image-1953" src="http://sogilis.com/wp-content/uploads/2017/06/node_open-217x300.jpg" alt="node_open" width="217" height="300" srcset="http://sogilis.com/wp-content/uploads/2017/06/node_open-217x300.jpg 217w, http://sogilis.com/wp-content/uploads/2017/06/node_open-768x1060.jpg 768w, http://sogilis.com/wp-content/uploads/2017/06/node_open-742x1024.jpg 742w" sizes="(max-width: 217px) 100vw, 217px" />
  
<img class="aligncenter size-medium wp-image-1952" src="http://sogilis.com/wp-content/uploads/2017/06/node_closed-300x200.jpg" alt="node_closed" width="300" height="200" srcset="http://sogilis.com/wp-content/uploads/2017/06/node_closed-300x200.jpg 300w, http://sogilis.com/wp-content/uploads/2017/06/node_closed-768x512.jpg 768w, http://sogilis.com/wp-content/uploads/2017/06/node_closed-1024x682.jpg 1024w" sizes="(max-width: 300px) 100vw, 300px" />

<p style="text-align: center;">
  <i><span style="font-weight: 400;">Un noeud arduino qui transmet la luminosité et la température</span></i>
</p>

<img class="aligncenter size-medium wp-image-1954" src="http://sogilis.com/wp-content/uploads/2017/06/Raspberry-300x159.jpg" alt="Raspberry" width="300" height="159" srcset="http://sogilis.com/wp-content/uploads/2017/06/Raspberry-300x159.jpg 300w, http://sogilis.com/wp-content/uploads/2017/06/Raspberry-768x408.jpg 768w, http://sogilis.com/wp-content/uploads/2017/06/Raspberry-1024x544.jpg 1024w" sizes="(max-width: 300px) 100vw, 300px" />

<p style="text-align: center;">
  <i><span style="font-weight: 400;">Le Raspberry Pi relié à un arduino permettant la réception des données capteurs</span></i>
</p>

<h2 style="text-align: left;">
  <span style="font-weight: 400;">La librairie NRF24</span>
</h2>

Pour communiquer entre les différents modules NRF24 nous utilisons la librairie suivante : [<span style="text-decoration: underline;">http://tmrh20.github.io/RF24/</span>][1] 
  
Cette librairie permet d’organiser le réseau de capteurs. Ainsi, certains capteurs peuvent servir de relais pour la communication jusqu’au Raspberry Pi. La librairie permet de faire aussi bien de la remontée de données depuis les capteurs que de la descente d’informations depuis le raspberry.
  
L’utilisation de la librairie est intuitive et assigne à chaque nœud un identifiant unique en plus de son adresse définie par l’utilisateur. Le Raspberry Pi a ainsi la possibilité de contacter chacun des nœuds de manière individuelle. Cela permet par exemple d’activer l’arrosage des plantes selon certaines conditions d&rsquo;hygrométrie ou de température.

## <span style="font-weight: 400;">L’architecture</span>

<img class="aligncenter size-large wp-image-1957" src="http://sogilis.com/wp-content/uploads/2017/06/Article-IOT-1024x768.png" alt="Article IOT" width="669" height="502" srcset="http://sogilis.com/wp-content/uploads/2017/06/Article-IOT.png 1024w, http://sogilis.com/wp-content/uploads/2017/06/Article-IOT-300x225.png 300w, http://sogilis.com/wp-content/uploads/2017/06/Article-IOT-768x576.png 768w" sizes="(max-width: 669px) 100vw, 669px" />

<span style="font-weight: 400;">Afin de stocker un grand nombre de données et de permettre à notre architecture d’être “scalable”, nous utilisons les services <a href="http://www.squarescale.com">SquareScale</a>. Ce choix permet d’envisager la mise en place de cette expérience IOT sur d’autres sites sans avoir à modifier la solution. En effet le serveur passe à l’échelle sans intervention de notre part.</span>

<span style="font-weight: 400;">À partir du moment où chaque nœud est identifié à l’intérieur d’un réseau et que chaque Raspberry Pi est identifié sur le serveur il n’y a aucune limite quant au nombre de sites équipés.</span>

# <span style="font-weight: 400;">Le résultat de l’expérience</span>

<span style="font-weight: 400;">Cela fait plusieurs semaines que les données des capteurs sont récoltées et stockées dans une base de donnée Postgres fournie par l’architecture mise en place sur <a href="http://www.squarescale.com">SquareScale</a>.</span>

<span style="font-weight: 400;">Les points à retenir :</span>

<li style="font-weight: 400;">
  <span style="font-weight: 400;">le coût d’un ensemble “capteurs &#8211; arduino &#8211; NRF24” reste en dessous des 10€, ce qui en fait une solution à très bas coût qui reste pour autant robuste et précise ;</span>
</li>
<li style="font-weight: 400;">
  <span style="font-weight: 400;">l’utilisation du module NRF24 facilite grandement la communication sans fil entre les différents nœuds ;</span>
</li>
<li style="font-weight: 400;">
  <span style="font-weight: 400;">SquareScale nous a permis de déployer très facilement la partie qui récolte les données envoyées par le Raspberry Pi.</span>
</li>

<span style="font-weight: 400;">La modularité d’un tel système en fait une solution très adaptée à l’instrumentation de zones plus ou moins grande. Il suffit en effet de rajouter un capteur dans la pièce pour que son identifiant unique soit ajouté en base de données et que les données qu’ils remontent soient consultables en ligne sans avoir à modifier la configuration du projet. La scalabilité d’un tel système le rend facile à mettre en place et nous souhaiterions à l’avenir mettre à l’épreuve cette facette du projet.</span>

# <span style="font-weight: 400;">Les perspectives</span>

Cette expérience grandeur réelle nous a à tous, donné envie de mettre en place un tel système dans une usine ou dans un bâtiment complet. Nous pensons par exemple, à la récolte de données dans une usine dans laquelle le client souhaite connaître la température, l&rsquo;hygrométrie ainsi que d&rsquo;autres données qui pourraient lui être utiles. Il pourrait de cette manière prendre des actions de maintenance préventive ou décider de surveiller de plus près certaines de ses machines ou zones de production. Le gain de temps lors du déploiement et de la modification du réseau de capteurs communicant étant un avantage non négligeable dans ce genre de situations.

 [1]: http://tmrh20.github.io/RF24/