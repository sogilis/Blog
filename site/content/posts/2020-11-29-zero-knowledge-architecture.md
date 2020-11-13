---
title: Sécurité et éthique avec l'Architecture Zero Knowledge
author: Mathieu Willay, Jordan Prudhomme, Willy Malvault
date: 2020-11-20
image: /img/ZKA/cover.jpg
categories:
  - cat1
tags:
  - cysec
  - architecture
  - crypto
  - ZKA
  - data privacy
  - cybersecurity
---

## Introduction

Aujourd'hui, on retrouve une quantité grandissante de données sensibles, privées et personelles stockées dans le cloud (documents d'identité, bulletins de salaires dans les emails, etc.). Aussi, la possibilité de fuite de ces données n'est plus à prouver, et la conscience du grand public sur les problématiques de protection de la vie privée et des données sensibles n'a cessée de croître. Les questions suivantes gagnent alors en popularité : qui stocke mes données ? Comment ? Qui d'autre peut y avoir accès ? Sont-elles protégées pendant le transport sur le réseau ? 
En d'autres termes, les utilisateurs veulent garder le contrôle de leur données, savoir qui a accès, à quoi, et pendant combien de temps.

L'architecture Zero Knowledge (ou ZKA) est un principe d'architecture logicielle visant à assurer la protection et le contrôle des données à caractère privé. Idéalement, les services « zero knowledge » n'ont même pas accès aux données qu'ils manipulent (d'où le principe de connaissance nulle).
Par exemple, on peut considérer qu'un service de stockage de données dit « zero knowledge », met en place un système de chiffrement qui assure que seul l'utilisateur final peut lire les dites données.

À noter que le nom « Zero Knowledge Architecture » est issu du concept de « [preuve à divulgation nulle de connaissance](https://fr.wikipedia.org/wiki/Preuve_%C3%A0_divulgation_nulle_de_connaissance) » aka « Zero Knowledge Proof » en anglais.

Cette expression désigne un protocole sécurisé, qui est une brique de base utilisée en cryptologie, pour prouver qu'une proposition est vraie, le tout sans révéler d'autre information que la véracité de la proposition.

Cette définition ancre le principe suivant : les services d'une architecture dite « Zero knowledge », y compris les éventuels moyen de transport de données qui la composent, ne peuvent accèder à des données utilisateurs, que si le consentement a été explicitement donné.  Nous verrons aussi un peu plus tard, que la granularité des blocs d'informations qui composent les données à caractère privé, joue un rôle essentiel dans les architectures zero knowledge.

## Quelle utilité ? 

Il y a de nombreux domaines d'applications possibles pour la ZKA et certaines entreprises utilisent déjà ses principes dans leurs produits. Par exemple, **[Signal](https://signal.org/blog/private-contact-discovery/)**, **[NordPass](https://nordpass.com/features/zero-knowledge-architecture/)** ou **[CryptPad](https://blog.cryptpad.fr/2017/02/20/Time-to-Encrypt-the-Cloud/)** qui sont respectivement, une application de messagerie chiffrée, un gestionnaire de mots de passe et un concurrent à google suite (le lien vers l'article CryptPad fournit une liste d'autres services zero knowledge).
Etant donné qu'il s'agit uniquement d'un principe d'architecture il pourrait être appliqué à presque tous les domaines, pour mieux comprendre nous allons nous concentrer sur un exemple : jouer au loto en ligne.

### Jouer au loto en ligne

Pour prouver son âge typiquement on montre une pièce d'identité, après vérification aucune donnée n'est conservée. Cependant sur Internet ce n'est pas si simple, et si on en vient à montrer une pièce d'identité, on la numérise puis la transmet. Ceci se fait généralement de manière non chiffrée, ce qui représente un premier problème, laissant les données d'identité de l'utilisateur, sensibles à des écoutes ou a des fuites sur les canaux de communucation. Un second problème s'ajoute à celà : la pièce d'identité contient plus d'informations que nécessaire. En effet, il suffit de prouver son âge afin d'obtenir le droit de jouer au loto, mais dans le cas de la pièce d'identité, ce sont bien toutes les données d'identités (prénom, nom, âge, mais aussi adresse postale et nationalité) qui sont révélées. Ce second problème est aggravé par le fait que nous ne savons pas vraiment comment sont gérées les données de la pièce d'indentité, une fois la preuve de majorité obtenue. Malgré l'application de la loi RGPD, des doutes sur les pratiques de stockage des données subsistent, en l'absence d'audit complet de l'infrastructure du service.

 Sur le même principe, si le site du Loto peut accdeder à l'âge et l'identité de Billy il peut s'authentifier et jouer au Loto sans devoir partager de pièce d'identité.
Il est également possible de ne pas partager l'information directement, on demande alors à un tiers de confiance de valider une condition pour nous, ce qui permet de verifier que quelqu'un est majeur sans apprendre son age exact par exemple.

Intéressons nous à un second scénario bien populaire : le dossier médical partagé.

### Dossier médical partagé
Pour répondre à ce scénario imaginons une application médicale comme le **[Dossier Médical Partagé](https://www.dmp.fr/)**. Cette application gère le suivi médical et l'identité des patients, en adhérant aux principes zero knowledge. Billy a un compte sur lequel se trouve tout son historique médical numérisé, ses rendez-vous, ses ordonnances etc... Grâce à ce compte il partage sélectivement ses informations avec les professionnels de santé, les ordonnances avec les pharmaciens, les informations de facturation avec sa mutuelle et chaque professionel ne voit que les données qui lui sont utiles.

![Schéma fonctionnel d'un example de ZKA](/img/ZKA/zka-loto.gif)

## Axes de mise en oeuvre

La ZKA repose sur 3 axes

  1. Utilisation de preuve à divulgation nulle de connaissance
  2. Approche non naïve
  3. Chiffrement de bout en bout (ou E2EE pour End to End Encryption)
  
**Preuve à divulgation nulle de connaissance**

La ZKA utilise la **[preuve à divulgation nulle de connaissance](https://fr.wikipedia.org/wiki/Preuve_%C3%A0_divulgation_nulle_de_connaissance)**, c'est un protocole sécurisé dans lequel une entité, nommée « fournisseur de preuve », prouve mathématiquement à une autre entité, le « vérificateur », qu'une proposition est vraie sans révéler d'autres informations que la véracité de la proposition. Généralement ce type de preuve repose sur des protocoles défi/réponse, le "vérficateur" envoie un challenge au "fournisseur de preuve" qui répond grâce à une information que seul lui connait afin de prouver son identité.
S'authentifier avec une comabinaison de nom d'utilisateur et de mot de passe a plusieurs inconvénients, dans ce système l'authentification est faite sans transférer le mot de passe.



**Approche non naÏve**

Si un utilisateur a des objectifs de protection de vie privée, il ne doit transmettre que les informations strictement nécessaires, quand un tiers lui demande l'accès à certaines données, c'est une approche dite "non naïve". Pour ce faire, la ZKA utilise des blobs, qui sont des ensembles de données liées et conçus pour être les plus unitaires possibles. Des exemples de blobs peuvent être le blob "identité", qui contient uniquement l'identité de l'utilisateur, le blob "est majeur(e) ?" pour donner l'accès à cette information uniquement. Ou encore le blob "rendez-vous médical" qui lui même contient, entres autres, un sous-blob "informations de facturation". Cela permet de contrôler avec une granularité extrêmement fine les données que l'on va partager avec les différents services, en s'adaptant systématiquement à leurs besoins.

**Chiffrement de bout en bout**

Dans une architecture zero-knowledge, tout transfert de données est chiffré. Idéalement, tout stockage de données, même temporaire, est également chiffré. Lorsqu'un service demande des données à caractère privé, seul le service identifié comme destinataire possède la clef pour déchiffrer les données transmises.

**Zero access encryption**
TODO: décrire
Dans le cas ou la source de donnée utilisée n'est pas chiffrée on met en place une pratique proche, le **[Zero Access Encryption](https://protonmail.com/blog/zero-access-encryption/)**.

## Points forts de La ZKA

Cette architecture généralise l'usage du chiffrement des données et de la cryptographie, ce qui apporte un  bénéfice double :  un renforcement de la sécurité des données à caractères privé, et l'éducation des utilisateurs à l'usage de la cryptographie.

L'écosystème de bibliothèque de cryptographie permet de développer tout types de clients : client lourds, mobiles ou Web, pour les services zero-knowledge.

La systématisation du principe de défi cryptographique, implique que les échanges de mot de passe sont limités au fournisseur de preuve, ce qui tend à diminuer le risque de fuite de mot de passe. 
De plus, le challenge émis par le serveur étant différent à chaque requête, les tentatives d'usurpation de types « man in the middle » sont aussi rendues plus difficiles à opérer.

Préservation de la vie privée avec l'approche non-naïve, en ne divulguant que les données nécessaires. Certains service Zero-knowledge proposent même un contrôle dans le temps d'accès aux données de l'utiliateur, en mettant en place des mécanismes de révocation et d'expiration des clefs qui permetent de déchiffrer ses données.


## Limites 

Compte tenu de l'omniprésence de la cryptographie dans l'architecture, la ZKA est assez complexe, ce qui implique une montée en compétence sur la cryptographie et un coût de mise en place supplèmentaire.

Les mécanismes de cryptographies utiliseés par la ZKA sont pus complexe à opérer que les mécanismes classiques. En effet, la cryptographie moderne implique de savoir gérer une clef privée. Par exemple, pour s'assurer de conserver l'accès à des données, il faut mettre en place un système de récupération de clé, là où classiquement on utiliserait une ré-initialisation de mot de passe.

 Attention toutefois à ne pas généraliser cette difficulté. En effet, la récupération de données n'est pas forcément critique pour tous les scénarios, par exemple un service de messagerie instantanée  pourra se permettre de perde l'historique des conversations (et on pourra négliger la récupération des clefs privées utilisées pour le chiffrement des messages).
 À contrario, il est inconcevable de perdre l'accès à ses données médicales. 

Pour developper un client ZKA dans les navigateurs on a besoin de nombreuses mesures de sécurités, CORS, CSP (Content security policy), SRI (verification d'assets), Referrer-Policy et File-API. Afin de complexifier les manipulations lors de l'exécution il est preferable de faire tourner la couche crypto en WebAssembly car le javascript peut être manipulé à la volée .

Afin d'avoir confiance en l'implémentation de l'application ZKA, il faut au minimum que le code soit audité par un tiers de confiance, ou ouvert (licence libre ou open-source). De cette façon, on a un moyen d'étudier l'absence d'erreurs ou de backdoors.

Dans la vraie vie, on atteint rarement le zero knowledge pur. En effet, le fonctionnement des services nécessite bien souvent la connaissance d'une adresse IP et d'une clé publique de chiffrement, pouvant servir d'identifiant. Il est très compliqué d'échapper à se partage d'informations, comme nous l'explique **[cet article de cryptpad](https://blog.cryptpad.fr/2017/07/07/cryptpad-analytics-what-we-cant-know-what-we-must-know-what-we-want-to-know/)**. Il faut alors avoir consience que les métadonnées, nécessaires au fonctionnement du service, peuvent déjà laisser transparaître des informations.   

 ## Conclusion

L'évolution des lois et de la mentalité des utilisateurs ammène des principes d'architecture logicielle radicalement nouveaux, centrés sur la vie privée et la sécurité. L'apparition de nouveaux services basés sur cette architecture va stimuler l'écosystème ce qui développera à terme les briques technologiques nécessaires pour que toute l'industrie puisse appliquer ces approches architecturales. Les utilisateurs ont beaucoup à y gagner puisqu'en plus de la sécurité accrue, ces pratiques assurent l'éthique des développeurs qui ne peuvent pas accéder aux informations afin de faire de la publicité ciblée ou d'espionner leurs utilisateurs.


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

**[Crédit photo](www.bluecoat.com/)**
