---
title: Single Responsibility Principle dans mon code
author: Jean-Baptiste
date: 2016-09-06T07:00:21+00:00
image: /img/2016/02/Sogilis-Christophe-Levet-Photographe-7803.jpg
categories:
  - DÉVELOPPEMENT
tags:
  - développement
  - SRP

---
Le principe de responsabilité unique (**Single Responsibility Principle** ou SRP) fait partie d'un ensemble de 5 principes de la programmation orientée objet : [SOLID](https://fr.wikipedia.org/wiki/SOLID_(informatique)).

- **S** : Single Responsibility Principle
- **O** : Open/Closed Principle
- **L** : Liskov Substitution Principle
- **I** : Interface Segregation Principle
- **D** : Dependency Inversion Principle

Ayant déjà lu et entendu ce principe un peu partout, j'ai voulu creuser pour voir si j'avais bien compris l'idée sous-jacente et ainsi pouvoir l'appliquer correctement. Je vous partage donc ici le résultat de mes recherches et réflexions.

## Intuitivement ou naïvement

Partons du nom de principe : « responsabilité unique ». Naïvement, on peut comprendre que le principe nous dicte de n'avoir qu'une seule responsabilité par... **par quoi ?** Par Méthode ? Classe ? Package / module ? Librairie ?

### ⇒ Première supposition

Nous sommes en programmation orientée objet, on peut donc supposer que le principe s'applique pour chaque objet, donc pour chaque classe.

![niveau d'application (1)](/img/2016/02/niveau-dapplication-1.png)

Ensuite, **qu'est-ce qu'une responsabilité ?**

### ⇒ Deuxième supposition

Encore une fois, naïvement, on peut se dire que c'est une fonctionnalité, une tâche ou un rôle comme calculer une moyenne, générer un fichier PDF, gérer des utilisateurs... Mais alors, comment savoir si on est en face d'une responsabilité unique ou de plusieurs responsabilités ?  Je m'explique : « calculer une moyenne » peut être vu comme plusieurs responsabilités : « sommer », « compter le nombre de valeurs » et « diviser ». On pourrait alors aller très loin jusqu'à ne trouver que des **responsabilités unitaires**.

![composition de responsabilités](/img/2016/02/composition-de-responsabilités.png)

En appliquant cela sur une base de code, on arriverait alors à des classes minimalistes qui ne contiendraient qu'une seule méthode d'une seule ligne... **absurde**.

{{< highlight ruby >}}
public int compareArticlePriceToAverage(Article article, Collection<Article> allArticles) {
      return compare(article.getPrice(), computePriceAverage(allArticles));
}

public double computePriceAverage(Collection<Article> articles) {
      return divide(sumPrices(articles), count(articles));
}

public double sumPrices(Collection<Article> articles) {
      return articles.stream()
                     .mapToDouble(Article::getPrice)
                     .average()
                     .getAsDouble();
}

public int count(Collection<Article> articles) {
      return articles.size();
}

public double divide(double numerator, double denominator) {
      return numerator / denominator;
}

public int compare(double amount1, double amount2) {
      return Double.valueOf(amount1).compareTo(amount2);
}
{{< /highlight >}}

Il y a donc quelque chose qui cloche avec cette interprétation naïve.

## Que dit Internet ?

Une recherche rapide sur [Grogeule](http://www.grogueule.fr) nous donne les éléments suivants :

* _Every class should have a single responsibility, and that responsibility should be entirely encapsulated by the class_
  Le niveau d'abstraction est la **classe**. **De plus, on va ici plus loin que notre interprétation naïve : il y a **bijection** entre classe et responsabilité.
* __A responsibility is considered to be one reason to change__
  Nouvelle définition de responsabilité : **une raison de changer.**
* __Une classe ne devrait avoir qu'une seule raison de changer__
* _A class should have only one reason to change_
* _A class or module should have one, and only one, reason to change_
  On retrouve la **bijection.** Le niveau d'abstraction est plus ambigu ici car on parle de **classe** ou **module**.

Bref, tout ça reste encore un peu flou, revenons à l'origine du principe.

## Origines

Le SRP est défini pour la première fois par **Robert C. Martin** dans le livre « Agile Software Development, Principles, Patterns, and Practices » ([_extrait et résumé ainsi par l'auteur : A class should have only one reason to change_](https://drive.google.com/file/d/0ByOwmqah_nuGNHEtcU5OekdDMkk/view)). Le niveau d'abstraction défini est la **classe** et on a la définition d'une responsabilité : **une raison de changer**. Ça commence à s'éclaircir.

Ok, mais n'importe quelle raison est valable ? Comment peut-on connaître toutes les raisons possibles de changement ? Robert (appelons le ainsi) nous aide un peu : _If you can think of more than one motive for changing a class, then that class has more than one responsibility_. Il faut donc **imaginer** toutes les raisons de changement possibles... pas sûr que cela aide beaucoup, on retombe potentiellement sur le découpage en classes d'une seule méthode d'une seule ligne.

Robert nous aide avec un exemple concret :

{{< highlight ruby >}}
public interface Modem {
      public void Dial(String pno);
      public void Hangup();
      public void Send(char c);
      public char Recv();
}{{< /highlight >}}

Il nous explique que les classes qui implémentent cette interface ont alors 2 responsabilités (la gestion de la connexion et la communication), mais qu'elles ne doivent pas nécessairement être scindées : tout dépend de la manière dont l'application évolue ! Si les évolutions ne porterons que sur la gestion de la connexion, alors oui, pour minimiser la rigidité, éviter de toucher à la partie communication lorsqu'on modifie la gestion de la connexion, etc., il est préférable de dissocier ces 2 responsabilités. En revanche, si les futures évolutions portent sur ces 2 aspects en même temps, alors cette séparation n'est pas nécessaire. Elle est même déconseillée pour éviter de compliquer l'architecture de manière inutile.

Note : des bugs ne sont pas des _raisons de changer_. Sinon, chaque appel de méthode pourrait être une raison de changer, et on se retrouverait alors, en appliquant le SRP, avec des classes d'une seule méthode d'une seule ligne.

Pour résumer, Robert nous dit ceci : _An axis of change is only an axis of change if the changes actually occur_. En gros, **tout dépend des futures évolutions de l'application** ! Ça va être facile à appliquer...

## Exemples concrets

Robert nous donne quelques exemples dans son article :

- Il existe des cas où l'environnement (hardware, OS...) nous oblige à coupler des classes qui ne l'auraient pas été selon le SRP. Cela permet aussi d'isoler du code médiocre derrière une interface unique sans polluer le reste de l'application. C'est plus une **exception** qu'un exemple d'application.

- Une violation courante du SRP est l'accumulation de règles métiers et de gestion de persistance au sein d'une même classe :

  {{< highlight ruby >}}
  public class Book {
        public void save() {
               // ...
        }

        public double averagePrice() {
               // ...
       }
  }
  {{< /highlight >}}

Robert est clair sur ce point : **c'est presque toujours à** **éviter** puisque les évolutions de ces 2 responsabilités ont des fréquences et des raisons différentes de changer.

## Application

À la lumière de l'article de Robert, voici une démarche possible permettant d'appliquer le SRP : pour chaque classe, je me demande quelles sont les raisons possibles des futures évolutions.
 On ne parle pas de bug fix, mais d'évolutions « naturelles » et plausibles de l'application, fonctionnelles ou techniques.

- Difficulté : **comment savoir ce qui va changer dans le futur ?** On peut imaginer beaucoup de choses, mais qu'est-ce qui sera vraiment appliqué ? Il y a toujours le risque d'anticiper des évolutions qui n'arriverons jamais... L'article de Robert ne nous aide pas vraiment (voire pas du tout).

- De plus, cette anticipation est en contradiction avec le principe [YAGNI](https://fr.wikipedia.org/wiki/YAGNI) ou [KISS](https://fr.wikipedia.org/wiki/Principe_KISS) !

Personnellement, je fais une étude de risque rapide dont voici les détails. Sur une classe donnée, pour chaque évolution que je peux imaginer (généralement entre 2 et 5), je calcule le coefficient suivant :

**[probabilité de survenue] * [coût et difficulté à implémenter si la ségrégation n'est pas faite aujourd'hui]**

Et je ne garde alors que les évolutions dont le coefficient est le plus grand.

Ça, c'est la théorie. En pratique, pour pouvoir espérer faire ça plus ou moins correctement, j'ai besoin de 2 choses :

- la connaissance de l'environnement fonctionnel et technique de l'application, des contraintes et difficultés actuelles, bref une idée du futur de l'application, fonctionnelle et technique ;
- mon expérience dans le contexte actuel (fonctionnel et technique).

![calcul de risque](/img/2016/02/calcul-de-risque.png)

Si je trouve plusieurs raisons, je scinde la classe en autant de raisons. Si j'en trouve une seule, et si d'autres classes sont aussi concernées par la même raison, alors je fusionne ces classes pour n'en former qu'une seule.

Ensuite, il y a des exceptions, notamment les cas suivants présentés par Robert :

- Les contraintes de l'environnement empêchent d'appliquer le SRP. Là, on devrait s'en rendre compte facilement.
- L'intérêt d'isoler du code. Là, c'est plus ambigu.

On peut facilement voir que ce principe reste difficile à appliquer.

## Pourquoi appliquer ce principe ?

Ce sont avant tout les prochaines évolutions qui bénéficieront de ce principe, **si elles ont été anticipées**. Le code concerné est alors :

- plus compréhensible car découpé responsabilité par responsabilité
- testable plus facilement, car moins de couplage
- plus robuste, car moins de couplage
- plus facile à étendre

Au-delà des prochaines évolutions, l'application du SRP peut aussi aider à la compréhension du contexte fonctionnel et technique, notamment à destination des développeurs qui arrivent sur l'application. En effet, cela rend plus lisible les futures évolutions attendues.

## Limitations

En soit, ce principe semble plutôt sain. Le plus gros défaut que l'on peut identifier est le côté anticipation qu'il requiert :

- Les futures évolutions que l'on identifie aujourd'hui ne vont peut-être jamais se réaliser. On a alors perdu du temps à découper des responsabilités et rendue la maintenance plus difficile en compliquant l'architecture.
- Il est plus que difficile d'identifier toutes les évolutions futures possibles.

## Conclusion

Nous avons vu dans cet article à quel point le principe de responsabilité unique est difficile à appliquer, notamment à cause de cette notion d’anticipation. Mal appliqué, notamment en anticipant trop, il peut nous amener à perdre du temps sur la tâche en cours, mais aussi sur la maintenance du code :
_An axis of change is only an axis of change if the changes actually occur. It is not wise to apply the SRP, or any other principle for that matter, if there is no symptom_.

Il ne faut pas oublier que ce n'est qu'un principe parmi d'autres. Et cette séparation des responsabilités peut aussi être provoquée par l'application d'autres pratiques.

## Pour aller plus loin

Voici d’autres méthodes ou pratiques, complémentaires ou non, qui donnent d’autres orientations pour découper le code :

- [Composed Method](http://c2.com/ppr/wiki/WikiPagesAboutRefactoring/ComposedMethod.html)
- [DDD](https://en.wikipedia.org/wiki/Domain-driven_design)

[Jean-Baptiste](https://fr.linkedin.com/in/jean-baptiste-mille-0383b81/fr)
