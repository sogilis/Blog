---
title: "Comment assurer la qualité globale d’un logiciel, de son démarrage
  jusqu’à l’intégration d’ingénieurs QA ? "
author: "Jérôme Guilloux "
date: 2024-07-02T14:18:19.803Z
description: Assurer la qualité d’un logiciel dès son démarrage est un défi
  majeur, surtout en l'absence d'une équipe QA dédiée. Cet article explore les
  étapes cruciales pour garantir la qualité logicielle, des premières lignes de
  code jusqu’à ce que l’équipe soit en mesure d’intégrer des ingénieurs QA. Nous
  aborderons les pratiques à mettre en place, les signes indiquant qu'il est
  temps d'intégrer des QA, et comment choisir le bon profil QA pour votre
  équipe.
image: /img/minimalist-black-white-modern-thanks-for-watching-youtube-outro-video-20-.png
tags:
  - dev
---
## Que mettre en place quand on n’a pas de QA? 

### 1. Définir une architecture logicielle simple, robuste et performante

Pour se focaliser sur les fonctionnalités essentielles, il est crucial de définir une architecture logicielle qui soit à la fois simple, robuste et performante. Cette architecture doit répondre spécifiquement aux besoins du projet pour éviter des complications inutiles dès le départ.

### 2. Mise en place de processus simples orientés développeurs

* **Tests unitaires avec couverture** : Assurez-vous que chaque fonctionnalité dispose de tests unitaires et définissez une couverture minimale à respecter.
* **Revue de code systématique** : Mettez en place des revues de code pour garantir la qualité et la cohérence du code.
* **Règles pour merger et workflow de gestion de branches** : Établissez des règles claires pour les fusions de code et un workflow efficace pour la gestion des branches.
* **Tests automatisés** : Intégrez différents types de tests automatisés (tests d'intégration, end-to-end, installation, upgrade) pour détecter rapidement les anomalies.

### 3. Mise en place de processus simples orientés Product Owner (PO)

* **Acceptance** : Définissez des critères d'acceptance clairs pour chaque fonctionnalité.
* **Rédaction de User Stories (US)** : Rédigez des user stories claires et précises pour guider le développement.
* **Gestion du backlog** : Maintenez un backlog propre et bien organisé pour faciliter la gestion des priorités.

### 4. Mise en place d’une intégration continue (CI)

* **Builds et déploiements réguliers** : Assurez-vous d'avoir des builds réguliers et des déploiements fréquents en environnement de test pour faciliter la vérification continue du logiciel.
* **Lancement régulier des tests** : Automatisez le lancement des tests unitaires, d'intégration, end-to-end, d'installation, et de performance pour détecter rapidement les problèmes.

### 5. Pratiques de développement (Software Craftsmanship)

* **Test-Driven Development (TDD)** : Adoptez le TDD pour améliorer la qualité et la maintenabilité du code.
* **Documentation complète** : Documentez l'architecture, les spécifications et les processus pour une meilleure compréhension et évolution du système.



## Détecter les limites des moyens autonomes et intégrer des QA

Bien que ces pratiques assurent une bonne qualité logicielle, elles atteignent leur limite à un certain point. Voici les indicateurs montrant qu'il est temps d'intégrer des ingénieurs QA :

### Indicateurs internes

* **Temps d'acceptance en augmentation** : Les tests d'acceptance prennent de plus en plus de temps.
* **Complexité des features** : Les fonctionnalités deviennent plus complexes, nécessitant plus de tests.
* **Combinaisons de tests multiples** : Besoin de tester sur plusieurs navigateurs, OS ou matériels.
* **Augmentation des bugs** : Davantage de bugs détectés en interne et par les clients.
* **Validation des features** : De plus en plus de fonctionnalités à valider et des tests de non-régression insuffisants.
* **Qualification des bugs** : Analyse et résolution des bugs demandant plus de temps et des environnements dédiés.

### Indicateurs orientés clients

* **Retours clients** : Augmentation des retours clients sur des bugs ou des fonctionnalités.
* **Validation unitaire** : Les fonctionnalités validées individuellement sans prise en compte de l'expérience utilisateur globale.

## Quel profil QA recruter : Junior vs Expérimenté ?

### Avantages et inconvénients d’un QA Junior

**Avantages :**

* Salaire moins élevé.
* Bonne exécution des tests.
* Adaptabilité aux outils de tests.
* Souvent des développeurs reconvertis.

**Inconvénients :**

* Difficulté à définir une stratégie de tests.
* Besoin de temps pour comprendre les fonctionnalités.
* Moins de recul sur l'efficacité globale des tests.

### Avantages et Inconvénients d’un QA Expérimenté

**Avantages :**

* Capacité à définir une stratégie de tests.
* Écriture de scénarios de tests complets.
* Bonne connaissance des outils de tests.
* Pertinence dans la qualification des bugs.

**Inconvénients :**

* Salaire plus élevé.

## Conclusion

Assurer la qualité d’un logiciel sans équipe QA est possible en suivant des pratiques rigoureuses et en adoptant une approche méthodique dès le début. Cependant, reconnaître les limites de ces moyens et savoir quand intégrer des ingénieurs QA est crucial pour maintenir la qualité à long terme. Choisir le bon profil QA, qu'il soit junior ou expérimenté, dépendra des besoins spécifiques de votre projet et de votre organisation. En adoptant ces stratégies, vous pouvez garantir une qualité logicielle élevée, même sans une équipe QA dédiée dès le départ.