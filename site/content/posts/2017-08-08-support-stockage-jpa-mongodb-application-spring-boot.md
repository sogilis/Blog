---
title: Support du stockage JPA et MongoDB dans une application Spring-boot
author: Alexandre et Jean-Baptiste
date: 2017-08-08T15:32:27+00:00
categories:
  - DÉVELOPPEMENT

---
Dans le cadre d’un projet sur lequel nous travaillons actuellement, nous avons été amenés à implémenter un service web spring-boot capable de stocker des objets relativement simples dans une base de données.

![Support du stockage JPA et MongoDB dans une application Spring-boot - header](/img/2017-07-blog-header-2-1024x309.png)

La particularité de ce service réside dans sa compatibilité avec **différents moteurs de stockage** : relationnelle (ex: Oracle, Postgres...) et NoSQL orienté document (principalement MongoDB). Cette exigence vient directement des contraintes du client qui distribue sa solution logicielle avec différentes bases de données. L’environnement technique est bien évidemment lié aux contraintes du client, et comprend le framework [Spring Boot](https://projects.spring.io/spring-boot/) pour le développement de microservices avec des couches de persistance type **JPA** (Java Persistence API) et **MongoDB**.

Le défi consiste à implémenter ces deux couches de persistance en minimisant la duplication de code.

Nous avons créé une application de démo afin d’illustrer l’architecture mise en place.

Les sources de cette application sont disponible sur notre github : [https://github.com/sogilis/spring-boot-jpa-mongodb-example][1].

Version de Spring Boot utilisée : 1.5.4.RELEASE.

Dans le but de simplifier la compréhension, notre application de démo persiste des entités de type _Person_ en base. Une telle entité est composée d’un identifiant unique (String), et d’un nom (String).

# Deux bases de données à supporter

Les deux moteurs de stockage à supporter dans notre application sont assez hétérogènes : ces bases de données sont directement dictées par l’environnement en production chez les clients finaux.

Etant donné que Spring fournit un bon support des différents moteurs relationnels via sa couche de persistence JPA ([Spring Data ][2]JPA), nous avons décidé d’intégrer cette couche. Par conséquent, notre service peut interagir avec un driver Postgres mais aussi avec **n’importe quel driver qui satisfait à la spécification JPA**. Cela permet d’être compatible avec beaucoup de bases de données relationnelles.

MongoDB est une base de données NoSQL orientée document, pleinement supportée par le projet Spring Boot via le module [Spring Data MongoDB][3] qui embarque une dépendance vers un **driver MongoDB**.

# La réalisation

L’idée derrière le développement de ce service est de laisser à l’administrateur la configuration du moteur de stockage qu’il souhaite utiliser lorsque l’application démarre (JPA ou MongoDB). Le défi posé par ce projet peut se ramener à trouver une solution autorisant **la mutualisation d’un maximum de code du modèle à persister** tout en étant testable facilement.

Nous souhaitons donc éviter ceci :

![Support du stockage JPA et MongoDB dans une application Spring-boot - solution avec duplications](/img/2017-07-blog-solution-avec-duplications.png)

Une autre solution à cette problématique pourrait être de créer plusieurs artefacts, l’un dédiée à l’application utilisant une couche d’abstraction (Spring Data Commons par exemple), et les autres implémentant chacun un type de persistance donné. C’est alors la constitution du classpath qui déterminerait quelle persistance utiliser (grâce au système d’auto-configuration de Spring Boot).

Cette solution n’a pas été retenue car la priorité a été mise sur la facilité d’intégration de l’application au sein du système d’information chez les clients finaux.

## Spring et la notion de Repository

Premier constat : les modules [Spring Data JPA][2] et [Spring Data MongoDB][3] de [Spring Data][4] partagent un module commun appelé [Spring Data Commons][5].

Nous pouvons donc nous baser sur ce module pour écrire le code commun aux 2 types de persistances, et en particulier le Repository, ce qui donne ceci :

![Support du stockage JPA et MongoDB dans une application Spring-boot - class diagramm](/img/2017-07-blog-class-diagramm.png)

Ainsi, il n’est nécessaire de déclarer dans notre application que l’interface _PersonRepository_, les implémentations pour JPA ou Mongo étant générées automatiquement par Spring.

Il est à noter que les interfaces dédiées à JPA et Mongo étendent toutes les deux _PagingAndSortingRepository_, ce qui nous permet de l’utiliser pour _PersonRepository_.

En revanche, sans plus de configuration, Spring Boot va chercher à activer les 2 implémentations car il trouve à la fois Spring Data JPA et Spring Data MongoDB dans le classpath (système d’auto-configuration). Nous verrons dans la section suivante comment piloter ce mécanisme.

Ainsi, comme le documente [Spring Data Commons][6], il est possible d’ajouter des méthodes de requête dans à ce “repository” (ex: findByName) qui seront utilisables quelque soit le type de persistance.

En plus du Repository, il est nécessaire de déclarer les entités à persister. Ici, c’est plus simple car tout se fait par annotation :

- JPA : _@Entity_
- MongoDB : _@Document_

Il suffit alors d’annoter une même classe avec ces 2 annotations, ce qui évite de dupliquer cette classe entité.

Toute entité doit pouvoir être identifiée de manière unique. Pour cela, il existe aussi 2 annotations distinctes, mais qui ont le même nom (_@Id_) :

- JPA : _javax.persistence.Id_
- MongoDB : _org.springframework.data.annotation.Id_ ([permet de mapper la colonne sur l’identifiant natif MongoDB : _id](http://docs.spring.io/spring-data/data-mongo/docs/1.10.4.RELEASE/reference/html/#mongo-template.id-handling))

Attention au type de cet identifiant et comment il sera défini, il doit être à la fois compatible avec JPA et MongoDB.

Bien sûr, les annotations spécifiques à JPA/Hibernate (tel que _@Id_, _@Column_) peuvent aussi être ajoutées, mais attention au comportement possiblement différent entre JPA et MongoDB.

Nous avons par exemple utilisé [UUID][7] pour générer l’identifiant pour JPA, l’identifiant MongoDB étant généré automatiquement.

{{< highlight java >}}
@Entity
@Document
public class Person {

    @Id
    @org.springframework.data.annotation.Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    private String id;

    @Column(nullable = false)
    private String name;

    public Person() {
        // Required by Hibernate
    }

    // Setters and Getters are missing
}
{{< /highlight >}}

# Sélection du type de persistance

Afin de pouvoir sélectionner le type de persistence (JPA ou MongoDB) au lancement de l’application, il est nécessaire de pouvoir gérer plusieurs jeux de configurations.

Ceci peut être réalisé avec des [profils][8]. Un profil JPA et un profile MongoDB.

Voici les différents paramètres à modifier appliquer à chaque profil.

## Auto-configuration

Habituellement, le mécanisme d’auto-configuration Spring Boot fonctionne tout seul en inspectant les classes présentes dans le classpath (ex: s’il y a Spring Data JPA, la configuration JPA est mise en place). Or ici, nous souhaitons à la fois **Spring Data JPA **et** Spring Data MongoDB dans notre classpath**. Il est donc nécessaire de désactiver précisément l’auto-configuration adéquat en fonction du profil.

En pratique, voici les classes concernées par JPA :

- org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration
- org.springframework.boot.autoconfigure.data.jpa.JpaRepositoriesAutoConfiguration
- org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration

Voici celles concernées par MongoDB :

- org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration
- org.springframework.boot.autoconfigure.data.mongo.MongoDataAutoConfiguration

Pour la désactivation d’auto-configurations, une première solution consiste à utiliser l’annotation _@SpringBootApplication_ avec le paramètre exclude :

{{< highlight java >}}
@SpringBootApplication(exclude = {MongoAutoConfiguration.class, MongoDataAutoConfiguration.class})
{{< /highlight >}}

Cette solution n’est pas satisfaisante car il serait alors nécessaire d’avoir 2 classes avec cette annotation (une pour JPA et une autre pour MongoDB), et il n’est pas possible d’avoir 2 classes _@SpringBootApplication_ dans une application Spring Boot.

Une autre solution consiste à utiliser un fichier properties dédié à chaque profile. La propriété _spring.autoconfigure.exclude_ permet alors de désactiver une liste d’auto-configurations.

Spring Boot se charge alors de charger le bon fichier en fonction du profil courant.

_application-jpa.properties_

{{< highlight java >}}
spring.autoconfigure.exclude=org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration,\
org.springframework.boot.autoconfigure.data.mongo.MongoDataAutoConfiguration
{{< /highlight >}}

_application-mongodb.properties_

{{< highlight java >}}
spring.autoconfigure.exclude=org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration,\
org.springframework.boot.autoconfigure.data.jpa.JpaRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration
{{< /highlight >}}

## Repositories

Un autre mécanisme à piloter est celui qui crée des instances de repository à partir de notre interface _PersonRepository_. En effet, par défaut, Spring détecte un modèle (_Person_) à la fois dédié à la persistence JPA (avec _@Entity_) et MongoDB (_@Document_). Un repository de chaque sera donc créé systématiquement.

Pour empêcher cela, des propriétés Spring peuvent être utilisées :

application-jpa.properties

{{< highlight java >}}
spring.data.jpa.repositories.enabled=false
{{< /highlight >}}

application-mongo.properties

{{< highlight java >}}
spring.data.mongodb.repositories.enabled=false
{{< /highlight >}}

## Configuration

Il suffit alors de spécifier les propriétés de configuration relatives à chaque profil. Par exemple, dans le cas d’une connexion à Postgres, on peut ajouter au profil _jpa_ les propriétés suivantes :

{{< highlight java >}}
spring.datasource.url=jdbc:postgresql://localhost:5432/spring-boot-jpa-mongo-exemple
spring.datasource.username=postgres
spring.datasource.password=postgres

spring.jpa.hibernate.ddl-auto=create
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
{{< /highlight >}}

Pour une connexion à mongodb (sans sécurité), on peut utiliser ceci dans le profil _mongodb_ :

{{< highlight java >}}
spring.data.mongodb.uri=mongodb://localhost:27017/spring-boot-jpa-mongo-exemple
{{< /highlight >}}

# Tester la couche de persistence

L’objectif n’est bien sûr pas ici de tester Spring Boot et ses modules, mais plutôt de vérifier que tout s’orchestre correctement. En l’occurrence, l’idéal est d’avoir une même batterie de tests exécutable à la fois sur JPA et sur MongoDB.

Ceci est plutôt simple à réaliser avec l’annotation _@ActiveProfiles_ qui permet d’activer un profil lors de l’exécution d’une classe de test.

Il nous suffit alors de créer une classe _PersonRepositoryJpaTest_ annotée par _@ActiveProfiles(“jpa”)_, et une classe _PersonRepositoryMongoTest_ annotée par _@ActiveProfiles(“mongodb”)_.

Il faut ensuite que ces 2 classes jouent les mêmes tests. Ceci peut être réalisé en délégant chaque test à une classe unique (_PersonRepositoryTester_) utilisée pour tous les profils.

{{< highlight java >}}
@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
@ActiveProfiles("jpa")
public class PersonRepositoryJpaTest {

    @Autowired
    private PersonRepositoryTester personRepositoryTester;

    @Test
    public void save_and_find() {
        personRepositoryTester.save_and_find();
    }
}

@Component
public class PersonRepositoryTester {

    @Autowired
    private PersonRepository personRepository;

    public void save_and_find() {
        System.out.println(personRepository.count());
        final Person arthur = personRepository.save(new Person("Arthur"));
        final Person personFound = personRepository.findOne(arthur.getId());
        assertThat(personFound.getName()).isEqualTo("Arthur");
    }

}
{{< /highlight >}}

Pour les tests, il est possible d’utiliser une base de donnée embarquée, sans aucune configuration spécifique, il suffit d’ajouter les dépendances de test nécessaires :

{{< highlight java >}}
testCompile 'com.h2database:h2' 				// JPA
testCompile 'de.flapdoodle.embed:de.flapdoodle.embed.mongo' 	// MongoDB
{{< /highlight >}}

A noter que l’annotation Spring _@Transactional_ ne fonctionne que pour les tests JPA. Pour MongoDB, il est donc nécessaire de gérer à la main (avec _@Before_ par exemple) la suppression des données entre chaque test.

# Aller plus loin

## Configuration spécifique

Ainsi, avec la gestion par profil Spring, il est très facile de mettre en place une configuration spécifique à un type de persistance. Cela peut se faire avec une classe de configuration (annotée _@Configuration_) annotée par _@Profile(“jpa”)_. Ainsi, cette configuration ne sera appliquée que pour le profil JPA.

## Auditing

L’[audit][9] fait partie des fonctionnalités Spring qui nécessitent une configuration spécifique par type de persistance. En effet, il faut ajouter l’annotation _@EnableJpaAuditing_ pour JPA et _@EnableMongoAuditing_ pour MongoDB.

{{< highlight java >}}
@Configuration
@EnableJpaAuditing
@Profile("jpa")
public class JpaConfiguration {
}

@Configuration
@Profile("mongodb")
@EnableMongoAuditing
public class MongoConfiguration {
}
{{< /highlight >}}

A noter que les annotations d’audit (_@CreatedBy_, _@CreatedDate_ ...) a placer sur les entités sont indépendantes du type de persistance choisi.

# Ce que l’on peut améliorer

L’un des aspects perfectible de cette architecture est cette **gestion d’exclusion d’auto-configuration**. En effet, le profil JPA doit exclure l’auto-configuration lié à MongoDB et réciproquement. Ainsi, si un troisième type de persistance doit être implémenté, il faudra, en plus de créer un nouveau profil avec son properties dédié, adapter les 2 autres, ce qui peut poser à long terme des problèmes de maintenance.

Un autre aspects concerne les tests. En effet, chaque test de la classe _PersonRepositoryTester_ doit être recréé pour chaque test spécifique. Ici aussi peuvent survenir des problèmes de maintenance avec la taille du projet.

Il est très probablement possible de simplifier cela avec [_JUnit 5_][10] ou [_TestNG_][11].

# En résumé

Grâce à l’**abstraction Spring Data** Commons, nous avons vu qu’il était possible de changer de type de persistance relativement facilement sans pour autant dupliquer _Repositories_ et _Entities_. Cependant, cela requiert de **contrôler finement les mécanismes d’auto-configuration** de Spring, ce qui n’est pas trivial et assez peu couvert dans les documentations officielles.

D’ailleurs, en parlant de documentation, un [court paragraphe de la doc Spring Boot][12] mentionne l’utilisation de Spring Data JPA et Mongo **dans la même application**. Cependant, il faut comprendre dans ce passage que les 2 types de repositories sont actifs simultanément, contrairement au cas présent où nous voulons activé soit l’un, soit l’autre.

Reste à savoir si cette stratégie peut être appliquée à d’autres modules de Spring Data, comme le module Cassandra ([http://projects.spring.io/spring-data-cassandra/][13]).

[Alexandre][14] & [Jean-Baptiste][15]

[1]: https://github.com/sogilis/spring-boot-jpa-mongodb-example
[2]: http://projects.spring.io/spring-data-jpa/
[3]: http://projects.spring.io/spring-data-mongodb/
[4]: http://projects.spring.io/spring-data/
[5]: http://docs.spring.io/spring-data/commons/docs/current/reference/html/
[6]: http://docs.spring.io/spring-data/commons/docs/current/reference/html/#repositories.query-methods
[7]: https://fr.wikipedia.org/wiki/Universal_Unique_Identifier
[8]: https://docs.spring.io/spring-boot/docs/current-SNAPSHOT/reference/htmlsingle/#boot-features-profiles
[9]: http://docs.spring.io/spring-data/commons/docs/current/reference/html/#auditing
[10]: http://junit.org/junit5/
[11]: http://testng.org/doc/
[12]: https://docs.spring.io/spring-boot/docs/current/reference/html/howto-data-access.html#howto-use-spring-data-jpa--and-mongo-repositories
[13]: http://projects.spring.io/spring-data-cassandra/
[14]: https://www.linkedin.com/in/dumontal/
[15]: https://www.linkedin.com/in/jean-baptiste-mille-0383b81
