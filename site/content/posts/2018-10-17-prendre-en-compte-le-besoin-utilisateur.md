---
title: Prendre en compte le besoin utilisateur, sans utilisateur.
author: Sogilis
date: 2018-10-17T14:05:55+00:00
categories:
  - DESIGN
  - ERGONOMIE
tags:
  - business
  - design
  - enquête
  - ergonomie
  - ux-design
---
La base du métier d’ergonome est de prendre en compte le besoin utilisateur et donc de les interroger. Récemment, j’ai dû travailler sur une problématique d’un client sans utilisateur. Le budget et le temps défini par mon client n’était pas extensible. Le client jugeait également le sujet peu complexe pour inclure des utilisateurs. J’ai ainsi eu l’occasion de travailler avec cette contrainte : ne pas échanger avec les utilisateurs de l’interface.

J’analyse cette expérience afin d’essayer de confirmer ou non l’hypothèse selon laquelle la conception sans utilisateur est difficile et est un non-sens.


# On déroule quand même la démarche centrée utilisateur.

## Exploration : comprendre la demande et reformuler une problématique.

Le sujet de travail portait sur une boîte de dialogue, faisant partie d’un logiciel de gestion automatique de tâches. Cette boîte de dialogue était prioritaire dans le plan global d’amélioration du logiciel, car elle permet de définir les règles de gestion via différents champs de saisie. Elle est donc fréquemment utilisée et malheureusement non comprise par les utilisateurs.

La demande de mon client portait sur deux points particulièrement bloquants :  


  l’agencement des informations ne suivait pas la logique métier contraignant les utilisateurs à dessiner le process sur une feuille pour être sûrs de leur paramétrage,


  un vocabulaire non adapté faisant hésiter les utilisateurs sur le choix des champs à remplir.



J’ai proposé au client de commencer par un atelier de partage d’information, afin de prendre connaissance du sujet et de comprendre ce qui n’allait pas avec cette interface. Ce premier atelier permet d’explorer le sujet métier. Habituellement, cette phase inclut les utilisateurs afin d’identifier et de hiérarchiser les scénarios d’utilisation. Différents outils peuvent être utilisés pour récolter ces informations, comme des entretiens, des tests utilisateurs, des évaluations etc. A la fin, nous sommes capables d’avoir une vision globale et priorisée sur les axes à retravailler et à valoriser. Dans le cas présent, j’ai réalisé un entretien semi-directif avec le client. Cela m’a permi de récolter des informations sur ces trois sujets :


  Le contexte métier de l’utilisation de cette interface : qui l’utilise ? dans quel but ? de quoi l’utilisateur a-t-il besoin pour remplir les champs ? Est-ce que cette interface fait partie d’une chaîne (besoin de mémoriser des informations pour l’écran suivant) ?


  Le fonctionnement existant : sans cette interface comment les utilisateurs réalisent cette action ? que doit-elle faciliter ?


  La problématique : quelles sont les difficultés d’utilisation, de compréhension, de visualisation exprimées par les utilisateurs ?


A l’issu de l’entretien, j’ai pu identifier des axes d’améliorations à travailler, que j’ai validé avec le client.


## Idéation et conception : recherche des solutions possibles.

Je lui ai ensuite proposé de poursuivre par une phase d’idéation. Cette phase permet de rechercher différentes solutions. Pendant une heure, le client et moi avons utilisé un tableau blanc pour dessiner les solutions qui nous paraissaient répondre aux problèmes. Nous avons pris les problèmes un par un.

Habituellement, je dois choisir de présenter une ou deux solutions au client et améliorer l’interface au fur et à mesure. Ces itérations se terminent lorsque le client jugent l’interface suffisamment mature pour aller la confronter aux utilisateurs.

La séance réalisée avec le client était un peu différente, car au lieu de rechercher des solutions auprès des utilisateurs, la recherche s’est faite avec le client. J’ai en effet essayé de discuter de toutes les solutions possibles avec lui, pour récupérer le maximum d’informations sur ses blocages éventuels. L’avantage de cette séance fut la rapidité de l’itération. Au lieu des allers-et-retour sur plusieurs jours, tout s’est passé en 2h. A la fin de cet atelier, je pensais donc avoir une bonne vision de ce qui pourrait ou pas être adapté.



La troisième étape fut une étape de conception où j’ai dû assembler les solutions possibles validées avec le client pour obtenir une interface utilisable et comprise par les utilisateurs. Je me suis vite rendu compte que je n’avais finalement pas toutes les informations pour créer cette interface. Je suis revenu vers le client avec une proposition de maquette afin de provoquer un nouvel échange sur les besoins métier. En général, je propose un seul aller-et-retour au client sur la maquette. Je préfère la confronter directement aux utilisateurs, via des tests utilisateurs, et sensibiliser le client à cette démarche itérative plutôt que de rester en circuit fermé. C’est un risque de se reposer seulement sur notre propre expérience pour valider l’utilisabilité d’une interface. La seule chose que nous réussirons à valider c’est que l’interface nous convient personnellement, mais j’y reviendrai plus tard.



J’ai finalement réussi à finaliser ma proposition sous forme de maquette cliquable. l’aspect cliquable aide à se projeter dans le comportement de l’interface. Même si les tests utilisateurs n’étaient pas prévus, ce travail de maquettage cliquable a eu pour objectif d’aider les développeurs à prendre en main le sujet et comprendre la solution envisagée.  _L’aspect cliquable est un sujet à double tranchant que j’aborde dans cet autre article _[lien].



## C'est difficile de se mettre à la place de l'utilisateur et d'y rester.

Lors de ce travail, je me suis basée uniquement sur le point de vue de mon client. J’ai pu constater trois problèmes à cela : la déperdition d’information d’un intermédiaire, la vision technique du client et un avis unique qui n’est pas utilisateur.


  Lors de nos premiers échanges nous avons discuté des problèmes rencontrés par les utilisateurs. J’étais frustrée, car je n’avais aucun contrôle de la manière dont ont été récoltées ces informations. Le plus difficile lorsque l’on récolte ce genre d’informations c’est d’éviter les biais et obtenir une réponse exploitable. Ces biais peuvent apparaître dans la formulation des questions, dans le contexte d’utilisation ou par rapport aux liens existants entre le client et l’utilisateur par exemple. D’autre part, j’ai conscience qu’il y a une dégradation de l’information entre ce que dit un utilisateur, ce que le client a compris, ce qu’il a retenu et comment il me le restitue.

Cette restitution est le second point qui coince quand l’interlocuteur unique est le client. Quand je lui parlais besoin utilisateur il me répondait solutiontechnique, quand je lui parlais scénario métier, il me répondait composant. La difficulté pour moi dans ce type d’échange est de discerner ce qui relève dubesoin métier, de ce qui relève de la solution technique mise en place par le client. C’est notamment pour éviter ce risque que la rencontre d’utilisateursest un besoin fort de notre métier. Pouvoir échanger avec au moins une personne qui utilise l’interface tous les jours pour ses besoins métier. Cela nouspermet de revenir à la base du besoin et d’identifier le pourquoi, socle de toute notre réflexion de conception.

“Je me demande pourquoi on en est arrivé à cette complexité ? Je ne sais plus pourquoi on a choisi d’ajouter cette étape”

Enfin, le troisième point concerne le fait que j’avais un seul interlocuteur. Multiplier les interlocuteurs permet d’enrichir notre compréhension des choses.Le risque de discuter avec un interlocuteur unique, c’est d’avoir une seule version du problème, des besoins et des attentes. Pendant la phase de conception,j’ai ressenti que je tournais en rond dans ma réflexion. C’est en expliquant à ma collègue ergonome mes interrogations à propos de la maquette, que j’airéussi à débloquer ma réflexion. J’ai été chercher un autre point de vu, plus neuf pour m’aider à déceler ce qui bloquait ma réflexion et identifier leséléments que je n’avais pas anticipés.




## Concevoir pour une personne es


Ce qui m’a manqué pendant cette conception sans utilisateur, c’est de parler du métier à l’état pur, sans considération pour la solution technique. Nous ne pouvons pas connaître tous les métiers du monde, ce serait impossible et pas vraiment souhaitable. Le travail de conception débute donc naturellement par la compréhension du métier. Quelles sont les tâches à réaliser, dans quel but, comment sont-elles réalisées, quels sont les problèmes parfois rencontrés, etc. Chaque individu suit un chemin différent pour son métier. Rencontrer différentes personnes permet donc d’identifier et de comprendre les chemins possibles, les raisons qui poussent à faire différemment, comprendre le contexte d’utilisation global.

La rencontre d’un seul utilisateur via une seule méthode de récolte d’information n’est donc pas suffisante. En effet, en fonction des techniques, les utilisateurs ne livrent pas les mêmes informations. Les hypothèses de travail en seront renforcées.

Enfin, rencontrer plusieurs personnes permet d’identifier plus facilement si les pratiques décrites sont communes ou plus particulières. Le point critique dans la compréhension du métier est de déterminer si la tâche est récurrente ou non, fait parti d’un scénario classique ou particulier et est une pratique commune ou particulière à un individu. Imaginons que l’on ne rencontre qu’un utilisateur. Il nous raconte comment il travaille, on trouve une solution. Le produit sort et les premiers utilisateurs remontent des difficultés non prévues par l’utilisateur premier. La conséquence c’est de devoir potentiellement modifier tout le design. Ce qui représente un coût énorme en temps et en argent.


L’exercice de l’entretien n’est pas facile. Il demande une préparation afin de récolter de l’information pertinente avant de s’engager dans la recherche de solution. Lorsque l’information de base est erronée, nous formulons une hypothèse fausse, trouver une solution qui ne résout pas le problème et au final l’utilisateur a des difficultés à utiliser la solution ou refuse carrément de l’utiliser.


## Conclusion



Finalement, j’ai accepté de revoir l’utilisabilité d’une interface sans m’appuyer sur les utilisateurs. Je me suis donc projetée dans des usages que je ne connais pas,. J’ai tâtonné, en me basant sur son expérience, mes propres usages. Je savais que ce serait difficile de prendre du recul sur l’interface que j’aurais conçue. Ca l’a été. Comment se rendre compte que cette formulation m’appartient et n’est pas forcément comprise par le grand nombre ? Pour pallier cela, j’ai effectué deux fois plus d’aller-et-retours avec mon client qu’habituellement. 

Nous ne sommes pas les utilisateurs de cette interface. Il est donc sécurisant de les intégrer dès le début de la conception afin de comprendre dès le départ les usages et anticiper les problèmes.
