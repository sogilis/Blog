---
title: Lecture d’un fichier Google Sheet en Ruby avec OAuth2
author: Tiphaine
date: 2015-03-24T12:54:22+00:00
featured_image: /wp-content/uploads/2015/03/Sogilis-Christophe-Levet-Photographe-7461.jpg
tumblr_sogilisblog_permalink:
  - http://sogilisblog.tumblr.com/post/114490622886/lecture-dun-fichier-google-sheet-en-ruby-avec
tumblr_sogilisblog_id:
  - 114490622886
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
  - 3092
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
  - google
  - google drive
  - google sheets
  - google spreadsheet
  - oauth2
  - ruby
  - service account
  - token

---
Pour un développeur, piloter des Google Docs depuis son application est une fonctionnalité relativement puissante. Les API Google permettent beaucoup de choses en ce sens. En revanche, ce n&rsquo;est pas toujours facile de s&rsquo;y retrouver dans les méandres des différentes technologies, API et documentations que l&rsquo;on peut trouver sur la toile. Suite aux difficultés que j&rsquo;ai pu rencontrer en cherchant une documentation claire, je vais essayer ici de synthétiser les différentes étapes permettant de réaliser une opération assez fondamentale : **lire le contenu d’un document Google Sheet en utilisant une connexion authentifiée avec OAuth 2 en mode server to server**.

<img class="aligncenter wp-image-2052 size-full" src="http://sogilis.com/wp-content/uploads/2015/03/Oauth2GoogleDocs.png" alt="Lecture d'un un fichier Google Sheet en Ruby (OAuth2) - Title" width="600" height="290" srcset="http://sogilis.com/wp-content/uploads/2015/03/Oauth2GoogleDocs.png 600w, http://sogilis.com/wp-content/uploads/2015/03/Oauth2GoogleDocs-300x145.png 300w" sizes="(max-width: 600px) 100vw, 600px" />

<!-- more -->

Pour les pressés, voici le code Ruby qui fait le boulot :

<pre class="wp-code-highlight prettyprint">require &#039;rubygems&#039;
require &#039;google/api_client&#039;
require &#039;google_drive&#039;

# Get following info from Service Account created at 
# &lt;a href="https://code.google.com/apis/console" target="_blank"&gt;https://code.google.com/apis/console&lt;/a&gt;
account_email = &#039;xxxxxx@developer.gserviceaccount.com&#039; 
key_file = &#039;private-key-for-xxxxxx.p12&#039; 
key_secret = &#039;notasecret&#039;

key = Google::APIClient::KeyUtils.load_from_pkcs12(key_file, key_secret)

client = Google::APIClient.new(
   :application_name =&gt; &#039;my_application_name&#039;,
   :application_version =&gt; &#039;0.0.1&#039;)

client.authorization = Signet::OAuth2::Client.new(   
   :token_credential_uri =&gt; &#039;https://accounts.google.com/o/oauth2/token&#039;,
   :audience =&gt; &#039;https://accounts.google.com/o/oauth2/token&#039;,
   # Following scope defines which services you will be authorized to access
   :scope =&gt; &#039;https://www.googleapis.com/auth/drive &#039;
           + &#039;https://spreadsheets.google.com/feeds/&#039;,
   :issuer =&gt; account_email,
   :signing_key =&gt; key)

# Request a token for this service account
client.authorization.fetch_access_token!
token = client.authorization.access_token
session = GoogleDrive.login_with_oauth(token)

# Read Spreadsheet
document_id = "xxxyyyzzz"   # Key attribute in Google drive url
ws = session.spreadsheet_by_key(document_id).worksheets[0]
puts ws[1,2] # Write content of cell A2
</pre>

Mais passons à la première étape : l’authentification.

* * *

## **Authentification avec OAuth**
  
<img class="size-full wp-image-2055 aligncenter" src="http://sogilis.com/wp-content/uploads/2015/03/Securirty-with-OAuth2.png" alt="Lecture d'un un fichier Google Sheet en Ruby - OAuth2" width="600" height="112" srcset="http://sogilis.com/wp-content/uploads/2015/03/Securirty-with-OAuth2.png 600w, http://sogilis.com/wp-content/uploads/2015/03/Securirty-with-OAuth2-300x56.png 300w" sizes="(max-width: 600px) 100vw, 600px" />

La première difficulté est de comprendre les mécanismes du protocole OAuth 2.0 utilisé par Google, Facebook… Pour schématiser –

beaucoup –, le principe consiste à **récupérer un jeton** (représenté par une chaîne de caractères) qui permettra ensuite d’interroger les services google **sous une certaine identité** pendant une durée définie.
  
De nombreux articles expliquent cette techno en détail, notamment celui-ci : « <span style="text-decoration: underline;"><a href="http://www.bubblecode.net/fr/2013/03/10/comprendre-oauth2/" target="_blank">Comprendre OAuth2</a></span> ».

A noter : Google propose aussi une authentification par OAuth 1.0, mais la déconseille, même si elle est encore largement utilisée.

Histoire de ne pas réinventer la roue, nous allons utiliser la gem ruby <span style="text-decoration: underline;"><a href="https://github.com/gimite/google-drive-ruby" target="_blank">gem google drive</a> </span>pour l&rsquo;authentification. Elle permet d’accéder aux documents Google Drive par la même occasion.
  
En revanche, l’exemple donné par cette gem passe par une étape où **l’utilisateur doit rentrer un code d’activation**.

En effet, il faut bien comprendre que le protocole OAuth 2.0 est principalement employé lorsqu’un utilisateur souhaite qu’**un site web tierce puisse utiliser son compte** pour accéder à ses données. Dans ce cas de figure, lorsque l’utilisateur réalise l’action concernée sur le site web A, une **page de connexion** s’affiche demandant login et mot de passe du site web B.
  
Ces informations permettront au site web A d’utiliser les services du site B **sous l’identité de l’utilisateur**.<figure>

<img class="aligncenter" src="http://66.media.tumblr.com/0fdd94bc61cdd22489b72e57b6e36d01/tumblr_inline_nl1mtk2rGO1totr0l.png" /></figure> 

Bien souvent, vous remarquerez qu’une liste de services est affichée sur cette page de login. Ces derniers correspondent au périmètre d’autorisation (cf. attribut «

scope » plus bas) du jeton renvoyé.

Tout ceci est bien joli, mais nous cherchons une authentification «

serveur à serveur », donc sans interaction de l’utilisateur, comme pendant l’exécution d’un batch par exemple.

Il n’y a pas 36 solutions, il faut utiliser un **compte de service**, et Google propose justement ce type de comptes (cf. <span style="text-decoration: underline;"><a href="https://developers.google.com/accounts/docs/OAuth2ServiceAccount" target="_blank">documentation google</a></span>).
  
Ces comptes, destinés à être utilisés uniquement par des services, correspondent à des traitements serveurs. Ils sont rattachés à de vrais comptes utilisateurs, sachant que chaque utilisateur peut en créer plusieurs.
  
Pour **en créer un**, il faut passer par la <span style="text-decoration: underline;"><a href="https://console.developers.google.com/" target="_blank">Google Developers Console</a></span> comme ceci :

  * _Créer projet_
  * Menu _API et authentification > API_
  * Activer _Drive API_ pour que notre compte de service puisse accéder aux services proposés par Google Drive
  * Menu _API et authentification > Identifiants_
  * _Créer un identifiant client_ pour OAuth
  * Choisir _Compte de Service_ : vous allez alors télécharger la **clé privée** (fichier .p12). Le **mot de passe** (notasecret) associé à cette clé sera alors affiché.
  * Notez ensuite l’_identification client_ et l’_adresse email_ du compte ainsi créé

Ensuite, il ne reste plus qu’à coder avec tous ces éléments :

  * <span style="text-decoration: underline;"><a href="https://github.com/gimite/google-drive-ruby" target="_blank">Installation de la gem (google drive)</a></span>

<pre class="wp-code-highlight prettyprint">sudo gem install google_drive
</pre>

  * Ajout des librairies qui vont bien

<pre class="wp-code-highlight prettyprint">require &#039;rubygems&#039;
require &#039;google/api_client&#039;
require &#039;google_drive&#039;
</pre>

  * Création de la clé d’activation avec le fichier .p12 et le mot de passe récupéré lors de la création du compte de service

<pre class="wp-code-highlight prettyprint">key_file = &#039;private-key-for-xxxxxx.p12&#039; 
key_password = &#039;notasecret&#039;
key = Google::APIClient::KeyUtils.load_from_pkcs12(key_file, key_password)</pre>

  * Authentification

<pre class="wp-code-highlight prettyprint">client = Google::APIClient.new(
    :application_name =&gt; &#039;my_application_name&#039;,
    :application_version =&gt; &#039;0.0.1&#039;)

client.authorization = Signet::OAuth2::Client.new(
   :token_credential_uri =&gt; &#039;https://accounts.google.com/o/oauth2/token&#039;,
   :audience =&gt; &#039;https://accounts.google.com/o/oauth2/token&#039;,
   # Following scope defines which services you will be authorized
   :scope =&gt; &#039;https://www.googleapis.com/auth/drive &#039;
           + &#039;https://spreadsheets.google.com/feeds/&#039;,
   :issuer =&gt; account_email,
   :signing_key =&gt; key)
</pre>

L’attribut « scope » contient les noms de domaine associés aux services Google auxquels on pourra accéder ensuite.
  
Vous pouvez trouver la liste des scopes avec l’<span style="text-decoration: underline;"><a href="https://developers.google.com/oauthplayground/" target="_blank">OAuth 2.0 Playground</a></span>.
  
Les autres attributs sont des valeurs fixes fournies par Google.

  * Récupération du jeton

<pre class="wp-code-highlight prettyprint">client.authorization.fetch_access_token!
token = client.authorization.access_token
</pre>

  * Connexion avec ce jeton

<pre class="wp-code-highlight prettyprint">session = GoogleDrive.login_with_oauth(token)
</pre>

Il est temps de passer à la seconde étape, la juridiction.

* * *

## **Gestion des autorisations**<figure>

<img class="aligncenter" src="http://66.media.tumblr.com/554141290c7b7613945641b9f490a5d8/tumblr_inline_nl01x4nlU11totr0l.png" /></figure> 

Pour que notre compte de service puisse accéder à un fichier Google, il faut lui **donner accès**.
  
Cette autorisation se fait de la même manière qu’avec n’importe quel autre utilisateur : action _Partage_.
  
Par contre, il faut utiliser l’**adresse email associée au compte** : celle qu’on a noté lors de la création du compte de service.

Troisième étape : lecture du contenu.

* * *

## **Lecture de fichier Google Sheet**<figure>

<img class="size-full wp-image-2056 aligncenter" src="http://sogilis.com/wp-content/uploads/2015/03/Google-Spreadsheet-Ruby.png" alt="Lecture d'un un fichier Google Sheet en Ruby - Google Spreadsheet + Ruby" width="600" height="153" srcset="http://sogilis.com/wp-content/uploads/2015/03/Google-Spreadsheet-Ruby.png 600w, http://sogilis.com/wp-content/uploads/2015/03/Google-Spreadsheet-Ruby-300x77.png 300w" sizes="(max-width: 600px) 100vw, 600px" /></figure> 

Enfin, pour lire un document, on peut vouloir le faire à partir de l’**identifiant** du document.
  
On peut trouver cet identifiant dans l’url lorsqu’on édite le document dans son navigateur. Il correspond à l’attribut _key_.
  
[Prenons par exemple l’url suivante.][1]

&nbsp;

Dans ce cas, l’identifiant est :
  
_0Ag7vwNTdThiNdDNNecDYclUsMzZ1R0JpbXdUaERMUVE_

Grâce à la <span style="text-decoration: underline;"><a href="https://github.com/gimite/google-drive-ruby" target="_blank">gem google drive</a></span>, nous pouvons lire le contenu de la Google Sheet relativement facilement :

<pre class="wp-code-highlight prettyprint">document_id = "0Ag7vwNTdThiNdDNNecDYclUsMzZ1R0JpbXdUaERMUVE"
ws = session.spreadsheet_by_key(document_id).worksheets[0]
puts ws[1,2]
</pre>

Ici, on va lire la cellule sur la 1ère ligne, 2ème colonne de la première page.

Il est aussi possible de modifier le document,

<pre class="wp-code-highlight prettyprint">ws[1, 2] = “new value”
ws.save</pre>

de récupérer le nombre de colonnes ou de lignes,

<pre class="wp-code-highlight prettyprint">nbRows = ws.num_rows
nbColumns = ws.num_cols
</pre>

ou encore de rafraichir le document pour récupérer les modifications effectuées par d’autres utilisateurs :

<pre class="wp-code-highlight prettyprint">ws.reload</pre>

## 

## **Conclusion**

Avec ce petit exemple, on a maintenant toutes les bases pour piloter des Google Sheets, mais pas seulement.
  
On peut aller explorer l’API Google et essayer de piloter d’autres services comme Google Drive, Calendar… le tout en Ruby.
  
De même, l&rsquo;authentification avec un compte Google standard est identique.

 [1]: https://docs.google.com/a/sogilis.com/spreadsheet/ccc?key=0Ag7vwNTdThiNdDNNecDYclUsMzZ1R0JpbXdUaERMUVE&usp=sharing#gid=0