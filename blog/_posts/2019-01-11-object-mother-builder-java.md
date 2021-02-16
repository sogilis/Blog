---
title: Object Mother et Builder en Java
author: jean-baptiste@sogilis.com
date: 2019-01-11T14:05:55+00:00
image: /img/2019-01-objectmother_builder_java.jpg
categories:
  - Développement logiciel
tags:
  - builder
  - Java
  - objectmother
  - test
---

Les patterns [Object Mother][1] et [Builder][2] apportent chacun leur lot d’avantages à nos tests automatisés, mais peuvent aussi être combinés pour aller plus loin dans la lisibilité et la maintenabilité de nos tests.

Nous verrons dans cet article comment il est possible de réaliser cela.

## Pre-requis

Si vous n’êtes pas familiers avec les patterns [Object Mother][1] et [Builder][2], je vous conseille d’approfondir ce sujet avant de continuer.

## Le principe

Object Mother permet de fournir des objets pré-configurés pour nos tests :

```java
public static HeroBuilder one() {
   return new HeroBuilder()
       .name("Leodagan")
       .allegiance(KingdomMother.one().build())
       .caste(KNIGHT)
       .dateOfBirth(LocalDateMother.one());
}

public static HeroBuilder deadAt(LocalDate date) {
   return one()
       .deathDate(date.minusDays(2));
}

public static HeroBuilder merlin() {
   return one()
       .name("Merlin")
       .allegiance(KingdomMother.logres().build())
       .caste(WIZARD);
}
```

Le principe est le suivant :

- Chaque Object Mother fournit une factory de base avec une configuration par défaut : c’est la méthode `one()`.
- Toutes les autres factories utilisent cette factory de base.
- Dans cette versions, les Object Mother retournent des builders et non des instances.

## Avantages

**(1)** Le pattern Object Mother permet d’améliorer la lisibilité des tests en retirant les constantes inutiles à la compréhension du test. Exemple :

```java
@Test
@DisplayName("Can you see all information I have to write in order to build a single hero?")
void without_mother_object() {
   Kingdom kingdom = new Kingdom("Logres", new Town("Kaamelott"));
   LocalDate dateOfBirth = LocalDate.of(-360, 11, 21);
   Hero hero = new Hero("Merlin", kingdom, WIZARD, dateOfBirth, null);

   long age = hero.getAgeAt(LocalDate.of(524, 11, 21));

   Assertions.assertThat(age)
       .isEqualTo(884);
}

@Test
void with_mother_object() {
   Hero hero = HeroMother.one()
       .dateOfBirth(LocalDateMother.one().withYear(-360))
       .build();

   long age = hero.getAgeAt(LocalDateMother.one().withYear(524));

   Assertions.assertThat(age)
       .isEqualTo(884);
}
```

L’exemple ici est plutôt trivial, mais imaginez cela dans une vraie application avec des classes ayant de nombreux attributs et/ou de nombreuses compositions.

**(2)** Lors d’une évolution future, si un nouvel attribut obligatoire est ajouté à une classe, alors il suffit de modifier la factory de base pour que tous les tests passent. En effet, la grande majorité des tests n’instancient plus d’objet eux-même, mais passent par une factory. La maintenance est ainsi facilitée (il devient inutile de modifier tous les tests, dans le scénario décrit ci-avant).

**(3)** L’utilisation de builders permet de customiser les objets générés par les Object Mother pour le besoin du test (`HeroMother.one().dateOfBirth(...).build()`). Sans cela, il faudrait multiplier les factories pour chaque besoin avec une méthode prenant en paramètre toutes les informations nécessaires au cas testé. On peut imaginer que cela nécessiterait une factory par test.

## Inconvénients et difficultés

**(1)** Il y a plus de code, essentiellement à cause des builders, et du code pas intéressant à produire qui plus est.

[Lombok][3] peut potentiellement résoudre ce problème puisqu’il permet de générer automatiquement ces builders.

**(2)** La frontière entre méthode de factory et méthode de builder n’est pas toujours facile à identifier. Exemple avec trois possibilités pour créer une même configuration :

```java
HeroMother.king().build()
HeroMother.one().king().build()
HeroMother.one().caste(KING).build()
```

**(3)** `.build()` est nécessaire partout pour générer l'objet final (pollution cognitive).

## Ce qu’il faut retenir

Combiné à des assertions custom [AssertJ][4], on arrive, avec cette technique, à des tests concis, qui restent lisibles et maintenables, même si on sent qu'il serait possible de faire mieux avec un langage plus évolué que **Java**, ce que nous verrons dans un prochain article avec [Kotlin][5].

## Notes

- Ce principe est très largement inspiré par un [article de Rafał Borowiec][6].
- Le projet dont sont issus les extraits de code est disponible [sur Github][7].

[1]: https://martinfowler.com/bliki/ObjectMother.html
[2]: https://en.wikipedia.org/wiki/Builder_pattern
[3]: https://projectlombok.org/
[4]: http://joel-costigliola.github.io/assertj/
[5]: http://kotlinlang.org/
[6]: http://blog.codeleak.pl/2014/06/test-data-builders-and-object-mother.html
[7]: https://github.com/sogilis/motherobject-builder-java-example
