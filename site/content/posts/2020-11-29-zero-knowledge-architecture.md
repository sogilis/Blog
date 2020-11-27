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
  - data
  - privacy
  - cybersecurity
---

## Le problème de la protection des données dans le Cloud

Nous vivons aujourd'hui une ére où la digitalisation des documents est démocratisée et banalisée. On retrouve une quantité grandissante de données sensibles, privées et personnelles stockées dans le cloud. On pourra citer les données bancaires communiquées aux sites marchands, les documents administratifs que nous échangeons par emails, nos informations de santés, nos habitudes de navigation, nos données de géolocalisation, ou encore les photos de notre dernier voyage en famille. Une chose est sûre : ces données ont de la valeur pour beaucoup de monde ! La cyber-criminalité, l'espionnage et l'usage détourné ou « non-autorisé » des données privées connaissent une croissance exponentielle. Les questions relatives à la protection de nos données deviennent alors primordiales : qui stocke mes données ? Comment ? Pour quel usage ? Qui peut y avoir accès ? Comment sont-elles protégées ? En d'autres termes, les utilisateurs veulent garder le contrôle de leur données, savoir qui a accès, à quoi, et pendant combien de temps.

D'ailleurs le nombre grandissant d'initiatives autour de la protection des données sensibles, reflète l'importance de la question. La conformité aux standards relatifs à la protection des données se banalise : [ISO 27001](https://www.iso.org/isoiec-27001-information-security.html), [HDS](https://esante.gouv.fr/labels-certifications/hds/liste-des-herbergeurs-certifies) pour les données de santé, [PCIDSS](https://fr.pcisecuritystandards.org/index.php) pour le paiement en ligne, ou encore [RGPD](https://gdpr.eu/) pour la protection de la vie privée. Et avec ces standards, le chiffrement des données « en transite », « à l'usage » et « au repos » devient pratique courante. Les Cloud privés, eux aussi, gagnent en maturité, comme le prouve l'adoption grandissante des projets [Cozy Cloud](https://cozy.io) et [Next Cloud](https://nextcloud.com/). Ils abordent la problématique du contrôle des données privées, en y intégrant la notion de confiance dans le code et dans l'hébergement des services cloud publics. Ils proposent des services reposant sur du code libre ou open-source, et qui sont conçus pour un hébergement privé.

C'est dans cette démarche de protection des données à caractère privé, que se situe l'architecture Zero Knowledge (ou ZKA). La ZKA est un principe d'architecture logicielle, qui pousse la non-divulgation des données de l'utilisateur jusqu'à son paroxisme : **la connaissance nulle**. En effet, le nom « Zero Knowledge Architecture » est issu du concept de « [preuve à divulgation nulle de connaissance](https://fr.wikipedia.org/wiki/Preuve_%C3%A0_divulgation_nulle_de_connaissance) » aka « Zero Knowledge Proof » en anglais. Cette expression désigne un protocole sécurisé, qui permet de prouver qu'une proposition est vraie, le tout, sans révéler d'autre information que la véracité de la proposition. Donnons un exemple : pour prouver qu'un utilisateur est majeur, on prouve qu'il a plus de 18 ans, le tout sans divulguer d'autre information sur cette personne, à commencer par son âge.
De fait, une architecture dite « Zero knowledge », met en œuvre des services qui n'ont aucune connaissance des données personnelles de l'utilisateur. Comme nous le verrons dans cet article, la connaissance nulle appliquée strictement atteind vite ses limites dans le Cloud (il est difficile de ne pas divulguer une addresse IP, fusse-t-elle celle d'un proxy, ou encore le type de son navigateur, quand on navigue sur le Web). L'approche Zero Knowledge consiste alors à faire en sorte que la divulgation d'informations personnelles soit réduite à son minimum par conception. Mais le plus simple est de découvrir la ZKA à travers des cas d'usages. Nous illustrerons donc les principes de la ZKA avec un premier scénario théorique de « preuve de majorité pour un jeu en ligne », puis nous étudierons l'authentification à divulgation nulle de connaissance à travers le protocole SRP. Nous verrons également comment le service protonmail fonctionne sans connaître les mots de passe, ni même le contenu des mails de ses utilisateurs. Finalement, nous conclurons avec une réflexion sur l'intérêt de la ZKA dans l'implémentation du dossier médical partagé.

## Preuve de majorité pour un jeu en ligne

Imaginons un service physique (pas en ligne) de jeu d'argent en France. Typiquement, on montre une pièce d'identité pour justifier de son âge et accéder au jeu. Après vérification aucune donnée n'est conservée, et il est probable qu'aucune information n'ait fuité.
Si on essaie de fournir le même service de jeu « en ligne », la protection de nos informations d'identité n'est pas si simple. En effet, si on doit justifier de sa majorité auprès d'un service en ligne, l'approche naïve consiste à numériser un document administratif (passeport ou carte nationale d'identité), puis à transmettre la copie numérisée à l'opérateur du service, par mail ou en la téléchargeant sur un de ses serveurs. Et si on est honnête, on avouera ne pas avoir chiffré la copie numérique de notre document d'identité, avant de la transmettre.

Nous sommes face a un problème: en cas d'attaque de type [Man In The Middle (ou MITM)](https://en.wikipedia.org/wiki/Man-in-the-middle_attack), ou de compromission du serveur de jeu, nos informations d'identité sont révélées. Pour les sceptiques sur les risques de fuite de données, nous vous invitons à consulter la [section « fuites »](https://www.zataz.com/?s=fuite) du site zataz.com. Le premier axe de protection que nous proposons d'étudier est le chiffrement de bout en bout.

### Le chiffrement de bout en bout

Le chiffrement des données est une réponse forte et évidente à la problématique de protection des données, cependant elle n'est pas simple à mettre en œuvre. En effet, les outils de cryptographie nécessitent la manipulation de clefs et de certificats qui demandent une maturité des développeurs, des opérateurs mais aussi des utilisateurs. En utilisant le chiffrement, on assure la protection des données « en transite » (attaque de type MITM), à l'usage sur le Cloud (espionnage des données en mémoire non-persistante sur un serveur compromis) et au repos (compromission d'une mémoire persistante de type fichier ou base de données). Pour les cas d'usages qui le permettent, la ZKA recommande l'utilisation du chiffrement de bout en bout.

[Le chiffrement de bout en bout](https://fr.wikipedia.org/wiki/Chiffrement_de_bout_en_bout), aussi connu par son nom anglais « end to end encryption », consiste à chiffrer systématiquement des données échangées entre deux paires. Nous ne pourrons pas rentrer dans les détails cryptographiques dans cet article, mais le principe de base du chiffrement de bout en bout est que seuls les utilisateurs finaux disposent des clefs nécessaires aux déchiffrements des données. Ce principe est facile à comprendre dans le cas d'une application de messagerie. Afin que Bob et Alice puissent d'échanger des messages privés, ils vont systématiquement chiffrer les messages qu'ils s'échangent, avec des clefs que seuls eux connaissent. En fonction des outils de cryptographie utilisés, les messages pourront même être authentifiés (les messages d'Alice et Bob seront signés), et leur intégrité pourra être vérifiée (ont pourra vérifier que chaque message n'a pas été altéré pendant son transport). Comme expliqué précédemment la principale difficulté rencontrée dans le chiffrement est la gestion des clefs de chiffrement par les utilisateurs. Certains services à large échelle réussissent, néanmoins, à fournir du chiffrement de bout en bout en proposant une gestion simplifiée, souvent automatique, des clefs de chiffrement. Ces mécanismes sont décris pour l'application de messagerie instantanée WhatsApp dans [ce premier article](https://faq.whatsapp.com/general/security-and-privacy/end-to-end-encryption/) et pour le service d'email Protonmail [dans ce second](https://protonmail.com/blog/what-is-end-to-end-encryption/).

Finalement, dans une architecture zero-knowledge, tout transfert de données est chiffré et tout stockage de données, même temporaire, est également chiffré. Lorsqu'un service demande des données à caractère privé, seul le service identifié comme destinataire possède la clef pour déchiffrer les données transmises. Si on revient à notre exemple de preuve d'identité, le chiffrement nous offre une protection raisonnable vis à vis de la divulgation d'information. Mais comment être sûr que sont application est correcte et stricte sur le serveur de jeu en ligne ? Il est difficile de répondre à cette question, c'est pourquoi la ZKA apporte d'autres réponses, notamment, l'approche non naïve.

### Approche non-naïve

L'approche non-naïve consiste à réduire à son minimum la quantité de données que l'on divulgue pour obtenir un service. Par exemple, dans le cas de notre scénario de preuve de majorité, la pièce d'identité contient plus d'informations que nécessaire. En effet, il suffit de prouver son âge afin d'obtenir le droit de jouer au loto, mais dans le cas de la pièce d'identité, ce sont bien toutes les données d'identités (prénom, nom, âge, mais aussi adresse postale et nationalité) qui sont révélées. Comme expliqué dans le paragraphe précédent, la protection des données dépend aussi de la façon dont le service de jeu en ligne utilise et stocke nos données, à partir du moment où on accepte de lui divulguer ces informations. Aussi, si un utilisateur a des objectifs de protection de vie privée, il ne doit transmettre que les informations strictement nécessaires, quand un tiers lui demande l'accès à des données personnelles. C'est le principe de l'approche non-naïve.

Dans la ZKA, on préconise l'utilisation de blobs, qui sont des ensembles de données conçus pour être les plus unitaires possibles. Des exemples de blobs peuvent être le blob "identité", qui contient uniquement l'identité de l'utilisateur, ou encore le blob "est majeur(e) ?" pour donner l'accès à cette information uniquement. Et si on fait la supposition que l'on dispose d'un tiers de confiance, reconnu comme autorité nationale de gestion des données d'identité, lequel disposerait d'un certificat TLS (à tout hasard), on pourrait même signer ce blob « est majeur » afin de justifier de son authenticité. Ce blob signé devient alors une **preuve de majorité à divulgation nulle de connaissance**.

### Preuve à divulgation nulle de connaissance

La **[preuve à divulgation nulle de connaissance](https://fr.wikipedia.org/wiki/Preuve_%C3%A0_divulgation_nulle_de_connaissance)**, pilier de la ZKA, est un protocole sécurisé dans lequel une entité, nommée « fournisseur de preuve », prouve mathématiquement à une autre entité, le « vérificateur », qu'une proposition est vraie sans révéler d'autres informations que la véracité de la proposition. Généralement ce type de preuve repose sur des protocoles défi/réponse, le "vérficateur" envoie un challenge au "fournisseur de preuve" qui répond grâce à une information que seul lui connait afin de prouver son identité.

Avec une architecture zero-knowledge, l'utilisateur pourrait utiliser un service tiers de preuve de majorité, et ne laisserait aucune données sensible transiter sur le réseau. 
Le fonctionnement du système est schématisé dans l'image ci dessous.

![Schéma fonctionnel d'un example de ZKA](/img/ZKA/zka-loto.gif)

## Authentification zero-knowledge avec le protocole SRP

S'authentifier avec une comabinaison de nom d'utilisateur et de mot de passe a plusieurs inconvénients, dans ce système l'authentification est faite sans transférer le mot de passe.

Un exemple d'implémentation de preuve à divulgation nulle est le **[Secure Remote Password protocol (SRP)](https://en.wikipedia.org/wiki/Secure_Remote_Password_protocol)** qui permet de réaliser une authentification sans que le mot de passe ne sorte du client. La **[RFC 5054](https://tools.ietf.org/html/rfc5054)** et la **[RFC 2945](https://www.ietf.org/rfc/rfc2945.txt)** décrivent le fonctionnement de ce protocole en détail.

### La messagerie zero-knowledge Protonmail

**Zero access encryption**
TODO: décrire
Dans le cas ou la source de donnée utilisée n'est pas chiffrée on met en place une pratique proche, le **[Zero Access Encryption](https://protonmail.com/blog/zero-access-encryption/)**.

### Réflexion sur le dossier médical partagé

C'est un cas d'application idéal pour l'architecture ZKA, d'autant plus l'applicatif actuel du **[Dossier Médical Partagé](https://www.dmp.fr/)** est largement critiqué. Cette application gère le suivi médical et l'identité des patients, une sorte de carnet de santé virtuel. En adhérant aux principes zero knowledge on obtient exactement le controle que l'on souhaite avoir sur ses données avec la sécurité induite par l'architecture. L'utilisateur a un compte sur lequel se trouve tout son historique médical numérisé, ses rendez-vous, ses ordonnances etc... Grâce à ce compte il partage sélectivement ses informations avec les professionnels de santé, les ordonnances avec les pharmaciens, les informations de facturation avec sa mutuelle et chaque professionel ne voit que les données qui lui sont utiles. Compte tenu de la criticité des données gérées c'est exactement le genre de scénaro pour lequel la ZKA a beaucoup d'interet.

### Autres service ZKA

Au cours de nos recherches pour la rédaction de notre article, nous avons pu identifier d'autres service qui utilise les principes zero-knowledge dans leurs produits. On pourra citer la messagerie chiffrée **[Signal](https://signal.org/blog/private-contact-discovery/)**, le gestionnaire de mots de passge **[NordPass](https://nordpass.com/features/zero-knowledge-architecture/)**, ou encore le gestionnaire de documents en ligne **[CryptPad](https://blog.cryptpad.fr/2017/02/20/Time-to-Encrypt-the-Cloud/)** (le lien vers l'article CryptPad fournit une liste d'autres services zero knowledge).

## Conclusion

### Points forts de la ZKA

Cette architecture généralise l'usage du chiffrement des données et de la cryptographie, cela apporte un  bénéfice double :  un renforcement de la sécurité des données à caractères privé, et l'éducation des utilisateurs à l'usage de la cryptographie.

L'écosystème de bibliothèque de cryptographie permet de développer tout types de clients : client lourds, mobiles ou Web, pour les services zero-knowledge.

La systématisation du principe de défi cryptographique, implique que les échanges de mot de passe sont limités au fournisseur de preuve, ce qui tend à diminuer le risque de fuite de mot de passe.
De plus, le challenge émis par le serveur étant différent à chaque requête, les tentatives d'usurpation de types « man in the middle » sont aussi rendues plus difficiles à opérer.

Préservation de la vie privée avec l'approche non-naïve, en ne divulguant que les données nécessaires. Certains service Zero-knowledge proposent même un contrôle dans le temps d'accès aux données de l'utiliateur, en mettant en place des mécanismes de révocation et d'expiration des clefs qui permetent de déchiffrer ses données.

### Limites

Compte tenu de l'omniprésence de la cryptographie dans l'architecture, la ZKA est assez complexe, ce qui implique une montée en compétence sur la cryptographie et un coût de mise en place supplèmentaire.

Les mécanismes de cryptographies utiliseés par la ZKA sont plus complexes à opérer que les mécanismes classiques. En effet, la cryptographie moderne implique de savoir gérer une clef privée. Par exemple, pour s'assurer de conserver l'accès à des données, il faut mettre en place un système de récupération de clé, là où classiquement on utiliserait une ré-initialisation de mot de passe.

 Attention toutefois à ne pas généraliser cette difficulté. En effet, la récupération de données n'est pas forcément critique pour tous les scénarios, par exemple un service de messagerie instantanée  pourra se permettre de perde l'historique des conversations (et on pourra négliger la récupération des clefs privées utilisées pour le chiffrement des messages).
 À contrario, il est inconcevable de perdre l'accès à ses données médicales.

Pour développer un client ZKA le plus sûr possible dans les navigateurs on a besoin de nombreuses mesures de sécurités, CORS, CSP (Content security policy), SRI (verification d'assets), Referrer-Policy et File-API. Afin de complexifier les manipulations lors de l'exécution il est préferable de faire tourner la couche crypto en WebAssembly car le javascript peut être manipulé à la volée .

Afin d'avoir confiance en l'implémentation de l'application ZKA, il faut au minimum que le code soit audité par un tiers de confiance, ou ouvert (licence libre ou open-source). De cette façon, on a un moyen d'étudier l'absence d'erreurs ou de backdoors.

Dans la vraie vie, on atteint rarement le zero knowledge pur. En effet, le fonctionnement des services nécessite bien souvent la connaissance d'une adresse IP et d'une clé publique de chiffrement, pouvant servir d'identifiant. Il est très compliqué d'échapper à ce partage d'informations, comme nous l'explique **[cet article de cryptpad](https://blog.cryptpad.fr/2017/07/07/cryptpad-analytics-what-we-cant-know-what-we-must-know-what-we-want-to-know/)**. Il faut alors avoir consience que les métadonnées, nécessaires au fonctionnement du service, peuvent déjà laisser transparaître des informations.

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

**[Crédit photo](https://www.bluecoat.com/)**
