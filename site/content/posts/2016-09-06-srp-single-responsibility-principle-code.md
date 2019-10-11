---
title: Single Responsibility Principle dans mon code
author: Tiphaine
date: 2016-09-06T07:00:21+00:00
featured_image: /wp-content/uploads/2016/02/Sogilis-Christophe-Levet-Photographe-7803.jpg
tumblr_sogilisblog_permalink:
  - http://sogilisblog.tumblr.com/post/139415965976/single-responsibility-principle
tumblr_sogilisblog_id:
  - 139415965976
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
  - 4092
sbg_selected_sidebar:
  - 'a:1:{i:0;s:1:"0";}'
sbg_selected_sidebar_replacement:
  - 'a:1:{i:0;s:0:"";}'
sbg_selected_sidebar_2:
  - 'a:1:{i:0;s:1:"0";}'
sbg_selected_sidebar_2_replacement:
  - 'a:1:{i:0;s:0:"";}'
categories:
  - DÉVELOPPEMENT
tags:
  - développement
  - SRP

---
<span style="font-weight: 400;">Le principe de responsabilité unique (</span>**Single Responsibility Principle** <span style="font-weight: 400;">ou </span><span style="font-weight: 400;">SRP</span><span style="font-weight: 400;">) fait partie d&rsquo;un ensemble de 5 principes de la programmation orientée objet : </span>_<span style="text-decoration: underline;"><a href="https://fr.wikipedia.org/wiki/SOLID_(informatique)"><span style="font-weight: 400;">SOLID</span></a></span>_<span style="font-weight: 400;">.</span>

<li style="font-weight: 400;">
  <b>S</b><span style="font-weight: 400;"> : Single Responsibility Principle</span>
</li>
<li style="font-weight: 400;">
  <b>O</b><span style="font-weight: 400;"> : Open/Closed Principle</span>
</li>
<li style="font-weight: 400;">
  <b>L</b><span style="font-weight: 400;"> : Liskov Substitution Principle</span>
</li>
<li style="font-weight: 400;">
  <b>I</b><span style="font-weight: 400;"> : Interface Segregation Principle</span>
</li>
<li style="font-weight: 400;">
  <b>D</b><span style="font-weight: 400;"> : Dependency Inversion Principle</span>
</li>

<span style="font-weight: 400;">Ayant déjà lu et entendu ce principe un peu partout, j&rsquo;ai voulu creuser pour voir si j&rsquo;avais bien compris l&rsquo;idée sous-jacente et ainsi pouvoir l&rsquo;appliquer correctement.<br /> </span><span style="font-weight: 400;">Je vous partage donc ici le résultat de mes recherches et réflexions.</span>

&nbsp;

## **Intuitivement ou naïvement**

<span style="font-weight: 400;">Partons du nom de principe : « responsabilité unique ».<br /> </span><span style="font-weight: 400;">Naïvement, on peut comprendre que le principe nous dicte de n&rsquo;avoir qu&rsquo;une seule responsabilité par&#8230; </span>**par quoi ?
  
** <span style="font-weight: 400;">Par Méthode ? Classe ? Package / module ? Librairie ?  </span>

**⇒ Première supposition**<span style="font-weight: 400;">.  </span>

<span style="font-weight: 400;">Nous sommes en programmation orientée objet, on peut donc supposer que le principe s&rsquo;applique pour chaque objet, donc pour chaque classe.  </span>

<img class="wp-image-1145 size-full aligncenter" src="http://sogilis.com/wp-content/uploads/2016/02/niveau-dapplication-1.png" alt="niveau d'application (1)" width="605" height="60" srcset="http://sogilis.com/wp-content/uploads/2016/02/niveau-dapplication-1.png 605w, http://sogilis.com/wp-content/uploads/2016/02/niveau-dapplication-1-300x30.png 300w" sizes="(max-width: 605px) 100vw, 605px" />

<span style="font-weight: 400;">Ensuite, </span>**qu&rsquo;est-ce qu&rsquo;une responsabilité ?** <span style="font-weight: 400;"> </span>

**⇒ Deuxième supposition**<span style="font-weight: 400;">.  </span>

<span style="font-weight: 400;">Encore une fois, naïvement, on peut se dire que c&rsquo;est une fonctionnalité, une tâche ou un rôle comme calculer une moyenne, générer un fichier PDF, gérer des utilisateurs&#8230; </span><span style="font-weight: 400;">Mais alors, comment savoir si on est en face d&rsquo;une responsabilité unique ou de plusieurs responsabilités ?  </span><span style="font-weight: 400;">Je m&rsquo;explique : « calculer une moyenne » peut être vu comme plusieurs responsabilités : « sommer », « compter le nombre de valeurs » et « diviser ». </span><span style="font-weight: 400;">On pourrait alors aller très loin jusqu&rsquo;à ne trouver que des </span>**responsabilités unitaires**<span style="font-weight: 400;">.  </span>

<img class="wp-image-1144 size-full aligncenter" src="http://sogilis.com/wp-content/uploads/2016/02/composition-de-responsabilités.png" alt="composition de responsabilités" width="746" height="173" srcset="http://sogilis.com/wp-content/uploads/2016/02/composition-de-responsabilités.png 746w, http://sogilis.com/wp-content/uploads/2016/02/composition-de-responsabilités-300x70.png 300w" sizes="(max-width: 746px) 100vw, 746px" />

<span style="font-weight: 400;">En appliquant cela sur une base de code, on arriverait alors à des classes minimalistes qui ne contiendraient qu&rsquo;une seule méthode d&rsquo;une seule ligne&#8230; </span>**absurde**<span style="font-weight: 400;">.  </span>

<pre class="wp-code-highlight prettyprint">public int compareArticlePriceToAverage(Article article, Collection&lt;Article&gt; allArticles) {
      return compare(article.getPrice(), computePriceAverage(allArticles));
}

public double computePriceAverage(Collection&lt;Article&gt; articles) {
      return divide(sumPrices(articles), count(articles));
}

public double sumPrices(Collection&lt;Article&gt; articles) {
      return articles.stream()
                     .mapToDouble(Article::getPrice)
                     .average()
                     .getAsDouble();
} 

public int count(Collection&lt;Article&gt; articles) {
      return articles.size();
}

public double divide(double numerator, double denominator) {
      return numerator / denominator;
}

public int compare(double amount1, double amount2) {
      return Double.valueOf(amount1).compareTo(amount2);
}</pre>

<span style="font-weight: 400;">Il y a donc quelque chose qui cloche avec cette interprétation naïve.</span>

&nbsp;

## **Que dit Internet ?**

<span style="font-weight: 400;">Une recherche rapide sur </span>_<span style="text-decoration: underline;"><a href="http://www.grogueule.fr"><span style="font-weight: 400;">Grogeule</span></a></span>_ <span style="font-weight: 400;">nous donne les éléments suivants :</span>

  * _<span style="font-weight: 400;">Every class should have a single responsibility, and that responsibility should be entirely encapsulated by the class<br /> </span>_<span style="font-weight: 400;">Le niveau d&rsquo;abstraction est la </span><b style="line-height: 1.5;">classe</b>.<b style="line-height: 1.5;"><br /> </b><span style="font-weight: 400;">De plus, on va ici plus loin que notre interprétation naïve : il y a </span>**bijection** <span style="font-weight: 400;">entre classe et responsabilité.</span>
  * __<span style="font-weight: 400;">A responsibility is considered to be one reason to change<br /> </span>__<span style="font-weight: 400;">Nouvelle définition de responsabilité : </span>**une raison de changer.**
  * __<span style="font-weight: 400;">Une classe ne devrait avoir qu&rsquo;une seule raison de changer</span>__
  * _<span style="font-weight: 400;">A class should have only one reason to change</span>_
  * _<span style="font-weight: 400;">A class or module should have one, and only one, reason to change<br /> </span>_<span style="font-weight: 400;">On retrouve la </span>**bijection.
  
** <span style="font-weight: 400;">Le niveau d&rsquo;abstraction est plus ambigu ici car on parle de </span>**classe** <span style="font-weight: 400;">ou </span>**module**<span style="font-weight: 400;">.</span>

<span style="font-weight: 400;">Bref, tout ça reste encore un peu flou, revenons à l&rsquo;origine du principe.</span>

&nbsp;

## **Origines**

<span style="font-weight: 400;">Le SRP est défini pour la première fois par </span>**Robert C. Martin** <span style="font-weight: 400;">dans le livre « Agile Software Development, Principles, Patterns, and Practices » (</span>_<span style="text-decoration: underline;"><a href="https://drive.google.com/file/d/0ByOwmqah_nuGNHEtcU5OekdDMkk/view"><span style="font-weight: 400;">extrait</span><span style="font-weight: 400;"> et résumé ainsi par l&rsquo;auteur : </span><span style="font-weight: 400;">A class should have only one reason to change</span></a></span>_<span style="font-weight: 400;">). </span><span style="font-weight: 400;">Le niveau d&rsquo;abstraction défini est la </span>**classe** <span style="font-weight: 400;">et on a la définition d&rsquo;une responsabilité : </span>**une raison de changer**<span style="font-weight: 400;">. </span><span style="font-weight: 400;">Ça commence à s&rsquo;éclaircir.</span>

<span style="font-weight: 400;">Ok, mais n&rsquo;importe quelle raison est valable ? Comment peut-on connaître toutes les raisons possibles de changement ? </span><span style="font-weight: 400;">Robert (appelons le ainsi) nous aide un peu : </span>_<span style="font-weight: 400;">If you can think of more than one motive for changing a class, then that class has more than one responsibility</span>_<span style="font-weight: 400;">. </span><span style="font-weight: 400;">Il faut donc </span>**imaginer** <span style="font-weight: 400;">toutes les raisons de changement possibles&#8230; pas sûr que cela aide beaucoup, on retombe potentiellement sur le découpage en classes d&rsquo;une seule méthode d&rsquo;une seule ligne.</span>

<span style="font-weight: 400;">Robert nous aide avec un exemple concret :</span>

<pre class="wp-code-highlight prettyprint">public interface Modem {
      public void Dial(String pno);
      public void Hangup();
      public void Send(char c);
      public char Recv();
}</pre>

<span style="font-weight: 400;">Il nous explique que les classes qui implémentent cette interface ont alors 2 responsabilités (la gestion de la connexion et la communication), mais qu&rsquo;elles ne doivent pas nécessairement être scindées : tout dépend de la manière dont l&rsquo;application évolue !<br /> </span><span style="font-weight: 400;">Si les évolutions ne porterons que sur la gestion de la connexion, alors oui, pour minimiser la rigidité, éviter de toucher à la partie communication lorsqu&rsquo;on modifie la gestion de la connexion, etc., il est préférable de dissocier ces 2 responsabilités.<br /> </span><span style="font-weight: 400;">En revanche, si les futures évolutions portent sur ces 2 aspects en même temps, alors cette séparation n&rsquo;est pas nécessaire. Elle est même déconseillée pour éviter de compliquer l&rsquo;architecture de manière inutile.</span>

<span style="font-weight: 400;">Note : des bugs ne sont pas des </span>_<span style="font-weight: 400;">raisons de changer</span>_<span style="font-weight: 400;">. Sinon, chaque appel de méthode pourrait être une raison de changer, et on se retrouverait alors, en appliquant le SRP, avec des classes d&rsquo;une seule méthode d&rsquo;une seule ligne.</span>

<span style="font-weight: 400;">Pour résumer, Robert nous dit ceci : </span>_<span style="font-weight: 400;">An axis of change is only an axis of change if the changes actually occur</span>_<span style="font-weight: 400;">.<br /> </span><span style="font-weight: 400;">En gros, </span>**tout dépend des futures évolutions de l&rsquo;application** <span style="font-weight: 400;">! Ça va être facile à appliquer&#8230;</span>

&nbsp;

## **Exemples concrets**

<span style="font-weight: 400;">Robert nous donne quelques exemples dans son article :</span>

<li style="font-weight: 400;">
  <span style="font-weight: 400;">Il existe des cas où l&rsquo;environnement (hardware, OS&#8230;) nous oblige à coupler des classes qui ne l&rsquo;auraient pas été selon le SRP. Cela permet aussi d&rsquo;isoler du code médiocre derrière une interface unique sans polluer le reste de l&rsquo;application. C&rsquo;est plus une </span><b>exception</b><span style="font-weight: 400;"> qu&rsquo;un exemple d&rsquo;application.</span>
</li>

<li style="font-weight: 400;">
  <span style="font-weight: 400;">Une violation courante du SRP est l&rsquo;accumulation de règles métiers et de gestion de persistance au sein d&rsquo;une même classe :</span>
</li>

<pre class="wp-code-highlight prettyprint">public class Book {
      public void save() {
             // ...
      }

      public double averagePrice() {
             // ...
     }
}</pre>

<span style="font-weight: 400;">Robert est clair sur ce point : </span>**c&rsquo;est presque toujours à** **éviter** <span style="font-weight: 400;">puisque les évolutions de ces 2 responsabilités ont des fréquences et des raisons différentes de changer.</span>

&nbsp;

## **Application**

<span style="font-weight: 400;">À la lumière de l&rsquo;article de Robert, voici une démarche possible permettant d&rsquo;appliquer le SRP : </span><span style="font-weight: 400;">pour chaque classe, je me demande quelles sont les raisons possibles des futures évolutions.<br /> </span><span style="font-weight: 400;">On ne parle pas de bug fix, mais d&rsquo;évolutions « naturelles » et plausibles de l&rsquo;application, fonctionnelles ou techniques. </span>

<li style="font-weight: 400;">
  <span style="font-weight: 400;">Difficulté : </span><b>comment savoir ce qui va changer dans le futur ?</b><span style="font-weight: 400;"> On peut imaginer beaucoup de choses, mais qu&rsquo;est-ce qui sera vraiment appliqué ? Il y a toujours le risque d&rsquo;anticiper des évolutions qui n&rsquo;arriverons jamais&#8230; L&rsquo;article de Robert ne nous aide pas vraiment (voire pas du tout).</span>
</li>

<li style="font-weight: 400;">
  <span style="font-weight: 400;">De plus, cette anticipation est en contradiction avec le principe </span><span style="text-decoration: underline;"><em><a href="https://fr.wikipedia.org/wiki/YAGNI"><span style="font-weight: 400;">YAGNI</span></a></em></span><span style="font-weight: 400;"> ou </span><span style="text-decoration: underline;"><em><a href="https://fr.wikipedia.org/wiki/Principe_KISS"><span style="font-weight: 400;">KISS</span></a></em></span><span style="font-weight: 400;"> !</span>
</li>

<span style="font-weight: 400;">Personnellement, je fais une étude de risque rapide dont voici les détails. </span><span style="font-weight: 400;">Sur une classe donnée, pour chaque évolution que je peux imaginer (généralement entre 2 et 5), je calcule le coefficient suivant :</span>

**[probabilité de survenue] * [coût et difficulté à implémenter si la ségrégation n&rsquo;est pas faite aujourd&rsquo;hui]**

<span style="font-weight: 400;">Et je ne garde alors que les évolutions dont le coefficient est le plus grand.  </span>

<span style="font-weight: 400;">Ça, c&rsquo;est la théorie. En pratique, pour pouvoir espérer faire ça plus ou moins correctement, j&rsquo;ai besoin de 2 choses :</span>

<li style="font-weight: 400;">
  <span style="font-weight: 400;">la connaissance de l&rsquo;environnement fonctionnel et technique de l&rsquo;application, des contraintes et difficultés actuelles, bref une idée du futur de l&rsquo;application, fonctionnelle et technique ;</span>
</li>
<li style="font-weight: 400;">
  <span style="font-weight: 400;">mon expérience dans le contexte actuel (fonctionnel et technique).</span>
</li>

<img class="wp-image-1146 size-full aligncenter" src="http://sogilis.com/wp-content/uploads/2016/02/calcul-de-risque.png" alt="calcul de risque" width="647" height="192" srcset="http://sogilis.com/wp-content/uploads/2016/02/calcul-de-risque.png 647w, http://sogilis.com/wp-content/uploads/2016/02/calcul-de-risque-300x89.png 300w" sizes="(max-width: 647px) 100vw, 647px" />

<span style="font-weight: 400;">Si je trouve plusieurs raisons, je scinde la classe en autant de raisons.<br /> </span><span style="font-weight: 400;">Si j&rsquo;en trouve une seule, et si d&rsquo;autres classes sont aussi concernées par la même raison, alors je fusionne ces classes pour n&rsquo;en former qu&rsquo;une seule.</span>

<span style="font-weight: 400;">Ensuite, il y a des exceptions, notamment les cas suivants présentés par Robert :</span>

<li style="font-weight: 400;">
  <span style="font-weight: 400;">Les contraintes de l&rsquo;environnement empêchent d&rsquo;appliquer le SRP. Là, on devrait s&rsquo;en rendre compte facilement.</span>
</li>
<li style="font-weight: 400;">
  <span style="font-weight: 400;">L&rsquo;intérêt d&rsquo;isoler d&rsquo;un code. Là, c&rsquo;est plus ambigu.</span>
</li>

<span style="font-weight: 400;">On peut facilement voir que ce principe reste difficile à appliquer.</span>

&nbsp;

## **Pourquoi appliquer ce principe ?**

<span style="font-weight: 400;">Ce sont avant tout les prochaines évolutions qui bénéficieront de ce principe, </span>**si elles ont été anticipées**<span style="font-weight: 400;">. Le code concerné est alors :</span>

<li style="font-weight: 400;">
  <span style="font-weight: 400;">plus compréhensible car découpé responsabilité par responsabilité</span>
</li>
<li style="font-weight: 400;">
  <span style="font-weight: 400;">testable plus facilement, car moins de couplage</span>
</li>
<li style="font-weight: 400;">
  <span style="font-weight: 400;">plus robuste, car moins de couplage</span>
</li>
<li style="font-weight: 400;">
  <span style="font-weight: 400;">plus facile à étendre</span>
</li>

<span style="font-weight: 400;">Au-delà des prochaines évolutions, l&rsquo;application du SRP peut aussi aider à la compréhension du contexte fonctionnel et technique, notamment à destination des développeurs qui arrivent sur l&rsquo;application. En effet, cela rend plus lisible les futures évolutions attendues.</span>

&nbsp;

## **Limitations**

<span style="font-weight: 400;">En soit, ce principe semble plutôt sain. Le plus gros défaut que l&rsquo;on peut identifier est le côté anticipation qu&rsquo;il requiert :</span>

<li style="font-weight: 400;">
  <span style="font-weight: 400;">Les futures évolutions que l&rsquo;on identifie aujourd&rsquo;hui ne vont peut-être jamais se réaliser. On a alors perdu du temps à découper des responsabilités et rendue la maintenance plus difficile en compliquant l&rsquo;architecture.</span>
</li>
<li style="font-weight: 400;">
  <span style="font-weight: 400;">Il est plus que difficile d&rsquo;identifier toutes les évolutions futures possibles.</span>
</li>

&nbsp;

## **Conclusion**

<span style="font-weight: 400;">Nous avons vu dans cet article à quel point le principe de responsabilité unique est difficile à appliquer, notamment à cause de cette notion d’anticipation.<br /> </span><span style="font-weight: 400;">Mal appliqué, notamment en anticipant trop, il peut nous amener à perdre du temps sur la tâche en cours, mais aussi sur la maintenance du code :<br /> </span>_<span style="font-weight: 400;">An axis of change is only an axis of change if the changes actually occur. It is not wise to apply the SRP, or any other principle for that matter, if there is no symptom</span>_<span style="font-weight: 400;">.</span>

<span style="font-weight: 400;">Il ne faut pas oublier que ce n&rsquo;est qu&rsquo;un principe parmi d&rsquo;autres. Et cette séparation des responsabilités peut aussi être provoquée par l&rsquo;application d&rsquo;autres pratiques.</span>

&nbsp;

## **Pour aller plus loin**

<span style="font-weight: 400;">Voici d’autres méthodes ou pratiques, complémentaires ou non, qui donnent d’autres orientations pour découper le code :</span>

<li style="font-weight: 400;">
  <em><span style="text-decoration: underline;"><a href="http://c2.com/ppr/wiki/WikiPagesAboutRefactoring/ComposedMethod.html"><span style="font-weight: 400;">Composed Method</span></a></span></em>
</li>
<li style="font-weight: 400;">
  <span style="text-decoration: underline;"><em><a href="https://en.wikipedia.org/wiki/Domain-driven_design"><span style="font-weight: 400;">DDD</span></a></em></span>
</li>

_<span style="text-decoration: underline;"><a href="https://fr.linkedin.com/in/jean-baptiste-mille-0383b81/fr">Jean-Baptiste</a></span>_