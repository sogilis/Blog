---
title: "pure.js: template engine without markup"
author: Shanti
date: 2016-04-05T09:49:45+00:00
featured_image: /wp-content/uploads/2016/04/1.Produits.jpg
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
  - 2308
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
  - pure.js
  - template

---
**Ces derniers dojo, on a vu des langages vraiment sympa : Clojure avec OM et Elm. Par contre, il y a un petit truc qui me chiffonne : les templates.**

Autant faire du template en Lisp, ça passe assez bien. C'est fait pour ça. Mais avec Elm, ce n'est vraiment pas joli (mon opinion seulement). D'un point de vue propreté, je serais plus à l'aise avec du markup séparé du code. Comme ce qu'on faisait en xHTML à l'époque où ça existait. Le mantra c'était : séparer la logique (JS) de la sémantique (html) de la présentation (CSS). Et j'aime toujours ce mantra.

Pour vous aider à cette séparation, je vous propose **(pure.js)[https://beebole.com/pure/], un moteur de template sans markup**.

C'est du HTML sans même un attribut spécifique.

Comment ça marche ?

* Soit la structure JSON est très proche du markup : pure.js va directement remplir les balises HTML avec le contenu du JSON.
* Soit la structure est un peu différente – comme c'est souvent le cas si le JSON n'est pas spécifique au markup : on a un JSON intermédiaire qui permet de dire à quel nœud HTML chaque objet JSON doit être mappé. Le mapping se fait avec des sélecteurs CSS.

(Allez voir)[https://beebole.com/pure/], il y a un exemple simple en haut pour comprendre comment ça marche.

Dans la même veine, il existe aussi (Weld)[https://github.com/tmpvar/weld]. Il a cependant l'air moins puissant.