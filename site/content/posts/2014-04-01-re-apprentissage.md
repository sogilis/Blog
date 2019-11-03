---
title: Le Re-Apprentissage
author: Valentin
date: 2014-04-01T07:26:00+00:00
featured_image: /img/2016/04/0.Haut_page.jpg
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
  - 1706
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
  - apprentissage
---

Une équipe est continuellement en train d'apprendre. Sans que l'on s'en rende forcément compte, une quantité importante de savoir que l'on peut qualifier de nouveau est assimilé par les différents membres de l'équipe.

Si cette nouvelle connaissance n'est pas analysée, formalisée et partagée de manière intelligente, il y a fort à parier que le prochain équipier ayant besoin de cette information soit obligé de repasser par ce mécanisme d'apprentissage.

Nous avons été confronté à ce problème lorsque nous avons commencé à travailler sur le projet Squadrone System, où nous avons découvert un domaine nouveau, celui des drones.

Voici le processus que nous avons mis en place pour limiter le phénomène de ré-apprentissage.

## Catégoriser les connaissances

Nous avons tout d'abord catégorisé les différents types d'apprentissages. Cela nous a permis de mieux identifier les tâches sur lesquels l'apprentissage est le plus susceptible d'arriver. Cette liste va très probablement évoluer dans le temps, mais voici celle dont nous disposons pour l'instant :

- Les **Procédures** (installation d'un poste, modifier tel paramètre sur le drone…)
- Les **Études** (comment fonctionne un protocole, reverse engineering sur certains logiciels…)
- Les **Notes d'architectures**

![DroidPlanner Mobile Application](/img/tumblr/tumblr_inline_n2smvcq9H11szdlw2.png)

## Repérer où se trouve la connaissance

Une fois que les différents types de connaissance sont identifiés, il nous a fallu identifier les user stories susceptibles de contenir un nouveau savoir. Pour cela, nous examinons chaque story du backlog lors de la planification afin de déterminer si elle va générer de la connaissance à partager.

Si nous considérons la story éligible, nous ajoutons le fait de rédiger une étude ou une procédure à la définition du **done** pour cette strory et nous la re-estimons en prenant en compte le temps nécessaire à la formalisation. J'insiste sur l’intérêt d'ajouter un critère à la définition du **done** et de ne pas ajouter une autre story dans le backlog car elle sera la première à être supprimée dans le cas d'une itération difficile.

## Formaliser la connaissance

Lorsque l'on sait quand et quoi rédiger, il faut encore le faire de manière à ce que l'information soit facile à formaliser. Nous avons choisi le format **Markdown** qui permet de faire une mise en page de qualité à partir de simples fichiers texte.

Grâce à ce format, il est facile d’insérer des images et des liens dans les documents. Cette simplicité permet d'avoir des documents de meilleure qualité (plus clairs et mieux documentés).

![Installation](/img/tumblr/tumblr_inline_n2sn4plGID1szdlw2.png)

## Partager la connaissance

La documentation écrite doit être accessible à toute l'équipe. Comme nous disposons d'un format mergeable (**Markdown**) et que nous utilisons GitHub pour notre base de code, nous avons naturellement utilisé GitHub pour gérer notre documentation.

GitHub nous permet ainsi de consulter, de manière agréable, notre documentation en ligne (GitHub intègre le rendu **Markdown**), mais aussi de la modifier en ligne.

Notre documentation est donc consultable et modifiable en ligne, et versionnée.

![Adronaline doc](/img/tumblr/tumblr_inline_n2smvx5KGO1szdlw2.png)

## Tenir l'information à jour

Il est aussi primordial de tenir la documentation à jour tout au long du projet. Notre projet est récent et nous n'avons pas encore été (trop) confrontés à ce problème. Cependant, nous pensons qu'un outil simple augmente nos chances de tenir à jour cette documentation.

## Conclusion

Nous avons mis en place ce moyen de gérer la documentation il y a maintenant 4 itérations. Nous manquons parfois encore un peu de rigueur dans certaines phases de ce processus mais il commence à porter ses fruits. Nous avons une documentation à jour et relativement riche pour un projet qui n'a démarré que deux mois auparavant.
