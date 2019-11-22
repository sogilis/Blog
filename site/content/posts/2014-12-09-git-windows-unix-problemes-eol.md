---
title: Git, Windows, Unix et les problèmes de EOL (End Of Line)
author: Tiphaine
date: 2014-12-09T11:18:00+00:00
featured_image: /wp-content/uploads/2016/04/2.Developpement-1.jpg
tumblr_sogilisblog_permalink:
  - http://sogilisblog.tumblr.com/post/102281213361/git-windows-unix-et-les-problèmes-de-eol-end-of
tumblr_sogilisblog_id:
  - 102281213361
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
  - 6029
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
  - EndOfLine
  - EOL
  - git
  - gitattributes
  - Linux
  - Windows

---
Récemment, nous avions à créer un environnement de développement pour un projet web. Le client développe sous Windows. Préférant Unix dans l'équipe, nous avons commencé à travailler sur nos machines. Rapidement, nous avons eu un squelette d'application fonctionnelle dont les sources étaient versionnées sous Git.

On utilisait `Vagrant` pour faire tourner l'application avec une debian afin de coller à la configuration du serveur de production. Et puis, les install sur une machine Windows, ce n'est pas ma tasse de thé.

Après avoir testé et retesté les scripts de déploiement de `Vagrant` sur nos machines, nous avons lancé `vagrant up` sur la machine Windows suivi de `vagrant provision`.
  
Ce dernier, appelle un script shell, permettant de déployer la base de données MySQL associée au projet.

Et là, horreur, les scripts shells n'arrivent pas à se lancer. L'erreur est même bizarre puisque :

{{< highlight bash >}}
./scripts/mon_script.sh could not be found
{{< /highlight >}}

Je fais donc un `vagrant ssh` pour me connecter à la machine.

Et un simple `vim scripts/mon_script.sh` me donne un code :

{{< highlight bash >}}
# /bin/sh^M
// init ...^M
echo "blabla"^M
{{< /highlight >}}

Bref, le constat est clair : il y a des fins de lignes qui ne sont pas compatibles avec Unix et donc il produit une erreur.

## Rappel sur les différences de fin de lignes entre Unix et Windows

Dans un fichier texte, plusieurs conventions non compatibles existent pour représenter la fin de ligne ou la fin de paragraphe.

### Carriage Return Line Feed

Il s'agit d'une séquence de caractères qui indique le passage à une nouvelle ligne d'un texte dans les systèmes DOS/Windows.

En ASCII, c'est le caractère 13 suivi du caractère 10. En C et autres, il sera représenté par `rn`. `r` correspond à CR (Carriage Return) et `n` correspond à LF (Line Feed).

Le CRLF est surtout utilisé sous Windows.

**Un peu d'histoire** : Le saut de ligne était à l'origine une commande d'imprimante utilisée conjointement avec le retour chariot (CR). Après l'exécution d'un CRLF, la tête d'impression revient complètement à gauche et saute une ligne, prête à commencer une nouvelle ligne de texte.

### Line Feed

En informatique, le saut de ligne (LF, line feed) est un caractère de contrôle indiquant le passage à la ligne de texte suivante. Son code ASCII est 10 (0A en hexadécimal).

Le LF est utilisé sur les systèmes Unix/Linux et est représenté par `n`

## Revenons à notre problème avec Git

**Il faut donc spécifier à Git d'utiliser le Line Feed comme caractère de fin de ligne.**

**Remarque :** un simple “Find and Replace” ne fonctionnera pas sur le long terme, car à chaque opération modifiant la copie locale, Git va remettre des CRLF.

Pour cela on a plusieurs possibilités :

* utiliser la config `core.autocrlf` de Git avec éventuellement une option `--global` pour l'avoir sur tous ses repos. Mais la config n'est pas partagée et un nouvel utilisateur devra la spécifier au moment de démarrer sur le projet : pas idéal.
* utiliser les attributes de Git, c'est-à-dire créer un fichier `.gitattributes` à la racine du départ et y ajouter la ligne suivante `* text=auto eol=lf`. Ajouter le fichier .gitattributes en le committant ou en l'ajoutant à la staging area.

### Réinitialiser le repo

Pour cela, il suffit de :

{{< highlight bash >}}
git add . -u
git commit -m "Sauvegarder vos modifications en cours"
# supprimer tous les fichiers versionnés dans git
git rm -r --cached .
# reprendre les fichiers tel qu'ils étaient avant la suppression.
C'est avec cette commande que git va changer toutes les EOF avec
ce que l'on a spécifié dans le .gitattributes
git checkout -- .
# Enregister le changement de ligne
git add .
$ git commit -m "Normalize all the line endings"
{{< /highlight >}}

Et voilà, maintenant une personne qui clone le repo sera immédiatement dans la bonne configuration.

## Quelques liens intéressants

* [git config](http://git-scm.com/docs/git-config)
* [vagrant](https://www.vagrantup.com/)
* [EOF github](https://help.github.com/articles/dealing-with-line-endings/)