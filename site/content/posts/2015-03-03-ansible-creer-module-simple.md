---
title: "Ansible partie 2 : Créer un module simple pour installer des projets Go"
author: Sogilis
date: 2015-03-03T12:26:06+00:00
image: /img/2016/04/2.Developpement-e1460448074336.jpg
categories:
  - DÉVELOPPEMENT
tags:
  - ansible
  - bash
  - devops
  - shell

---
La dernière fois, nous avions présenté le fonctionnement de base d'Ansible. Comment il était possible de définir une liste de tâches dans un _playbook_ afin de les exécuter sur un serveur. Nous avions vu qu'il existait bon nombre de modules fournis de base permettant de réaliser des tâches très diverses. Mais que faire, si on veut faire quelque chose qui n'est pas prévu dans les modules prédéfinis ?

Deux solutions :

* A coup de tâches shell on exécute les commandes nécessaires, fastidieux, et peu maintenable.
* On réalise un programme séparé (sous la forme d'un script shell dans notre exemple) qui va exécuter la tâche désignée et va s'interfacer en tant que module avec Ansible.

Un des grands avantages d'Ansible est de permettre de créer des modules dans n'importe quel langage de programmation. Il suffit que votre code soit exécutable, l'interface avec Ansible se fait via des paramètres en ligne de commande et la sortie texte du programme. Si le shell est plus adapté, on peut écrire du shell. Si on aime le Python, c'est possible. Le Ruby, bien sûr. Perl, Lua ou même en C, pourquoi pas.

## Interface avec les modules Ansible

Un module Ansible s'utilise comme suit :

{{< highlight yml >}}
- module_name: parameters
{{< /highlight >}}

`module_name` étant le nom du module, _`parameters`_ étant une chaîne de caractères libre, généralement sous la forme `clef=valeur`, ceci n'étant pas obligatoire. Lorsqu'on utilise la forme `clef=valeur`, il est possible d'utiliser les modules avec une autre syntaxe un peu plus détaillée :

{{< highlight yml >}}
- module_name:
   key1: value1key2: value2
{{< /highlight >}}

Ceci est strictement équivalent à écrire :

{{< highlight yml >}}
- module_name: key1=value1 key2=value2
{{< /highlight >}}

Lorsque ce module sera appelé, un programme au doux nom de `module_name` sera exécuté sur le serveur à déployer avec comme premier paramètre de ligne de commande un fichier contenant la ligne`key1=value1 key2=value2`. Le programme n'a qu'à lire ce fichier pour comprendre ce qu'il doit faire, et pour les scripts shell, c'est simple, parce que c'est la syntaxe shell de définition de variables. Il suffit donc de sourcer ce fichier.

Pour indiquer le résultat, il doit écrire sur la sortie standard ou d'erreur indifféremment un fichier JSON contenant des variables résultat, par exemple :

{{< highlight json >}}
{
    "failed":  false,
    "changed": false
}
{{< /highlight >}}

Ceci indique à Ansible qu'il n'y a pas eu d'erreur (variable `failed`), que le système n'a pas été changé car il était déjà configuré (variable `changed`). Si la sortie du programme n'est pas valide JSON, le module sera considéré comme ayant échoué.

## Un module pour installer des projets go

Pour les besoins de cet article, nous allons faire un module qui installe un programme écrit dans le [langage Go](http://golang.org/). Une fois qu'on a `go` installé, il est très simple et rapide de compiler un programme Go. En effet, tout est généralement compilé statiquement sans dépendances externes, et l'outil `go` permet de récupérer récursivement toutes les sources nécessaires à un programme. Par exemple, pour installer le projet [GitHub go-ipfs](https://github.com/jbenet/go-ipfs), il suffit d'exécuter les commandes suivantes :

{{< highlight bash >}}
go get github.com/jbenet/go-ipfs/cmd/ipfs
go build github.com/jbenet/go-ipfs/cmd/ipfs
go install github.com/jbenet/go-ipfs/cmd/ipfs
{{< /highlight >}}

Ceci va télécharger les sources dans  `$GOPATH/src`, compiler dans `$GOPATH/pkg` et installer le programme ipfs dans `$GOPATH/bin`.

## Installation dans /usr/local avec stow

Une autre astuce réside dans l'installation dans `/usr/local` en utilisant [stow](https://www.gnu.org/software/stow/). C'est un programme qui permet de gérer le préfixe `/usr/local` et avec des liens symboliques, permet de savoir quel fichier appartient à quelle installation. Le principe est simple, au lieu d'installer un programme dans `/usr/local/{bin,lib,share,…}` directement, on l'installe dans `/usr/local/stow/progname/{bin,lib,share,…}`. Ensuite on invoque stow et on lui demande de créer des liens symboliques dans `/usr/local/{bin,lib,share,…}` pointant vers les fichiers équivalents dans `/usr/local/stow/progname/{bin,lib,share,…}`.

Par exemple, si on considère le langage [Lua](http://www.lua.org/) installé, nous trouvons les liens symboliques suivants :

{{< highlight bash >}}
lrwxrwxrwx 1 root staff    21 août   6 14:17 /usr/local/bin/lua -> ../stow/lua52/bin/lua
lrwxrwxrwx 1 root staff    22 août   6 14:17 /usr/local/bin/luac -> ../stow/lua52/bin/luac
lrwxrwxrwx 1 root staff    31 mai   13  2014 /usr/local/include/lauxlib.h -> ../stow/lua52/include/lauxlib.h
lrwxrwxrwx 1 root staff    31 mai   13  2014 /usr/local/include/luaconf.h -> ../stow/lua52/include/luaconf.h
lrwxrwxrwx 1 root staff    27 mai   13  2014 /usr/local/include/lua.h -> ../stow/lua52/include/lua.h
lrwxrwxrwx 1 root staff    29 mai   13  2014 /usr/local/include/lua.hpp -> ../stow/lua52/include/lua.hpp
lrwxrwxrwx 1 root staff    30 mai   13  2014 /usr/local/include/lualib.h -> ../stow/lua52/include/lualib.h
lrwxrwxrwx 1 root staff    26 mai   13  2014 /usr/local/lib/liblua.a -> ../stow/lua52/lib/liblua.a
-rw-r--r-- 1 root staff  2204 nov.  16  2011 /usr/local/share/man/man1/lua.1
-rw-r--r-- 1 root staff  3071 nov.  16  2011 /usr/local/share/man/man1/luac.1
{{< /highlight >}}

Cela nécessite d'installer les programmes avec un préfixe particulier. Généralement cela se fait avec `./configure –prefix=/usr/local/stow/progname` ou `cmake -DCMAKE_INSTALL_PREFIX=/usr/local/stow/progname`.

## Un module pour installer un projet go avec stow

Une première version du module pourrait être la suivante :

{{< highlight ini >}}
#!/bin/sh
exec 3>&1 >/dev/null 2>&1
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

cat <<EOF >&3
{
    "failed":  false,
    "changed": true
}
EOF
exit 0
{{< /highlight >}}

Ce module s'utilise ainsi :

{{< highlight bash >}}
- go-install: name=go-ipfs package=github.com/jbenet/go-ipfs/cmd/ipfs
{{< /highlight >}}

Ce script va d'abord supprimer le dossier `bin`, créer un dossier `/usr/local/stow/$name/bin` et faire pointer `/usr/local/src/$name/bin` vers ce dernier dossier. Ainsi `go install` placera directement les fichiers dans `/usr/local/stow/$name/bin`.

La commande pour installer un paquet stow doit être exécutée dans `/usr/local/stow`. C'est `stow -R $name` (`-R` comme Restow).

Ne pas oublier la commande `exec 3>&1 >/dev/null 2>&1` qui ferme la sortie standard et d'erreur afin d'éviter que les programmes ne polluent le résultat JSON, et `3>&1` (avant les autres) qui permet d'ouvrir le descripteur de fichier numéro 3 comme une nouvelle sortie standard. Le résultat JSON sera copié sur ce descripteur de fichier.

## Un peu de robustesse

Afin de gérer les erreurs, le cas où les commandes exécutées retournent un code d'erreur différent de zéro, nous allons utiliser bash au lieu du vénérable shell POSIX sh et utiliser la commande [trap](http://tldp.org/LDP/Bash-Beginners-Guide/html/sect_12_02.html). Nous allons aussi initialiser les variables dans le cas où notre environnement n'est pas propre, et donner une valeur par défaut à la variable `$name` :

{{< highlight ini >}}
#!/bin/bash

failed=false
res_code=0
msg=Success

trap 'failed=true res_code=1 msg="Failed at line $LINENO"' ERR
exec 3>&1 >/dev/null 2>&1

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

cat <<EOF >&3
{
    "failed":  $failed,
    "changed": true,
    "msg":     "$msg"
}
EOF
exit $res_code
{{< /highlight >}}

## Utilisation du module

Pour utiliser le module, il doit être placé dans un dossier `library/` au coté du _playbook_. Nous avons donc les fichiers suivants :

{{< highlight bash >}}
ipfs.yml
hosts
library/go-install
{{< /highlight >}}

Notre _playbook_ `ipfs.yml` pourrait être ainsi :

{{< highlight yml >}}
---
- hosts: perrin
  sudo: yes
  tasks:
    - go-install: name=go-ipfs package=github.com/jbenet/go-ipfs/cmd/ipfs
{{< /highlight >}}

L'exécution donne ceci :

{{< highlight bash >}}
PLAY [perrin] *****************************************************************

GATHERING FACTS ***************************************************************
ok: [perrin.mildred.fr]

TASK: [go-install name=go-ipfs package=github.com/jbenet/go-ipfs/cmd/ipfs] ****
changed: [perrin.mildred.fr]

PLAY RECAP ********************************************************************
perrin.mildred.fr          : ok=2    changed=1    unreachable=0    failed=0
{{< /highlight >}}

Vous avez maintenant pu voir le fonctionnement des modules Ansible, je vous encourage à jouer avec. Si vous étiez à l'aise avec le shell, et redoutiez les outils de déploiement automatique — parce-qu'il faut l'avouer, le langage est parfois bien plus compliqué — vous êtes maintenant armé pour utiliser Ansible en toute simplicité. Dans un prochain article, nous verrons comment structurer des _playbooks_ Ansible lorsque vous souhaitez mixer différentes tâches.
