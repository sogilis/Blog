---
title: 'Ansible partie 1 : La Base'
author: Tiphaine
date: 2015-02-24T12:54:14+00:00
featured_image: /wp-content/uploads/2016/05/Sogilis-Christophe-Levet-Photographe-8824-e1462795824232.jpg
tumblr_sogilisblog_permalink:
  - http://sogilisblog.tumblr.com/post/111949326826/ansible-partie-1-la-base
tumblr_sogilisblog_id:
  - 111949326826
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
  - 8977
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
  - devops

---
## **La gestion de configuration**

Ansible est un outil de déploiement automatique, il permet de facilement et surtout de manière reproductible, provisionner une machine. De manière concrète, cela permet :

  * d&rsquo;installer des paquets
  * d&rsquo;installer des fichiers de configuration
  * de configurer les utilisateurs systèmes
  * de configurer les services
  * de réaliser n&rsquo;importe quelle tâche d&rsquo;administration que l&rsquo;on pourrait réaliser par ssh

<!-- more -->

La gestion automatique du déploiement est cruciale pour permettre d&rsquo;avoir un serveur dans un état connu. La configuration manuelle d&rsquo;un serveur est bien pour apprendre, mais au bout de quelques mois en production, nous oublions tous ce que nous y avons fait. Il est donc très important de consigner ces opérations quelque part.

Le premier réflexe serait de recopier toutes les commandes qu&rsquo;on exécute déjà manuellement dans un gros script shell. Cela atteint très vite ses limites. Cela impose une rigueur à toute épreuve, et bien souvent nécessite de trouver du premier coup les bonnes commandes. Par exemple, si vous créez un utilisateur, mais que vous oubliez de spécifier le bon UID la première fois, il vous faudra le supprimer pour le recréer. Votre script shell va alors être truffé de conditions à n&rsquo;en plus finir afin de lui permettre de fonctionner quel que soit l&rsquo;état de base du système.

Les systèmes de déploiement comme chef, puppet, cfengine ou ansible dont nous parlons pourvoient déjà à ce genre de circonstances. Ils fournissent nombre de modules de base permettant la majorité des tâches d&rsquo;administration du système, et fonctionnant quel que soit l&rsquo;état de base dans lequel le système se trouve. Ils fournissent aussi en général un langage de haut niveau permettant de décrire de manière plus simple et moins sujette à erreur que des scripts shell.

Une partie intéressante de ces systèmes concerne également la gestion d&rsquo;un parc de serveurs. Ils intègrent des outils afin de déployer de multiples serveurs sur la base d&rsquo;une configuration similaire. Nous n&rsquo;aborderons pas cette partie afin de se concentrer sur les fondamentaux de la configuration de systèmes.

## **Ansible, comment ça marche**

Différents outils fonctionnent différemment. En ce qui concerne Ansible, ou plus particulièrement <tt>ansible-playbook</tt>, il s&rsquo;agit d&rsquo;un outil en ligne de commande qui va lire une configuration, se connecter à un serveur, et exécuter les commandes nécessaires sur ce serveur afin d&rsquo;appliquer la configuration. Dans le jargon Ansible, cette configuration se nomme _Playbook_. Il s&rsquo;agit de la liste des opérations à exécuter afin de configurer le système.

Notre premier hello world va utiliser deux fichiers. Vous avez d&rsquo;abord besoin de décrire votre _playbook_. Ansible utilise une syntaxe YAML. Notre premier _playbook_ va être :

<pre class="wp-code-highlight prettyprint">---
- hosts: perrin
  sudo: yes
  tasks:
    - shell: echo Hello World &gt; /tmp/hello
</pre>

Vous le constatez peut-être, mais ce playbook nous indique que nous voulons nous connecter au serveur appelé perrin, que nous utiliserons sudo afin de gagner les droits administrateur, et que notre seule tâche sera d&rsquo;exécuter une commande shell permettant d&rsquo;écrire _Hello World_ dans <tt>/tmp/hello</tt>.

La seule chose que nous n&rsquo;avons pas décrite, c&rsquo;est comment accéder au serveur perrin. Pour cela, nous devons rédiger un fichier <tt>hosts</tt> comme celui-ci :

<pre class="wp-code-highlight prettyprint">[perrin]
perrin.mildred.fr ansible_ssh_user=admin</pre>

Il nous indique que dans le groupe perrin, nous avons un seul serveur dont le nom de domaine est <tt>perrin.mildred.fr</tt> et que le nom d&rsquo;utilisateur pour s&rsquo;y connecter en ssh est <tt>admin</tt>. Si nous voulions configurer plusieurs serveurs ensemble, il aurait été possible d&rsquo;indiquer d&rsquo;autres adresses sur les lignes suivantes.

Pour exécuter ce playbook sur ce serveur, la commande est la suivante :

<pre class="wp-code-highlight prettyprint">ansible-playbook -i hosts hello/hello.yml</pre>

Dont le résultat nous donne :

<pre class="wp-code-highlight prettyprint">_______________
&lt; PLAY [perrin] &gt;
 ---------------
            ^__^
            (oo)_______
            (__)       )/
               ||----w |
               ||     ||

_________________
&lt; GATHERING FACTS &gt;
 -----------------
            ^__^
            (oo)_______
            (__)       )/
               ||----w |
               ||     ||

ok: [perrin.mildred.fr]
 ___________________________________________
&lt; TASK: shell echo Hello World &gt; /tmp/hello &gt;
 -------------------------------------------
            ^__^
            (oo)_______
            (__)       )/
                ||----w |
                ||     ||

changed: [perrin.mildred.fr]
 ____________
&lt; PLAY RECAP &gt;
 ------------
            ^__^
            (oo)_______
            (__)       )/
               ||----w |
               ||     ||

perrin.mildred.fr          : ok=2    changed=1    unreachable=0    failed=0</pre>

Si comme moi, vous trouvez cette sortie peu lisible, je vous encourage a indiquer dans votre environnement (dans <tt>~/.zshenv</tt>, <tt>~/.bashrc</tt> ou <tt>~/.profile</tt>) la variable d&rsquo;environnement <tt>ANSIBLE_NOCOWS=1</tt>. N&rsquo;oubliez pas de l&rsquo;exporter avec le mot clef <tt>export</tt>. Vous devriez alors voir la sortie suivante :

<pre class="wp-code-highlight prettyprint">PLAY [perrin] *****************************************************************

GATHERING FACTS ***************************************************************
ok: [perrin.mildred.fr]

TASK: [shell echo Hello World &gt; /tmp/hello] ***********************************
changed: [perrin.mildred.fr]

PLAY RECAP ********************************************************************
perrin.mildred.fr          : ok=2    changed=1    unreachable=0    failed=0</pre>

Nous pouvons visualiser les différentes tâches qui sont exécutées. Les tâches peuvent être dans plusieurs états, et cela est comptabilisé en fin d&rsquo;exécution :

  * ok : le serveur était déjà configuré, rien à faire
  * changed : la configuration a été appliquée avec succès
  * failed : une erreur est survenue lors de l&rsquo;exécution
  * unreachable : une précédente erreur a empêché l&rsquo;exécution de cette tâche

Maintenant, vous êtes prêts à construire votre propre _playbook_. Nous n&rsquo;avons pour le moment que survolé le module shell (qui nous permet d&rsquo;exécuter des commandes shell), mais il existe plein d&rsquo;autres modules. <span style="text-decoration: underline;"><a href="http://docs.ansible.com/list_of_all_modules.html" target="_blank">La documentation de ces modules</a></span> est très bien faite, il faut s&rsquo;y référer. Dans un prochain article, nous verrons comment construire facilement des modules personnalisés dans le cas où les modules proposés sont insuffisants.