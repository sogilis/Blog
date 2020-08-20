---
title: Une brève introduction à Kubernetes
author: Mathieu et Aurélien (mathieu@sogilis.com et aurelien@sogilis.com)
date: 2020-08-20
image: /img/2020-08-20-Kubernetes_logo_without_workmark.svg
categories:
  - DÉVELOPPEMENT
tags:
  - Kubernetes
  - K8s
---

## Une brève introduction à Kubernetes

### Qu'est ce que Kubernetes ?

> Kubernetes (K8s) est un système open-source permettant d'automatiser le déploiement, la mise à l'échelle et la gestion des applications conteneurisées.

Version actuelle (août 2020) est la v1.18.

Lorsque l'on parle de Kubernetes, on évoque forcément :

- [Helm](https://helm.sh/) : le package manager de K8s
- [etcd](https://etcd.io/) : backend pour le sercice discovery + stockage de l'état et de la configuration des clusters

Autres outils similaires/concurents à Kubernetes (orchestrateurs de conteneurs) :

- Docker swarm (Docker)
- Amazon ECS (AWS)
- Nomad (HashiCorp)
- Azure Service Fabric (Microsoft)
- Apache Mesos (Apache Software Foundation)

Ressource à utiliser pour la suite : https://kubernetes.io/fr/docs/concepts/overview/what-is-kubernetes/

### En bref, quelques chiffres

- Conçu par Google à l'origine, puis offert à la [Cloud Native Computing Foundation](https://www.cncf.io/).
- Écrit en Go.
- Première release Kubernetes version 1.0 le 21 juillet 2015.
- [Utilisé par](https://kubernetes.io/fr/case-studies/) : BlaBlaCar, Huawei, Booking.com, IBM, New York Times, Pinterest, Spotify, etc.

### Installation

[Tutoriels](https://kubernetes.io/fr/docs/tutorials/)

### Architecture haut-niveau

### Concepts

[Doc](https://kubernetes.io/fr/docs/concepts/)

### Sources / Ressouces

- [Site officiel](https://kubernetes.io/fr/) et [Documentation](https://kubernetes.io/fr/docs/home/)
- [Page wikipedia](https://en.wikipedia.org/wiki/Kubernetes)
- [CNCF](https://www.cncf.io/)
- [Cloud Native Landscape](https://landscape.cncf.io/)
- [Post intro à K8s](https://les-tilleuls.coop/fr/blog/article/l-orchestrateur-de-conteneurs-kubernetes-introduction)
