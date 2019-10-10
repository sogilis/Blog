---
title: 'Ansible partie 2 : Créer un module simple pour installer des projets Go'
author: Tiphaine
date: 2015-03-03T12:26:06+00:00
featured_image: /wp-content/uploads/2016/04/2.Developpement-e1460448074336.jpg
tumblr_sogilisblog_permalink:
  - http://sogilisblog.tumblr.com/post/112598984161/ansible-partie-2-créer-un-module-simple-pour
tumblr_sogilisblog_id:
  - 112598984161
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
  - 5062
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
  - ansible
  - bash
  - devops
  - shell

---
**La dernière fois, nous avions présenté le fonctionnement de base d&rsquo;Ansible. Comment il était possible de définir une liste de tâches dans un _playbook_ afin de les exécuter sur un serveur. Nous avions vu qu&rsquo;il existait bon nombre de modules fournis de base permettant de réaliser des tâches très diverses. Mais que faire, si on veut faire quelque chose qui n&rsquo;est pas prévu dans les modules prédéfinis ?**

Deux solutions :

  * A coup de tâches shell on exécute les commandes nécessaires, fastidieux, et peu maintenable.
  * On réalise un programme séparé (sous la forme d&rsquo;un script shell dans notre exemple) qui va exécuter la tâche désignée et va s&rsquo;interfacer en tant que module avec Ansible.

<!-- more -->

Un des grands avantages d&rsquo;Ansible est de permettre de créer des modules dans n&rsquo;importe quel langage de programmation. Il suffit que votre code soit exécutable, l&rsquo;interface avec Ansible se fait via des paramètres en ligne de commande et la sortie texte du programme. Si le shell est plus adapté, on peut écrire du shell. Si on aime le Python, c&rsquo;est possible. Le Ruby, bien sûr. Perl, Lua ou même en C, pourquoi pas.

&nbsp;

## **Interface avec les modules Ansible**

Un module Ansible s&rsquo;utilise comme suit :

<pre class="wp-code-highlight prettyprint">- module_name: parameters
</pre>

<tt>module_name</tt> étant le nom du module, _<tt>parameters</tt>_ étant une chaîne de caractères libre, généralement sous la forme <tt>clef=valeur</tt>, ceci n&rsquo;étant pas obligatoire. Lorsqu&rsquo;on utilise la forme <tt>clef=valeur</tt>, il est possible d&rsquo;utiliser les modules avec une autre syntaxe un peu plus détaillée :

<pre class="wp-code-highlight prettyprint">- module_name:
   key1: value1key2: value2
</pre>

Ceci est strictement équivalent à écrire :

<pre class="wp-code-highlight prettyprint">- module_name: key1=value1 key2=value2
</pre>

Lorsque ce module sera appelé, un programme au doux nom de <tt>module_name</tt> sera exécuté sur le serveur à déployer avec comme premier paramètre de ligne de commande un fichier contenant la ligne<tt>key1=value1 key2=value2</tt>. Le programme n&rsquo;a qu&rsquo;à lire ce fichier pour comprendre ce qu&rsquo;il doit faire, et pour les scripts shell, c&rsquo;est simple, parce que c&rsquo;est la syntaxe shell de définition de variables. Il suffit donc de sourcer ce fichier.

Pour indiquer le résultat, il doit écrire sur la sortie standard ou d&rsquo;erreur indifféremment un fichier JSON contenant des variables résultat, par exemple :

<pre class="wp-code-highlight prettyprint">{
    "failed":  false,
    "changed": false
}</pre>

Ceci indique à Ansible qu&rsquo;il n&rsquo;y a pas eu d&rsquo;erreur (variable <tt>failed</tt>), que le système n&rsquo;a pas été changé car il était déjà configuré (variable <tt>changed</tt>). Si la sortie du programme n&rsquo;est pas valide JSON, le module sera considéré comme ayant échoué.

&nbsp;

## **Un module pour installer des projets go**

Pour les besoins de cet article, nous allons faire un module qui installe un programme écrit dans le <span style="text-decoration: underline;"><a href="http://golang.org/" target="_blank">langage Go</a></span>. Une fois qu&rsquo;on a <tt>go</tt> installé, il est très simple et rapide de compiler un programme Go. En effet, tout est généralement compilé statiquement sans dépendances externes, et l&rsquo;outil <tt>go</tt> permet de récupérer récursivement toutes les sources nécessaires à un programme. Par exemple, pour installer le projet <span style="text-decoration: underline;"><a href="https://github.com/jbenet/go-ipfs" target="_blank">GitHub go-ipfs</a></span>, il suffit d&rsquo;exécuter les commandes suivantes :

<pre class="wp-code-highlight prettyprint">go get github.com/jbenet/go-ipfs/cmd/ipfs
go build github.com/jbenet/go-ipfs/cmd/ipfs
go install github.com/jbenet/go-ipfs/cmd/ipfs</pre>

<span style="font-family: serif;">Ceci va télécharger les sources dans  <tt>$GOPATH/src</tt>, compiler dans <tt>$GOPATH/pkg</tt> et installer le programme ipfs dans <tt>$GOPATH/bin</tt>.</span>

&nbsp;

## **Installation dans /usr/local avec stow**

Une autre astuce réside dans l&rsquo;installation dans <tt>/usr/local</tt> en utilisant <span style="text-decoration: underline;"><a href="https://www.gnu.org/software/stow/" target="_blank">stow</a></span>. C&rsquo;est un programme qui permet de gérer le préfixe <samp>/usr/local</samp> et avec des liens symboliques, permet de savoir quel fichier appartient à quelle installation. Le principe est simple, au lieu d&rsquo;installer un programme dans <tt>/usr/local/{bin,lib,share,…}</tt> directement, on l&rsquo;installe dans <tt>/usr/local/stow/progname/{bin,lib,share,…}</tt>. Ensuite on invoque stow et on lui demande de créer des liens symboliques dans <tt>/usr/local/{bin,lib,share,…}</tt> pointant vers les fichiers équivalents dans <tt>/usr/local/stow/progname/{bin,lib,share,…}</tt>.

Par exemple, si on considère le langage <span style="text-decoration: underline;"><a href="http://www.lua.org/" target="_blank">Lua</a></span> installé, nous trouvons les liens symboliques suivants :

<pre class="wp-code-highlight prettyprint">lrwxrwxrwx 1 root staff    21 août   6 14:17 /usr/local/bin/lua -&gt; ../stow/lua52/bin/lua
lrwxrwxrwx 1 root staff    22 août   6 14:17 /usr/local/bin/luac -&gt; ../stow/lua52/bin/luac
lrwxrwxrwx 1 root staff    31 mai   13  2014 /usr/local/include/lauxlib.h -&gt; ../stow/lua52/include/lauxlib.h
lrwxrwxrwx 1 root staff    31 mai   13  2014 /usr/local/include/luaconf.h -&gt; ../stow/lua52/include/luaconf.h
lrwxrwxrwx 1 root staff    27 mai   13  2014 /usr/local/include/lua.h -&gt; ../stow/lua52/include/lua.h
lrwxrwxrwx 1 root staff    29 mai   13  2014 /usr/local/include/lua.hpp -&gt; ../stow/lua52/include/lua.hpp
lrwxrwxrwx 1 root staff    30 mai   13  2014 /usr/local/include/lualib.h -&gt; ../stow/lua52/include/lualib.h
lrwxrwxrwx 1 root staff    26 mai   13  2014 /usr/local/lib/liblua.a -&gt; ../stow/lua52/lib/liblua.a
-rw-r--r-- 1 root staff  2204 nov.  16  2011 /usr/local/share/man/man1/lua.1
-rw-r--r-- 1 root staff  3071 nov.  16  2011 /usr/local/share/man/man1/luac.1</pre>

Cela nécessite d&rsquo;installer les programmes avec un préfixe particulier. Généralement cela se fait avec <tt>./configure –prefix=/usr/local/stow/progname</tt> ou <tt>cmake -DCMAKE_INSTALL_PREFIX=/usr/local/stow/progname</tt>.

&nbsp;

## **Un module pour installer un projet go avec stow**

Une première version du module pourrait être la suivante :

<pre class="wp-code-highlight prettyprint">#!/bin/sh
exec 3&gt;&1 &gt;/dev/null 2&gt;&1
. "$1"

export GOPATH="/usr/local/src/$name"
STOWDIR="/usr/local/stow/$name"

rm -rf "$GOPATH/bin" "$STOWDIR/bin"
mkdir -p "$STOWDIR/bin" "$GOPATH"
ln -s "$STOWDIR/bin" "$GOPATH/bin"

go get -u "$package"
go build "$package"
go install "$package"

cd /usr/local/stow/
stow -R "$name"

cat &lt;&lt;EOF &gt;&3
{
    "failed":  false,
    "changed": true
}
EOF
exit 0
</pre>

Ce module s&rsquo;utilise ainsi :

<pre class="wp-code-highlight prettyprint">- go-install: name=go-ipfs package=github.com/jbenet/go-ipfs/cmd/ipfs</pre>

Ce script va d&rsquo;abord supprimer le dossier <tt>bin</tt>, créer un dossier <tt>/usr/local/stow/$name/bin</tt> et faire pointer <tt>/usr/local/src/$name/bin</tt> vers ce dernier dossier. Ainsi <tt>go install</tt> placera directement les fichiers dans <tt>/usr/local/stow/$name/bin</tt>.

La commande pour installer un paquet stow doit être exécutée dans <tt>/usr/local/stow</tt>. C&rsquo;est <tt>stow -R $name</tt> (<tt>-R</tt> comme Restow).

Ne pas oublier la commande <tt>exec 3>&1 >/dev/null 2>&1</tt> qui ferme la sortie standard et d&rsquo;erreur afin d&rsquo;éviter que les programmes ne polluent le résultat JSON, et <tt>3>&1</tt> (avant les autres) qui permet d&rsquo;ouvrir le descripteur de fichier numéro 3 comme une nouvelle sortie standard. Le résultat JSON sera copié sur ce descripteur de fichier.

&nbsp;

## **Un peu de robustesse**

Afin de gérer les erreurs, le cas où les commandes exécutées retournent un code d&rsquo;erreur différent de zéro, nous allons utiliser bash au lieu du vénérable shell POSIX sh et utiliser la commande <span style="text-decoration: underline;"><a href="http://tldp.org/LDP/Bash-Beginners-Guide/html/sect_12_02.html" target="_blank">trap</a></span>. Nous allons aussi initialiser les variables dans le cas où notre environnement n&rsquo;est pas propre, et donner une valeur par défaut à la variable <tt>$name</tt> :

<pre class="wp-code-highlight prettyprint">#!/bin/bash

failed=false
res_code=0
msg=Success

trap &#039;failed=true res_code=1 msg="Failed at line $LINENO"&#039; ERR
exec 3&gt;&1 &gt;/dev/null 2&gt;&1

name=
package=
. "$1"
: ${name:="$(basename $package)"}

export GOPATH="/usr/local/src/$name"
STOWDIR="/usr/local/stow/$name"

rm -rf "$GOPATH/bin" "$STOWDIR/bin"
mkdir -p "$STOWDIR/bin" "$GOPATH"
ln -s "$STOWDIR/bin" "$GOPATH/bin"

go get -u "$package"
go build "$package"
go install "$package"

cd /usr/local/stow/
stow -R "$name"

cat &lt;&lt;EOF &gt;&3
{
    "failed":  $failed,
    "changed": true,
    "msg":     "$msg"
}
EOF
exit $res_code
</pre>

## **Utilisation du module**

Pour utiliser le module, il doit être placé dans un dossier <tt>library/</tt> au coté du _playbook_. Nous avons donc les fichiers suivants :

<pre class="wp-code-highlight prettyprint">ipfs.yml
hosts
library/go-install</pre>

Notre _playbook_ <tt>ipfs.yml</tt> pourrait être ainsi :

<pre class="wp-code-highlight prettyprint">---
- hosts: perrin
  sudo: yes
  tasks:
    - go-install: name=go-ipfs package=github.com/jbenet/go-ipfs/cmd/ipfs
</pre>

L&rsquo;exécution donne ceci :

<pre class="wp-code-highlight prettyprint">PLAY [perrin] *****************************************************************

GATHERING FACTS ***************************************************************
ok: [perrin.mildred.fr]

TASK: [go-install name=go-ipfs package=github.com/jbenet/go-ipfs/cmd/ipfs] ****
changed: [perrin.mildred.fr]

PLAY RECAP ********************************************************************
perrin.mildred.fr          : ok=2    changed=1    unreachable=0    failed=0</pre>

Vous avez maintenant pu voir le fonctionnement des modules Ansible, je vous encourage à jouer avec. Si vous étiez à l&rsquo;aise avec le shell, et redoutiez les outils de déploiement automatique — parce-qu&rsquo;il faut l&rsquo;avouer, le langage est parfois bien plus compliqué — vous êtes maintenant armé pour utiliser Ansible en toute simplicité. Dans un prochain article, nous verrons comment structurer des _playbooks_ Ansible lorsque vous souhaitez mixer différentes tâches.