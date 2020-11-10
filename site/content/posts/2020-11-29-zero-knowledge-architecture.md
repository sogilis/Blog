---
title: Sécurité et éthique avec l'Architecture Zero Knowledge
author: Mathieu W.
date: 2020-11-20
image: /img/image-name.jpeg
categories:
  - cat1
tags:
  - cysec
  - architecture
  - crypto
  - ZKA
---

## Introduction

On retrouve une quantité grandissante de données très sensibles stockées dans le cloud. Suite aux différents scandales de fuite d'informations la conscience du grand public sur les problématiques de vie privée en ligne et de sécurité des données n'a cessée de croître. Cela soulève de nombreuses questions, qui stocke mes données ? Qui d'autre peut y avoir accès ? Et pendant le transport de ces données sur le réseau ? 
On doit donner à l'utilisateur le pouvoir de garder le contrôle sur ses données, savoir qui a accès à quoi et pendant combien de temps ?

L'architecture Zero Knowledge (ou ZKA) est une approche de design d'applications qui permet de donner sélectivement l'accès à des données ou de vérifier des conditions sur des données sans avoir à donner l'accès direct aux informations. 
C'est une approche architecturale qui met la priorité sur la vie privée des utilisateurs, en integrant la sécurité profondément dans le design du logiciel il est possible de de garantir que seul l'utilisateur peut les déchiffrer les données, les acteurs de la transmission et du stockage ne peuvent donc pas exploiter les données. Le système permet d'utiliser les informations stockées sur des services externes cependant sans divulguer plus que le strictement nécessaire.

## Quelle utilité ? 

Il y a de nombreux domaines d'applications possibles et certaines entreprises utilisent déjà cette architecture ou certains de ses grands principes dans des produits, par exemple, **[Signal](https://signal.org/blog/private-contact-discovery/)**, **[NordPass](https://nordpass.com/features/zero-knowledge-architecture/)** ou **[CryptPad](https://blog.cryptpad.fr/2017/02/20/Time-to-Encrypt-the-Cloud/)** qui sont respectivement, une application de messagerie chiffrée, un gestionnaire de mots de passe et un concurrent à google suite. Le lien vers CryptPad est un article contenant une liste d'autre service zero knowledge.
Etant donné qu'il s'agit uniquement d'un design pattern il pourrait être appliqué à presque tous les domaines, pour mieux comprendre nous allons nous concentrer sur un exemple, jouer au loto en ligne.

Pour prouver son âge typiquement on montre une pièce d'identité, après vérification aucune donnée n'est conservée. Cependant sur internet ce n'est pas si simple, et si on en vient à montrer une pièce d'identité, on la numérise puis la transmets. Ceci se fait généralement de manière non chiffrée ce qui représente déjà un problème, d'autant plus que la pièce d'identité contient plus d'informations que nécessaire pour prouver qu'on a le droit de jouer au loto. Mais également après vérification nous ne savons pas vraiment comment sont gérées les données, malgré les RGPD il y a toujours des doutes sur les pratiques de stockage des données. 

Maintenant imaginons qu'il existe une application comme le **[Dossier Médical Partagé](https://www.dmp.fr/)** qui gère le suivi médical et l'identité en adhérant aux principes zero knowledge. Si Billy veut s'inscrire sur un site de loto en ligne il doit prouver qu'il est majeur, dans le cas où le site accepte ce mode d'identification Billy peut le faire sans dévoiler son âge exact ou son identité. Etant donné que le système contient aussi ses informations médicales le site du loto pourrait utiliser l'API pour vérifier que Billy n'a pas d'historique d'addiction aux jeux d'argent avant de lui permettre de jouer de grosses sommes. L'accès aux données sera nécessairement validé par Billy, et son historique médical exact ne sera pas révélé, l'application répondra avec un score abstrait ou un booléen. 


## Axes de mise en oeuvre

  1. Authentification à preuve à divulgation nulle de connaissance
  2. Approche non naïve
  3. Chiffrement de bout en bout (ou E2EE pour End to End Encryption)
  
**Authentification à preuve à divulgation nulle de connaissance**

S'authentifier avec une comabinaison de nom d'utilisateur et de mot de passe a plusieurs inconvénients, dans ce système l'authentification est faite sans transférer de mot de passe, ce dernier protège localement un certificat et une paire de clés, une de chiffrement et une de signature dédiée à prouver son identité auprès du serveur.

SCHEMA FONCTIONNEL 

**Approche non naÏve**

Typiquement lorsqu'on stock des données réservées à un utilisateur on utilise un paradigme de base de données NoSQL, ce qui nous donne un document par utilisateur. Compte tenu de nos objectifs en terme de vie privée on ne va pas tout transmettre quand quelqu'un nous demande l'accès à certaines données, c'est une approche dite "non naïve". On utilie des blobs, ce sont des ensembles de données liées et les plus unitaires possibles. Des exemples de blobs peuvent être le blob "identité", qui contient uniquement votre identité, le blob "est majeur(e) ?" pour donner l'accès à cette information uniquement. Ou encore le blob "historique de rendez vous médicaux" qui lui même contient un blob "informations de facturation". Cela permet de contrôler avec une granularité extrêmement fine les données que l'on va partager avec les différents services qui ont des besoins différents. 

**Chiffrement de bout en bout**

Toutes les opérations de chiffrement et déchiffrement sont réalisées côté client, c'est à dire sur la machine de l'utilisateur. C'est également le cas pour partager des données avec un service externe, les données ne sont jamais stockées ou transmises en clair. Lorsqu'un service requête des données c'est seulement une fois arrivées au service qui possède la clé privée que les données pourront être lues. Non seulement chaque service qui consomme vos données a une clé différente mais il est possible pour chaque service de contrôler l'accès à chaque blob individuellement. Pour les performances il est préférable de faire de l'encapsulation de clé symétrique. Le serveur central qui sert de tiers de confiance peut révoquer le certificat d'un service pour bloquer l'accès, l'utilisateur a également plein controle sur l'accès à ses données.

## Points forts

Il est possible de développer des clients pour ce type d'architecture sur toutes les plateformes, en clients lourds type applications mobiles ou application desktop, mais également dans le navigateur en utilisant les APIs récents.

Cette architecture a pour principale sécurité elle présente très peu de risques, si les données fuitent du serveur elles sont chiffrées et donc sans valeur. Pour la même raison si quelqu'un a des privilèges sur la machine qui contient les données il n'a pas accès à nos données en clair puisque l'utilisateur est le seul à posséder la clé nécessaire au déchiffrement. 

L'authentification zero knowledge permet de prévenir un bon nombre d'attaque qui viserait à espionner et usurper les identifiants de l'utilisateur. Le mot de passe ne transite jamais sur le réseau et le challenge émis par le serveur est différent à chaque fois.

Le chiffrement de bout en bout résout le manque de confiance en le serveur et les acteurs de transmission qui ne peuvent pas accéder aux données en clair.

Préservation de la vie privée en ne divulguant que les données nécessaire et ce avec l'accord de l'utilisateur, qui est révocable à tout moment.


## Limites 

Compte tenu de l'omniprésence de la cryptographie dans l'architecture elle est assez complexe ce qui la rend coûteuse à mettre en place. C'est particulièrement le cas à cause du manque de framework ou autre librairies pour faciliter le développement.

Dans les cas où il faut absolument être sur de pouvoir retrouver ses données il faut mettre en place un système de récupération de clé, mais ce n'est pas critique tout le temps.

Si on veut développer le client dans les navigateurs on a besoin de nombreuses mesures de sécurités, CORS, CSP (Content security policy), SRI (verification d'assets), Referrer-Policy et File-API, et idéalement faire tourner la couche crypto en WebAssembly afin de compliquer les manipulations lors de l'exécution.

Il faut avoir confiance en l'implémentation de l'application ZKA, il faut au minimum que le code soit audité et idéalement que le code soit open source afin de garantir l'absence d'erreurs ou de backdoors.

On atteint jamais le zero knowledge, le fonctionnement de l'application nécessite forcément la connaissance d'une adresse IP et la clé publique de chiffrement qui peut être l'identifiant, pas moyen d'échapper à ça. Or cela engendre des métadonnées qui peuvent déjà laisser transparaître des informations.   

 ## Conclusion

L'évolution des lois et de la mentalité des utilisateurs entraîne des design patterns radicalement nouveaux, centrés sur la vie privée et la sécurité. L'apparition de nouveaux services basés sur cette architecture va stimuler l'écosystème ce qui développera à terme les briques technologiques nécessaires pour que toute l'industrie puisse appliquer ces approches architecturales. Les utilisateurs ont beaucoup à y gagner puisqu'en plus de la sécurité accrue, ces pratiques assurent l'éthique des développeurs qui ne peuvent pas accéder aux informations afin de faire de la publicité ciblée ou d'espionner leurs utilisateurs.


## Pour approfondir 

**[Talk @BDX I/O 2018 - Architecture Zero Knowledge - m4dz Matthias Dugué](https://www.youtube.com/watch?v=7K7aW0GzONU)** 

**[Building Zero-Knowledge Backends – Matthias Dugue](https://www.youtube.com/watch?v=1QueApYNfPI)** 

**[Article de blog de Cossack lab sur le concept de Preuve à connaisance nulle](https://www.cossacklabs.com/blog/zero-knowledge-protocols-without-magic.html)**

**[Article de Bradley Arlen sur l'impact de cette architecture](https://www.linkedin.com/pulse/zero-knowledge-architecture-change-everything-we-know-bradley-arlen/)** 

**[Article de blog de CryptPad sur le concept de connaisance nulle](https://blog.cryptpad.fr/2017/03/24/What-is-Zero-Knowledge/)** 

**[Article de blog de CryptPad "Il est temps de chiffrer le cloud"](https://blog.cryptpad.fr/2017/02/20/Time-to-Encrypt-the-Cloud/)** 

**[Anastasiia Vixentael - Zero Knowledge Architectures for iOS Applications (Début généraliste interessant)](https://www.youtube.com/watch?v=O-PnVVCc5fY)** 

**[Preuve à divulgation nulle de connaissance](https://fr.wikipedia.org/wiki/Preuve_%C3%A0_divulgation_nulle_de_connaissance)** 

**[Article de Payfone sur le sujet](https://www.payfone.com/insights/what-is-zero-knowledge-architecture-and-how-can-it-make-the-digital-world-a-safer-place/)**
