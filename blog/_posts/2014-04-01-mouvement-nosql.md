---
title: Le mouvement NoSQL
author: Alexandre Dumont
date: 2014-04-01T08:28:00+00:00
image: /img/2015-03-Sogilis-Christophe-Levet-Photographe-7461.jpg
categories:
  - Développement logiciel
tags:
  - columndb
  - documentdb
  - graphdb
  - keyvalue
  - nosql
---

Ces dernières années témoignent d’un engouement certain autour des technologies permettant l’accumulation, l’analyse et la transformation de données très volumineuses (réseaux sociaux notamment). Dans l’optique de supporter des volumes de données grandissants, il est nécessaire de délocaliser les procédures de traitement sur différentes machines et de mutualiser les ressources de façon transparente pour l’utilisateur final.

![](/img/2014-04-tumblr_inline_n3b2avvoZ21sc5im4.png 'NoSql')

## Le NoSQL, c’est quoi ?

Le terme NoSQL référence une catégorie de systèmes de gestion de bases de données (SGBD) **distribués**, conçus pour la plupart dans le but de traiter des jeux de données volumineux dans des **délais acceptables** pour

l’utilisateur. Ils viennent ainsi enrichir le panel des moteurs de stockage traditionnels, dont la majorité sont des systèmes de stockage relationnels (SQL). Les deux catégories ne sont d’ailleurs pas destinées aux mêmes cas d’utilisation et diffèrent en bien des aspects : architecture logicielle et matérielle, fonctionnement interne et interprétation de l’information… Les systèmes NoSQL sont développés dans le souci de maintenir des temps de réponse bas malgré un débit de requêtes parfois très élevé. Leur **architecture** se veut **simple **: ils n’offrent pas les mêmes garanties que les bases relationnelles (contraintes ACID notamment). En particulier, l’absence de schéma structurel permet de **stocker des données hétérogènes** au sein d’une même base et d’accélérer les traitements, puisque certaines vérifications structurelles (intégrité des tables) n’ont plus lieu d’être.

## Et les bases de données relationnelles, ça suffit pas?

Les bases de données relationnelles répondent à des cas d’utilisation très spécifiques et ne sont pas conçues pour répondre à tous les scénarios. En effet, le recours à une base relationnelle peut se révéler inadapté dans les conditions suivantes :

- la base ne peut plus s’adapter à un large trafic à un coût acceptable
- le nombre de tables requises pour maintenir le schéma relationnel s’est étendu de façon dégénérée par rapport à la quantité de données stockées
- le schéma relationnel ne satisfait plus aux critères de performances
- la base est soumise à un grand nombre de transactions temporaires

Souvent, la transition d’un système relationnel vers un système NoSQL est motivée par plusieurs raisons :

- un très gros volume de données à stocker
- des écritures fréquentes, massives, qui doivent être rapides et fiables
- les lectures doivent être rapides et cohérentes
- une bonne tolérance aux pannes
- un schéma de données modifiable à la volée
- des données sérialisables
- la facilité d’administration (sauvegarde, restauration)
- la parallélisation des traitements sur les données
- l’absence de point de contention (Single Point of Failure)

## Comparatif NoSQL / Relationnel

De façon générale, les systèmes NoSQL ont tendance à suivre les

caractéristiques suivantes (BASE) :

1. **Basically Available **: le système satisfait à des contraintes de disponibilité (les données sont toujours accessibles en lecture et en écriture).
2. **Soft state **: l’état du système change au cours du temps sur les différentes machines.
3. **Eventually consistent **: l’état du système converge toujours vers l’état le plus récent au bout d’un certain laps de temps (les données sont actualisées sur tous les serveurs qui la stockent avec le temps).

Le tableau suivant expose des points de comparaison entre les systèmes relationnels et NoSQL.

| Système                          | NoSQL                | Relationnel             |
| -------------------------------- | -------------------- | ----------------------- |
| **Capacité de stockage**         | Très élevée (> 1 To) | Modérée (< 1 To)        |
| **Architecture**                 | Distribuée           | Centralisée             |
| **Modèle de données**            | Destructuré          | Relationnel (tabulaire) |
| **Réponse à la charge**          | Lecture et écriture  | Lecture en majorité     |
| **Scalabilité**                  | Horizontale (nombre) | Verticale (puissance)   |
| **Moteur de requêtes**           | Propre au système    | SQL                     |
| **Principales caractéristiques** | BASE                 | ACID                    |
| **Ancienneté de la technologie** | Récente              | Eprouvée                |

## Que retenir ?

Ainsi, **les moteurs de stockage NoSQL ne sont pas destinés aux mêmes usages que les moteurs relationnels** traditionnels. Par exemple, les systèmes NoSQL ne supportent pas les contraintes d’intégrité qui sont inhérentes aux systèmes relationnels (et qui les rendent indispensables lorsque la cohérence de la base doit être garantie à tout moment).

De plus, il est important de remarquer que **les deux types de technologies peuvent très bien cohabiter au sein d’un même logiciel**. En effet, des volumes de données sensibles seront très bien exploités par une base de données relationnelle tandis qu’une solution NoSQL affichera de meilleures performances sur des bases volumineuses dont la structure change avec le temps.

La famille des bases de données NoSQL compte des systèmes très hétérogènes qui répondent chacun à des besoins très spécifiques. De façon générale, on arrive à les classer en **quatre grands ensembles **: les bases **clé-valeur**, les bases **documents**, les bases **orientées colonnes** et les bases **de type graphe**. Leurs particularités ainsi que les cas d’utilisation correspondants seront détaillés dans un prochain billet.

Sayonara 🙂
