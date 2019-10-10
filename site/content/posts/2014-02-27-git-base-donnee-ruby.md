---
title: Et si vous regardiez Git comme une base de donnée ? – Version Ruby
author: Tiphaine
date: 2014-02-27T12:26:00+00:00
featured_image: /wp-content/uploads/2015/03/Sogilis-Christophe-Levet-Photographe-7461.jpg
tumblr_sogilisblog_permalink:
  - http://sogilisblog.tumblr.com/post/78001899169/et-si-vous-regardiez-git-comme-une-base-de-donnée
tumblr_sogilisblog_id:
  - 78001899169
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
  - 2070
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
  - git
  - ruby
  - sogiday

---
<p style="text-align: left;">
  <strong><span style="text-decoration: underline;"><a href="http://sogilis.com/blog/git-base-donnee-entrailles/" target="_blank">La première partie consacrée</a></span> à <span style="text-decoration: underline;"><a title="Git" href="http://git-scm.org" target="_blank">Git</a></span> vous a montré brièvement le stockage interne et surtout comment écrire une donnée, la lier à une clé et récupérer le contenu derrière cette clé. Pour cette deuxième partie, nous allons réaliser la même chose mais en utilisant un vrai langage de programmation, Ruby.</strong>
</p>

<img class="aligncenter" src="http://replygif.net/i/877.gif" alt="" />

<!-- more -->

&nbsp;

## **Contexte**

Le but étant d&rsquo;étudier git et de l&rsquo;utiliser autrement qu&rsquo;à l&rsquo;habitude. Par contre, histoire de ne pas travailler dans le vent, il fallait bien développer un petit quelque chose. Nous sommes donc partis sur un grand classique des tutos web : la _todo list_ !

La base était donc une simple application web, basée sur <span style="text-decoration: underline;"><a href="http://www.sinatrarb.com/" target="_blank">Sinatra</a></span>, avec quelques petites actions basiques :

  * lire l&rsquo;ensemble des todos enregistrés
  * ajouter un nouveau todo
  * marquer un todo comme fait
  * supprimer un todo

Le code de base provient d&rsquo;un petit tuto sinatra disponible <span style="text-decoration: underline;"><a href="http://www.creativebloq.com/web-design/get-started-sinatra-9134565" target="_blank">ici</a></span>. Assez peu de différences à part le choix de la techno pour le rendu de l&rsquo;html par l&rsquo;utilisation de <span style="text-decoration: underline;"><a href="http://haml.info/" target="_blank">haml</a></span> à la place de <span style="text-decoration: underline;"><a href="http://ruby-doc.org/stdlib-2.1.0/libdoc/erb/rdoc/ERB.html" target="_blank">erb</a></span>.

Je ne vais pas plus rentrer dans le sujet, l&rsquo;application est vraiment simple et ce n&rsquo;est pas l&rsquo;objectif de cet article.

&nbsp;

## **Et si on sortait un peu de notre coquillage ?**

Tout ce qu&rsquo;on a vu pour le moment c&rsquo;est comment utiliser des couches basses de git depuis notre `shell`. C&rsquo;est cool mais si le but était de ne pas trop se prendre la tête avec les fichiers c&rsquo;est pas encore gagné.

Heureusement, on peut faire la même chose directement depuis du code source, sans utiliser git à la main et s&rsquo;amuser à parser les commandes, leur retour, etc. Un peu plus fiable tout de même…

Pour ce faire, le point d&rsquo;entré est <span style="text-decoration: underline;"><a href="http://libgit2.github.com/" target="_blank">libgit2</a></span>. Il s&rsquo;agit d&rsquo;une implémentation en `c` du cœur de git. C&rsquo;est totalement portable, ça ne dépend de rien d&rsquo;autre (donc ça ne dépend pas de git surtout). C&rsquo;est utilisé en prod par pas mal de monde aussi.

Et surtout : il y a des bindings pour de très nombreux langages ! Et oui, on va pas coder en `c`, faut pas déconner quand même.

En particulier, il existe <span style="text-decoration: underline;"><a href="https://github.com/libgit2/rugged" target="_blank">rugged</a></span>, un binding de libgit2 en ruby. Et c&rsquo;est celui que nous allons utiliser.

Voici donc la _traduction_ de toutes ces commandes en ruby afin de les inclures dans notre superbe, notre magnifique, notre exceptionnelle application sinatra de TodoList !

&nbsp;

## **Et voici la version raboteuse !**

Pour l&rsquo;installation, comme vous utilisez <span style="text-decoration: underline;"><a href="http://rubygems.org/" target="_blank">gem</a></span> et <span style="text-decoration: underline;"><a href="http://bundler.io/" target="_blank">bundler</a></span> (what else?) c&rsquo;est super simple. Ajoutez

<pre class="wp-code-highlight prettyprint">gem &#039;rugged&#039;
</pre>

dans votre `Gemfile` et installez le via `bundle install`.

Après un petit `require 'rugged'` vous pouvez enfin utiliser `rugged`.

Tout d&rsquo;abord, il vous faut accéder à votre répository git.

Pour le créer :

<pre class="wp-code-highlight prettyprint">repo = Rugged::Repository.init_at(&#039;my_repo.git&#039;, :bare)
</pre>

ou pour y accéder s&rsquo;il existe déjà :

<pre class="wp-code-highlight prettyprint">repo = Rugged::Repository.new(&#039;my_repo.git&#039;)
</pre>

> Oui, on utilise un dépôt _bare_, pas besoin d&rsquo;avoir une copie de travail.

La première vrai étape consiste donc à donner à git des données pour qu&rsquo;il en crée un `blob`. Rien de plus simple :

<pre class="wp-code-highlight prettyprint">blob_oid = repo.write &#039;{"hello":"world!"}&#039;
</pre>

> Une solution sympa plutôt que de gérer le `hello world!` en chaîne de caractères est, par exemple, de passer par <span style="text-decoration: underline;"><a href="http://www.yaml.org/" target="_blank">yaml</a></span> :
> 
> <pre class="wp-code-highlight prettyprint">require &#039;YAML&#039;

hello = {"hello": "world!"}

blob_oid = repo.write hello.to_yaml
</pre>
> 
> L&rsquo;avantage est que c&rsquo;est dispo en standard en ruby, que la sortie est claire et lisible, qu&rsquo;on peut facilement mapper des `struct` ruby et que c&rsquo;est un format qui semble plutôt aisé à fusionner si besoin.

La deuxième étape consiste à créer le `tree` correspondant. Pour ce faire nous allons avoir besoin d&rsquo;un `index` qui va pouvoir faire le lien entre le blob et le chemin (la clé) que nous souhaitons.

<pre class="wp-code-highlight prettyprint">index = Rugged::Index.new
index.add(:path =&gt; &#039;1.json&#039;, :oid =&gt; blob_oid, :mode =&gt; 0100644)
tree_oid = index.write_tree(repo)
</pre>

Enfin, il faut créer un commit et mettre à jour la référence (master) avec ce `tree`. Pour ce faire nous avons besoin de quelques informations supplémentaires par rapport à la version shell. En fait c&rsquo;est pas que ce soit nouvelles informations, juste que git est allé cherché comme un grand ce dont il avait besoin dans sa configuration.

<pre class="wp-code-highlight prettyprint">options = {}
options[:tree] = tree_oid # l&#039;arbre que nous souhaitons committer
options[:author] = {:email =&gt; &#039;…@…&#039;, :name =&gt; &#039;sogilis&#039;, :time =&gt; Time.now}
options[:committer] = {:email =&gt; &#039;…@…&#039;, :name =&gt; &#039;sogilis&#039;, :time =&gt; Time.now}
options[:message] = &#039;add 1&#039;
# le parent de notre commit est vide si c&#039;est le premier, sinon c&#039;est head
options[:parents] = repo.empty? ? [] : [repo.head.target]
# on demande l&#039;update de la ref ici, pas besoin d&#039;une nouvelle commande
options[:update_ref] = &#039;HEAD&#039;

Rugged::Commit.create(repo, options)
</pre>

Et voilà ! La même chose, en ruby !

&nbsp;

## **Un dex**

Bon, ce que vous ne voyez pas ici c&rsquo;est que la gestion de l&rsquo;index est par contre assez lourde. En effet, si vous désirez faire un deuxième commit qui rajoute une entrée sur un autre chemin… il vous faudra préalablement rajouter le premier à l&rsquo;index. En clair il faut que l&rsquo;index contienne tous les fichiers correspondant à la copie de travail courante. Si une entrée n&rsquo;existe pas, elle sera alors simplement supprimée.

Voici une version _naïve_ permettant de s&rsquo;en affranchir, qui va créer un index en y ajoutant toutes les ressources voulues :

<pre class="wp-code-highlight prettyprint">index = Rugged::Index.new
unless repo.empty?
  tree = repo.lookup(repo.head.target).tree
  tree.walk_blobs(:postorder) do |root, entry|
    index.add(:path =&gt; "#{root}#{entry[:name]}",
              :oid =&gt; entry[:oid], :mode =&gt; 0100644)
  end
end
</pre>

En gros ce qui se passe :

  * récupération d&rsquo;un nouvel index
  * si le dépôt est vide, on ne fait rien, évidemment
  * on récupère le hash du commit pointé par head (`repo.head.target`)
  * et on accède à l&rsquo;arbre (`repo.lookup(hash).tree`)
  * on parcourt alors l&rsquo;arbre à la recherche des `blobs` et on les ajoute à l&rsquo;index

`walk_blobs` permet de trouver uniquement les `blobs`, il est possible de parcourir un arbre pour passer uniquement sur les autres arbres ou alors de tout parcourir sans distinction.

Maintenant que vous avez compris le principe, on peut tout de même faire ça plus simplement :

<pre class="wp-code-highlight prettyprint">index = Rugged::Index.new
unless repo.empty?
  tree = repo.lookup(repo.head.target).tree
  index.read_tree(tree)
end
</pre>

`read_tree` s&rsquo;occupe justement pour nous de lire tous les blobs correspondant à un arbre et les ajoute à l&rsquo;index.

&nbsp;

## **Et si on lisait ?**

Petit aparté sur l&rsquo;index terminé (enfin presque…), il est maintenant intéressant de lire une donnée basée sur sa clé.

Nous allons donc parcourir l&rsquo;arbre relié à `head` à la recherche de la clé.

Une première version est d&rsquo;utiliser ce qu&rsquo;on vient de faire avec l&rsquo;index :

<pre class="wp-code-highlight prettyprint">def show repo, key
  return nil if repo.empty?
  tree = repo.lookup(repo.head.target).tree
  tree.walk_blobs(:postorder) do |root, entry|
    if "#{root}#{entry[:name]}" == key
      oid = entry[:oid]
      return repo.read(oid).data
    end
  end
  nil
end
</pre>

Ainsi `show(repo, '1.json')` retournera `'{"hello":"world!"}'` (si vous l&rsquo;avez stocké en json). Et si vous avez fait du YAML, vous pourrez accéder à l&rsquo;objet en faisant un `YAML.load(show(repo, '1.json'))`.

Une autre solution est d&rsquo;accéder directement à l&rsquo;objet sous le `tree` :

<pre class="wp-code-highlight prettyprint">def show repo, key
  return nil if repo.empty?
  tree = repo.lookup(repo.head.target).tree
  oid = tree[key][:oid]
  repo.read(oid).data
end
</pre>

Un peu plus simple, non ? Sauf que ce n&rsquo;est pas suffisant. Cela marche très bien dans ce cas, mais la réalité est un poil plus complexe. Ceci ne fonctionne que si vous êtes dans le cas d&rsquo;une clé posée à la racine. Si vous utilisez des clés “hiérarchiques” (comme des fichiers placés dans un répertoire) alors vous aurez une structure légèrement différente.

Souvenez-vous de la structure présentée dans le premier article :

![Structure git hiérarchie][1]

L&rsquo;arbre pointé par le commit va vous permettre d&rsquo;accéder au répertoire. Il faudra ensuite recommencer le travail sur l&rsquo;arbre correspondant au répertoire pour trouver le fichier.

En plus clair, si votre clé est `items/1.json` cela ressemblera à :

<pre class="wp-code-highlight prettyprint">tree = repo.lookup(repo.head.target).tree
items_oid = tree["items"][:oid]
items_tree = repo.lookup(items_oid)
oid = items_tree["1.json"][:oid]
repo.read(oid).data
</pre>

Et évidemment il faudra faire ça de manière récursive si nécessaire.

Voici donc une solution permettant d&rsquo;accéder à vos données de manière un peu plus sympa :

<pre class="wp-code-highlight prettyprint">def show repo, key
  return nil if repo.empty?
  tree = repo.lookup(repo.head.target).tree
  paths = path.split(&#039;/&#039;)
  oid = get_oid repo, tree, paths
  repo.read(oid).data
end

def get_oid repo, tree, paths
  key = paths.shift
  return nil if tree[key].nil?
  oid = tree[key][:oid]
  return oid if paths.empty?
  return nil if tree[key][:type] != :tree
  get_oid repo, repo.lookup(oid), paths
end
</pre>

Evidemment votre `show(repo, '1.json')` fonctionnera toujours pareil.

Cette méthode est un peu plus explicite que celle utilisant `walk_tree` mais surtout elle permet de ne pas parcourir potentiellement toutes les branches afin de trouver le contenu de la bonne clé.

Il existe encore une autre solution pour récupérer les données liées à chemin : l&rsquo;index.

Une fois l&rsquo;index relu via `index.read_tree(tree)` vous pouvez accéder à n&rsquo;importe quel fichier facilement :

<pre class="wp-code-highlight prettyprint">def show repo, path
  return nil if repo.empty?
  tree = repo.lookup(repo.head.target).tree
  index = Rugged::Index.new
  index.read_tree(tree)
  oid = index[path][:oid]
  repo.read(oid).data
end
</pre>

A vous de choisir celle qui vous semble la plus intéressante 🙂

&nbsp;

## **Résultat**

On a donc vu comment écrire et lire des données dans git sous forme de couple clé/valeur.

Vous conviendrez que la lecture (surtout) est pas génialissime, un peu lourde. Il manque une petite couche d&rsquo;abstraction au dessus de `rugged` pour accéder aux items facilement.

Néanmoins cela fonctionne !

&nbsp;

## **Extra**

Si on veut aller plus loin, on peut commencer par naviguer dans l&rsquo;historique.

Par exemple, au lieu d&rsquo;utiliser `repo.head.target` comme révision de base, il _suffit_ de prendre la révision d&rsquo;un parent de ce commit et ensuite de cherche le/les objets souhaités.

Par exemple, si on souhaite trouver le contenu de `1.json` à l&rsquo;avant dernière révision, on peut le réaliser de la sorte :

<pre class="wp-code-highlight prettyprint"># arbre du commit de head
tree = repo.lookup(repo.head.target).tree
# récupération de la révision parente
hash = tree.parents.first
# tree du commit
prev = repo.lookup(hash)
# on récupère alors l&#039;oid
oid = prev[&#039;1.json&#039;][:oid]
</pre>

On vient alors de naviguer dans l&rsquo;historique afin de récupérer les données telles qu&rsquo;elles étaient présentes dans le passé.

&nbsp;

## **Gungnir**

Vous pouvez trouver le code de l&rsquo;application de TodoList avec stockage dans git sur notre github, dans le projet <span style="text-decoration: underline;"><a href="https://github.com/sogilis/gungnir" target="_blank">gungnir</a></span>.

Pour le tester, rien de plus simple :

<pre class="wp-code-highlight prettyprint">bundle install
bundle exec rackup
</pre>

et rendez-vous sur `http://localhost:9292`. Vous pouvez alors ajouter des items, les marquer comme fait et les supprimer. Et aussi naviguer dans les différentes versions existantes !

Et pour une petite démo en live rendez-vous sur <span style="text-decoration: underline;"><a href="http://gungnir.herokuapp.com/" target="_blank">gungnir.herokuapp.com/</a></span>

&nbsp;

## **Conclusion**

Ainsi s&rsquo;achève notre petite découverte de git comme moteur de stockage.

<img class="aligncenter" src="http://replygif.net/i/113.gif" alt="" />

Il y a encore beaucoup de choses à découvrir comme par exemple les possibilités d&rsquo;utilisation concurrente, les branches, les hooks, etc. Bien que l&rsquo;accès ne soit pas des plus simples, pouvoir profiter du moteur de git peut être vraiment intéressant.

Ha oui, un dernier rappel sur git avant de se quitter. Sogilis dispense toujours des <a href="http://sogilis.com/formations/" target="_blank">formations Git</a> !

&nbsp;

## **Ressources**

  * <span style="text-decoration: underline;"><a href="http://opensoul.org/2011/09/01/git-the-nosql-database/" target="_blank">Git: the NoSQL database</a></span> par Brandon Keepers
  * <span style="text-decoration: underline;"><a href="http://vimeo.com/44458223" target="_blank">Vidéo Git: the NoSQL database</a></span> par Brandon Keepers
  * <span style="text-decoration: underline;"><a title="Pro Git - Chapter 9 : Git Internals" href="http://git-scm.com/book/en/Git-Internals" target="_blank">Git Internals : Chapitre 9 de Pro Git</a></span>
  * <span style="text-decoration: underline;"><a href="https://github.com/libgit2/rugged" target="_blank">rugged</a></span>

**Yves**

 [1]: http://66.media.tumblr.com/7f18ea0122e2eaa803e1777183244874/tumblr_inline_n0vyhn1Kpy1sv6muh.png