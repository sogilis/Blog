---
title: Le mouvement NoSQL
author: Tiphaine
date: 2014-04-01T08:28:00+00:00
featured_image: /wp-content/uploads/2015/03/Sogilis-Christophe-Levet-Photographe-7461.jpg
tumblr_sogilisblog_permalink:
  - http://sogilisblog.tumblr.com/post/81375329046/le-mouvement-nosql
tumblr_sogilisblog_id:
  - 81375329046
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
  - 2736
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
  - columndb
  - documentdb
  - graphdb
  - keyvalue
  - nosql

---
**Ces dernières années témoignent d’un engouement certain autour des technologies <span style="line-height: 1.5;">permettant l’accumulation, l’analyse et la transformation de données très </span><span style="line-height: 1.5;">volumineuses (réseaux sociaux notamment). Dans l’optique de supporter des </span><span style="line-height: 1.5;">volumes de données grandissants, il est nécessaire de </span>délocaliser les procédures de traitement <span style="line-height: 1.5;">sur différentes machines et de </span>mutualiser les ressources <span style="line-height: 1.5;">de façon transparente pour l’utilisateur final.</span>**

&nbsp;

<img class="aligncenter size-full wp-image-1835" src="http://sogilis.com/wp-content/uploads/2014/04/tumblr_inline_n3b2avvoZ21sc5im4.png" alt="tumblr_inline_n3b2avvoZ21sc5im4" width="500" height="296" srcset="http://sogilis.com/wp-content/uploads/2014/04/tumblr_inline_n3b2avvoZ21sc5im4.png 500w, http://sogilis.com/wp-content/uploads/2014/04/tumblr_inline_n3b2avvoZ21sc5im4-300x178.png 300w" sizes="(max-width: 500px) 100vw, 500px" />

<!-- more -->

## **Le NoSQL, c’est quoi ?**

Le terme NoSQL référence une catégorie de systèmes de gestion de bases de données (SGBD) **distribués**, conçus pour la plupart dans le but de traiter des jeux de données volumineux dans des **délais acceptables** pour
  
l’utilisateur. Ils viennent ainsi enrichir le panel des moteurs de stockage traditionnels, dont la majorité sont des systèmes de stockage relationnels (SQL). Les deux catégories ne sont d’ailleurs pas destinées aux mêmes cas d’utilisation et diffèrent en bien des aspects : architecture logicielle et matérielle, fonctionnement interne et interprétation de l’information… Les systèmes NoSQL sont développés dans le souci de maintenir des temps de réponse bas malgré un débit de requêtes parfois très élevé. Leur **architecture** se veut **simple **: ils n’offrent pas les mêmes garanties que les bases relationnelles (contraintes ACID notamment). En particulier, l’absence de schéma structurel permet de **stocker des données hétérogènes** au sein d’une même base et d’accélérer les traitements, puisque certaines vérifications structurelles (intégrité des tables) n’ont plus lieu d’être.

&nbsp;

## **Et les bases de données relationnelles, ça suffit pas?**

Les bases de données relationnelles répondent à des cas d’utilisation très spécifiques et ne sont pas conçues pour répondre à tous les scénarios. En effet, le recours à une base relationnelle peut se révéler inadapté dans les conditions suivantes :

  * la base ne peut plus s’adapter à un large trafic à un coût acceptable
  * le nombre de tables requises pour maintenir le schéma relationnel s’est étendu de façon dégénérée par rapport à la quantité de données stockées
  * le schéma relationnel ne satisfait plus aux critères de performances
  * la base est soumise à un grand nombre de transactions temporaires

Souvent, la transition d’un système relationnel vers un système NoSQL est motivée par plusieurs raisons :

  * un très gros volume de données à stocker
  * des écritures fréquentes, massives, qui doivent être rapides et fiables
  * les lectures doivent être rapides et cohérentes
  * une bonne tolérance aux pannes
  * un schéma de données modifiable à la volée
  * des données sérialisables
  * la facilité d’administration (sauvegarde, restauration)
  * la parallélisation des traitements sur les données
  * l’absence de point de contention (Single Point of Failure)

&nbsp;

## **Comparatif NoSQL / Relationnel**

De façon générale, les systèmes NoSQL ont tendance à suivre les
  
caractéristiques suivantes (BASE) :

  1. **Basically Available **: le système satisfait à des contraintes de disponibilité (les données sont toujours accessibles en lecture et en écriture).
  2. **Soft state **: l’état du système change au cours du temps sur les différentes machines.
  3. **Eventually consistent **: l’état du système converge toujours vers l’état le plus récent au bout d’un certain laps de temps (les données sont actualisées sur tous les serveurs qui la stockent avec le temps).

Le tableau suivant expose des points de comparaison entre les systèmes relationnels et NoSQL.

<table>
  <tr>
    <th>
      Système
    </th>
    
    <th>
      NoSQL
    </th>
    
    <th>
      Relationnel
    </th>
  </tr>
  
  <tr>
    <th>
      Capacité de stockage
    </th>
    
    <td>
      Très élevée (> 1 To)
    </td>
    
    <td>
      Modérée (< 1 To)
    </td>
  </tr>
  
  <tr>
    <th>
      Architecture
    </th>
    
    <td>
      Distribuée
    </td>
    
    <td>
      Centralisée
    </td>
  </tr>
  
  <tr>
    <th>
      Modèle de données
    </th>
    
    <td>
      Destructuré
    </td>
    
    <td>
      Relationnel (tabulaire)
    </td>
  </tr>
  
  <tr>
    <th>
      Réponse à la charge
    </th>
    
    <td>
      Lecture et écriture
    </td>
    
    <td>
      Lecture en majorité
    </td>
  </tr>
  
  <tr>
    <th>
      Scalabilité
    </th>
    
    <td style="text-align: center;">
      Horizontale (nombre)
    </td>
    
    <td>
      Verticale (puissance)
    </td>
  </tr>
  
  <tr>
    <th>
      Moteur de requêtes
    </th>
    
    <td>
      Propre au système
    </td>
    
    <td>
      SQL
    </td>
  </tr>
  
  <tr>
    <th>
      Principales caractéristiques
    </th>
    
    <td>
      BASE
    </td>
    
    <td>
      ACID
    </td>
  </tr>
  
  <tr>
    <th>
      Ancienneté de la technologie
    </th>
    
    <td>
      Récente
    </td>
    
    <td>
      Eprouvée
    </td>
  </tr>
</table>

## 

## **Que retenir ?**

Ainsi, **les moteurs de stockage NoSQL ne sont pas destinés aux mêmes usages que les moteurs relationnels** traditionnels. Par exemple, les systèmes NoSQL ne supportent pas les contraintes d’intégrité qui sont inhérentes aux systèmes relationnels (et qui les rendent indispensables lorsque la cohérence de la base doit être garantie à tout moment).

De plus, il est important de remarquer que **les deux types de technologies peuvent très bien cohabiter au sein d’un même logiciel**. En effet, des volumes de données sensibles seront très bien exploités par une base de données relationnelle tandis qu’une solution NoSQL affichera de meilleures performances sur des bases volumineuses dont la structure change avec le temps.

La famille des bases de données NoSQL compte des systèmes très hétérogènes qui répondent chacun à des besoins très spécifiques. De façon générale, on arrive à les classer en **quatre grands ensembles **: les bases **clé-valeur**, les bases **documents**, les bases **orientées colonnes** et les bases **de type graphe**. Leurs particularités ainsi que les cas d’utilisation correspondants seront détaillés dans un prochain billet.

Sayonara 🙂

**<a href="http://twitter.com/asenseofhome" target="_blank">Alexandre Dumont</a>**