---
title: Expérimentation de l’IOT dans les bureaux Sogilis
author: Tiphaine
date: -001-11-30T00:00:00+00:00
draft: true
image: /img/2017/06/node_closed.jpg
categories:
  - Non classé

---
Les objets connectés sont de plus en plus présents autour de nous et font partie des axes sur lesquels Sogilis souhaite montrer son savoir faire et mettre en avant son expertise. Après une sollicitation de l'avis des membres de la BU systèmes critiques sur le meilleur moyen d’aborder cette thématique au sein de l'équipe nous avons décidé d’instrumenter les bureaux avec différents capteurs et actionneurs.

# Le choix du matériel

Etant donné que l’expérience n’est pas destinée à être vendue mais représente juste une preuve de concept nous avons décidé de mettre en place une solution à faible coût.

L’idée initiale est d’équiper 5 bureaux de capteurs de température et de luminosité, de surveiller l’arrosage des plantes ainsi que la température de l’aquarium. Le budget avoisine les 120€.

Pour centraliser les données remontées nous avons choisi un Raspberry Pi 3. Les capteurs quant à eux sont reliés pour chaque zone de mesure à un arduino. La transmission se fait sans fil à l’aide des modules NRF24.

![node_open](/img/2017/06/node_open-217x300.jpg)

![node_closed](/img/2017/06/node_closed-300x200.jpg)

_Un noeud arduino qui transmet la luminosité et la température_

![Raspberry](/img/2017/06/Raspberry-300x159.jpg)

_Le Raspberry Pi relié à un arduino permettant la réception des données capteurs_

## La librairie NRF24

Pour communiquer entre les différents modules NRF24 nous utilisons la librairie suivante : [http://tmrh20.github.io/RF24/][1]

Cette librairie permet d’organiser le réseau de capteurs. Ainsi, certains capteurs peuvent servir de relais pour la communication jusqu’au Raspberry Pi. La librairie permet de faire aussi bien de la remontée de données depuis les capteurs que de la descente d’informations depuis le raspberry.

L’utilisation de la librairie est intuitive et assigne à chaque nœud un identifiant unique en plus de son adresse définie par l’utilisateur. Le Raspberry Pi a ainsi la possibilité de contacter chacun des nœuds de manière individuelle. Cela permet par exemple d’activer l’arrosage des plantes selon certaines conditions d'hygrométrie ou de température.

## L’architecture

![Article IOT](/img/2017/06/Article-IOT-1024x768.png)

Afin de stocker un grand nombre de données et de permettre à notre architecture d’être “scalable”, nous utilisons les services [SquareScale](http://www.squarescale.com). Ce choix permet d’envisager la mise en place de cette expérience IOT sur d’autres sites sans avoir à modifier la solution. En effet le serveur passe à l’échelle sans intervention de notre part.

À partir du moment où chaque nœud est identifié à l’intérieur d’un réseau et que chaque Raspberry Pi est identifié sur le serveur il n’y a aucune limite quant au nombre de sites équipés.

# Le résultat de l’expérience

Cela fait plusieurs semaines que les données des capteurs sont récoltées et stockées dans une base de donnée Postgres fournie par l’architecture mise en place sur [SquareScale](http://www.squarescale.com).

Les points à retenir :

- le coût d’un ensemble “capteurs - arduino - NRF24” reste en dessous des 10€, ce qui en fait une solution à très bas coût qui reste pour autant robuste et précise ;
- l’utilisation du module NRF24 facilite grandement la communication sans fil entre les différents nœuds ;
- SquareScale nous a permis de déployer très facilement la partie qui récolte les données envoyées par le Raspberry Pi.

La modularité d’un tel système en fait une solution très adaptée à l’instrumentation de zones plus ou moins grande. Il suffit en effet de rajouter un capteur dans la pièce pour que son identifiant unique soit ajouté en base de données et que les données qu’ils remontent soient consultables en ligne sans avoir à modifier la configuration du projet. La scalabilité d’un tel système le rend facile à mettre en place et nous souhaiterions à l’avenir mettre à l’épreuve cette facette du projet.

# Les perspectives

Cette expérience grandeur réelle nous a à tous, donné envie de mettre en place un tel système dans une usine ou dans un bâtiment complet. Nous pensons par exemple, à la récolte de données dans une usine dans laquelle le client souhaite connaître la température, l'hygrométrie ainsi que d'autres données qui pourraient lui être utiles. Il pourrait de cette manière prendre des actions de maintenance préventive ou décider de surveiller de plus près certaines de ses machines ou zones de production. Le gain de temps lors du déploiement et de la modification du réseau de capteurs communicant étant un avantage non négligeable dans ce genre de situations.

[1]: http://tmrh20.github.io/RF24/
