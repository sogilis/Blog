---
title: Quel besoin en Qualité Logicielle ?
author: Amin
date: 2020-09-15
image: /img/article_niveau_qualite/2020_09_09_quality.jpg
categories:
  - DÉVELOPPEMENT
tags:
  - code
  - dev

---
***Résumé—* De plus en plus de composants logiciels sont intégrés dans les solutions et les systèmes développés par l’industrie, avec des contraintes de fiabilité de plus en plus fortes. La défaillance de ces systèmes n’entraîne pas obligatoirement de blessures ou de pertes de vies humaines. Pourtant ces systèmes restent critiques, car leur défaillance pourrait avoir un impact économique important. La fiabilité de ces solutions est fortement couplée à la fiabilité des logiciels qu’elles embarquent, avec un besoin grandissant de prouver cette fiabilité, auprès des clients et des marchés cibles. Pour la plupart des solutions développées, n’impliquant pas de risques humains, il n’existe pas, à ce jour, de standard pouvant être appliqué et à mis en œuvre pour qualifier la fiabilité logicielle.**

**Cet article s’intéresse à la mise en œuvre d’une approche permettant de mesurer le niveau de qualité requis du logiciel à développer, pour garantir un certain niveau de fiabilité de la solution. Cet article souligne les difficultés rencontrées par les acteurs industriels, et discute quelques solutions possibles. Il explique également pourquoi la qualité logicielle ne doit pas être considérée comme une variable d’ajustement dans un projet de développement, et comment cela pourrait se traduire avec la mise en œuvre de méthodes et outils adéquats.**

## I. Introduction

Dans le développement des logiciels non normés (sans objectif de certification en conformité d’une norme donnée), la mise en œuvre d’activités techniques pour garantir un certain niveau de qualité est souvent considérée comme un surcoût et une contrainte supplémentaire aux équipes, entraînant le ralentissement de la production et des livraisons. Les activités techniques peuvent être variées, différentes et mises en œuvre de plusieurs manières (écriture et validation des exigences logicielles, déroulement d’une stratégie de tests, assurance d’une couverture de code fonctionnelle, assurance de la complétude des exigences, revue de code et des résultats de tests, etc.).

D’une manière générale, dans le montage et lors du suivi d’avancement des projets de développement logiciel, trois variables sont définies et ajustées : le périmètre fonctionnel, le budget et les délais de livraison. Les discussions autour de la qualité logicielle apparaissent quand les problèmes de fiabilité, de maintenabilité et de livraisons deviennent critiques et visibles. L’ajout et la maintenance de fonctionnalités peuvent devenir rapidement des tâches très coûteuses et les délais de livraisons deviennent difficiles à respecter.  En conséquence, les budgets pourraient être rapidement dépassés.

Certaines tentatives d’ajustement des variables initiales sont appliquées pour reprendre en main et maîtriser les projets qui dérivent, en particulier, sur les aspects de budget et de qualité. Les stratégies peuvent être différentes, allant de la réduction du périmètre fonctionnel, à l’augmentation du budget ou même au décalage des dates de livraison. Certaines entreprises décident à ce stade de restructurer les équipes en montant une équipe d’assurance qualité (QA). Le rôle de cette équipe consiste à identifier et rattraper les défaillances au niveau de la qualité. Cette solution peut s’avérer efficace si les équipes d’assurance qualité logicielle réussissent à définir le bon niveau de qualité requis et travaillent conjointement avec les équipes de développement pour mettre en place les bonnes activités techniques, ce qui n’est pas toujours simple, selon les organismes.

En pratique, les activités techniques de qualité, dans le cycle de développement de logiciel ne sont pas menées par les équipes de développement dès le début des projets, car on considère généralement que les premières phases de prototypage ne requièrent pas un niveau qualité à garantir. Le but étant de sortir un prototype fonctionnel, dans des délais très courts. Les activités techniques de qualité sont ainsi repoussées à la phase de développement industrialisé.

Généralement, durant la phase de développement industrialisé, les équipes logicielles se rendent compte de l’existence d’une dette technique considérable (Exemple : beaucoup de tests à écrire pour couvrir le code précédemment produit), ce qui implique la nécessité de modifier potentiellement l’architecture logicielle et faire certains choix (changer de technologies par exemple). Plusieurs équipes de développement ont souvent suggéré de reprendre les développements « from scratch » au lieu d’essayer de réutiliser le code existant, en améliorant sa qualité. Les activités de qualités ont certainement un coût supplémentaire, mais ne pas les introduire ou les introduire tard risque de coûter encore plus cher, en coût de maintenance et d’évolution.

Nous pensons qu’il est toujours pertinent de définir et à mettre en œuvre un niveau de qualité à garantir dès le démarrage du projet. Ce qui consiste à considérer les aspects de qualité au même niveau que le périmètre fonctionnel, le budget et les délais. Cette configuration à 4 axes ramène plus de cohérence au périmètre fonctionnel et aux aspects budgétaires. La prise en compte de cette variable dès le début permet d’ajuster dès le démarrage les autres variables. L’intégration des activités de qualité tôt dans le projet peut ramener une garantie continue de la fiabilité des développements et apporte de l’efficience au sein de l’équipe développement, tout en respectant les budgets et les délais.

{{< figure src="/img/article_niveau_qualite/2020_09_15_qualite_figure_1.png" title="Figure 1. Définition des besoins initiaux d’un projet de développement logiciel">}}

Durant ces dernières années, nous sommes intervenus chez plusieurs acteurs industriels afin d’évaluer des logiciels existants et pour préconiser des activités de qualité adéquates. Nous nous sommes retrouvés à maintes reprises face à des questions de type « Combien va coûter la mise en place de nouvelles activités techniques ? Combien l’entreprise va gagner une fois ces activités en place ? Ce n’est pas de la sur-qualité ce que vous proposez ? etc. ». Nous remarquons toujours une inquiétude et une crainte d’avoir engagé des activités sans intérêts, souvent qualifiées de sur-qualité, sans pouvoir dimensionner les surcoûts liés au manque de qualité. Malheureusement, très peu d’organismes savent ce que leur coûte la non-qualité, une approche basée sur des organisations et des équipes historiquement en place étant très souvent la règle. Ce type de retour est compréhensible puisqu’il n’existe généralement pas de niveau de qualité défini, et spécifié comme étant un objectif.

Les activités techniques de qualité sont encore plus nombreuses et plus compliquées à modéliser et à mettre en œuvre dans le cadre d’un développement logiciel faisant partie d’un système Logiciel/Matériel. Les activités de tests ne doivent pas se limiter aux composants logiciels mais doivent prendre en compte le comportement du matériel, ce qui représente une complexité et un coût supplémentaire à prévoir.

Cet article aborde le problème de définition d’un niveau qualité adéquat pour les développements logiciels, non soumis à une certification en conformité avec des standards, en soulignant la pertinence de prendre en considération les aspects de qualité au même niveau que le budget, les délais et le périmètre fonctionnel. Il explique les moyens possibles pour s’inspirer des standards existants afin de proposer une approche permettant d’identifier les activités techniques de qualité nécessaires à mettre en œuvre. Cet article explique l’intérêt d’investir dans la qualité logicielle pour éviter des surcoûts de maintenance futures.

La section II présente un état de l’art des standards existants ainsi que les niveaux de criticité ciblés. La section III discute la manière de définir et de garantir des objectifs de qualité, pour les logiciels non soumis à des normes, en se basant sur les standards existants, et en prenant en compte les exigences du marché. La section IV démontre l’importance d’investir dans la qualité, tôt dans le processus de développement logiciel. Elle explique également l’importance de ne pas considérer la qualité comme une variable d’ajustement pour garantir une fiabilité continue des logiciels développés.

## II. Développements normés de logiciels critiques

Le développement de logiciels critiques, pour certains domaines (aéronautique, médical, automobile, ferroviaire, nucléaire, etc.) s’appuie sur des normes, qui déclinent tous de l’IEC 61508 [iec61508].

{{< figure src="/img/article_niveau_qualite/2020_09_15_qualite_figure_2.png" title="Figure 2. Standards pour le développement de logiciels critiques sectoriels" width="700" align="center">}}

Chaque norme décrit des objectifs à atteindre (les exigences sont en cohérence avec l’architecture, le code respecte les standards de codage définis, toutes les exigences sont testées, etc.) pour garantir un certain niveau de fiabilité, qui consiste à démontrer et à garantir que le logiciel livré implémente exactement les fonctionnalités souhaitées. La liste des objectifs à atteindre diffère d’un niveau de criticité à un autre. Le tableau ci-dessous illustre les principales normes ainsi que les niveaux de criticité associés. La norme DO-178C/ED12C s’intéresse au développement des logiciels aéronautiques. La norme IEC 62304 s’applique aux développements de logiciels pour les dispositifs médicaux (DM). Les normes EN 50128 et ISO 26262 s’appliquent respectivement aux développements de logiciels ferroviaire et automobile.

Chaque niveau de criticité (A, B, C, DAL-A, SIL1, SIL C, etc.) définit un ensemble d’objectifs à atteindre et d’activités à dérouler. La liste des activités techniques et la rigueur de leurs déroulements peuvent varier d’un niveau de criticité à un autre. Par exemple, dans la norme aéronautique DO-178C, et pour le niveau de criticité « DAL-A » les activités de vérification d’une écriture d’une exigence, nécessitent obligatoirement une indépendance des rôles (Les personnes qui écrivent l’exigence et qui la vérifient dans un second temps, sont obligatoirement des personnes différentes). Cette indépendance des rôles n’est pas exigée dans un contexte de développement en conformité avec le niveau de criticité « DAL-C ».

{{< figure src="/img/article_niveau_qualite/2020_09_15_qualite_tableau_1.png" title="Tableau 1. Niveaux de criticité associés aux standards" width="850">}}

Les niveaux de criticité sont établis selon l’importance des fonctionnalités à développer et l’impact de leurs défaillances, sur les vies humaines. Par exemple, dans la norme médicale IEC 62304, le niveau « C » est le plus haut niveau de criticité. Il correspond à des fonctionnalités pouvant, en cas défaillance, causer la mort ou des blessures humaines sérieuses. Le niveau « B » est associé aux fonctionnalités pouvant causer des blessures non sérieuses et le niveau A pour les fonctionnalités sans impacts sur la santé (voir figure 2).

Dans le développement normé, et avec l’expérience des années, nous avons une idée des coûts approximatifs des développements logiciels, selon les niveaux de criticité et les niveaux de qualité requis. Par exemple, dans le standard aéronautique DO-178C, il existe cinq niveaux différents, allant du DAL-A au DAL-E, le moins critique (voir tableau). À mesure que le niveau de criticité augmente, le niveau de rigueur associé aux activités techniques augmente également, et par conséquence les coûts augmentent et les délais de livraison se rallongent.

{{< figure src="/img/article_niveau_qualite/2020_09_15_qualite_figure_3.png" title="Figure 3. Les niveaux de criticité de la norme IEC-62304" width="350">}}

D’après [Hilderman2009], les coûts associés au niveau D sont 15% supérieurs au développement logiciel du grand marché, qui dispose d’une qualité moyenne. D’après [Louis2019] [Hilderman2009], les coûts supplémentaires entre un développement en DAL-D et un DAL-C est estimé à 30%. La différence en coût entre le niveau C et B est de 15% supplémentaire alors que l’écart entre le niveau A et B est de 5%. D’après notre expérience dans le développement aéronautique, le développement en DAL-A représente un surcoût pouvant varier entre 55% et 70% par rapport à un développement classique, sans activité techniques de qualité.

Pour les applications industrielles, le standard IEC61508 reste largement utilisé. Il s’agit d’un standard à caractère générique qui cible l’obtention de la sécurité fonctionnelle des systèmes, basée sur les risques. Les activités techniques de développement ciblent la détection des pannes aléatoires et systématiques des systèmes, au niveau matériel et logiciel. Cette norme n’a pas été conçue dans un esprit de certification puisqu’elle n’est rattachée à aucune réglementation, et reste un sujet à interprétations divergentes. Elle présente également des inconvénients au niveau de l’attribution du niveau de criticité au logiciel et par rapport à sa capacité à adresser des nouvelles solutions émergentes comme l’IoT, et les applications orientées industrie 4.0. Des travaux sont en cours pour développer une nouvelle norme IEC 63187, pour mieux prendre en compte certains aspects comme l’ingénierie système, ainsi que les exigences et les menaces liées à la cybersécurité.

Aujourd’hui, la gestion des aspects de qualité dans le développement est largement mieux maîtrisée en industrie en présence d’une norme sectorielle, qui encadre les développements, et quand la certification logicielle fait partie d’un cadre réglementaire.

D’un autre côté, l’industrie logicielle a connu ce qu’on appelle une « Crise Logicielle ». Ce terme est apparu à la fin des années 1960 avec la montée en complexité des logiciels et l’apparition de plusieurs problèmes comme les dépassements de budgets et de délais. La qualité du logiciel livré était souvent déficiente ne tenant pas en compte le besoin utilisateur. Les coûts de la maintenance du logiciel (coût, régressions, complexité) n’étaient pas maîtrisés. La complexité du logiciel et son architecture était une conséquence directe de l’évolution du matériel et de la disponibilité des ressources [Yu2009] [Dij79].

En réponse à cette première crise, l’industrie logicielle a introduit des méthodes et des outils de gestion du cycle de vie du développement, en adoptant des approches de développement en cascade et des outils, en particulier des ateliers de développement. Cependant, les problèmes de l’industrie logicielle persistent encore aujourd’hui. Nous continuons de voir toujours les mêmes symptômes de manque de qualité et de dérive financière et temporelle. Dans [Gibbs94], les auteurs parlent d’une crise chronique. D’autres personnes [Fitzgerald2012], considèrent qu’on est en train de vivre la crise logicielle 2.0, puisque les applications logicielles et les technologies ne cessent d’augmenter en complexité. En parallèle, cette complexité n’est pas suivie par le développement de nouvelles méthodes et outils permettant de garantir à la fois la fiabilité et la qualité, tout en respectant les délais et les budgets.

L’industrie du logiciel évolue vite et continue sa progression en termes de complexité. Aujourd’hui, dans un seul système, on peut trouver plusieurs briques logicielles différentes et communicantes, qu’il faut développer, vérifier et livrer. Il pourrait s’agir de développement de logiciel embarqué, de protocoles de communications, d’applications mobiles, d’applications dans le Cloud avec une architecture micro-services et une gestion de données volumineuses, de bases de données NoSQL, d’applications Web, etc.

En conclusion, la qualité ainsi que les dépassements budgétaires et temporels ont toujours été des problèmes dans l’histoire de l’industrie logicielle. Ces problèmes sont nettement mieux gérés quand les développements sont encadrés par des normes et par une réglementation, ce qui est le cas des logiciels développés pour des systèmes critiques. Dans [Spector86], l’auteur estime que les logiciels ne sont jamais développés à temps et dérivent en budget. De plus, ils contiennent plusieurs anomalies. Dans cet article, l’auteur fait une comparaison entre les projets de construction de ponts, qu’il estime efficaces par rapport aux projets de développement de logiciels qui se terminent avec des dérives, sans atteindre les fonctionnalités souhaitées.

Le Chaos Report [Chaosreport18] mentionne que plus de 55% des projets dérivent de plus de 50% de budget, et peuvent atteindre jusqu’à plus de 400%. Seulement 15% des projets dérivent de moins de 20%.  La dérive de délais de livraison est supérieure à 50% pour ~70% des projets.
Dans cet article, nous nous intéressons à la définition et à la mise en œuvre du niveau de qualité requis pour un logiciel donné, sans mettre en place de norme et sans faire de la sur-qualité. Nous aborderons les moyens d’adapter les activités techniques de qualité avec les nouveaux besoins du marché et les nouvelles méthodologies de développement.

## III.	Définir un niveau de qualité logicielle requis

Le développement logiciel ne consiste pas uniquement à développer du code. Les données logicielles comportent le code source, les exigences de haut niveau, les exigences détaillées, les tests, les données d’architecture, les données de gestion de projet, etc. C’est grâce à la bonne implémentation de toutes ces données, que l’on peut garantir un niveau de fiabilité et de confiance du code source exécutable, livré et déployé en production. C’est grâce à ces données également que l’on peut garantir une maintenance maîtrisée du logiciel.

### A.	Définition et Calcul d’un niveau de qualité

La définition d’un niveau de qualité requis d’un logiciel peut se faire lors du démarrage d’un projet ou pendant la phase d’un développement en cours. Il est évident qu’il est beaucoup plus simple et efficace de prendre en compte les aspects de la qualité tôt dans le processus de développement logiciel. D’après notre expérience, la plupart des demandes d’amélioration de la qualité logicielles surviennent durant des phases avancées de développement. Les interventions sur ces projets surviennent pour les besoins suivants :

-	L’industriel qui remarque que son projet dérive et lui échappe et souhaite reprendre la maîtrise et garantir un certain niveau de qualité auprès de son marché. Il s’agit d’industriels en train de perdre des parts de marché à cause du manque de fiabilité et de la qualité déficiente de leurs logiciels.
-	L’industriel n’a pas beaucoup avancé sur le projet et souhaite analyser et faire évoluer les activités techniques de qualité déjà mise en œuvre. Il s’agit d’industriels qui souhaitent garantir un niveau de qualité adéquat.

Pour mesurer et qualifier le niveau de qualité requis, nous proposons une approche générale qui se base sur une analyse de la solution à développer à plusieurs niveaux. Cette analyse prend en compte à la fois les aspects fonctionnels, les exigences du marché, les aspects systèmes, la stratégie de développement et l’analyse de l’existant si le logiciel ciblé est en cours de développement.

{{< figure src="/img/article_niveau_qualite/2020_09_15_qualite_figure_4.png" title="Figure 4. Flot d’analyse du niveau de qualité logicielle requis">}}

Pour les aspects fonctionnels (figure 4.1), une analyse de risques est requise pour identifier les fonctionnalités les plus importantes, et analyser les conséquences de leurs défaillances au regard du contexte métier. A ce niveau, les risques encourus par le client en relation avec l’usage et au contexte métier sont prises en compte. Des exigences de sécurité ou de cybersécurité peuvent en être déclinées à partir de cette analyse.  La volumétrie et la criticité des fonctionnalités du logiciel et l’importance des exigences de sécurité pourraient être des indicateurs importants à prendre en compte dans la définition d’un niveau de qualité requis.

L’analyse de l’architecture système (figure 4.2) est nécessaire pour évaluer le niveau de tests requis à mettre en place. L’architecture système représente le logiciel qu’on souhaite développer dans son environnement global (solution IoT, pilotage d’une machine, logiciel embarqué sur une carte électronique pouvant être disponible ou en cours de conception, logiciel utilisé pour communiquer et piloter un autre logiciel, logiciel mobile qui doit se synchroniser avec d’autres applications, etc.). La complexité de l’architecture système est importante pour identifier les activités techniques de qualité requises. L’analyse de la démarche de développement (figure 4.3) consiste à analyser les éventuelles phases de prototypage prévues, et leurs objectifs. Nous analysons également la démarche de réutiliser les prototypes, et le nombre ainsi que le taux de complexité des verrous techniques à lever. Nous analysons à ce stade le taux de couverture des verrous techniques par les prototypes.

L’analyse de l’existant (figure 4.4) concerne uniquement les logiciels en cours de développement. Il s’agit d’identifier les déficiences en qualité et de mesurer la dette technique associée. Nous analysons également les activités techniques de qualité déjà existantes.

Le niveau de qualité global requis (figure 4) d’un développement logiciel est calculé à partir du besoin en qualité technique croisé avec le besoin en qualité fonctionnelle. Ces métriques sont suffisantes pour un projet en cours de démarrage. Pour les projets en cours, nous rajoutons des métriques liées à la dette technique.

La qualité technique requise (figure 5) est mesurée à partir du niveau de complexité de l’architecture système et de la démarche de développement adoptée (prototypes, objectifs des prototypes, couverture des verrous techniques, etc.). La qualité fonctionnelle est mesurée à partir de l’analyse fonctionnelles des risques en identifiant les fonctionnalités critiques et leur poids dans l’application, ainsi que les exigences du marché et le contexte métier du logiciel.

Pour simplifier la mesure des métriques, nous avons défini 3 niveaux de complexité par mesure :
-	L (Low) => Complexité Basse
-	M (Medium) => Complexité Moyenne
-	H (High) => Complexité Elevée

{{< figure src="/img/article_niveau_qualite/2020_09_15_qualite_figure_5.png" title="Figure 5. Niveau de complexité de la qualité technique requise" width="650">}}

Dans notre démarche, nous proposons de classifier les niveaux de qualité qui en résultent en trois grandes catégories (voir figure 6). Le niveau 1 concerne le niveau de qualité que l’on voudrait atteindre pour un logiciel faisant partie d’une architecture système simple, sans verrous techniques importants à lever et avec des fonctionnalités non critiques. Le niveau 1 pourrait être un objectif de qualité raisonnable et réaliste pour des logiciels existants, ayant une dette technique élevée. Il peut être considéré comme le canot de sauvetage pour les projets en cours, souffrant de déficience de qualité, et qu’on souhaiterait maîtriser. Dans le niveau 1, nous préconisons le développement de tests fonctionnels en fixant un objectif de couverture de code élevée, sans faire de tests unitaires. L’automatisation des tests fonctionnels est fortement conseillée à ce niveau pour vérifier facilement les régressions. La gestion d’exigences et leurs traçabilités avec les tests fonctionnels est également conseillée.

Le niveau 2 concerne les logiciels comportant certaines fonctionnalités critiques qui s’intègrent dans une architecture système moyennement compliquée, avec des verrous techniques identifiés et atteignables. Par rapport au niveau 1, des activités techniques de qualité supplémentaires doivent être faites uniquement pour l’implémentation des fonctionnalités critiques. En plus des tests fonctionnels, il est recommandé de faire des tests unitaires, des tests boites noires / blanches sur tous les composants logiciels utilisés par les fonctionnalités critiques. Des bancs de tests sont à développer également pour réaliser les tests sur la plateforme cible, ainsi que des tests systèmes et d’intégration.

{{< figure src="/img/article_niveau_qualite/2020_09_15_qualite_figure_6.png" title="Figure 6. Calcul du niveau de qualité logicielle requis" width="750">}}

Le niveau 3 concerne les logiciels comportant plusieurs fonctionnalités critiques dans une architecture système complexe, avec des verrous techniques identifiés et présentant des risques. Par rapport au niveau 2, les activités à faire sont : décrire l’architecture système, vérifier la cohérence entre l’architecture système et les exigences logicielles, gérer les liens de traçabilité, etc. Côté tests, des simulateurs de certains composants du système peuvent être développés pour écrire plus de tests d’intégration, de performance et de gestion d’erreurs (simulation de comportements erronés des sous-systèmes qui communiquent avec le logiciel). Pour le niveau 3, il est recommandé de construire une équipe d’assurance qualité qui va travailler avec les équipes de développement pour garantir la qualité des données produites. Un récapitulatif des niveaux de qualité, et des activités associées, est présenté dans le tableau 2.

### B.	Pratiques d’ingénierie pour répondre aux besoins de la qualité logicielle

En plus des activités techniques de qualité que nous préconisons pour chaque niveau de qualité requis, nous pensons que la manière de les développer et de les organiser est aussi important que les activités elles-mêmes. Les pratiques d’ingénierie sont complémentaires aux activités techniques pour garantir un bon niveau de qualité et la fiabilité du logiciel.

Nous préconisons par exemple de mettre l’accent sur l’automatisation des tests, pour vérifier rapidement les fonctionnalités ainsi que les non régressions. La mise en œuvre d’une plateforme d’intégration continue peut faciliter l’automatisation des tests. Mais certains peuvent se poser la question : En quoi l’automatisation des tests peut améliorer la qualité du logiciel ? Pour y répondre, prenons un exemple concret que nous avons vu lors de certaines de nos interventions. Dans une équipe de test logiciel, dont le rôle est de valider les développements logiciels, les testeurs déroulent manuellement un plan de test d’intégration d’un logiciel qui pilote une machine. Plus l’équipe de développement avance et livre de nouvelles fonctionnalités et plus le plan de test à dérouler se rallonge et devient difficile à maintenir. L’équipe de test se retrouve vite débordée. Elle n’arrive plus à finir les tests d’une version avant l’arrivée de la version suivante. L’équipe de test est devenue alors le goulot d’étranglement du cycle de développement logiciel. Elle se trouve obligée de livrer des versions partiellement testées, ce qui représente une source de défaillance de qualité.

{{< figure src="/img/article_niveau_qualite/2020_09_15_qualite_tableau_2.png" title="Tableau 2. Classification des niveaux de qualité requis pour un développement logiciel non soumis à une norme">}}

Nous conseillons également une démarche de développement itérative et incrémentale qui représente un cadre pour développer un logiciel de qualité. Cette approche favorise la prise en compte des modifications fonctionnelles, et permet de rendre possible la révision et l’amélioration de certains choix et certains aspects du logiciel. La démarche itérative et incrémentale permet de livrer rapidement des fonctionnalités, avant la fin de la rédaction de toutes les spécifications de l’application. Cela permet d’identifier rapidement les problèmes et les erreurs injectées lors de la phase d’écriture des exigences.

En adoptant une telle démarche itérative et incrémentale, le cycle de vie de développement logiciel (écriture d’exigences, tests, architecture, code, etc.) est appliqué plusieurs fois. Ces répétitions vont permettre son amélioration continue et l’efficience du processus va s’améliorer considérablement au fur et à mesure que le projet avance.

Dans les normes décrites dans la section II concernant le développement de logiciels critiques, nous trouvons des objectifs à atteindre décrits et classés selon le niveau de criticité du logiciel. Notre approche de définition d’un niveau de qualité requis, pour les logiciels non soumis à des normes, ne se limite pas à la définition d’objectifs et d’activités techniques. Elle préconise également des pratiques d’ingénierie à mettre en œuvre. Cette vision de la qualité combine à la fois la fiabilité des données logicielles produites et l’efficience des processus et des activités techniques. Rendre certaines activités plus efficientes et plus fiables aura un impact direct sur la maitrise du budget et des délais de livraison.

Nous pensons qu’il est pertinent que ces pratiques d’ingénierie soient communes à tous les niveaux de qualité requis. Il s’agit d’un ensemble de méthodes et d’outils ayant un coût dans les premières phases du projet. L’objectif de ces pratiques d’ingénierie est de ramener de l’efficience et de la rigueur dans le développement logiciel, en particulier, quand on adopte une démarche itérative et incrémentale.

En faisant une comparaison des niveaux de qualité introduits dans cette section avec les niveaux de criticité définis dans les normes existantes de développement de logiciels critiques, nous pouvons, à titre indicatif, mentionner les équivalences suivantes :

-	Le niveau 3 peut correspondre au niveau DAL-C (DO-178C) / SIL2 (EN-50128)
-	Le niveau 2 peut correspondre à un niveau qui va se positionner entre le DAL-D et le DAL-C (DO-178C) / entre SIL1 et SIL 2 (EN-50128).
-	Le niveau 1 peut correspondre au niveau DAL-D (DO-178) / SIL 1 (EN-50128)

Nous savons qu’un développement en DAL-C peut coûter environ +35% à +40% de surcoût par rapport à un développement classique. Nous estimons que la mise en œuvre du niveau 3 correspond à ~30% de coût supplémentaire à prévoir (activités techniques de qualité et pratiques d’ingénierie), puisque ce niveau n’intègre pas toutes les activités de la DO-178C DAL-C. Pour le niveau 2, nous estimons le coût supplémentaire entre 20% et 25% et entre 10% et 15% pour le niveau 1.

Ce surcoût reste un très bon investissement comparé aux surcoûts de maintenance pour des développements de logiciels ayant des déficiences de qualité. Dans ce cas, le coût de maintenance représente au moins 60% du coût total de développement logiciel, et ~50 % des coûts de maintenance concernent la gestion et la correction des anomalies.

### C.	Stratégie de Test

Tout au long de la crise sanitaire liée au virus COVID-19, le mot d’ordre était « faire des tests, plus de tests, et des tests rapides pour identifier le plutôt possibles les personnes contaminées ». Dans le monde du logiciel, les tests sont également indispensables pour maîtriser la qualité du logiciel et garantir sa fiabilité. Les tests permettent de vérifier que les exigences ont été correctement implémentées et pour identifier les anomalies.

Si l’équipe projet n’écrit pas suffisamment de tests, ou les écrit tard dans le processus de développement, les anomalies seront découvertes également tard dans le cycle de vie de développement logiciel. Il s’agit d’une course pour identifier les erreurs avant qu’elles ne soient plus rattrapables. Le coût de résolution d’une anomalie logicielle évolue exponentiellement en fonction du moment de sa découverte. Dans [Jones Capers], l’auteur estime que le coût de résolution d’une anomalie peut être multiplié par 4 si elle est découverte par les tests unitaires et par 10 si elle est découverte par les tests fonctionnels. Ce coût explose rapidement quand l’anomalie est découverte par des tests systèmes (x 40). Le coût peut être multiplié par 640 quand l’anomalie n’est pas découverte lors du cycle de vie de développement et quand elle apparaît après la livraison.

Dans les processus de développement logiciel itératifs et incrémentales que nous avons mis en œuvre jusqu’à maintenant, la gestion des anomalies représente 8% à 10% du temps total de développement avec un vélocité de 1,5 jours pour la correction d’une anomalie. La détection rapide des anomalies explique bien ces métriques.

Ainsi, la qualité logicielle devient une variable indispensable pour l’équilibre des projets (maîtrise de budget, maîtrise des délais). Considérer la qualité comme une variable d’ajustement dans un projet implique forcément une perte de la maîtrise du projet au niveau de la fiabilité, du budget et des délais.

Pour identifier les anomalies et les maîtriser tôt dans le cycle de vie de développement logiciel, nous proposons dans les niveaux de qualité requis plusieurs activités techniques et des pratiques d’ingénierie associées. L’objectif des activités techniques est de fournir une couverture complète du code et des scénarios d’exécution des fonctionnalités à travers des tests (unitaires, fonctionnels, systèmes, boites blanches, boites noires, etc.), ayant un jeu données complet. L’objectif des pratiques d’ingénierie est de garantir la rapidité de l’exécution des tests et leur intégration au plus tôt dans les processus de développement. Cela peut être fait en utilisant les techniques et les outils TDD (Test Driven Development) et BDD (Behaviour Driven Development). Nous préconisons l’écriture des scénarios de tests au même moment que les exigences, et par la même personne pour éviter de potentielles incompréhensions des exigences par les développeurs. Nous estimons que la personne qui écrit l’exigence est la mieux placée pour décrire le test correspondant. Ainsi, nous pouvons vérifier très tôt dans le processus que toutes les exigences sont vérifiables puisqu’on dispose d’un scénario de test avec un jeu de données par exigence. L’équipe de développement implémente l’exigence et le scénario de test en même temps, sans le modifier.

{{< figure src="/img/article_niveau_qualite/2020_09_15_qualite_figure_7.png" title="Figure 7. Détection des anomalies : Impact sur les coûts de corrections [Capers2008] [Hicken2018]" width="700">}}

L’intégration d’un outillage d’automatisation d’exécution des tests TDD/BDD, tel une plateforme d’intégration continue, avec la génération de rapports de tests, donne à l’équipe de développement un outil puissant pour exécuter rapidement les nouveaux tests, ainsi que les tests de non régression.
A Sogilis, nous avons développé le framework de test BDD XReq (eXecutable Requirements) [Xreq], dédié pour le développement de logiciels embarqués (en Ada et en C/C++). Les rapports de tests natifs, ou croisés sont générés et intégrés automatiquement dans la plateforme d’intégration continue.

### D.	Garantir un niveau de qualité en continu

Parmi les principaux avantages de la mise en œuvre des pratiques d’ingénierie mentionnées dans le tableau 2, nous pouvons évoquer la garantie de livrer à chaque fin d’une tâche une version ayant le niveau de qualité requis des données développées jusque-là. La qualité n’est plus une variable qu’on peut ajuster quand le projet dérape, mais plutôt un critère de livraison de chaque tâche et de chaque incrément du développement logiciel. Combiner les activités techniques de qualité aux pratiques d’ingénierie (Tableau 2) permet d’intégrer plus étroitement les activités de qualité au cycle de vie de développement logiciel. Cela permet d’apporter de façon continue des garanties du niveau de qualité requis.

La pression de livrer rapidement et en continu des logiciels fonctionnels en respectant des contraintes de coûts et de délais a été toujours un argument des équipes de projets pour laisser de côté les activités de qualité. La solution consiste à coupler fortement les activités de qualité aux activités de développement dans le cycle de vie de développement logiciel. Ce couplage fort passe par une définition claire d’une tâche « terminée / done». Une tâche serait considérée comme « terminée » si et seulement si toutes les activités techniques de développement et de vérification ont été bien réalisées. La plateforme d’intégration continue servira simplement d’outil pour exécuter systématiquement toutes les activités de la chaîne de livraison : compilation, exécution de tous les tests, vérification des cohérences entre les données développées, calcul des métriques de qualité, packaging, etc.

## IV.	Conclusions

En résumé, nous avons exposé, dans cet article, la problématique de la qualité logicielle des développements non soumis à des normes industrielles sectorielles. Nous avons proposé une approche pour mesurer le niveau de qualité requis d’un logiciel en fonction de plusieurs critères, à savoir, la complexité fonctionnelle, le contexte métier, les exigences du marché, la complexité technique et le niveau de la dette technique.

Dans notre proposition, l’atteinte du niveau de qualité requis passe par la mise en œuvre d’activités de qualité techniques et par la mise en œuvre de pratiques d’ingénierie innovantes (Tests TDD/BDD, développement itératif et incrémental, Intégration continue, etc.).

L’investissement dans la qualité logicielle garantit une fiabilité et une qualité continue du logiciel sur sa durée de vie et sur ses versions postérieures.  C’est également une garantie pour mieux maîtriser les budgets et les délais, et surtout pour diminuer d’une manière considérable les coûts de maintenance.

## V. Références bibliographiques

**[iec61805]** :  International Electrotechnical Commission, “Functional Safety and IEC 61805”, https://www.iec.ch/functionalsafety/standards/

**[Gibbs94]** :  W. Gibbs, “Software's Chronic Crisis”, Scientific American 271 (3), 1994, pp. 86-95.
[Dij79] Edsger Dijkstra, Le programmeur Humble (PDF), Dans Classics en génie logiciel, Yourdon Press, 1979.

**[Louis2019]** :  V. Louis, C. Baron “ Vers une certification continue de logiciels critiques en aéronautique », Novembre 2019, « https://hal.archives-ouvertes.fr/hal-02372069 »

**[Yu2009]** :  A. G. Yu, "Software Crisis, What Software Crisis ?, « 2009 International Conference on Management and Service Science, Wuhan, 2009, pp. 1-4.

**[Hilderman 2009]** :  Hilderman, Vance. “DO-178B Costs Versus Benefits”, https://vancehilderman.com/2015/12/23/do-178c-costs-versus-benefits/

**[Fitz2012]** : B. Fitzgerald, "Software Crisis 2.0," in Computer, vol. 45, no. 4, pp. 89-91, April 2012.

**[Spector86]** : Alfred Z. Spector, David K. Gifford: “A Computer Science Perspective of Bridge Design. Commun. ACM 29(4): 267-283 (1986)

**[Chaosreport18]** : https://www.standishgroup.com/store/

**[Capers2008]** : C. Jones. 2008. Applied Software Measurement: Global Analysis of Productivity and Quality (3 ed.). McGraw-Hill Osborne Media.

**[Hicken2018]** :  A. Hicken. 2018, “The Shift-Left Approach to Software Testing »,  https://www.stickyminds.com/article/shift-left-approach-software-testing

**[Xreq]** : https://sogilis.com/services-logiciels-critiques/



