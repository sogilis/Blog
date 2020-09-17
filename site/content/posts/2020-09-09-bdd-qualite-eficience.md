---
title: BDD - Apport en Qualité et en Efficience dans le développement logiciel
author: Amin
date: 2020-09-08
image: /img/2020_09_09_bdd.png
categories:
  - DÉVELOPPEMENT
tags:
  - code
  - dev

---
<div align="justify"> 

**Résumé— Pendant plusieurs années, l’industrie logicielle a mis l’accent sur l’évolution des langages de programmation (programmation orientée objet par exemple) et des environnements de développement pour répondre à un besoin d’efficience de développement et d’intégration rapide de plusieurs fonctionnalités. Aujourd’hui, cette industrie est de plus en plus exigeante quant à la qualité, l’évolutivité des logiciels et leurs utilisabilités. Cela nécessite une maîtrise élevée et continue du logiciel tout au long de son cycle de vie. Pour assurer cette maîtrise, de nouvelles méthodes et pratiques d’ingénierie sont indispensables, à savoir les méthodes itératives et incrémentales, les tests, la gestion des exigences, les méthodes de développement TDD (Test Driven Development) et BDD (Behavior Driven Development), etc.**

**Cet article s’intéresse à une méthode de développement qui concentre ses activités techniques autour de la définition du comportement souhaité du logiciel (BDD). Cette méthode permet d’assurer une meilleure compréhension partagée des besoins, tôt dans le cycle de vie de développement logiciel. Dans cet article, nous présentons cette approche, ainsi que ses avantages pour apporter de la qualité et de l’efficience. Nous expliquons également comment l’utilisation de cette approche peut faciliter l’atteinte de certains objectifs normatifs dans le cadre du développement de logiciels critiques et normés (DO-178C pour l’aéronautique, IEC 62304 pour le médical).**

</div>

## I.	Introduction

<div align="justify"> 

Dans l’industrie logicielle, les facteurs de dépassement de coûts, et d’une manière générale de l’échec d’un projet de développement sont multiples. Parmi les principales raisons, et selon les études réalisées durant ces dernières années (Standish Group Chaos Report [ChaosReport]), on retrouve les spécifications incomplètes, non claires, ambiguës qui peuvent changer durant le cycle de vie de développement logiciel (Scope Creep) (figure 1). On retrouve également le manque d’implication des utilisateurs dans les phases de capture de besoins et de validation.</div>

![Figure 1. Principaux facteurs d’échec dans le développement logiciel](/img/2020_09_09_bdd_figure_1.png)

*Figure 1. Principaux facteurs d’échec dans le développement logiciel*

<div align="justify">

Ces facteurs d’échec sont d’autant plus impactants et marquants dans un contexte de développement utilisant une approche à base de cycle en V. En effet, il s’agit d’un modèle de développement rigide ne permettant pas d’intégrer facilement des modifications et des adaptations aux exigences. Il s’agit également d’un modèle de développement favorisant une mauvaise compréhension des exigences, en raison de l’inexistence d’activités techniques permettant la convergence de la compréhension des besoins entre tous les acteurs du projet (l’équipe fonctionnelle, les utilisateurs et l’équipe de développement). D’après les études dans [EcoImp], plus de 65% des anomalies sont identifiées tard dans le cycle de vie de développement logiciel, pendant la phase d’implémentation et d’intégration. Une grande partie de ces anomalies est due à l’incohérence entre le code développé et les exigences définies. Aujourd’hui, des anomalies onéreuses en temps de traitement sont introduites tôt dans le cycle de développement logiciel. Elles résultent d’un manquement et de défaillances dans la capture des besoins et dans la gestion de leurs évolutivités, entre les équipes qui rédigent les exigences et les équipes qui implémentent et testent le logiciel.
</div>
<div align="justify">

Ces facteurs d’échec et de dépassement de coûts pourraient être évités et atténués en ayant recours à des pratiques d’ingénieries et des méthodes de développement comme le BDD. En effet, la méthode de développement pilotée par le comportement (en anglais Behavior-Driven Development ou BDD) a été introduite pour fluidifier et simplifier la compréhension et la validation des besoins entre tous les acteurs qui interviennent dans le cycle de vie de développement du logiciel. Il s’agit d’une démarche où la définition des exigences d’un côté et des scénarios de tests d’un autre côté deviennent intrinsèquement liées. Le développement piloté par le comportement serait bénéfique et facile à appliquer avec les méthodes de développement itératives et incrémentales.
</div>
<div align="justify">

La section II présente un état de l’art des plateformes de développement BDD existantes. La section III discute les avantages d’utiliser l’approche BDD pour améliorer la qualité et l’efficience des développements logiciels. Les sections IV et V expliquent comment une approche BDD peut être utilisée dans le développement et la vérification d’exigences fonctionnelles, y compris dans le cadre du développement de logiciels critiques et normés. La section VI présente le Framework XReq [XReq] et des exemples de cas d’utilisation.
</div>

## II.	Développement piloté par le comportement 

<div align="justify">

Le développement piloté par le comportement favorise l’utilisation d’un langage naturel et commun pour expliquer les exigences fonctionnelles à travers des scénarios de test. Les scénarios de tests permettent d’apporter des exemples concrets d’application des exigences. Le développement piloté par le comportement permet de s’assurer que les exigences logicielles répondent bien aux besoins utilisateurs. Le langage naturel Gherkin [Gherkin] est utilisé par la plupart des Framework BDD pour écrire les scénarios de tests. Il s’agit d’un langage simple et facile à comprendre et à utiliser pour décrire le déroulement d’une fonctionnalité. Il décompose un scénario de test en trois principales étapes :
</div>

-	Initialisation du Contexte (Given)
-	Action (When)
-	Résultat attenu (Then)

<div align="justify">

Le scénario de test est parfois suivi par un jeu de données qui complète l’instanciation du scénario.

</div>

![Figure 2. Exemple d’un Scénario de test avec XReq [XReq]](/img/2020_09_09_bdd_figure_2.png)
*Figure 2. Exemple d’un Scénario de test avec XReq [XReq]*

<div align="justify">

La figure 2 illustre un exemple de scénario de test qui se déroule autant de fois que de nombre de lignes dans le jeu de données avec XReq.

Des Frameworks de développement BDD existent comme Cucumber [Cucumber], XReq [Xreq], SpecFlow [Specflow], Jbehave [Jbehave] et Concordion [Concordion]. Cucumber est le Framework le plus connu, qui propose différentes implémentations pour de nombreux langages de programmation (Java, Go, Javascript, etc.). 

SpecFlow a été développé en s’inspirant de Cucumber et utilise le langage Gherkin dans la description des scénarios de tests. Il est dédié aux applications implémentées en .net C# et s’interface avec Visual Studio. Concordion [Concordion] est un Framework de BDD écrit en Java et intègre le Framework de tests unitaires JUnit.

XReq [XReq] est un Framework de test dédié au développement de logiciels embarqués écrits en C/C++ ou en Ada. Avec XReq, il est possible de générer du code de test, en langage C et en Ada et de générer des rapports de tests, en natif ou en mode croisé (tests XReq exécutés sur la plateforme cible). XReq dispose d’un outil de reporting et se greffe facilement avec l’outil de reporting cucumber-report. 
</div>

![Figure 3. Exemples de Frameworks BDD](/img/2020_09_09_bdd_figure_3.png)
*Figure 3. Exemples de Frameworks BDD*

<div align="justify">

La plupart des Frameworks BDD ne se contentent pas de l’aspect documentaire dans l’écriture des scénarios de tests, mais fournissent des outils pour générer le code des squelettes des tests à partir des scénarios. Ils fournissent également des moteurs d’exécution des tests afin de faciliter l’automatisation de l’exécution des scénarios de tests avec le jeu de données correspondant. La figure 4 illustre le cycle de vie d’un scénario de test dans les Frameworks BDD avancés [Cucumber] [Xreq] [SpecFlow] depuis l’écriture des scénarios des tests jusqu’à la génération du rapport des tests, en passant par la génération du code des tests, leurs implémentations et leurs exécutions.
</div>

![Figure 4. Cycle de vie d’un scénario de Test dans un Framework BDD](/img/2020_09_09_bdd_figure_4.png)
*Figure 4. Cycle de vie d’un scénario de Test dans un Framework BDD*

## III.	Efficience et Qualité

<div align="justify">

L’utilisation des techniques BDD dans le développement logiciel pourrait contribuer à l’amélioration de la qualité logicielle et à l’efficience des équipes de développement. Cela peut se traduire à plusieurs niveaux, pour plusieurs activités techniques :

**Maîtriser le niveau de la qualité logicielle et améliorer la qualité des exigences** : la perte de la maîtrise de la qualité d’un logiciel est souvent liée à l’accumulation des anomalies. Ces anomalies sont souvent découvertes tard dans le cycle de vie de développement logiciel et deviennent compliquées à corriger. Elles deviennent coûteuses car les équipes de développement ne disposent pas de moyens suffisants, en termes de tests, pour vérifier la non régression du logiciel suite à la livraison d’un correctif. Une des causes racines de la perte ou la non maîtrise d’un logiciel est l’absence de tests logiciels automatiques couvrant les principales fonctionnalités. 

L’application d’une approche BDD durant la phase de capture de besoins permet d’écrire les scénarios de tests à implémenter dans un second temps. Les scénarios de tests écrits en BDD seront les tests de non régression qui vont aider à garantir un niveau de fiabilité du logiciel et à le maintenir plus facilement.

D’un autre côté, nous savons qu’une grande partie des anomalies est due à une incompréhension des exigences. Ces anomalies sont introduites tôt dans le cycle de vie du logiciel. Pour réduire le nombre d’anomalies liées à une mauvaise compréhension des exigences, il faut recourir à des techniques BDD. En effet, les scénarios de tests BDD permettent de vérifier que les exigences ont été correctement écrites et comprises par les équipes de développement avant de procéder à leurs implémentations. Cette phase de vérification, au moyen de scénarios de tests BDD, peut amener à itérer et à améliorer les exigences tant au niveau fonctionnel qu’au niveau des besoin d’utilisabilité.

**Améliorer la qualité des tests logiciels** : généralement, les tests sont écrits par les développeurs après l’implémentation des fonctionnalités. Les développeurs ont toujours tendance à écrire les tests selon leur compréhension des exigences et en fonction des développements qu’ils ont menés. De plus, il n’y a souvent pas d’activités techniques pour vérifier les tests écrits par les développeurs. Cela peut amener à disposer de tests incomplets, ou mal écrits, en face d’une implémentation incorrecte des exigences. Pourtant, les indicateurs de qualité seraient au vert puisque tous les tests passent et on peut disposer d’un taux élevé de couverture de code.

Une approche BDD peut apporter des solutions à ce niveau en améliorant d’une manière considérable la qualité du test logiciel. En effet, l’amélioration de la qualité des tests commence déjà par la lisibilité du format du test. Il est beaucoup plus simple de vérifier un scénario de test écrit en langage naturel Gherkin et de vérifier le jeu de données associé (voir Figure 2), que de vérifier des tests écrits en code avec un jeu de données réparti sur plusieurs lignes de code. Le format d’écriture d’un scénario de test BDD favorise la vérification de la complétude des jeux de données. Les tests BDD sont encore plus simples à lire et à vérifier et sont plus rapides à écrire et à lire.

Les scénarios de tests BDD permettent aux équipes de développement d’apporter plus d’expressivité dans l’écriture des scénarios de tests. En effet, quand les développeurs implémentent les tests après l’implémentation des fonctionnalités, ils sont limités par l’expressivité des composants logiciels déjà implémentés. En écrivant les scénarios de tests au même moment que les exigences, ils peuvent écrire des scénarios qui appellent à la fois des composants logiciels et matériels. L’implémentation de ces tests passent par l’implémentation de composants Stub. Ces pratiques favorisent l’implémentation de tests ayant un important taux de couverture fonctionnelle. Le taux de couverture fonctionnelle est un indicateur pertinent de qualité et pourrait être amélioré et piloté par l’utilisation des techniques de BDD.

**Efficience des équipes de développement** : la mise en œuvre d’une approche BDD permet aux équipes de développement d’exploiter directement des scénarios de tests validés sans passer du temps à les écrire. Nous pensons que les scénarios de tests doivent être écrits par l’équipe fonctionnelle et que l’équipe de développement doit se contenter d’implémenter ces scénarios sans les modifier. Ainsi, l’équipe de développement se contente de générer le code des tests, de les compléter, pour ensuite les exécuter et générer le rapport de tests complet. 

L’utilisation des outils automatiques des Framework BDD (génération de code des tests, exécution du jeu de données entier, génération des rapports de tests (Voir figure 4)) permet à l’équipe de développement de gagner en efficience.  Le BDD n’est plus seulement une démarche pour améliorer et vérifier la capture des besoins mais un ensemble d’outils pour optimiser le cycle de vie de développement logiciel. Il permet de laisser une trace documentaire à jour aidant à maintenir l’intégrité des développements.
</div>

## IV. Remplacer une exigence par des scénarios BDD

<div align="justify">

Pour certains projets de certains acteurs industriels chez qui nous sommes intervenus, nous avons préconisé de remplacer la définition d’exigences par la description de scénarios de test. Un scénario de test complet avec un jeu de données complet peut remplacer une exigence. Cela peut être fait sous certaines conditions :

-	L’équipe de développement doit maitriser les techniques BDD et être mature sur la technologie.
-	L’équipe de développement doit mettre en place des standards d’architecture logicielle et d’écriture de scénario de tests pour maintenir l’intégrité et la cohérence des exigences. 
-	Associer un scénario de test, qui remplace l’exigence, à un composant logiciel. 
-	Les scénarios de tests doivent être écrits sous forme de tests logiciels de type boites noires et boites blanches.

Pour réduire l’effort de test et standardiser l’écriture des exigences, certaines équipes ont choisi d’utiliser du pseudo code ou de la preuve formelle dans l’écriture des exigences. Cela nécessite des compétences chez l’équipe fonctionnelle pour maîtriser l’algorithmique et les langages formels, ce qui représente un frein réel et une source de génération d’anomalies. Cependant, ces problèmes peuvent être surmontés quand l’exigence est décrite sous forme de scénarios de tests avec un langage naturel simple et facile à lire et à écrire.
</div>

## V. Le BDD pour le développement de logiciels critiques

<div align="justify">

Le développement de logiciels critiques, pour certains domaines (aéronautique, médical, automobile, ferroviaire, nucléaire, etc.) s’appuie sur des normes, qui déclinent tous de l’IEC 61508 [iec61508]. Chaque norme décrit des objectifs à atteindre (les exigences sont en cohérence avec l’architecture, le code respecte les standards de codage définis, toutes les exigences sont testées, etc.) pour garantir un certain niveau de fiabilité, qui consiste à démontrer et à garantir que le logiciel livré implémente exactement les fonctionnalités souhaitées. La liste des objectifs à atteindre diffère d’un niveau de criticité à un autre. 

Dans cette section, et en partant de nos expériences de développement, nous présentons comment le BDD peut répondre à certains objectifs des normes DO-178C/ED12C (développement des logiciels aéronautiques) et IEC 62304 (développements de logiciels pour les dispositifs médicaux (DM)).

Dans la norme DO-178C/ED12C, nous pouvons utiliser les techniques de BDD pour répondre à des objectifs de vérification des exigences de haut niveau de type HLR (High Level Requirement) et des exigences de bas niveau de type LLR (Low Level Requirement) (voir Figure 5.). Les scénarios de tests sont écrits pour produire les tests associés aux exigences (HLT : High Level Test et LLT : Low Level Test).
</div>

![Figure 5. Utilisation du BDD pour satisfaire des objectifs de vérification des HLT dans la DO-178C](/img/2020_09_09_bdd_figure_5.png)
*Figure 5. Utilisation du BDD pour satisfaire des objectifs de vérification des HLT dans la DO-178C*

<div align="justify">

**High/Low Level requirements are accurate and consistent** : grâce à une approche BDD où les scénarios de tests sont écrits en même temps que les exigences, nous pouvons nous assurer du niveau de précision de l’exigence en analysant les scénarios de tests associés ainsi que les jeux de données correspondants. Il s’agit de vérifier l’absence d’ambiguïté dans l’écriture des tests et de réaliser une analyse comportementale de l’exigence. L’activité de vérification consiste également à vérifier la cohérence entre l’exigence et le scénario de test en analysant la cohérence des entrées/sorties, la complétude des scénarios de tests, la couverture des classes d’équivalences et des valeurs limites. Le langage de description des scénarios de tests en BDD favorise ces vérifications grâce au format simple en lecture.

**High/Low level requirements are verifiable**: l’association de scenarios de test BDD aux exigences tôt dans le cycle de vie de développement logiciel nous permet de disposer d’exigences couvertes par des tests et donc vérifiables. Pour valider qu’une exigence est vérifiable, il suffit de vérifier s’il y a des scénarios de tests BDD qui lui sont rattachés. Les scénarios de tests décrivent les cas de tests de l’exigence. Ils seront ensuite implémentés et exécutés pour valider le code des exigences. Une traçabilité de type Scénario de test / Exigence complète avec une vérification de la complétude des cas de tests peut répondre à cet objectif.

L’utilisation d’une approche BDD facilite également la mise en œuvre des activités de vérification tout en assurant l’indépendance des rôles. L ’indépendance des rôles exige une séparation des acteurs qui développent les données et ceux qui la vérifient. Grâce au format lisible et compact des scénarios de tests BDD (voir Figure 2), l’équipe fonctionnelle peut facilement développer les cas de test, sans disposer obligatoirement de connaissances techniques. D’autres personnes de l’équipe fonctionnelle peuvent facilement analyser ces données dans le cadre des activités de vérification. Le BDD permet de fluidifier les activités de relecture et de validation de la cohérence entre les HLR et les HLT et entre les LLR et LLT.

Dans la norme IEC 62304, nous pouvons utiliser les techniques de BDD de la même manière qu’en DO-178C pour répondre à des objectifs de développement et de vérification des exigences logicielles. La norme exige le développement d’exigences logicielles cohérentes, précises et vérifiables (voir figure 6).
</div>

![Figure 6. Développement d’exigences vérifiables dans la norme IEC 62304](/img/2020_09_09_bdd_figure_6.png)

*Figure 6. Développement d’exigences vérifiables dans la norme IEC 62304*

## VI. Le Framework XReq

![Figure 6. Développement d’exigences vérifiables dans la norme IEC 62304](/img/2020_09_09_bdd_xreq.png)

<div align="justify">

**XReq (eXecutable Requirements)** est un Framework BDD, développé et commercialisé par Sogilis. XReq est dédié au développement de logiciels embarqués et peut être utilisé dans le développement de logiciels critiques en conformité avec des normes industrielles sectorielles (DO-178B/C, IEC-62304, EN-50128, ISO 26262, etc.).

 **XReq** propose une syntaxe d’écriture des scénarios de tests inspirée du langage Gherkin avec des extensions dans le mode d’écriture du contexte des scénarios et dans la description des jeux de données. XReq permet la génération de code des tests en C/C++ et en Ada (squelettes des étapes de tests) (voir figure 7). La génération de code et le moteur d’exécution des tests dans XReq sont dédiés aux applications et aux environnements embarqués. Il est possible d’utiliser XReq pour exécuter des tests en mode natif ou en mode croisé sur la plateforme cible. 
</div>

![Figure 7. Description des cas de tests et génération du code des step_definitions avec XReq](/img/2020_09_09_bdd_figure_7.png)
*Figure 7. Description des cas de tests et génération du code des step_definitions avec XReq*

<div align="justify">

Après exécution des tests, <b>XReq</B> génère un rapport détaillant le statut d’exécution des scénarios de tests en précisant l’état de chaque étape des scénarios (step_def) (voir figure 8). 

Aujourd’hui, le <b>Framework XReq</b> est utilisé dans plusieurs projets industriels, à la fois dans le développement de logiciels industriels et dans le développement de logiciels critiques normés. 
</div>

![Figure 8. Rapport de test généré par XReq](/img/2020_09_09_bdd_figure_8.png)
*Figure 8. Rapport de test généré par XReq*

### A. Développement de logiciels normés

<div align="justify">

Le BDD, à travers XReq est utilisé dans le cadre du développement d’un contrôleur de vol certifié en conformité avec la DO-178C DAL A [Pulsar]. Une des principales raisons du développement de XReq par Sogilis est l’absence sur le marché d’un Framework BDD dédié aux applications embarquées et pour les logiciels critiques. L’utilisation du BDD et de XReq a été introduite dans les plans de certification décrivant les activités des processus de développement et de vérification des données logicielles. Dans ce projet, les équipes de développement ont produit jusqu’à aujourd’hui avec XReq plus de 600 cas de test de haut niveau en face des HLR (~7000 assertions implémentées dans les blocs « Then ») et plus de 1000 cas de test de bas niveau en face des LLR ((~8000 assertions implémentées dans les blocs « Then »). Grâce à cette approche, nous avons pu stabiliser le temps de gestion des anomalies à ~8% du temps total de développement logiciel.  

XReq, et l’approche BDD d’une manière générale, a apporté de l’efficience dans ce développement logiciel. Cela nous a fortement aidé à la réalisation de plusieurs activités et pour satisfaire plusieurs objectifs de la norme, à savoir :
-	Favoriser l’indépendance des rôles dans les activités de vérification : Efficience dans la vérification des scénarios de tests, en simplifiant la vérification des jeux de données par exemple (MC/DC, classes d’équivalence, complétude, valeurs limites, etc.) ;
-	Favoriser la séparation des rôles dans l’écriture des cas de test :  La personne qui écrit les exigences écrit les scénarios de tests et n’implémente pas la fonctionnalité ;
-	Favoriser l’écriture d’exigences vérifiables, précises et cohérentes ;
-	Intégration facile de l’environnement de test dans une plateforme d’intégration continue (CI)
-	Intégration facile des scénarios de tests dans un environnement de test de type HIL (Hardware
In the Loop) 

</div>

### B. Développement de logiciels pour automates PLC

<div align="justify">

**XReq** est également utilisé pour améliorer l’efficience et la qualité dans le développement de logiciels industriels de contrôle-commande sûrs et embarqués sur des automates PLC. XReq est utilisé pour vérifier et améliorer la qualité des exigences logicielles. Les tests XReq sont implémentés en face des composants logiciels écrits avec le langage Reflex [Reflex]. Reflex est un langage de programmation de haut niveau, de type GALS « Globalement Asynchrone, Localement Synchrone » basé sur le langage Ada. Il permet d’écrire des applications logicielles de haut niveau pour du prototypage virtuel des applications de contrôle-commande. Une fois l’application Reflex testée et vérifiée en utilisant XReq, nous procédons dans un second temps à la génération de code du logiciel final qui sera déployé sur les équipements d’automates cibles. 

Aujourd’hui, les développeurs des applications d’automates sont confrontés au manque d’outillage pour tester et vérifier les applications implémentées directement avec les outils des constructeurs des PLC. L’utilisation du BDD avec un langage de haut niveau, comme Reflex permet de vérifier les fonctionnalités et de détecter les anomalies tôt dans le cycle de vie de développement applicatif. 

Dans le cadre du développement d’une application simple de gestion d’un réseau de pompes, l’équipe logicielle a produit avec XReq ~60 cas de test en face des exigences avec ~700 vérifications de type « assertion ». A ce stade, les différentes fonctionnalités de l’application ont été testées sans connaissance de plateforme matérielle cible. L’utilisation du BDD a apporté de l’efficience et de la qualité pour les logiciels industriels de contrôle-commande, et cela à plusieurs niveaux :
-	Favoriser et améliorer la qualité et la documentation des exigences logicielles (en renforçant l’expression du besoin) et des liens de traçabilité entre les toutes les données produites (voir Figure 9);
-	Améliorer la qualité des tests en détectant plus rapidement les cas de tests manquants ;
-	Favoriser l’écriture d’exigences vérifiables et de tests logiciels de types « Boite Blanche » et « Boite Noire »
-	Intégration facile de l’environnement de test BDD, et de ses rapports d’exécution, dans une plateforme d’intégration continue (CI).

</div>

![Figure 9. De l’exigence logicielle au rapport de test : Utilisation de XReq et Reflex dans le développement d’applications de contrôle-commande](/img/2020_09_09_bdd_figure_9.png)
*Figure 9. De l’exigence logicielle au rapport de test : Utilisation de XReq et Reflex dans le développement d’applications de contrôle-commande*

## VII. Conclusion

<div align="justify">

En résumé, le BDD est une approche qui réinvente les stratégies de test et les processus de développement logiciel. Elle permet de réduire considérablement les anomalies dont l’origine est l’imprécision ou l’incohérence des exigences logicielles. En effet, la scénarisation des exigences renforce la qualité de l’expression des besoins et de leur utilisabilité. Nous avons exposé dans cet article comment le BDD peut être compatible et utilisable pour le développement de logiciels industriels critiques et normés, et comment on peut en tirer profit au niveau de la qualité et de l’efficience.
</div>

## VIII. Références

**[ChaosReport]** : Standish Group: “Standish Group Chaos Report” 

**[EcoImp]** : The Economic Impacts of Inadequate Infrastructure for Software Testing, Studies by the National Institute of Standards and Technology and the National Aeronautics and Space Administration,

https://www.nist.gov/system/files/documents/director/planning/report02-3.pdf 

**[Xreq]** : https://sogilis.com/services-safety-critical.html

**[Gherkin]** : https://cucumber.io/docs/gherkin/reference/

**[Cucumber]** : https://cucumber.io/

**[Specflow]** : https://specflow.org/

**[Jbehave]** : https://jbehave.org/

**[Concordion]** : https://concordion.org/

**[iec61805]** : International Electrotechnical Commission,  “Functional Safety and IEC 61805”,

https://www.iec.ch/functionalsafety/standards/

**[Pulsar]** : Pulsar Flight System: https://www.hionos.com/#pulsar

**[Reflex]** : https://www.artics.fr/produits

