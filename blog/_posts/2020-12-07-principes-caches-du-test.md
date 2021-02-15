---
title: Les principes cachés du test
author: Jean-Baptiste
date: 2020-12-07
image: /img/2020-12-07-principes-caches-du-test.jpg
altimage: '"Ten" by Mark Bonica is licensed with CC BY 2.0. To view a copy of this license, visit https://creativecommons.org/licenses/by/2.0/'
category: Développement logiciel
tags:
  - test
---

## De quoi allons-nous parler ?

Dans cet article, nous parlerons de tests automatisés (pas de tests manuels) portant sur une base de code maintenable et évolutive (pas de code jetable, de [POC](https://fr.wikipedia.org/wiki/Preuve_de_concept), etc.).

Lorsque l'on travaille avec ce type de tests, de nombreux problèmes / difficultés / frustrations peuvent apparaître. Heureusement, certains **principes de base** existent pour limiter cela. Certains appellent cela des « bonnes pratiques ».

D'après nos expériences chez Sogilis, certaines de ces pratiques sont déjà populaires et largement adoptées dans le métier du développement logiciel. On pourra citer :

- Chaque test ne vérifie qu'un seul cas fonctionnel
- Indépendance entre les tests
- Exécution rapide
- Automatisation du setup de l'environnement test
- Tests indépendants de l'OS
- Exécutables plusieurs fois d'affilée (pas d'effet de bord sur l'environnement de test)

Ici, nous aborderons des **stratégies moins connues**, mais qui permettent de gagner encore un peu plus en lisibilité, maintenabilité, évolutivité et **utilisabilité au quotidien**.

**Mise en garde :** Les règles présentées dans cet article sont issues de nos humbles expériences. Elles nous ont aidé, à plusieurs reprises, à développer des bases de tests maintenables, évolutives, et agréables pour les développeurs. Cependant, ce ne sont **pas des règles absolues** et elles doivent être adaptées, le cas échéant, en fonction de la situation. Comme pour toute pratique en développement logiciel, ne soyez pas dogmatique !

## 1. Réduire le boilerplate[^boilerplate]

L'idée derrière ce principe est de faciliter au maximum la compréhension du code du test[^testcode], par exemple pour la maintenance future par un développeur tiers. En effet, lorsqu'on est amené à faire évoluer un test existant, il est important de **comprendre le cas de test rapidement**. Et si ce code est **noyé au milieu de détails techniques**, cette tâche devient fastidieuse.

### Comment faire ?

Le boilerplate est majoritairement composé de code technique, par exemple, préparer une base de données, initialiser une couche réseau, nettoyer la base de données après l'exécution du test, etc. Le boilerplate intervenant à plusieurs niveaux, les moyens sont multiples :

- déplacer le code du boilerplate dans un "setup", "before each", "after"…
- externaliser le code dans une fonction dédiée.

L'inconvénient de la seconde solution, c'est qu'il reste encore du bruit dans le test (l'appel de la fonction), mais il n'est pas toujours possible de faire mieux.

Voilà ce que cela peut donner, en partant de ce test où la majorité du boilerplate est surligné :

```go{3-12,19-25}
func TestHeroDAO_ResurrectAllKnights(t *testing.T) {
    // given
    sql.Register("mysql", &MySQLDriver{})
    dsn := fmt.Sprintf("%s:%s@tcp(%s)/%s", username, password, hostname, dbName)
    db, err := sql.Open("mysql", dsn)
    if err != nil {
        t.Logf("Error %s when opening DB\n", err)
        return
    }
    defer db.Close()

    db.Exec("TRUNCATE TABLE dead_hero")
    db.Exec("INSERT INTO dead_hero (name, allegiance, caste, dateOfDeath) VALUES ('Bohort', 'Gaunnes', 'knight', '25/10/1203')")

    // when
    kights := dao.NewHeroDAO(db).resurrectAllKnights()

    // then
    knightsContainsBohort := false
    for _, knight := range kights {
        if knight.alive && knight.name == "Bohort" {
            knightsContainsBohort = true
        }
    }
    if !knightsContainsBohort {
        t.Fatalf("Expected %s to contains 'Bohort' alive", knights)
    }
}
```

En réduisant le boilerplate a l'extrême, on peut arriver à ceci :

```go
func TestHeroDAO_ResurrectAllKnights(t *testing.T, heroDAO *HeroDAO) {
    // given
    dbtest.InsertDeadKnight("Bohort")

    // when
    kights := heroDAO.resurrectAllKnights()

    // then
    assertOneAliveKnightWithName(t, knights, "Bohort")
}
```

- toute la partie connexion de la base de données a été déplacée en amont, pour être exécutée avant chaque test.
- idem avec le `TRUNCATE` (ligne 12).
- ainsi que la création de `HeroDAO` (ligne 16), tous les tests de ce fichier ayant besoin du même `HeroDAO`.

De plus, notons que le boilerplate est souvent commun a plusieurs tests. Son extraction permet alors de le factoriser, facilitant sa maintenance, en minimisant la duplication. Attention toutefois à ne pas tomber dans l'excès en cherchant à factoriser trop de choses. L'élément important est d'extraire le boilerplate, sa factorisation n'est qu'une option, à étudier de façon opportuniste.

**Note :** nous avons observé que plus le périmètre du test est grand, plus ce boilerplate a tendance à être important.

### Limites

Certains outils, frameworks ou librairies peuvent limiter cette approche, obligeant à garder une certaine dose de boilerplate dans le code du test[^testcode].

## 2. Expliciter le cas de test complet {#explicite-test-case}

Un nouveau développeur doit pouvoir comprendre rapidement le cas testé. Pourquoi ? Parce qu'un développeur passe beaucoup de temps à lire du code (notamment des tests), et le cas de test est finalement la première étape permettant de comprendre le code du test. C'est un peu comme n'importe quel sujet : on commence par assimiler les concepts globaux, puis on rentre de plus en plus dans les détails. Faire le chemin dans l'autre sens est plus difficile.

Et pour comprendre ce cas de test rapidement, il n'y a pas 36 solutions : il doit être décrit entièrement dans le code du test[^testcode]. Pas d'indirection, pas de logique cachée dans un autre fichier, etc. Après avoir lu ce code de test, le développeur doit être capable de répondre aux questions suivantes :

- quel cas veut-on tester ?
- quel est l'objet du test (la fonction testée) ?
- que veut-on vérifier ?

**Note :** vous noterez l'analogie avec les 3 grandes sections du [Behavior Driven Development](https://fr.wikipedia.org/wiki/Programmation_pilotée_par_le_comportement) (given, when, then).

Prenons l'exemple suivant :

```kotlin
@Test
fun `/knights?dummy=true returns dummy knights`() {
    mockMvc.perform(get("/knights?dummy=true"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("count", Matchers.equalTo(7)));
}
```

D'où sort ce chiffre `7`, ligne 5 ? Pourquoi 7 et pas 42 ? Le problème ici est que le jeu de données est initialisé dans une méthode déclarée 500 lignes au-dessus, et appelée automatiquement par le framework de test.

Quelque chose comme cela aurait été plus limpide pour le lecteur :

```kotlin
@Test
fun `/knights returns dummy knights`() {
    repeat(7) {
        knightRepository.create(KnightFactory.dummy())
    }
    mockMvc.perform(get("/knights?dummy=true"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("count", Matchers.equalTo(7)));
}
```

Autre exemple :

```javascript
describe('Excalibur', () => {
  it('changeBearer() returns sparkling excalibur when bearer has destiny', () => {
    const hero = buildHero();
    excalibur = buildExcalibur().changeBearer(hero);
    expect(excalibur.isSparkling).toBeTruthy();
  });
});
```

En lisant ce code, on comprend que n'importe quel hero peut faire étinceler excalibur, alors que seuls ceux qui ont une destinée devraient pouvoir. Pourtant le test fonctionne puisque `buildHero()` retourne un héro ayant une destinée :

```javascript{5}
function buildHero() {
    return {
        id: 3,
        name: 'Perceval',
        hasDestiny: true,
        rank: 'Knight',
    };
```

Soit cette fonction `buildHero()` est mal nommée (et devrait s'appeler `buildHeroWithDetiny()`), soit il manque quelque chose dans le test (comme `hero.hasDestiny = true`).

**Note :** ce principe allié au précédent n'est finalement que l'expression du principe ["Code at Wrong Level of Abstraction"](https://moderatemisbehaviour.github.io/clean-code-smells-and-heuristics/general/g6-code-at-wrong-level-of-abstraction.html) décrit dans _Clean Code_.

## 3. Minimiser le jeu de données

Le jeu de données décrit les conditions initiales du test. Plus ces **données sont nombreuses**, plus il est **difficile de comprendre** ou **de debugger le test**.

C'est pourquoi, autant que faire se peut, il est préférable de limiter au maximum le jeu de test utilisé. Les jeux de données communs a plusieurs tests (généralement utilisés avec les fixtures de test[^testfixture]) sont à éviter, mais nous en reparlerons plus tard.

## 4. Réfléchir au ROI

Lorsque l'on commence à écrire un test, cela vaut le coup de se poser 10 secondes pour réfléchir au [ROI](https://fr.wikipedia.org/wiki/Retour_sur_investissement) de ce test.

En effet, au-delà de ce qu'apporte un test, **il a aussi un coût**, qu'il soit **immédiat** (temps d'écriture du test) ou **récurrent** (maintenance, rallongement de la durée d'exécution des tests, augmentation du coût de certains refactoring…). Tous ces facteurs ne sont pas à négliger car ils peuvent avoir des conséquences.

Bien sûr, ces différents facteurs **dépendent du contexte**. Par exemple, sur une application critique, ce surcoût sera peut-être largement amorti par la réduction du risque de défaillance et leurs conséquences en perte financière ou humaine…

En revanche, il n'est clairement pas facile d'évaluer tout cela rapidement, et encore moins avec un niveau de confiance élevé. L'expérience peut aider, mais cela passe nécessairement par la **prise de recul régulier** sur le travail des autres, mais aussi **son propre travail**.

Voici quelques axes de coûts pour aider à la réflexion :

- plus un test est bas niveau[^testlevel], plus il y a de risque d'engendrer un surcoût lors d'un refactoring (un prochain article expliquera cela plus en détail).
- plus le test est haut niveau, plus il est coûteux à mettre en place.
- il est plus coûteux de trouver la cause d'un test en échec s'il est de haut niveau que s'il est de bas niveau.
- l'évolution du modèle de données peut nécessiter la modification de beaucoup de tests (exemple : l'ajout d'un attribut obligatoire dans une entité nécessite d'adapter tous les tests qui construisent une instance de cette entité).

Heureusement, des stratégies (architectures, frameworks, etc.) existent pour limiter ce surcoût, mais toutes ne sont pas disponibles dans tous les contextes.

## 5. Assertions limpides

Il peut arriver que l'intention derrière certaines assertions ne soit pas exprimée très clairement, comme dans cet exemple :

```java
@Test
void parseThrowsParseException() {
    given(pets.findPetTypes()).willReturn(makePetTypes());
    try {
        petTypeFormatter.parse("Fish", Locale.ENGLISH);
        Assertions.fail();
    } catch (ParseException e) {
        String msg = e.getCause().getMessage();
        Matcher matcher = Pattern.compile("type not found:.*").matcher(msg);
        Assertions.assertTrue(matcher.find());
    }
}
```

Comprendre quelle était l'intention demande un soupçon d'investigation, alors qu'il existe souvent des solutions peu coûteuses pour améliorer la situation.

Voici un premier exemple naïf où l'on a créé préalablement une méthode `assertMessageMatches()` :

```java
@Test
void parseThrowsParseException() {
    given(pets.findPetTypes()).willReturn(makePetTypes());
    try {
        petTypeFormatter.parse("Fish", Locale.ENGLISH);
        Assertions.fail();
    } catch (ParseException e) {
        assertMessageMatches(e.getCause(), "type not found:.*");
    }
}
```

… et un second, avec l'utilisation de la librairie [AssertJ](https://assertj.github.io/doc/):

```java
@Test
void parseThrowsParseException() {
    given(this.pets.findPetTypes()).willReturn(makePetTypes());
    assertThatThrownBy(() -> petTypeFormatter.parse("Fish", Locale.ENGLISH))
        .isInstanceOf(ParseException.class)
        .extracting(Throwable::getCause)
        .hasMessageMatching("type not found:.*");
}
```

Le surcoût engendré par cette étape de refactoring peut être amorti :

- lorsque la même assertion doit être faite **fréquemment**
- avec l'utilisation d'une lib tierce, et si cette lib tierce est **bien testée** (il y a alors moins de risque de bug)
- l'utilisation d'une **lib tierce largement employée** dans l'écosystème permet d'améliorer la productivité des nouveaux dev (vu qu'il y a de bonnes chances qu'ils connaissent cette lib)

**Note :** l'utilisation d'assertions personnalisées (cf. exemple naïf) est une option à ne pas négliger.

## 6. Éviter les fixtures de test

Lors de l'écriture d'un test nécessitant un état particulier en **base de données**, l'utilisation de fixtures de test[^testfixture] peut se faire de différentes manières, mais toutes posent problème :

- **Utiliser une fixture existante ?** Le jeu de données sera alors plus important que nécessaire, puisque partagsé entre plusieurs tests qui requièrent chacun des données différentes. En cas de test en échec, l'investigation sera plus difficile, les données intéressantes étant polluées.
- **Adapter une fixture existante ?** On prend alors le risque de casser un autre test qui utilise cette fixture car on ne sait pas quel élément de la fixture est important pour quel test.
- **Créer une nouvelle fixture ?** Multiplier les fixtures alourdit la modification du modèle de données.

Les fixtures présentent un autre inconvénient majeur : elles masquent des informations qui devraient être dans le test (cf principe [Expliciter le cas de test complet](#explicite-test-case))).

Pour toutes ces raisons, il est préférable de privilégier la création de données à la volée à travers des functions claires et paramétrables (ex: [Object Mother et Builder en Java](/posts/2019-01-11-object-mother-builder-java/)).

**Note :** utilisées avec des tests transactionnels, les fixtures cependant peuvent grandement améliorer la rapidité d'exécution des tests (en chargeant les données en base une seule fois). À garder en tête lorsque le gain en rapidité d'exécution surpasse les inconvénients mentionnés ci-dessus.

## 7. Commenter en dernier recours, mais commenter

Si le contexte (techno utilisée, contraintes du projets…) ne permet pas d'avoir un code explicitant clairement et rapidement le cas de test, alors, et seulement alors, il ne faut pas hésiter à commenter le teste pour expliciter certains points.

Certes les commentaires présentent de nombreux inconvénients, mais dans certaines situations bien particulières, les bénéfices peuvent l'emporter.

## Conclusion

Encore une fois, ces principes ne sont **pas des lois** et n'ont de sens que **dans un contexte donné**. Souvent, en fonction de la situation, il est préférable de faire des **compromis**, c'est l'une des difficultés de notre métier : adapter nos choix aux contraintes du moment.

Toujours est-il qu'en gardant en ligne de mire ces quelques principes, nous pouvons gagner en "utilisabilité" au quotidien.

## Définitions

[^testcode]: le **code du test** est le code présent dans la fonction décrivant le test. On ne parle pas ici du code appelé indirectement.
[^boilerplate]: le mot **boilerplate** est utilisé ici pour décrire du code purement technique nécessaire au fonctionnement du test, mais ne portant aucune information sur le cas testé. Exemples : `TRUNCATE` de tables avant ou après le test, création d'utilisateur par défaut, instanciation d'une classe dont on teste une méthode…
[^testlevel]: le **niveau d'un test** est lié à son périmètre, c'est-à-dire au code testé. Par analogie avec la _pyramide des tests_, plus le test est haut niveau, plus son périmètre est grand.
[^testfixture]: une **fixture de test** est un jeu de données codé ou décrit en dur et utilisé par des tests
