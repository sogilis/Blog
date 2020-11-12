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
  - data privacy
  - cybersecurity
---

## Introduction

On retrouve une quantité grandissante de données très sensibles stockées dans le cloud (documents d'identité, bulletin de salaires en pièce jointe des mails, etc.). Aussi, la possibilité de fuite de ces données n'est plus à prouver aujourd'hui, et la conscience du grand public sur les problématiques de protection de la vie privée et des données sensibles n'a cessée de croître. Les questions suivantes gagnent alors en popularité : qui stocke mes données ? Comment ? Qui d'autre peut y avoir accès ? Sont-elles protégées pendant le transport sur le réseau ? 
En d'autres termes, les utilisateurs veulent garder le contrôle de leur données, savoir qui a accès à quoi et pendant combien de temps.

L'architecture Zero Knowledge (ou ZKA) est un principe d'architecture logicielle visant à assurer la protection et le contrôle des données à caractère privé. Idéalement, les services « zero knowledge » n'ont même pas accès aux données qu'ils manipulent (d'où le principe de connaissance nulle).
Par exemple, on peut considérer qu'un service de stockage de données dit « zero knowledge », met en place un système de chiffrement qui assure que seul l'utilisateur final peut lire les dites données.

À noter que le nom « Zero Knowledge Architecture » est issue du concept de « [preuve à divulgation nulle de connaissance](https://fr.wikipedia.org/wiki/Preuve_%C3%A0_divulgation_nulle_de_connaissance) » aka « Zero Knowledge Proof » en anglais. 

**TODO: reformuler la citation Wiipedia**

> Cette expression désigne un protocole sécurisé dans lequel une entité, nommée « fournisseur de preuve », prouve mathématiquement à une autre entité, le « vérificateur », qu'une proposition est vraie sans toutefois révéler d'autres informations que la véracité de la proposition

Cette définition ancre le principe suivant : les services d'une architecture dite « Zero knowledge », y compris les éventuels moyen de transport de données qui la composent, ne peuvent accèder à des données utilisateurs, que si le consentement a été explicitement donné.  Nous verrons aussi un peu plus tard, que la granularité des blocs d'informations qui composent les données à caractère privé, joue un rôle essentiel dans les architectures zero knowledge.

## Quelle utilité ? 

Il y a de nombreux domaines d'applications possibles pour la ZKA et certaines entreprises utilisent déjà ses principes dans leurs produits. Par exemple, **[Signal](https://signal.org/blog/private-contact-discovery/)**, **[NordPass](https://nordpass.com/features/zero-knowledge-architecture/)** ou **[CryptPad](https://blog.cryptpad.fr/2017/02/20/Time-to-Encrypt-the-Cloud/)** qui sont respectivement, une application de messagerie chiffrée, un gestionnaire de mots de passe et un concurrent à google suite. Le lien vers CryptPad est un article contenant une liste d'autres services zero knowledge.
Etant donné qu'il s'agit uniquement d'un principe d'architecture il pourrait être appliqué à presque tous les domaines, pour mieux comprendre nous allons nous concentrer sur un exemple : jouer au loto en ligne.

Pour prouver son âge typiquement on montre une pièce d'identité, après vérification aucune donnée n'est conservée. Cependant sur Internet ce n'est pas si simple, et si on en vient à montrer une pièce d'identité, on la numérise puis la transmet. Ceci se fait généralement de manière non chiffrée, ce qui représente un premier problème, laissant les données d'identité de l'utilisateur, sensibles à des écoutes ou a des fuites sur les canaux de communucation. Un second problème s'ajoute à celà : la pièce d'identité contient plus d'informations que nécessaire. En effet, il suffit de prouver son âge afin d'obtenir le droit de jouer au loto, mais dans le cas de la pièce d'identité, ce sont bien toutes les données d'identités (prénom, nom, âge, mais aussi adresse postale et nationalité) qui sont révélées. Ce second problème est aggravé par le fait que nous ne savons pas vraiment comment sont gérées les données de la pièce d'indentité, une fois la preuve de majorité obtenue. Malgré l'application de la loi RGPD, des doutes sur les pratiques de stockage des données subsistent, en l'absence d'audit complet de l'infrastructure du service.

Pour répondre à ce scénario imaginons une application médicale comme le **[Dossier Médical Partagé](https://www.dmp.fr/)**. Cette application gère le suivi médical et l'identité des patients, en adhérant aux principes zero knowledge. Billy a un compte sur lequel se trouve tout son historique médical numérisé, ses rendez-vous, ses ordonnances etc... Grâce à ce compte il partage sélectivement ses informations avec les professionnels de santé, les ordonnances avec les pharmaciens, les informations de facturation avec sa mutuelle et chaque professionel ne voit que les données qui lui sont utiles. Sur le même principe, si le site du Loto peut accdeder à l'âge et l'identité de Billy il peut s'authentifier et jouer au Loto sans devoir partager de pièce d'identité.
Il est également possible de ne pas partager l'information directement, on demande alors à un tiers de confiance de valider une condition pour nous, ce qui permet de verifier que quelqu'un est majeur sans apprendre son age exact par exemple.

![Schéma fonctionnel d'un example de ZKA](/img/ZKA/zka-loto.gif)

## Axes de mise en oeuvre

Cette architecture repose sur 3 grand axes de mises en oeuvre

  1. Authentification à preuve à divulgation nulle de connaissance
  2. Approche non naïve
  3. Chiffrement de bout en bout (ou E2EE pour End to End Encryption)
  
**Authentification à preuve à divulgation nulle de connaissance**

S'authentifier avec une comabinaison de nom d'utilisateur et de mot de passe a plusieurs inconvénients, dans ce système l'authentification est faite sans transférer de mot de passe.
Pour cela on utilise une **[preuve à divulgation nulle de connaissance](https://fr.wikipedia.org/wiki/Preuve_%C3%A0_divulgation_nulle_de_connaissance)**, c'est une brique de base utilisée en cryptologie pour prouver qu'une proposition est vraie sans révéler d'autre information que la véracité de la proposition. Généralement ce type de preuve repose sur des protocoles défi/réponse, le "vérficateur" envoie un challenge au "fournisseur de preuve" qui répond grâce à une information que seul lui connait afin de prouver son identité.


**Approche non naÏve**

Compte tenu de nos objectifs en terme de vie privée on ne va pas tout transmettre quand quelqu'un nous demande l'accès à certaines données, c'est une approche dite "non naïve". On utilie des blobs, ce sont des ensembles de données liées et concùs pour être les plus unitaires possibles. Des exemples de blobs peuvent être le blob "identité", qui contient uniquement votre identité, le blob "est majeur(e) ?" pour donner l'accès à cette information uniquement. Ou encore le blob "rendez-vous médical" qui lui même contient, entres autres, un sous-blob "informations de facturation". Cela permet de contrôler avec une granularité extrêmement fine les données que l'on va partager avec les différents services qui ont des besoins différents. 

**Chiffrement de bout en bout**

Idéalement, dans une architecture zero-knowledge, toutes les opérations de chiffrement et déchiffrement sont réalisées côté client, c'est à dire sur la machine de l'utilisateur. C'est également le cas pour partager des données avec un service externe, les données ne sont jamais stockées ou transmises en clair. Lorsqu'un service demande des données à caractère privé, seul le service identifié comme destinataire possède la clef pour déchiffrer les données transmises.
C'est une pratique qui est également connue sous le nom de **[Zero Access Encryption](https://protonmail.com/blog/zero-access-encryption/)**

## Points forts de La ZKA

L'écosystème de bibliothèque de cryptographie permet de développer tout types de clients : client lourds, mobiles ou Web, pour les services zero-knowledge.

Cette architecture généralise l'usage du chiffrement des données et de la cryptographie, ce qui apporte un  bénéfice double : premièrement un renforcement de la sécurité des données à caractères privé et deuxiemement cela éduque les utilisateurs à l'usage de la cryptographie.

L'authentification zero knowledge permet de prévenir un bon nombre d'attaque qui viserait à espionner et usurper les identifiants de l'utilisateur. En effet, la systématisation du principe de défi cryptographique, implique qu'il n'y a plus d'échange de mot de passe sur le réseau, ce qui diminue le risque de fuite de données d'authentification. De plus, le challenge émis par le serveur étant différent à chaque requête, les attaques de types « man in the middle » sont aussi rendues plus difficiles à opérer.

Préservation de la vie privée en ne divulguant que les données nécessaires, et ce, avec l'accord de l'utilisateur, qui est révocable à tout moment.


## Limites 

Compte tenu de l'omniprésence de la cryptographie dans l'architecture, la ZKA est assez complexe, ce qui implique une montée en compétence sur la cryptographie et un coût de mise en place supplèmentaire.

Il n'y a pas moyen de réinitialier le mot de passe ou les clés, pour s'assurer de conserver l'accès il faut mettre en place un système de récupération de clé. Ce n'est pas forcément critique, un système de messagerie instantanée par exemple peut se permettre de perde l'historique de conversation cepedant il est inconcevable de perdre l'accès à ses données médicales. 

Pour developper un client ZKA dans les navigateurs on a besoin de nombreuses mesures de sécurités, CORS, CSP (Content security policy), SRI (verification d'assets), Referrer-Policy et File-API. Afin de complexifier les manipulations lors de l'exécution il est preferable de faire tourner la couche crypto en WebAssembly car le javascript peut être manipulé à la volée .

Afin d'avoir confiance en l'implémentation de l'application ZKA, il faut au minimum que le code soit audité par un tiers de confiance, ou ouvert (licence libre ou open-source). De cette façon, on a un moyen d'étudier l'absence d'erreurs ou de backdoors.

On atteint jamais le zero knowledge, le fonctionnement de l'application nécessite forcément la connaissance d'une adresse IP et la clé publique de chiffrement qui peut être l'identifiant, pas moyen d'échapper à ça comme nous l'explique **[cet article](https://blog.cryptpad.fr/2017/07/07/cryptpad-analytics-what-we-cant-know-what-we-must-know-what-we-want-to-know/)**. Les métadonnées générées par le fonctionnement peuvent déjà laisser transparaître des informations.   

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
