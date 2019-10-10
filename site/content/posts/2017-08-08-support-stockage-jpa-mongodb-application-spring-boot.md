---
title: Support du stockage JPA et MongoDB dans une application Spring-boot
author: Tiphaine
date: 2017-08-08T15:32:27+00:00
pyre_show_first_featured_image:
  - no
pyre_portfolio_width_100:
  - default
pyre_image_rollover_icons:
  - default
pyre_post_links_target:
  - no
pyre_related_posts:
  - default
pyre_share_box:
  - default
pyre_post_pagination:
  - default
pyre_author_info:
  - default
pyre_post_meta:
  - default
pyre_post_comments:
  - default
pyre_slider_position:
  - default
pyre_slider_type:
  - no
pyre_avada_rev_styles:
  - default
pyre_display_header:
  - yes
pyre_header_100_width:
  - default
pyre_header_bg_full:
  - no
pyre_header_bg_repeat:
  - repeat
pyre_displayed_menu:
  - default
pyre_display_footer:
  - default
pyre_display_copyright:
  - default
pyre_footer_100_width:
  - default
pyre_sidebar_position:
  - default
pyre_page_bg_layout:
  - default
pyre_page_bg_full:
  - no
pyre_page_bg_repeat:
  - repeat
pyre_wide_page_bg_full:
  - no
pyre_wide_page_bg_repeat:
  - repeat
pyre_page_title:
  - default
pyre_page_title_text:
  - default
pyre_page_title_text_alignment:
  - default
pyre_page_title_100_width:
  - default
pyre_page_title_bar_bg_full:
  - default
pyre_page_title_bg_parallax:
  - default
pyre_page_title_breadcrumbs_search_bar:
  - default
fusion_builder_status:
  - inactive
avada_post_views_count:
  - 10055
sbg_selected_sidebar:
  - 'a:1:{i:0;s:1:"0";}'
sbg_selected_sidebar_replacement:
  - 'a:1:{i:0;s:12:"Blog Sidebar";}'
sbg_selected_sidebar_2:
  - 'a:1:{i:0;s:1:"0";}'
sbg_selected_sidebar_2_replacement:
  - 'a:1:{i:0;s:0:"";}'
categories:
  - DÉVELOPPEMENT

---
<span style="font-weight: 400;">Dans le cadre d’un projet sur lequel nous travaillons actuellement, nous avons été amenés à implémenter un service web spring-boot capable de stocker des objets relativement simples dans une base de données.</span>

<img class="aligncenter size-large wp-image-2001" src="http://sogilis.com/wp-content/uploads/2017/07/blog-header-2-1024x309.png" alt="Support du stockage JPA et MongoDB dans une application Spring-boot - header" width="669" height="202" srcset="http://sogilis.com/wp-content/uploads/2017/07/blog-header-2-1024x309.png 1024w, http://sogilis.com/wp-content/uploads/2017/07/blog-header-2-300x91.png 300w, http://sogilis.com/wp-content/uploads/2017/07/blog-header-2-768x232.png 768w, http://sogilis.com/wp-content/uploads/2017/07/blog-header-2.png 1400w" sizes="(max-width: 669px) 100vw, 669px" />

<span style="font-weight: 400;">La particularité de ce service réside dans sa compatibilité avec <strong>différents moteurs de stockage</strong> : relationnelle (ex: Oracle, Postgres&#8230;) et NoSQL orienté document (principalement MongoDB). Cette exigence vient directement des contraintes du client qui distribue sa solution logicielle avec différentes bases de données. L’environnement technique est bien évidemment lié aux contraintes du client, et comprend le framework <a href="https://projects.spring.io/spring-boot/">Spring Boot</a></span><span style="font-weight: 400;"> pour le développement de microservices avec des couches de persistance type <strong>JPA</strong> (Java Persistence API) et <strong>MongoDB</strong>.</span>

<span style="font-weight: 400;">Le défi consiste à implémenter ces deux couches de persistance en minimisant la duplication de code.</span>

<span style="font-weight: 400;">Nous avons créé une application de démo afin d’illustrer l’architecture mise en place. </span>

<span style="font-weight: 400;">Les sources de cette application sont disponible sur notre github : </span>[<span style="font-weight: 400;">https://github.com/sogilis/spring-boot-jpa-mongodb-example</span>][1]<span style="font-weight: 400;">.</span>

<span style="font-weight: 400;">Version de Spring Boot utilisée : 1.5.4.RELEASE.</span>

<span style="font-weight: 400;">Dans le but de simplifier la compréhension, notre application de démo persiste des entités de type </span>_<span style="font-weight: 400;">Person</span>_ <span style="font-weight: 400;">en base. Une telle entité est composée d’un identifiant unique (String), et d’un nom (String).</span>

# <span style="font-weight: 400;">Deux bases de données à supporter</span>

<span style="font-weight: 400;">Les deux moteurs de stockage à supporter dans notre application sont assez hétérogènes : ces bases de données sont directement dictées par l’environnement en production chez les clients finaux.</span>

<span style="font-weight: 400;">Etant donné que Spring fournit un bon support des différents moteurs relationnels via sa couche de persistence JPA (</span>[<span style="font-weight: 400;">Spring Data </span>][2]<span style="font-weight: 400;">JPA</span><span style="font-weight: 400;">), nous avons décidé d’intégrer cette couche. Par conséquent, notre service peut interagir avec un driver Postgres mais aussi avec <strong>n’importe quel driver qui satisfait à la spécification JPA</strong>. Cela permet d’être compatible avec beaucoup de bases de données relationnelles.</span>

<span style="font-weight: 400;">MongoDB est une base de données NoSQL orientée document, pleinement supportée par le projet Spring Boot via le module </span>[<span style="font-weight: 400;">Spring Data MongoDB</span>][3] <span style="font-weight: 400;">qui embarque une dépendance vers un <strong>driver MongoDB</strong>.</span>

# <span style="font-weight: 400;">La réalisation</span>

<span style="font-weight: 400;">L’idée derrière le développement de ce service est de laisser à l’administrateur la configuration du moteur de stockage qu’il souhaite utiliser lorsque l’application démarre (JPA ou MongoDB). Le défi posé par ce projet peut se ramener à trouver une solution autorisant </span>**la mutualisation d’un maximum de code du modèle à persister** <span style="font-weight: 400;">tout en étant testable facilement.</span>

<span style="font-weight: 400;">Nous souhaitons donc éviter ceci :</span>

<img class="aligncenter size-full wp-image-1988" src="http://sogilis.com/wp-content/uploads/2017/07/blog-solution-avec-duplications.png" alt="Support du stockage JPA et MongoDB dans une application Spring-boot - solution avec duplications" width="869" height="232" srcset="http://sogilis.com/wp-content/uploads/2017/07/blog-solution-avec-duplications.png 869w, http://sogilis.com/wp-content/uploads/2017/07/blog-solution-avec-duplications-300x80.png 300w, http://sogilis.com/wp-content/uploads/2017/07/blog-solution-avec-duplications-768x205.png 768w" sizes="(max-width: 869px) 100vw, 869px" />

<span style="font-weight: 400;">Une autre solution à cette problématique pourrait être de créer plusieurs artefacts, l’un dédiée à l’application utilisant une couche d’abstraction (Spring Data Commons par exemple), et les autres implémentant chacun un type de persistance donné. C’est alors la constitution du classpath qui déterminerait quelle persistance utiliser (grâce au système d’auto-configuration de Spring Boot).</span>

<span style="font-weight: 400;">Cette solution n’a pas été retenue car la priorité a été mise sur la facilité d’intégration de l’application au sein du système d’information chez les clients finaux.</span>

## <span style="font-weight: 400;">Spring et la notion de Repository</span>

<span style="font-weight: 400;">Premier constat : les modules </span>[<span style="font-weight: 400;">Spring Data JPA</span>][2] <span style="font-weight: 400;">et </span>[<span style="font-weight: 400;">Spring Data MongoDB</span>][3] <span style="font-weight: 400;">de </span>[<span style="font-weight: 400;">Spring Data</span>][4] <span style="font-weight: 400;">partagent un module commun appelé </span>[<span style="font-weight: 400;">Spring Data Commons</span>][5]<span style="font-weight: 400;">.</span>

<span style="font-weight: 400;">Nous pouvons donc nous baser sur ce module pour écrire le code commun aux 2 types de persistances, et en particulier le Repository, ce qui donne ceci :</span>

<img class="aligncenter size-full wp-image-1989" src="http://sogilis.com/wp-content/uploads/2017/07/blog-class-diagramm.png" alt="Support du stockage JPA et MongoDB dans une application Spring-boot - class diagramm" width="452" height="514" srcset="http://sogilis.com/wp-content/uploads/2017/07/blog-class-diagramm.png 452w, http://sogilis.com/wp-content/uploads/2017/07/blog-class-diagramm-264x300.png 264w" sizes="(max-width: 452px) 100vw, 452px" />

<span style="font-weight: 400;">Ainsi, il n’est nécessaire de déclarer dans notre application que l’interface </span><span style="text-decoration: underline;"><i><span style="font-weight: 400;">PersonRepository</span></i></span>_<span style="font-weight: 400;">, </span>_<span style="font-weight: 400;">les implémentations pour JPA ou Mongo étant générées automatiquement par Spring.</span>

<span style="font-weight: 400;">Il est à noter que les interfaces dédiées à JPA et Mongo étendent toutes les deux </span><span style="text-decoration: underline;"><i><span style="font-weight: 400;">PagingAndSortingRepository</span></i></span><span style="font-weight: 400;">, ce qui nous permet de l’utiliser pour </span>_<span style="text-decoration: underline;"><span style="font-weight: 400;">PersonRepository</span></span>_<span style="font-weight: 400;">.</span>

<span style="font-weight: 400;">En revanche, sans plus de configuration, Spring Boot va chercher à activer les 2 implémentations car il trouve à la fois Spring Data JPA et Spring Data MongoDB dans le classpath (système d’auto-configuration). Nous verrons dans la section suivante comment piloter ce mécanisme.</span>

<span style="font-weight: 400;">Ainsi, comme le documente </span>[<span style="font-weight: 400;">Spring Data Commons</span>][6]<span style="font-weight: 400;">, il est possible d’ajouter des méthodes de requête dans à ce “repository” (ex: </span><span style="font-weight: 400;">findByName</span><span style="font-weight: 400;">) qui seront utilisables quelque soit le type de persistance.</span>

<span style="font-weight: 400;">En plus du Repository, il est nécessaire de déclarer les entités à persister. Ici, c’est plus simple car tout se fait par annotation :</span>

<li style="font-weight: 400;">
  <span style="font-weight: 400;">JPA : </span><em><span style="text-decoration: underline;">@Entity</span></em>
</li>
<li style="font-weight: 400;">
  <span style="font-weight: 400;">MongoDB : </span><em><span style="text-decoration: underline;">@Document</span></em>
</li>

<span style="font-weight: 400;">Il suffit alors d’annoter une même classe avec ces 2 annotations, ce qui évite de dupliquer cette classe entité.</span>

<span style="font-weight: 400;">Toute entité doit pouvoir être identifiée de manière unique. Pour cela, il existe aussi 2 annotations distinctes, mais qui ont le même nom (</span>_<span style="text-decoration: underline;">@Id</span>_<span style="font-weight: 400;">) :</span>

<li style="font-weight: 400;">
  <span style="font-weight: 400;">JPA : </span><em><span style="text-decoration: underline;">javax.persistence.Id</span></em>
</li>
<li style="font-weight: 400;">
  <span style="font-weight: 400;">MongoDB : </span><em><span style="text-decoration: underline;">org.springframework.data.annotation.Id</span></em><span style="font-weight: 400;"> (</span><a href="http://docs.spring.io/spring-data/data-mongo/docs/1.10.4.RELEASE/reference/html/#mongo-template.id-handling"><span style="font-weight: 400;">permet de mapper la colonne sur l’identifiant natif MongoDB : _id</span></a><span style="font-weight: 400;">)</span>
</li>

<span style="font-weight: 400;">Attention au type de cet identifiant et comment il sera défini, il doit être à la fois compatible avec JPA et MongoDB.</span>

<span style="font-weight: 400;">Bien sûr, les annotations spécifiques à JPA/Hibernate (tel que <em><span style="text-decoration: underline;">@Id</span></em>, <em><span style="text-decoration: underline;">@Column</span></em>) peuvent aussi être ajoutées, mais attention au comportement possiblement différent entre JPA et MongoDB.</span>

<span style="font-weight: 400;">Nous avons par exemple utilisé </span>[<span style="font-weight: 400;">UUID</span>][7] <span style="font-weight: 400;">pour générer l’identifiant pour JPA, l’identifiant MongoDB étant généré automatiquement.</span>

<pre class="wp-code-highlight prettyprint">@Entity
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
</pre>

# <span style="font-weight: 400;">Sélection du type de persistance</span>

<span style="font-weight: 400;">Afin de pouvoir sélectionner le type de persistence (JPA ou MongoDB) au lancement de l’application, il est nécessaire de pouvoir gérer plusieurs jeux de configurations.</span>

<span style="font-weight: 400;">Ceci peut être réalisé avec des </span>[<span style="font-weight: 400;">profils</span>][8]<span style="font-weight: 400;">. Un profil JPA et un profile MongoDB.</span>

<span style="font-weight: 400;">Voici les différents paramètres à modifier appliquer à chaque profil. </span>

## <span style="font-weight: 400;">Auto-configuration</span>

<span style="font-weight: 400;">Habituellement, le mécanisme d’auto-configuration Spring Boot fonctionne tout seul en inspectant les classes présentes dans le classpath (ex: s’il y a Spring Data JPA, la configuration JPA est mise en place). Or ici, nous souhaitons à la fois <strong>Spring Data JPA </strong>et<strong> Spring Data MongoDB dans notre classpath</strong>. Il est donc nécessaire de désactiver précisément l’auto-configuration adéquat en fonction du profil.</span>

<span style="font-weight: 400;">En pratique, voici les classes concernées par JPA :</span>

<li style="font-weight: 400;">
  <span style="font-weight: 400;">org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration</span>
</li>
<li style="font-weight: 400;">
  <span style="font-weight: 400;">org.springframework.boot.autoconfigure.data.jpa.JpaRepositoriesAutoConfiguration</span>
</li>
<li style="font-weight: 400;">
  <span style="font-weight: 400;">org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration</span>
</li>

<span style="font-weight: 400;">Voici celles concernées par MongoDB :</span>

<li style="font-weight: 400;">
  <span style="font-weight: 400;">org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration</span>
</li>
<li style="font-weight: 400;">
  <span style="font-weight: 400;">org.springframework.boot.autoconfigure.data.mongo.MongoDataAutoConfiguration</span>
</li>

<span style="font-weight: 400;">Pour la désactivation d’auto-configurations, une première solution consiste à utiliser l’annotation </span>_<span style="text-decoration: underline;"><span style="font-weight: 400;">@SpringBootApplication</span></span>_ <span style="font-weight: 400;">avec le paramètre </span><span style="font-weight: 400;">exclude</span> <span style="font-weight: 400;">:</span>

<pre class="wp-code-highlight prettyprint">@SpringBootApplication(exclude = {MongoAutoConfiguration.class, MongoDataAutoConfiguration.class})
</pre>

<span style="font-weight: 400;">Cette solution n’est pas satisfaisante car il serait alors nécessaire d’avoir 2 classes avec cette annotation (une pour JPA et une autre pour MongoDB), et il n’est pas possible d’avoir 2 classes </span>_<span style="text-decoration: underline;"><span style="font-weight: 400;">@SpringBootApplication</span></span>_ <span style="font-weight: 400;">dans une application Spring Boot.</span>

<span style="font-weight: 400;">Une autre solution consiste à utiliser un fichier properties dédié à chaque profile. La propriété <em>spring.autoconfigure.exclude</em> permet alors de désactiver une liste d’auto-configurations.</span>

<span style="font-weight: 400;">Spring Boot se charge alors de charger le bon fichier en fonction du profil courant.</span>

<span style="text-decoration: underline;"><i><span style="font-weight: 400;">application-jpa.properties</span></i></span>

<pre class="wp-code-highlight prettyprint">spring.autoconfigure.exclude=org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration,\
org.springframework.boot.autoconfigure.data.mongo.MongoDataAutoConfiguration
</pre>

<span style="text-decoration: underline;"><i><span style="font-weight: 400;">application-mongodb.properties</span></i></span>

<pre class="wp-code-highlight prettyprint">spring.autoconfigure.exclude=org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration,\
org.springframework.boot.autoconfigure.data.jpa.JpaRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration
</pre>

## <span style="font-weight: 400;">Repositories</span>

<span style="font-weight: 400;">Un autre mécanisme à piloter est celui qui crée des instances de repository à partir de notre interface </span>_<span style="font-weight: 400;">PersonRepository</span>_<span style="font-weight: 400;">. En effet, par défaut, Spring détecte un modèle (<em><span style="text-decoration: underline;">Person</span></em>) à la fois dédié à la persistence JPA (avec </span>_<span style="text-decoration: underline;"><span style="font-weight: 400;">@Entity</span></span>_<span style="font-weight: 400;">) et MongoDB (</span>_<span style="text-decoration: underline;"><span style="font-weight: 400;">@Document</span></span>_<span style="font-weight: 400;">). Un repository de chaque sera donc créé systématiquement.</span>

<span style="font-weight: 400;">Pour empêcher cela, des propriétés Spring peuvent être utilisées :</span>

<span style="text-decoration: underline;"><span style="font-weight: 400;">application-jpa.properties</span></span>

<pre class="wp-code-highlight prettyprint">spring.data.jpa.repositories.enabled=false
</pre>

<span style="text-decoration: underline;"><span style="font-weight: 400;">application-mongo.properties</span></span>

<pre class="wp-code-highlight prettyprint">spring.data.mongodb.repositories.enabled=false
</pre>

## <span style="font-weight: 400;">Configuration</span>

<span style="font-weight: 400;">Il suffit alors de spécifier les propriétés de configuration relatives à chaque profil. Par exemple, dans le cas d’une connexion à Postgres, on peut ajouter au profil </span>_<span style="font-weight: 400;">jpa</span>_ <span style="font-weight: 400;">les propriétés suivantes :</span>

<pre class="wp-code-highlight prettyprint">spring.datasource.url=jdbc:postgresql://localhost:5432/spring-boot-jpa-mongo-exemple
spring.datasource.username=postgres
spring.datasource.password=postgres

spring.jpa.hibernate.ddl-auto=create
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
</pre>

<span style="font-weight: 400;">Pour une connexion à mongodb (sans sécurité), on peut utiliser ceci dans le profil </span>_<span style="font-weight: 400;">mongodb</span>_ <span style="font-weight: 400;">:</span>

<pre class="wp-code-highlight prettyprint">spring.data.mongodb.uri=mongodb://localhost:27017/spring-boot-jpa-mongo-exemple
</pre>

# <span style="font-weight: 400;">Tester la couche de persistence</span>

<span style="font-weight: 400;">L’objectif n’est bien sûr pas ici de tester Spring Boot et ses modules, mais plutôt de vérifier que tout s’orchestre correctement. En l’occurrence, l’idéal est d’avoir une même batterie de tests exécutable à la fois sur JPA et sur MongoDB.</span>

<span style="font-weight: 400;">Ceci est plutôt simple à réaliser avec l’annotation </span>_<span style="text-decoration: underline;">@ActiveProfiles</span>_ <span style="font-weight: 400;">qui permet d’activer un profil lors de l’exécution d’une classe de test.</span>

<span style="font-weight: 400;">Il nous suffit alors de créer une classe <em><span style="text-decoration: underline;">PersonRepositoryJpaTest</span></em> annotée par </span><span style="text-decoration: underline;"><i><span style="font-weight: 400;">@ActiveProfiles(“jpa”)</span></i></span><span style="font-weight: 400;">, et une classe <em><span style="text-decoration: underline;">PersonRepositoryMongoTest</span></em> annotée par </span><span style="text-decoration: underline;"><i><span style="font-weight: 400;">@ActiveProfiles(“mongodb”)</span></i></span><span style="font-weight: 400;">.</span>

<span style="font-weight: 400;">Il faut ensuite que ces 2 classes jouent les mêmes tests. Ceci peut être réalisé en délégant chaque test à une classe unique (<em><span style="text-decoration: underline;">PersonRepositoryTester</span></em>) utilisée pour tous les profils.</span>

<pre class="wp-code-highlight prettyprint">@RunWith(SpringRunner.class)
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
</pre>

<span style="font-weight: 400;">Pour les tests, il est possible d’utiliser une base de donnée embarquée, sans aucune configuration spécifique, il suffit d’ajouter les dépendances de test nécessaires :</span>

<pre class="wp-code-highlight prettyprint">testCompile &#039;com.h2database:h2&#039; 				// JPA
testCompile &#039;de.flapdoodle.embed:de.flapdoodle.embed.mongo&#039; 	// MongoDB
</pre>

<span style="font-weight: 400;">A noter que l’annotation Spring </span><span style="text-decoration: underline;"><i><span style="font-weight: 400;">@Transactional</span></i></span> <span style="font-weight: 400;">ne fonctionne que pour les tests JPA. Pour MongoDB, il est donc nécessaire de gérer à la main (avec </span><span style="text-decoration: underline;"><i><span style="font-weight: 400;">@Before</span></i></span> <span style="font-weight: 400;">par exemple) la suppression des données entre chaque test.</span>

# <span style="font-weight: 400;">Aller plus loin</span>

## <span style="font-weight: 400;">Configuration spécifique</span>

<span style="font-weight: 400;">Ainsi, avec la gestion par profil Spring, il est très facile de mettre en place une configuration spécifique à un type de persistance. Cela peut se faire avec une classe de configuration (annotée </span><span style="text-decoration: underline;"><i><span style="font-weight: 400;">@Configuration</span></i></span><span style="font-weight: 400;">) annotée par </span><span style="text-decoration: underline;"><i><span style="font-weight: 400;">@Profile(“jpa”)</span></i></span><span style="font-weight: 400;">. Ainsi, cette configuration ne sera appliquée que pour le profil JPA.</span>

## <span style="font-weight: 400;">Auditing</span>

<span style="font-weight: 400;">L’</span>[<span style="font-weight: 400;">audit</span>][9] <span style="font-weight: 400;">fait partie des fonctionnalités Spring qui nécessitent une configuration spécifique par type de persistance. En effet, il faut ajouter l’annotation </span>_<span style="text-decoration: underline;"><span style="font-weight: 400;">@EnableJpaAuditing</span></span>_ <span style="font-weight: 400;">pour JPA et </span>_<span style="text-decoration: underline;"><span style="font-weight: 400;">@EnableMongoAuditing</span></span>_ <span style="font-weight: 400;">pour MongoDB.</span>

<pre class="wp-code-highlight prettyprint">@Configuration
@EnableJpaAuditing
@Profile("jpa")
public class JpaConfiguration {
}

@Configuration
@Profile("mongodb")
@EnableMongoAuditing
public class MongoConfiguration {
}
</pre>

<span style="font-weight: 400;">A noter que les annotations d’audit (</span><span style="text-decoration: underline;"><i><span style="font-weight: 400;">@CreatedBy</span></i></span><span style="font-weight: 400;">, </span><span style="text-decoration: underline;"><i><span style="font-weight: 400;">@CreatedDate</span></i></span> <span style="font-weight: 400;">&#8230;) a placer sur les entités sont indépendantes du type de persistance choisi.</span>

# <span style="font-weight: 400;">Ce que l’on peut améliorer</span>

<span style="font-weight: 400;">L’un des aspects perfectible de cette architecture est cette <strong>gestion d’exclusion d’auto-configuration</strong>. En effet, le profil JPA doit exclure l’auto-configuration lié à MongoDB et réciproquement. Ainsi, si un troisième type de persistance doit être implémenté, il faudra, en plus de créer un nouveau profil avec son properties dédié, adapter les 2 autres, ce qui peut poser à long terme des problèmes de maintenance.</span>

<span style="font-weight: 400;">Un autre aspects concerne les tests. En effet, chaque test de la classe </span>_<span style="text-decoration: underline;"><span style="font-weight: 400;">PersonRepositoryTester</span></span>_ <span style="font-weight: 400;">doit être recréé pour chaque test spécifique. Ici aussi peuvent survenir des problèmes de maintenance avec la taille du projet.</span>

<span style="font-weight: 400;">Il est très probablement possible de simplifier cela avec </span>[_<span style="font-weight: 400;">JUnit 5</span>_][10]<span style="font-weight: 400;"> ou </span>[_<span style="font-weight: 400;">TestNG</span>_][11]<span style="font-weight: 400;">.</span>

# <span style="font-weight: 400;">En résumé</span>

<span style="font-weight: 400;">Grâce à l’<strong>abstraction Spring Data</strong> Commons, nous avons vu qu’il était possible de changer de type de persistance relativement facilement sans pour autant dupliquer </span>_<span style="font-weight: 400;">Repositories</span>_ <span style="font-weight: 400;">et </span>_<span style="font-weight: 400;">Entities</span>_<span style="font-weight: 400;">. Cependant, cela requiert de <strong>contrôler finement les mécanismes d’auto-configuration</strong> de Spring, ce qui n’est pas trivial et assez peu couvert dans les documentations officielles.</span>

<span style="font-weight: 400;">D’ailleurs, en parlant de documentation, un </span>[<span style="font-weight: 400;">court paragraphe de la doc Spring Boot</span>][12] <span style="font-weight: 400;">mentionne l’utilisation de Spring Data JPA et Mongo <strong>dans la même application</strong>. Cependant, il faut comprendre dans ce passage que les 2 types de repositories sont actifs simultanément, contrairement au cas présent où nous voulons activé soit l’un, soit l’autre.</span>
  
<span style="font-weight: 400;">Reste à savoir si cette stratégie peut être appliquée à d’autres modules de Spring Data, comme le module Cassandra (</span>[<span style="font-weight: 400;">http://projects.spring.io/spring-data-cassandra/</span>][13]<span style="font-weight: 400;">).</span>

&nbsp;

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