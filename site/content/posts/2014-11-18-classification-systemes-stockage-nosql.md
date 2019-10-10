---
title: Classification des systèmes de stockage NoSQL
author: Tiphaine
date: 2014-11-18T14:03:33+00:00
featured_image: /wp-content/uploads/2014/11/Sogilis-Christophe-Levet-Photographe-8877.jpg
tumblr_sogilisblog_permalink:
  - http://sogilisblog.tumblr.com/post/102957493551/classification-des-systèmes-de-stockage-nosql
tumblr_sogilisblog_id:
  - 102957493551
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
  - 6882
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
  - cassandra
  - couchdb
  - documentdb
  - graphdb
  - hbase
  - mongodb
  - nosql
  - redis
  - riak

---
Dans un <span style="text-decoration: underline;"><a href="http://sogilis.com/blog/mouvement-nosql/" target="_blank">billet précédent</a></span>, nous avons établi une brève description des systèmes de stockage NoSQL (“_Not Only SQL_”) en partant des cas d&rsquo;utilisation qu&rsquo;ils visent à résoudre. Après avoir dégagé des points de comparaison entre ces technologies et les bases de données relationnelles, plus traditionnelles, nous en avons conclu que les moteurs de stockage NoSQL ne sont pas destinés aux mêmes usages que les bases relationnelles classiques. Par conséquent, ces deux technologies peuvent très bien cohabiter au sein d&rsquo;un même logiciel sans interférer entre elles ; l&rsquo;idée étant de toujours utiliser un outil adapté au problème qu&rsquo;on souhaite résoudre.

La famille des systèmes NoSQL compte des systèmes très hétérogènes qui répondent chacun à des besoins très spécifiques. De façon générale, on arrive à les classer en quatre grands ensembles : les bases **clé-valeur**, **les bases documents**, **les bases orientées colonnes** et **les bases de type graphe**.

&nbsp;

<!-- more -->

## **Les bases de données clé-valeur**

Une base de données clé-valeur est assimilée à une collection (un dictionnaire) de paires (clé, valeur) où la clé et la valeur sont des chaînes de caractères quelconques. Le système de stockage ne connait pas la structure de l&rsquo;information qu&rsquo;il manipule (s&rsquo;agit-il d&rsquo;une date ? d&rsquo;un numéro de téléphone ? d&rsquo;un article de blog ?) et l&rsquo;information ne peut être retrouvée que par l&rsquo;intermédiaire de la clé qui lui est associée.

Puisque les requêtes se font uniquement sur les clés, les bases clé-valeur sont très peu expressives en termes de langage d&rsquo;interrogation de la base. De plus, le système n&rsquo;ayant pas d&rsquo;indice sur la structure de l&rsquo;information qu&rsquo;il stocke, tous les traitements (extraction du contenu, application de filtres…) doivent être effectués en dehors du système par l&rsquo;utilisateur. En particulier, il est très difficile pour de tels systèmes de ne mettre à jour (ou de ne lire) qu&rsquo;une seule partie de la valeur associée à une clé. Il est en effet plus aisé de lire et de réécrire complètement la donnée.

De par leur simplicité de fonctionnement, **les bases de données clé-valeur sont très facilement scalables** : des systèmes comme Redis ou Riak sont capables de gérer des millions &#8211; voire des milliards &#8211; d&rsquo;entrées et garantissent des temps de réponse en lecture et en écriture très bas. Ils sont majoritairement utilisés pour cacher du contenu en temps réel et ainsi décharger des bases de données plus structurées mais aussi plus lente à traiter l&rsquo;information.

Exemples : Riak, Redis, Amazon DynamoDB, MemCached…

&nbsp;

<img class="aligncenter size-full wp-image-1830" src="http://sogilis.com/wp-content/uploads/2014/11/tumblr_inline_ncppxsqeBr1sc5im4.png" alt="tumblr_inline_ncppxsqeBr1sc5im4" width="500" height="289" srcset="http://sogilis.com/wp-content/uploads/2014/11/tumblr_inline_ncppxsqeBr1sc5im4.png 500w, http://sogilis.com/wp-content/uploads/2014/11/tumblr_inline_ncppxsqeBr1sc5im4-300x173.png 300w" sizes="(max-width: 500px) 100vw, 500px" />

## 

## **Les bases de données documents**

Les bases de données orientées document consistent en une collection de paires (clé, document) où le document lui-même une collection de paires (clé, valeur). En ce sens, on peut voir dans ces bases de données une version raffinée et généralisée des bases clé-valeur. Le document est l&rsquo;unité d&rsquo;information stockée, et la scalabilité de tels systèmes est en général très bonne. Le partitionnement de l&rsquo;information se fait sur la clé principale, tout comme dans le cas des bases de données clé-valeur.

L&rsquo;unité d&rsquo;information stockée est ici le document qui encode et encapsule la donnée dans un format semi-structuré (comme le XML ou le JSON). L&rsquo;information dispose de ce fait d&rsquo;une structure interne, ce qui permet un langage de requête bien plus expressif que pour les ensembles clé-valeur. En effet, le système est capable de **filtrer un document selon les attributs demandés**, et même de les classer entre eux (par ordre alphabétique, par exemple). L&rsquo;adoption d&rsquo;un format semi-structuré pour modéliser l&rsquo;information laisse une grande flexibilité quant à la structure du document, facilitant ainsi son **évolutivité au cours du temps**.

Exemples : MongoDB, RethinkDB, CouchDB, Terrastore…

&nbsp;

<img class="aligncenter size-full wp-image-1825" src="http://sogilis.com/wp-content/uploads/2014/11/tumblr_inline_ncppyebVo51sc5im4.png" alt="tumblr_inline_ncppyebVo51sc5im4" width="500" height="283" srcset="http://sogilis.com/wp-content/uploads/2014/11/tumblr_inline_ncppyebVo51sc5im4.png 500w, http://sogilis.com/wp-content/uploads/2014/11/tumblr_inline_ncppyebVo51sc5im4-300x170.png 300w" sizes="(max-width: 500px) 100vw, 500px" />

## 

## **Les bases de données orientées colonnes**

Dans les bases orientées colonnes, les tables dans lesquelles les données sont stockées traditionnellement en SQL sont partitionnées verticalement (suivant les colonnes). L&rsquo;information est représentée sous forme de colonnes indexées par une même clé. Au sein de ce type de système, une même donnée peut être fragmentée sur plusieurs machines distinctes.

Ces systèmes favorisent les opérations sur des attributs isolés de l&rsquo;information stockée. En effet, avec un tel partitionnement de l&rsquo;information **il n&rsquo;est plus nécessaire de retrouver l&rsquo;intégralité d&rsquo;une ligne si on ne souhaite récupérer qu&rsquo;un seul attribut de celle-ci**. De plus, puisque chaque colonne est stockée sur une machine particulière, les systèmes orientés colonnes sont très efficaces lorsqu&rsquo;il s&rsquo;agit d&rsquo;effectuer des **opérations d&rsquo;agrégation** sur des attributs précis (comme un calcul de somme, de valeur maximale ou moyenne…). En revanche, puisque les données sont partitionnées sur plusieurs machines, ces systèmes sont peu recommandés lorsqu&rsquo;il est nécessaire de modifier régulièrement les lignes intégralement. En effet les lignes doivent alors être rechargées depuis des machines/disques distincts.

De par leur structure, ces systèmes supportent bien le partitionnement sur plusieurs machines. Puisque l&rsquo;unité de stockage est la colonne, l&rsquo;information est plus facilement accessible &#8211; dans certains cas d&rsquo;utilisation &#8211; puisqu&rsquo;il n&rsquo;est pas nécessaire de verrouiller l&rsquo;accès à toute la ligne le temps de la lecture/écriture. Les moteurs de stockage orientés colonnes peuvent être utilisés pour implémenter des systèmes de fichiers distribués fiables, assurant une redondance des données automatique.

Exemples : Apache HBase, Apache Cassandra, Hypertable, Apache Accumulo…

<img class="aligncenter size-full wp-image-1827" src="http://sogilis.com/wp-content/uploads/2014/11/tumblr_inline_ncppyr3M7h1sc5im4.png" alt="tumblr_inline_ncppyr3M7h1sc5im4" width="500" height="224" srcset="http://sogilis.com/wp-content/uploads/2014/11/tumblr_inline_ncppyr3M7h1sc5im4.png 500w, http://sogilis.com/wp-content/uploads/2014/11/tumblr_inline_ncppyr3M7h1sc5im4-300x134.png 300w" sizes="(max-width: 500px) 100vw, 500px" />

&nbsp;

## **Les bases de données de type graphe**

Une base de données orientée graphe est une base de données orientée objet utilisant la théorie des graphes, donc avec des nœuds et des arcs, permettant de représenter et stocker les données. Par définition, une base de données orientée graphe correspond à un système de stockage qui respecte des relations d&rsquo;adjacence entre éléments dits “voisins” : chaque voisin d&rsquo;une entité est accessible grâce à un pointeur physique. Ces systèmes tirent parti des algorithmes standards issus de la théorie des graphes pour manipuler les données. Il n’y a pas besoin de calculer un index sur les données, puisque la base peut être entièrement parcourue efficacement (plus court chemin &#8211; _Dijkstra_, parcours en profondeur, en largeur…). Ces algorithmes sont optimisés, revus et corrigés depuis de nombreuses années. Ces bases de données sont ainsi plutôt adaptées lorsqu’il s’agit de traiter des informations présentant un haut degré de corrélation.

Un tel type de structure se révèle ainsi pertinent dans le cas de données complexes. En effet, les bases graphes sont idéales pour des recherches du type “partir d&rsquo;un nœud et parcourir le graphe” plutôt que “trouver toutes les entités du type X”, plus adaptées aux bases de données relationnelles traditionnelles. Il est cependant possible dans cette catégorie de bases d&rsquo;effectuer des recherches de ce dernier type, en couplant le système de stockage à un système d&rsquo;indexation tel que Apache Lucene (ou ses dérivés Apache SolR/ElasticSearch).

Les moteurs de stockage de type graphes sont particulièrement appropriés lorsqu&rsquo;il s&rsquo;agit d&rsquo;exploiter les relations entre les données (_eg_ des connaissances entre des personnes au sein d&rsquo;un réseau social). Les bases de données orientées graphes sont essentiellement utilisées dans la modélisation des réseaux sociaux, dans lesquels il est possible de déterminer rapidement les profils associés à un profil donné, ou le degré de séparation entre des profils distincts.

Par construction, ces bases de données **n&rsquo;offrent pas une bonne scalabilité horizontale** (_ie_ par accroissement du nombre de serveurs) car les mécanismes de synchronisation des écritures sur des graphes nécessite des opérations complexes. Ces systèmes sont donc fragiles au partitionnement des données sur des supports physiques distincts. Dans ce cas, la mise à l&rsquo;échelle peut être compensée par une augmentation de la puissance de calcul/stockage/mémoire vive du serveur.

Exemples : Neo4J, Infinite Graph, DEX…

<img class="aligncenter size-full wp-image-1828" src="http://sogilis.com/wp-content/uploads/2014/11/tumblr_inline_ncppz4EuZo1sc5im4.png" alt="tumblr_inline_ncppz4EuZo1sc5im4" width="500" height="282" srcset="http://sogilis.com/wp-content/uploads/2014/11/tumblr_inline_ncppz4EuZo1sc5im4.png 500w, http://sogilis.com/wp-content/uploads/2014/11/tumblr_inline_ncppz4EuZo1sc5im4-300x169.png 300w" sizes="(max-width: 500px) 100vw, 500px" />

&nbsp;

## **Cohérence, disponibilité et partitionnement**

A la suite de cette description, on comprend que le mouvement des bases de données NoSQL contient plusieurs approches qui ont une architecture qui leur est propre et qui traitent des cas d’utilisation bien définis. Il convient donc de choisir l&rsquo;outil qui répond le mieux au problème posé, à la fois en termes de modélisation mais aussi de répartition des données. En parallèle de cette classification, il existe trois caractéristiques très importantes à prendre en compte lors du choix d&rsquo;un moteur de stockage : la **cohérence** des données, la **disponibilité** des données et le **partitionnement physique** des données.

Un système est dit **cohérent** lorsque chacun de ses clients dispose de la même vue d&rsquo;ensemble des données qu&rsquo;il détient à un instant précis. Lorsqu&rsquo;une modification sur les données a lieu, les changements sont soit visibles par tous, soit invisibles de tous.

La **disponibilité** des données signifie que chaque client doit pouvoir lire et écrire dans la base sans subir de “temps morts” dus à des erreurs de réseau et/ou de machines.

Enfin, un système de stockage distribué est dit tolérant au **partitionnement physique** lorsqu&rsquo;il supporte la distribution de la charge de stockage sur des machines physiques distinctes, interconnectées par un réseau. Un tel système est entre autres capable de contourner une panne d&rsquo;un de ses nœuds en redirigeant automatiquement les requêtes sur d&rsquo;autres nœuds disponibles.

Un résultat connu sous le nom de <span style="text-decoration: underline;"><a href="http://en.wikipedia.org/wiki/CAP_theorem" target="_blank">lemme de Brewer <em>(en)</em></a></span> prouve que seulement deux de ces caractéristiques sur trois peuvent être présentes simultanément au sein d&rsquo;un système de gestion de bases de données (qu&rsquo;il soit NoSQL ou non). Les systèmes relationnels, par exemple, supportent très bien la disponibilité et la cohérence des données mais sont relativement pas (ou peu) adaptés au partitionnement physique &#8211; bien que certains travaux aillent dans ce sens, notamment sur _PostgreSQL_. Les systèmes NoSQL, quant à eux, sont conçus pour être distribués sur un réseau de machines physiques, ce qui implique un compromis entre la cohérence des données et la disponibilité des serveurs. Souvent, ces systèmes implémentent une notion de **cohérence finale** (_ie_ les modifications sur les données sont propagées sur toutes les machines au bout d&rsquo;un certain temps) afin de garantir une haute disponibilité des données.

&nbsp;

<img class="aligncenter size-full wp-image-1829" src="http://sogilis.com/wp-content/uploads/2014/11/tumblr_inline_ncpr1fhc5T1sc5im4.png" alt="tumblr_inline_ncpr1fhc5T1sc5im4" width="500" height="359" srcset="http://sogilis.com/wp-content/uploads/2014/11/tumblr_inline_ncpr1fhc5T1sc5im4.png 500w, http://sogilis.com/wp-content/uploads/2014/11/tumblr_inline_ncpr1fhc5T1sc5im4-300x214.png 300w" sizes="(max-width: 500px) 100vw, 500px" />

## 

## **Références**

  1. Un catalogue à jour des systèmes de stockage NoSQL existants.
  
    <span style="text-decoration: underline;"><a href="http://nosql-database.org/" target="_blank">nosql-database.org</a></span>
  2. Une vue approfondie de plusieurs catégories de systèmes NoSQL.
  
    <span style="text-decoration: underline;"><a href="https://en.wikipedia.org/wiki/NoSQL" target="_blank">Not Only SQL <em>(en)</em></a></span>

**Alexandre**