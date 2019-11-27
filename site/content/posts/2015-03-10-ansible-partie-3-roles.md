---
title: "Ansible partie 3 : Les rôles"
author: Sogilis
date: 2015-03-10T13:03:36+00:00
featured_image: /wp-content/uploads/2015/03/Sogilis-Christophe-Levet-Photographe-7503.jpg
categories:
  - DÉVELOPPEMENT
tags:
  - ansible
  - devops
  - roles

---
Dans notre précédent article, nous avons vu comment installer l'application [ipfs](https://github.com/jbenet/go-ipfs) sur notre serveur. Nous avons fait le tout de manière très simple, avec un playbook global. Cela est peu élégant si nous souhaitons déployer plusieurs services sur la même machine. Et comment faire pour découper une suite de tâches simples que nous voudrions pouvoir réutiliser ? La réponse à ces deux questions se trouve dans les rôles Ansible. Les rôles sont une manière un peu plus élégante d'inclure des tâches Ansible au sein d'autres tâches en déclarant des dépendances.

## Transformer notre playbook en rôle

Commençons par créer un rôle simple correspondant exactement au playbook que nous avions la dernière fois :

{{< highlight yml >}}
---
- hosts: perrin
  sudo: yes
  tasks:
    - go-install: name=go-ipfs package=github.com/jbenet/go-ipfs/cmd/ipfs
{{< /highlight >}}

Le rôle que nous allons créer va nécessiter de créer une arborescence dans un dossier `roles/` qui va contenir notre role nommé `ipfs` :

* `roles/ipfs/tasks/main.yml` : 
  {{< highlight yml >}}
  ---
  - go-install: name=go-ipfs package=github.com/jbenet/go-ipfs/cmd/ipfs
  {{< /highlight >}}

Notre nouveau playbook va maintenant contenir une dépendance envers ce rôle :

{{< highlight yml >}}
---
- hosts: perrin
  sudo: yes
  roles:
    - ipfs
{{< /highlight >}}

## Un second rôle : cjdns-docker

Ce qui est intéressant, c'est d'avoir plusieurs rôles. Nous allons donc voir comment déployer cjdns en utilisant docker avec un rôle.

* Ce rôle définit des variables dans `roles/cjdns-docker/vars/main.yml` :
  {{< highlight yml >}}
  ---
  name: cjdns
  {{< /highlight >}}

* et se compose de tâches définies dans un fichier `roles/cjdns-docker/tasks/main.yml` : 
  {{< highlight yml >}}
  ---
  - shell: docker pull mildred/cjdns
  - systemd-docker-service: name='{{name}}'
  - service: name='{{name}}' enabled=yes state=restarted
  - docker-datadir: name='{{name}}' volume=/etc/cjdns file=/cjdroute.conf
    register: cjdroute_conf
  - file: src='{{cjdroute_conf.file}}' dest='/etc/docker-{{name}}.conf' state=link
  {{< /highlight >}}

La variable `name` permet de nommer différents éléments du système correspondant au rôle. Elle a une valeur par défaut, mais pourra se redéfinir au niveau du playbook principal. Pour provisionner le container cjdns, il nous faut :

* récupérer le container avec un `docker pull`
* déclarer un service systemd pour démarrer le container comme un service système
* activer le service qui vient d'être créé
* trouver le chemin vers le fichier de configuration cjdns qui se trouve dans un volume docker séparé
* et créer un lien symbolique de ce fichier vers `/etc`.

Nous voyons avec cela comment utiliser les variables. Pour utiliser une variable, il existe la syntaxe `{{ *variable_name* }}`. Cette syntaxe correspond au langage de template [Jinja2](http://jinja.pocoo.org/) et nécessite d'inclure les variables entre quotes pour rester valide YAML. Voir la [documentation Ansible sur les variables](http://docs.ansible.com/playbooks_variables.html).

Les modules peuvent définir des variables de leur propre chef, mais il est également possible d'enregistrer le résultat d'un module dans une variable avec la syntaxe `register: *variable_name* `. Pour visualiser les champs disponibles, il faut utiliser l'option `-v` sur la ligne de commande lorsqu'on exécute le playbook. Dans notre exemple, un champ `file` est disponible, et sera utilisé avec la syntaxe `{{cjdroute_conf.file}}`.

L'utilisation de ce rôle dans le playbook principal nécessite de définir une variable au moment de l'inclusion du rôle :

{{< highlight yml >}}
---
- hosts: perrin
  sudo: yes
  vars:
    name: perrin
  roles:
    - ipfs
    - role: cjdns-docker
      name: '{{name}}-cjdroute'
{{< /highlight >}}

Si vous tentez d'exécuter ce role, il vous manquera les modules `systemd-docker-service` et `docker-datadir`. Leur conception n'implique rien de nouveau et voici leur code :

* `library/systemd-docker-service` :
  {{< highlight ini >}}
  #!/bin/bash

  changed=false
  failed=false
  res_code=0
  msg=Success
  exec 3>&1 >/dev/null 2>&1
  trap 'failed=true res_code=1 msg="Failed at line $LINENO"' ERR

  name=
  cmdline=
  after=
  . "$1"

  changed=true

  cat <<EOF >/tmp/$$.1
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

  :> /tmp/$$.2
  chmod +x /tmp/$$.2
  cat >>/tmp/$$.2 <<"EOF"
  #!/bin/bash

  name="$1"
  shift

  if ! id="$(/usr/bin/docker inspect --format="{{.ID}}" "$name-data" 2>/dev/null)"; then
    echo "Reusing $id"
    docker run --name "$name-data" --volumes-from "$name-data" --entrypoint /bin/true "$@"
  fi

  /usr/bin/docker rm "$name" 2>/dev/null
  set -x
  exec /usr/bin/docker run --name="$name" --volumes-from="$name-data" --rm --attach=stdout --attach=stderr "$@"

  if docker inspect --format="Reusing {{.ID}}" "$name" 2>/dev/null; then
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

  cat <<EOF >&3
  {
      "failed":  $failed,
      "changed": $changed,
      "msg":     "$msg"
  }
  EOF
  exit $res_code
  {{< /highlight >}}

* `library/docker-datadir` : 
  {{< highlight ini >}}
  #!/bin/bash

  changed=false
  failed=false
  res_code=0
  msg=Success
  {{< /highlight >}}
      
  {{< highlight yml >}}
  ---
  - shell: docker pull mildred/cjdns
  - systemd-docker-service: name='{{name}}'
  - service: name='{{name}}' enabled=yes state=restarted
  - docker-datadir: name='{{name}}' volume=/etc/cjdns file=/cjdroute.conf
    register: cjdroute_conf
  - file: src='{{cjdroute_conf.file}}' dest='/etc/docker-{{name}}.conf' state=link
  {{< /highlight >}}
    
  {{< highlight bash >}}
  exec 3>&1 >/dev/null 2>&1
  trap 'failed=true res_code=1 msg="Failed at line $LINENO"' ERR

  name=
  image_name=
  volume=
  file=
  variable=file
  . "$1"
  : ${image_name:="$name-data"}

  changed=false
  res="$(docker inspect -f "{{(index .Volumes "$volume")}}" "$image_name")$file"

  cat <<EOF >&3
  {
      "failed":    $failed,
      "changed":   $changed,
      "msg":       "$msg",
      "$variable": "$res"
  }
  EOF
  exit $res_code
  {{< /highlight >}}

## Un dernier rôle pour accéder par ssh à notre container

Nous voudrions pouvoir accéder au container docker en utilisant SSH avec un utilisateur particulier. Ceci peut se faire de manière générique pour tout container Docker, et c'est comme cela que nous l'implémenterons. Nous définirons un rôle pour ajouter un accès ssh, et l'utiliseront pour le docker cjdns.

Nous aurons besoin de `nsenter`, donc nous [l'installons avec docker](http://jpetazzo.github.io/2014/06/23/docker-ssh-considered-evil/). Ensuite, nous créons un utilisateur avec l'UID 0 (afin qu'il ait les permissions d'exécuter `nsenter`), et nous spécifions une clef ssh de login, avec la commande `nsenter` qui nous permettra d'entrer dans le container :

* `roles/docker-ssh/vars/main.yml` :
  {{< highlight yml >}}
  ---
  user: '{{name}}'
  shell: /bin/bash
  {{< /highlight >}}

* `roles/docker-ssh/tasks/main.yml` : 
  {{< highlight yml >}}
  ---
  - command: docker run --rm -v /usr/local/bin:/target jpetazzo/nsenter
  - user: name="{{user}}" uid=0 createhome=yes shell=/usr/sbin/nologin home='/home/{{user}}'
  - authorized_key: key="{{ssh_key}}" user='{{user}}' key_options='command="nsenter --target $(docker inspect --format {{ "{{.State.Pid}}" }} {{name}}) --mount --uts --ipc --net --pid {{shell}}"'
  {{< /highlight >}}

Pour utiliser ce nouveau rôle, nous allons le déclarer comme dépendance dans `roles/cjdns-docker/meta/main.yml` :

{{< highlight yml >}}
---
dependencies:
  - role: docker-ssh
    when: "'{{ssh_key}}' != ''"
{{< /highlight >}}

Et notre playbook principal va être augmenté afin de définir la variable `ssh_key` pour le rôle docker-cjdns (qui sera ensuite héritée par le rôle docker-ssh instancié par dépendance) :

{{< highlight yml >}}
---
- hosts: perrin
  sudo: yes
  vars:
    admin_sshkey: ssh-rsa AAA...vgcv
    name: perrin
  roles:
    - ipfs
    - role: cjdns-docker
      name: '{{name}}-cjdroute'
      ssh_key: '{{admin_sshkey}}'
{{< /highlight >}}

Nous avons vu dans cet article comment organiser notre code Ansible afin qu'il soit plus maintenable. Les rôles définissent des unités de code comme pourraient l'être des fonctions dans un langage plus classique. Il n'est pas possible d'invoquer un rôle directement au milieu d'une liste de tâches [dans ce cas, (la directive include](http://docs.ansible.com/playbooks_roles.html) et [le module _include vars_](http://docs.ansible.com/include_vars_module.html) existent), mais il est possible de définir des dépendances entre rôles. En guise d'exercice, il est laissé au soin du lecteur de décomposer le module `systemd-docker-service` en un rôle séparé.
