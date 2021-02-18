---
title: Analyse Statique - Améliorer la qualité et Renforcer la sécurité du code 
author: Amin
date: 2021-02-17
image: /img/article_static_analysis/2021_02_17_static_analysis.jpg
categories:
  - DÉVELOPPEMENT
tags:
  - code
  - dev
  - security
  - quality
---

## I. Introduction

Cet article s’intéresse aux techniques d’analyse statique du code, que peuvent utiliser les équipes de développement, pour renforcer la sécurité et garantir la qualité du code logiciel. Il s’agit de techniques d’analyse et de vérification de certaines propriétés du logiciel ne nécessitant pas son exécution.

Les techniques et les outils d’analyse statique couvrent un périmètre large de vérifications et de méthodes d’analyse et d’extraction de métriques du code. Ce périmètre peut aller de la simple vérification syntaxique de certaines règles de codage jusqu’à l’extraction d’informations comportementales et prédictives du code. Nous pouvons citer par exemple l’extraction des valeurs possibles que peuvent prendre certaines variables ou l’extraction des emplacements mémoire des variables afin d’optimiser le fonctionnement des compilateurs. 
 
## II. Renforcer la sécurité et améliorer la qualité du code

L’analyse statique permet de renforcer la sécurité du code logiciel en détectant des vulnérabilités potentielles. Il s’agit par exemple de calculer et de prévoir les débordements de la mémoire instanciée ou le débordement de structures de données (Tableaux, Vecteurs, etc.).

 L’objectif de mettre en place des activités techniques orientée vers la sécurité du code est d’adresser les vulnérabilités logicielles. Ces vulnérabilités sont nombreuses et variables selon les spécifiés des technologies et des langages de programmation utilisés. Les langages appelés « fortement typés », comme la langage Ada, ou MISRA-C/C++ sont moins vulnérables que d’autres langages.
 
 C’est d’ailleurs pour cette raison que ces technologies sont largement utilisées dans le développement de logiciels critiques normés, dans les domaines de l’aéronautique, l’automobile ou le ferroviaire. Les vulnérabilités les plus connues sont:
-	Mécanismes d’allocation et de gestion dynamique de la mémoire au niveau des objets et des structures de données (fuite mémoire, débordement de pile, dépassement d’un tableau, etc.), 
-	Mécanismes d’héritage et d’héritage multiple, 
-	Conversion des types (cast, downcast), 
-	Gestion des exceptions, 
-	Gestion des pointeurs, 
-	Application des valeurs limites,
-	Division par zéro, 
-	etc. 

L’analyse statique permet de détecter également ce qu’on appelle les « Runtime Errors » (ou erreur d’exécution) et n’adresse pas les problèmes fonctionnels d’une manière générale. Une erreur d’exécution est une erreur qui se produit au cours de l’exécution d’un logiciel et n’est pas une erreur fonctionnelle. Il existe plusieurs types d’erreurs d’exécution (Memory Leaks, Illegal Memory Access, Uninitialized Memory, etc.) causés par une mauvaise utilisation du langage de programmation. Les « Runtime Errors » peuvent se manifester à n’importe quel moment durant l’exécution du logiciel (pouvant même se produire après plusieurs heures d’exécution) et sont difficilement détectables par les tests logiciels classiques (tests unitaires, tests fonctionnels, tests d’intégration, etc.). Ces erreurs peuvent avoir un impact sur l’intégrité, la sécurité et la sûreté de fonctionnement du logiciel.

Pour adresser ces vulnérabilités, des standards de codage peuvent être définis et vérifiés à leur tour par des outils d’analyse statique. Les standards de codage (ou règles de codage), sont des conventions de codage définies et appliquées par tous les développeurs logiciels. L’analyse statique permet de vérifier la violation ou non des règles de codage. Une violation implique que le code logiciel est vulnérable. 

Les standards de codage permettent à l’équipe logicielle d’adresser également des objectifs de qualité de code, à savoir une meilleure organisation et lisibilité du code (convention de nommage, limitation en nombre de ligne de code par classe ou par fichier, documentation du code, etc.). Elles peuvent également aider à implémenter les bonnes pratiques de développement logiciel, à les diffuser et à homogénéiser leur utilisation (mise en œuvre de patrons de conception, typage et sécurisation des attributs, architecture logicielle à base de composants orientée sécurité, programmation défensive, calcul et vérification du seuil maximal de la complexité cyclomatique du code, etc.). 

Les activités techniques d’analyse statique sont largement utilisées pour répondre aux objectifs de vérification des données dans le développement de logiciels critiques certifiés. Dans le développement de logiciels aéronautiques, le supplément DO-332 du standard DO-178C/ED12C (Object-Oriented Technology and Related Techniques Supplement to DO-178C and DO-278A) est dédié à l’utilisation des techniques orientés objets. Ce supplément liste l’ensemble des vulnérabilités à adresser dans le processus de développement du logiciel pour être en conformité avec le standard (voir figure 1.). Pour atteindre ces objectifs, deux moyens sont possibles : la relecture ou l’analyse statique. 
En se basant sur nos différentes expériences de développement de logiciels certifiés, nous pensons que la relecture toute seule ne suffit pas. En effet, la relecture a un coût en temps (temps de relecture qui peut donner lieu à de longues discussions) et en qualité puisque des anomalies vont forcément passer entre les mailles du filet. 

Par ailleurs, à notre connaissance, il n’existe pas d’outil d’analyse statique capable d’adresser toutes les vulnérabilités. Nous recommandons donc de mettre en place une solution mixte en maximisant les vérifications avec l’analyse statique. Un des critères de sélection d’une technologie est la disponibilité et la robustesse des outils d’analyse statique correspondants.

{{< figure src="/img/article_static_analysis/figure_001.png" title="Figure 1. DO-332 : Présentation des vulnérabilités liées à l’héritage dans le développement orienté objet " width="700" align="center">}}

Pour pouvoir utiliser l’analyse statique en aéronautique, il faut disposer d’outils qualifiés en conformité avec la DO-330 (Software Tool Qualification Considerations) (voir figure 2). Dans le choix d’outils de développement en conformité avec le standard DO-178C/ED12C, nous classons toujours les outils d’analyse statique en « Criteria 3 ». Il s’agit d’outils ne pouvant pas introduire d’erreurs, en revanche, ils peuvent échouer à en détecter. Ainsi, le niveau de qualification requis de ces outils est TQL 5 (Tool Qualification Level 5). Il s’agit du niveau le plus bas où on se limite à une évaluation externe de l’outil pour vérifier sa conformité avec les besoins des utilisateurs (TOR : Tool Operational Requirements).

{{< figure src="/img/article_static_analysis/figure_002.png" title="Figure 2. DO-330 : TQL des outils utilisés dans le cycle de vie de développement logiciel" width="450" align="center">}}

Dans le développement logiciel ferroviaire en conformité avec la norme IEC-62279/EN-50128, il existe des vérifications obligatoires à faire s’appuyant sur des techniques d’analyse statiques (voir figure 3.). Certaines vérifications sont exigées à partir du plus bas niveau de criticité (SIL 0).  Ces vérifications concernent par exemple l’analyse des valeurs limites des variables et des paramètres, l’analyse du flux de données, la détection de chemins insidieux d’exécution de code, etc. D’une manière générale, dans le développement de logiciels normés, des règles de codage sont imposées dont une grande partie est vérifiable par analyse statique. Par exemple, le langage MISRA-C/C++ est une technologie utilisée principalement en automobile et en ferroviaire (pour développer des logiciels en conformité respectivement avec les standards ISO26262 et EN-50128). La plupart des règles de codage de MISRA-C/C++ sont vérifiables par analyse statique à travers des outils comme « LDRA TBvision Static », « LDRArules », « Polyspace », etc.

{{< figure src="/img/article_static_analysis/figure_003.png" title="Figure 3. Objectifs de l’analyse statique dans la norme ferroviaire EN 50128" width="800" align="center">}}

Pour utiliser d’une manière optimale les techniques d’analyse statique, il faudrait prendre en compte leurs limites selon le contexte d’utilisation. Généralement, les outils d’analyse statique sont plus fiables quand ils sont appliqués à un code maîtrisé et peu volumineux. Appliqués à un code volumineux et mal architecturé, les outils d’analyse statique pourraient laisser passer des vulnérabilités et remonter un fort taux de fausses alarmes dû à des problèmes d’analyse sémantique. De plus, le temps de traitement de l’analyse statique sur un code volumineux pourrait devenir rapidement un goulot d’étranglement.

L’utilisation des vérifications à travers l’analyse statique ne doit pas entraîner une baisse dans la rigueur de la mise en œuvre des bonnes pratiques de codage, sous prétexte que les outils d’analyse statique vont détecter et corriger toutes les erreurs. Les outils permettent essentiellement de maximiser les vérifications ainsi que leurs automatisations, de poser un cadre pour le respect des bonnes pratiques et pour renforcer la sécurité de l’application logicielle. 

## III.	L’analyse statique pour la qualité et la sécurité continue du code

La qualité et la sécurité du code logiciel sont des enjeux importants qui impactent dans la durée les coûts de développement et de maintenance. La validation immédiate de la qualité du code ainsi que sa sécurité permettent aux équipes de développement d’identifier les défauts et les vulnérabilités tôt dans le processus de développement. L’analyse statique représente une des techniques existantes à mettre en œuvre pour construire une vérification continue de la qualité et de la sécurité du code. 

L’objectif de la vérification continue de la sécurité et de la qualité du code est réalisable et atteignable dans le contexte d’un processus de développement itératif et incrémental avec une automatisation maximale des activités de vérification. L’analyse statique, qui couvrira une partie des objectifs à atteindre, serait exécutée en fin de chaque tâche de développement, sur l’ensemble du code qui sera de plus en plus complet, au fur et à mesure de l’avancement des tâches et des itérations. Ainsi, les développeurs peuvent identifier et cerner assez rapidement les défauts et les vulnérabilités du code implémenté.  

L’automatisation des activités d’analyse statique se fait en les intégrant dans le workflow d’une plateforme d’intégration continue (CI).  La figure 4 illustre un exemple de rapports d’analyse statique du code d’un composant logiciel, exécuté et affiché dans notre plateforme d’intégration continue, dans le cadre d’un de nos projets de développement de logiciel critique en Ada2012. Dans ce projet, une fois l'implémentation d’un composant logiciel terminée, l’analyse de code est effectuée avec les outils GnatCheck, GNATprove et GnatMetrics, pour vérifier la conformité par rapport aux standards de codage et pour valider l'absence d'erreur d'exécution (pas de dépassement de tampon, pas de division par zéro, etc.)

{{< figure src="/img/article_static_analysis/figure_004.png" title="Figure 4. Rapports d’analyse statique dans une plateforme d’intégration continue" width="600" align="center">}}

Nous avons pu par exemple détecter, assez rapidement, un débordement potentiel dans un calcul intermédiaire que nous avons corrigé rapidement avec un simple refactoring du code. Il est à noter que cet éventuel débordement n'aurait peut-être pas été détecté par les simples tests conventionnels, car ces tests sont principalement axés sur les entrées et les sorties des fonctionnalités.

## IV.	Conclusions

L’analyse statique du code est une activité technique de vérification qui permet d’intégrer les objectifs de qualité et de sécurité au cœur du cycle de vie de développement logiciel.  Cela peut être possible en automatisant autant que possible ces activités de vérification et en les intégrant dans un processus de développement itératif et incrémental, qui impose la validation immédiate des développements. 

L’analyse statique ne permet pas de résoudre tous les problèmes de sécurité et ne couvre pas toujours tous les standards de codage et les vulnérabilités que nous souhaitons adresser. 

