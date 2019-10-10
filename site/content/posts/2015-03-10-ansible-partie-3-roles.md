---
title: 'Ansible partie 3 : Les rôles'
author: Tiphaine
date: 2015-03-10T13:03:36+00:00
featured_image: /wp-content/uploads/2015/03/Sogilis-Christophe-Levet-Photographe-7503.jpg
tumblr_sogilisblog_permalink:
  - http://sogilisblog.tumblr.com/post/113251268996/ansible-partie-3-les-rôles
tumblr_sogilisblog_id:
  - 113251268996
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
  - 13540
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
  - roles

---
**Dans notre précédent article, nous avons vu comment installer l&rsquo;application <span style="text-decoration: underline;"><a href="https://github.com/jbenet/go-ipfs" target="_blank">ipfs</a></span> sur notre serveur. Nous avons fait le tout de manière très simple, avec un playbook global. Cela est peu élégant si nous souhaitons déployer plusieurs services sur la même machine. Et comment faire pour découper une suite de tâches simples que nous voudrions pouvoir réutiliser ? La réponse à ces deux questions se trouve dans les rôles Ansible. Les rôles sont une manière un peu plus élégante d&rsquo;inclure des tâches Ansible au sein d&rsquo;autres tâches en déclarant des dépendances.**

&nbsp;

<!-- more -->

## **Transformer notre playbook en rôle**

Commençons par créer un rôle simple correspondant exactement au playbook que nous avions la dernière fois :

<pre class="wp-code-highlight prettyprint">---
- hosts: perrin
  sudo: yes
  tasks:
    - go-install: name=go-ipfs package=github.com/jbenet/go-ipfs/cmd/ipfs
</pre>

Le rôle que nous allons créer va nécessiter de créer une arborescence dans un dossier <tt>roles/</tt> qui va contenir notre role nommé <tt>ipfs</tt> :

  * <tt>roles/ipfs/tasks/main.yml</tt> : <pre class="wp-code-highlight prettyprint">---
- go-install: name=go-ipfs package=github.com/jbenet/go-ipfs/cmd/ipfs</pre>

Notre nouveau playbook va maintenant contenir une dépendance envers ce rôle :

<pre class="wp-code-highlight prettyprint">---
- hosts: perrin
  sudo: yes
  roles:
    - ipfs
</pre>

## **Un second rôle : cjdns-docker**

Ce qui est intéressant, c&rsquo;est d&rsquo;avoir plusieurs rôles. Nous allons donc voir comment déployer cjdns en utilisant docker avec un rôle.

  * Ce rôle définit des variables dans <tt>roles/cjdns-docker/vars/main.yml</tt> : <pre class="wp-code-highlight prettyprint">---
name: cjdns</pre>

  * et se compose de tâches définies dans un fichier <tt>roles/cjdns-docker/tasks/main.yml</tt> : <pre class="wp-code-highlight prettyprint">---
- shell: docker pull mildred/cjdns
- systemd-docker-service: name=&#039;{{name}}&#039;
- service: name=&#039;{{name}}&#039; enabled=yes state=restarted
- docker-datadir: name=&#039;{{name}}&#039; volume=/etc/cjdns file=/cjdroute.conf
  register: cjdroute_conf
- file: src=&#039;{{cjdroute_conf.file}}&#039; dest=&#039;/etc/docker-{{name}}.conf&#039; state=link</pre>

La variable <tt>name</tt> permet de nommer différents éléments du système correspondant au rôle. Elle a une valeur par défaut, mais pourra se redéfinir au niveau du playbook principal. Pour provisionner le container cjdns, il nous faut :

  * récupérer le container avec un <tt>docker pull</tt>
  * déclarer un service systemd pour démarrer le container comme un service système
  * activer le service qui vient d&rsquo;être créé
  * trouver le chemin vers le fichier de configuration cjdns qui se trouve dans un volume docker séparé
  * et créer un lien symbolique de ce fichier vers <tt>/etc</tt>.

Nous voyons avec cela comment utiliser les variables. Pour utiliser une variable, il existe la syntaxe <tt>{{ *variable_name* }}</tt>. Cette syntaxe correspond au langage de template <span style="text-decoration: underline;"><a href="http://jinja.pocoo.org/" target="_blank">Jinja2</a></span> et nécessite d&rsquo;inclure les variables entre quotes pour rester valide YAML. Voir la <span style="text-decoration: underline;"><a href="http://docs.ansible.com/playbooks_variables.html" target="_blank">documentation Ansible sur les variables</a></span>.

Les modules peuvent définir des variables de leur propre chef, mais il est également possible d&rsquo;enregistrer le résultat d&rsquo;un module dans une variable avec la syntaxe <tt>register: *variable_name* </tt>. Pour visualiser les champs disponibles, il faut utiliser l&rsquo;option <tt>-v</tt> sur la ligne de commande lorsqu&rsquo;on exécute le playbook. Dans notre exemple, un champ <tt>file</tt> est disponible, et sera utilisé avec la syntaxe <tt>{{cjdroute_conf.file}}</tt>.

L&rsquo;utilisation de ce rôle dans le playbook principal nécessite de définir une variable au moment de l&rsquo;inclusion du rôle :

<pre class="wp-code-highlight prettyprint">---
- hosts: perrin
  sudo: yes
  vars:
    name: perrin
  roles:
    - ipfs
    - role: cjdns-docker
      name: &#039;{{name}}-cjdroute&#039;
</pre>

Si vous tentez d&rsquo;exécuter ce role, il vous manquera les modules <tt>systemd-docker-service</tt> et <tt>docker-datadir</tt>. Leur conception n&rsquo;implique rien de nouveau et voici leur code :

  * <tt>library/systemd-docker-service</tt> : <pre class="wp-code-highlight prettyprint">#!/bin/bash

changed=false
failed=false
res_code=0
msg=Success
exec 3&gt;&1 &gt;/dev/null 2&gt;&1
trap &#039;failed=true res_code=1 msg="Failed at line $LINENO"&#039; ERR

name=
cmdline=
after=
. "$1"

changed=true

cat &lt;&lt;EOF &gt;/tmp/$$.1
[Unit]
Description=Container $name
Requires=docker.io.service
After=docker.io.service $after

[Service]
Restart=always
ExecStart=/usr/local/bin/docker-start-run $name $cmdline
ExecStop=/usr/bin/docker stop -t 2 $name

[Install]
WantedBy=multi-user.target
EOF

:&gt; /tmp/$$.2
chmod +x /tmp/$$.2
cat &gt;&gt;/tmp/$$.2 &lt;&lt;"EOF"
#!/bin/bash

name="$1"
shift

if ! id="$(/usr/bin/docker inspect --format="{{.ID}}" "$name-data" 2&gt;/dev/null)"; then
  echo "Reusing $id"
  docker run --name "$name-data" --volumes-from "$name-data" --entrypoint /bin/true "$@"
fi

/usr/bin/docker rm "$name" 2&gt;/dev/null
set -x
exec /usr/bin/docker run --name="$name" --volumes-from="$name-data" --rm --attach=stdout --attach=stderr "$@"

if docker inspect --format="Reusing {{.ID}}" "$name" 2&gt;/dev/null; then
  exec /usr/bin/docker start -a "$name"
else
  exec /usr/bin/docker run --name="$name" --volumes-from="$name-data" --attach=stdout --attach=stderr "$@"
fi
EOF

if ! cmp /tmp/$$.2 /usr/local/bin/docker-start-run; then
    mv /tmp/$$.2 /usr/local/bin/docker-start-run
    chmod +x /usr/local/bin/docker-start-run
    changed=true
fi

if ! cmp /tmp/$$.1 /etc/systemd/system/$name.service; then
    mv /tmp/$$.1 /etc/systemd/system/$name.service
    systemctl daemon-reload
    changed=true
fi

rm -f /tmp/$$.1 /tmp/$$.2

cat &lt;&lt;EOF &gt;&3
{
    "failed":  $failed,
    "changed": $changed,
    "msg":     "$msg"
}
EOF
exit $res_code
</pre>

  * <tt>library/docker-datadir</tt> : <pre class="wp-code-highlight prettyprint">#!/bin/bash

changed=false
failed=false
res_code=0
msg=Success</pre>
    
    <pre class="wp-code-highlight prettyprint">---
- shell: docker pull mildred/cjdns
- systemd-docker-service: name=&#039;{{name}}&#039;
- service: name=&#039;{{name}}&#039; enabled=yes state=restarted
- docker-datadir: name=&#039;{{name}}&#039; volume=/etc/cjdns file=/cjdroute.conf
  register: cjdroute_conf
- file: src=&#039;{{cjdroute_conf.file}}&#039; dest=&#039;/etc/docker-{{name}}.conf&#039; state=link</pre>
    
    <pre class="wp-code-highlight prettyprint">exec 3&gt;&1 &gt;/dev/null 2&gt;&1
trap &#039;failed=true res_code=1 msg="Failed at line $LINENO"&#039; ERR

name=
image_name=
volume=
file=
variable=file
. "$1"
: ${image_name:="$name-data"}

changed=false
res="$(docker inspect -f "{{(index .Volumes "$volume")}}" "$image_name")$file"

cat &lt;&lt;EOF &gt;&3
{
    "failed":    $failed,
    "changed":   $changed,
    "msg":       "$msg",
    "$variable": "$res"
}
EOF
exit $res_code</pre>

## **Un dernier rôle pour accéder par ssh à notre container**

Nous voudrions pouvoir accéder au container docker en utilisant SSH avec un utilisateur particulier. Ceci peut se faire de manière générique pour tout container Docker, et c&rsquo;est comme cela que nous l&rsquo;implémenterons. Nous définirons un rôle pour ajouter un accès ssh, et l&rsquo;utiliseront pour le docker cjdns.

Nous aurons besoin de <tt>nsenter</tt>, donc nous <span style="text-decoration: underline;"><a href="http://jpetazzo.github.io/2014/06/23/docker-ssh-considered-evil/" target="_blank">l&rsquo;installons avec docker</a></span>. Ensuite, nous créons un utilisateur avec l&rsquo;UID 0 (afin qu&rsquo;il ait les permissions d&rsquo;exécuter <tt>nsenter</tt>), et nous spécifions une clef ssh de login, avec la commande <tt>nsenter</tt> qui nous permettra d&rsquo;entrer dans le container :

  * <tt>roles/docker-ssh/vars/main.yml</tt> : <pre class="wp-code-highlight prettyprint">---
user: &#039;{{name}}&#039;
shell: /bin/bash</pre>

  * <tt>roles/docker-ssh/tasks/main.yml</tt> : <pre class="wp-code-highlight prettyprint">---
- command: docker run --rm -v /usr/local/bin:/target jpetazzo/nsenter
- user: name="{{user}}" uid=0 createhome=yes shell=/usr/sbin/nologin home=&#039;/home/{{user}}&#039;
- authorized_key: key="{{ssh_key}}" user=&#039;{{user}}&#039; key_options=&#039;command="nsenter --target $(docker inspect --format {{ "{{.State.Pid}}" }} {{name}}) --mount --uts --ipc --net --pid {{shell}}"&#039;
</pre>

Pour utiliser ce nouveau rôle, nous allons le déclarer comme dépendance dans <tt>roles/cjdns-docker/meta/main.yml</tt> :

<pre class="wp-code-highlight prettyprint">---
dependencies:
  - role: docker-ssh
    when: "&#039;{{ssh_key}}&#039; != &#039;&#039;"</pre>

Et notre playbook principal va être augmenté afin de définir la variable <tt>ssh_key</tt> pour le rôle docker-cjdns (qui sera ensuite héritée par le rôle docker-ssh instancié par dépendance) :

<pre class="wp-code-highlight prettyprint">---
- hosts: perrin
  sudo: yes
  vars:
    admin_sshkey: ssh-rsa AAA...vgcv
    name: perrin
  roles:
    - ipfs
    - role: cjdns-docker
      name: &#039;{{name}}-cjdroute&#039;
      ssh_key: &#039;{{admin_sshkey}}&#039;
</pre>

Nous avons vu dans cet article comment organiser notre code Ansible afin qu&rsquo;il soit plus maintenable. Les rôles définissent des unités de code comme pourraient l&rsquo;être des fonctions dans un langage plus classique. Il n&rsquo;est pas possible d&rsquo;invoquer un rôle directement au milieu d&rsquo;une liste de tâches (dans ce cas, <span style="text-decoration: underline;"><a href="http://docs.ansible.com/playbooks_roles.html" target="_blank">la directive include</a></span> et <span style="text-decoration: underline;"><a href="http://docs.ansible.com/include_vars_module.html" target="_blank">le module include_</a><a href="http://docs.ansible.com/include_vars_module.html" target="_blank">vars</a></span> existent), mais il est possible de définir des dépendances entre rôles. En guise d&rsquo;exercice, il est laissé au soin du lecteur de décomposer le module <tt>systemd-docker-service</tt> en un rôle séparé.