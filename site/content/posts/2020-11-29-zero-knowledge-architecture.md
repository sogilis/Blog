---
title: Architecture Zero Knowledge 101
author: Mathieu WILLAY (mathieu.willay@sogilis.com)
date: 2020-11-20
image: /img/image-name.jpeg
categories:
  - cat1
tags:
  - cysec
  - architecture
  - crypto
---

## Quelle utilité ? 

 On retrouve une quantité grandissante de données très sensibles stockées dans le cloud. Or la conscience du grand public sur les problématiques de vie privée en ligne et de sécurité des données n'a cessée de croitre depuis que ces discussions existent. Cela soulève de nombreuses questions, qui stocke mes données ? Qui d'autre peut y avoir accès ? Et pour le transport de ces données sur le réseau ? 

 On doit reprendre le controle sur nos données, savoir qui a accès à quoi et pendant combien de temps ? L'architecture zero knowledge (ou ZKA) répond à ce challenge.
  
 Il faut sécuriser la transmission et le stockage de ces données afin de garantir que seul l'utilisateur puisse les dechiffrer tout en lui permettant d'utiliser les informations stockées sur des services externes sans divulguer plus que le strictement necessaire.

  Dans le cadre du stockage des données de santé par exemple, si l'utilsateur a un compte qui contient tout les informations sur son identité, son historique de rendez vous et les médicaments prescris par exemple. Tout ceci est très sensible et personnel, nous voulons le maximum de sécurité pour ces données cependant c'est également des informations auxquels divers acteurs doivent avoir accès, les médecins ou les mutuelles par exemples. ZKA permet de fournir à des applications tierces des accès à de la donnée personnelle en garantissant que ces services n'auront jamais accès à des contenus en clair sans permission. On peut donner des accès différents à chaque service, par exemple, uniquement les informations de facturation pour la mutuelles, pour s'assurer que la mutuelle ne puisse pas utiliser les données médicale qui ne lui sont pas destinées contre l'utilisateur.

  En continuation de la même idée si on a une identité numérique "officielle" on pourrait l'utiliser pour valider être majeur sans reveler son identité ou même son age exact.

  Il y a d'autres domaines d'applications tels que les gestionnaires de mots de passes avec synchronisation en ligne et les systemes de messagerie chiffrées. 

## Grands principes  

  1. Authentification à preuve à connaisance nulle
  2. Approche non naive
  3. Chiffrement de bout en bout (ou E2EE pour End to End Encryption) 		
  4. Données exclusivement chiffrées 
  

**Authentification à preuve à connaissance nulle**

On va s'authentifier sans transferer notre mot de passe, ce dernier protège localement un certificat et une paire de clés de chiffrement dont une est dédiée à répondre à un challenge du serveur fabriqué spécialement pour notre clé qui prouve notre identité.

Le serveur central qui sert de tiers de confiance peut révoquer les certificats d'un service pour bloquer l'accès, l'utilisateur peut faire de même.

**Approche non naive**

Dans un paradigme de base de données NoSQL on a un typiquement un document par utilisateur. On ne va pas tout transmettre quand quelqu'un nous demande l'accès à nos données. C'est à ca que servent les blobs, un exemple de blob peut être le blob identité, qui contient uniquement votre identité, le blob historique de rendez vous qui lui même contient un blob dédié aux informations de facturation. Cela permet de controler avec une granularité extremement fine les données que l'on va envoyer aux différents services.

**Chiffrement de bout en bout**

Tout le chiffrement/dechiffrement est réalisé côté client, y compris pour partager des données avec un service externe, vos données ne sont jamais stockées ou transmises en clair. C'est seulement une fois arrivées au service qui possède la clé privée que les données pourront être lues. Non seulement chaque service qui consomme vos données a une clé différente mais il est possible pour chaque service de controller l'accès à chaque blob individuellement. Pour les performances il est preferable de faire de l'encapsultion de clé symétrique.


**Données exclusivement chiffrées**

Les données de chaque utilisateur chiffré avec une clé différente ce qui rend compliqué les analyses statistiques pour essayer de déchiffrer les données.



## Avantages

Compatible web et clients lourds

Très peu de risques, si les données fuitent du serveur elles sont chiffrées et donc sans valeur, pour la même raison si quelqu'un a des privilèges sur la machine qui contient les données il n'a pas accès à nos données en clair. L'authentification zero knowledge permet également de prévenir un bon nombre d'attaque.

Résout le manque de confiance en le serveur et les acteurs de transmission qui ne peuvent pas acceder aux données.

Divulgation uniquement des données necessaire et ce avec accord de l'utilisateur, révocable à tout moment 


## Inconvénients 

C'est une architecture assez complexe donc coûteuse à mettre en place, particulièrement à cause du manque de framework ou autre librairies pour faciliter le developpement.

Si il faut absolument être sur de pouvoir retrouver ses données il faut mettre en place un système de récuperation de clé, mais ce n'est pas critique tout le temps.

Complexe à implementer dans le naviguateur, besoin de CORS, CSP (Content security policy), SRI (verification d'assets), Referrer-Policy et File-API, plus idéalement la couche crypto en WebAssembly afin de compliquer les manipulations lors de l'execution.

Besoin de faire confiance à l'implémentaiton de ZKA, l'open source répond à ce problème.

 ## Conclusion

 

## Références 

**[Preuve à divulgation nulle de connaissance](https://fr.wikipedia.org/wiki/Preuve_%C3%A0_divulgation_nulle_de_connaissance)** 

**[Talk @BDX I/O 2018 - Architecture Zero Knowledge - m4dz Matthias Dugué](https://www.youtube.com/watch?v=7K7aW0GzONU)** 

**[Talk @BDX I/O 2018 - Architecture Zero Knowledge - m4dz Matthias Dugué](https://www.youtube.com/watch?v=7K7aW0GzONU)** 