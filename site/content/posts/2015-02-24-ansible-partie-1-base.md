---
title: "Ansible partie 1 : La Base"
author: Sogilis
date: 2015-02-24T12:54:14+00:00
image: /img/2016/05/Sogilis-Christophe-Levet-Photographe-8824-e1462795824232.jpg
categories:
  - DÉVELOPPEMENT
tags:
  - ansible
  - devops

---
# La gestion de configuration

Ansible est un outil de déploiement automatique, il permet de facilement et surtout de manière reproductible, provisionner une machine. De manière concrète, cela permet :

* d'installer des paquets
* d'installer des fichiers de configuration
* de configurer les utilisateurs systèmes
* de configurer les services
* de réaliser n'importe quelle tâche d'administration que l'on pourrait réaliser par ssh

La gestion automatique du déploiement est cruciale pour permettre d'avoir un serveur dans un état connu. La configuration manuelle d'un serveur est bien pour apprendre, mais au bout de quelques mois en production, nous oublions tous ce que nous y avons fait. Il est donc très important de consigner ces opérations quelque part.

Le premier réflexe serait de recopier toutes les commandes qu'on exécute déjà manuellement dans un gros script shell. Cela atteint très vite ses limites. Cela impose une rigueur à toute épreuve, et bien souvent nécessite de trouver du premier coup les bonnes commandes. Par exemple, si vous créez un utilisateur, mais que vous oubliez de spécifier le bon UID la première fois, il vous faudra le supprimer pour le recréer. Votre script shell va alors être truffé de conditions à n'en plus finir afin de lui permettre de fonctionner quel que soit l'état de base du système.

Les systèmes de déploiement comme chef, puppet, cfengine ou ansible dont nous parlons pourvoient déjà à ce genre de circonstances. Ils fournissent nombre de modules de base permettant la majorité des tâches d'administration du système, et fonctionnant quel que soit l'état de base dans lequel le système se trouve. Ils fournissent aussi en général un langage de haut niveau permettant de décrire de manière plus simple et moins sujette à erreur que des scripts shell.

Une partie intéressante de ces systèmes concerne également la gestion d'un parc de serveurs. Ils intègrent des outils afin de déployer de multiples serveurs sur la base d'une configuration similaire. Nous n'aborderons pas cette partie afin de se concentrer sur les fondamentaux de la configuration de systèmes.

# Ansible, comment ça marche

Différents outils fonctionnent différemment. En ce qui concerne Ansible, ou plus particulièrement `ansible-playbook`, il s'agit d'un outil en ligne de commande qui va lire une configuration, se connecter à un serveur, et exécuter les commandes nécessaires sur ce serveur afin d'appliquer la configuration. Dans le jargon Ansible, cette configuration se nomme _Playbook_. Il s'agit de la liste des opérations à exécuter afin de configurer le système.

Notre premier hello world va utiliser deux fichiers. Vous avez d'abord besoin de décrire votre _playbook_. Ansible utilise une syntaxe YAML. Notre premier _playbook_ va être :

{{< highlight yml >}}
---
- hosts: perrin
  sudo: yes
  tasks:
    - shell: echo Hello World > /tmp/hello
{{< /highlight >}}

Vous le constatez peut-être, mais ce playbook nous indique que nous voulons nous connecter au serveur appelé perrin, que nous utiliserons sudo afin de gagner les droits administrateur, et que notre seule tâche sera d'exécuter une commande shell permettant d'écrire _Hello World_ dans `/tmp/hello`.

La seule chose que nous n'avons pas décrite, c'est comment accéder au serveur perrin. Pour cela, nous devons rédiger un fichier `hosts` comme celui-ci :

{{< highlight ini >}}
[perrin]
perrin.mildred.fr ansible_ssh_user=admin
{{< /highlight >}}

Il nous indique que dans le groupe perrin, nous avons un seul serveur dont le nom de domaine est `perrin.mildred.fr` et que le nom d'utilisateur pour s'y connecter en ssh est `admin`. Si nous voulions configurer plusieurs serveurs ensemble, il aurait été possible d'indiquer d'autres adresses sur les lignes suivantes.

Pour exécuter ce playbook sur ce serveur, la commande est la suivante :

{{< highlight bash >}}
ansible-playbook -i hosts hello/hello.yml
{{< /highlight >}}

Dont le résultat nous donne :

{{< highlight bash >}}
_______________
< PLAY [perrin] >
 ---------------
            ^__^
            (oo)_______
            (__)       )/
               ||----w |
               ||     ||

_________________
< GATHERING FACTS >
 -----------------
            ^__^
            (oo)_______
            (__)       )/
               ||----w |
               ||     ||

ok: [perrin.mildred.fr]
 ___________________________________________
< TASK: shell echo Hello World > /tmp/hello >
 -------------------------------------------
            ^__^
            (oo)_______
            (__)       )/
                ||----w |
                ||     ||

changed: [perrin.mildred.fr]
 ____________
< PLAY RECAP >
 ------------
            ^__^
            (oo)_______
            (__)       )/
               ||----w |
               ||     ||

perrin.mildred.fr          : ok=2    changed=1    unreachable=0    failed=0
{{< /highlight >}}

Si comme moi, vous trouvez cette sortie peu lisible, je vous encourage a indiquer dans votre environnement (dans `~/.zshenv`, `~/.bashrc` ou `~/.profile`) la variable d'environnement `ANSIBLE_NOCOWS=1`. N'oubliez pas de l'exporter avec le mot clef `export`. Vous devriez alors voir la sortie suivante :

{{< highlight bash >}}
PLAY [perrin] *****************************************************************

GATHERING FACTS ***************************************************************
ok: [perrin.mildred.fr]

TASK: [shell echo Hello World > /tmp/hello] ***********************************
changed: [perrin.mildred.fr]

PLAY RECAP ********************************************************************
perrin.mildred.fr          : ok=2    changed=1    unreachable=0    failed=0
{{< /highlight >}}

Nous pouvons visualiser les différentes tâches qui sont exécutées. Les tâches peuvent être dans plusieurs états, et cela est comptabilisé en fin d'exécution :

* ok : le serveur était déjà configuré, rien à faire
* changed : la configuration a été appliquée avec succès
* failed : une erreur est survenue lors de l'exécution
* unreachable : une précédente erreur a empêché l'exécution de cette tâche

Maintenant, vous êtes prêts à construire votre propre _playbook_. Nous n'avons pour le moment que survolé le module shell (qui nous permet d'exécuter des commandes shell), mais il existe plein d'autres modules. [La documentation de ces modules](http://docs.ansible.com/list_of_all_modules.html) est très bien faite, il faut s'y référer. Dans un prochain article, nous verrons comment construire facilement des modules personnalisés dans le cas où les modules proposés sont insuffisants.
