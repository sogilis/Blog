---
title: Lecture d’un fichier Google Sheet en Ruby avec OAuth2
author: Sogilis
date: 2015-03-24T12:54:22+00:00
image: /img/2015/03/Sogilis-Christophe-Levet-Photographe-7461.jpg
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
Pour un développeur, piloter des Google Docs depuis son application est une fonctionnalité relativement puissante. Les API Google permettent beaucoup de choses en ce sens. En revanche, ce n'est pas toujours facile de s'y retrouver dans les méandres des différentes technologies, API et documentations que l'on peut trouver sur la toile. Suite aux difficultés que j'ai pu rencontrer en cherchant une documentation claire, je vais essayer ici de synthétiser les différentes étapes permettant de réaliser une opération assez fondamentale : **lire le contenu d’un document Google Sheet en utilisant une connexion authentifiée avec OAuth 2 en mode server to server**.

!(Lecture d'un un fichier Google Sheet en Ruby[/img/2015/03/Oauth2GoogleDocs.png]

Pour les pressés, voici le code Ruby qui fait le boulot :

{{< highlight ruby >}}
require 'rubygems'
require 'google/api_client'
require 'google_drive'

# Get following info from Service Account created at
# [https://code.google.com/apis/console](https://code.google.com/apis/console)
account_email = 'xxxxxx@developer.gserviceaccount.com'
key_file = 'private-key-for-xxxxxx.p12'
key_secret = 'notasecret'

key = Google::APIClient::KeyUtils.load_from_pkcs12(key_file, key_secret)

client = Google::APIClient.new(
   :application_name => 'my_application_name',
   :application_version => '0.0.1')

client.authorization = Signet::OAuth2::Client.new(
   :token_credential_uri => 'https://accounts.google.com/o/oauth2/token',
   :audience => 'https://accounts.google.com/o/oauth2/token',
   # Following scope defines which services you will be authorized to access
   :scope => 'https://www.googleapis.com/auth/drive '
           + 'https://spreadsheets.google.com/feeds/',
   :issuer => account_email,
   :signing_key => key)

# Request a token for this service account
client.authorization.fetch_access_token!
token = client.authorization.access_token
session = GoogleDrive.login_with_oauth(token)

# Read Spreadsheet
document_id = "xxxyyyzzz"   # Key attribute in Google drive url
ws = session.spreadsheet_by_key(document_id).worksheets[0]
puts ws[1,2] # Write content of cell A2
{{< /highlight >}}

Mais passons à la première étape : l’authentification.

## Authentification avec OAuth

![Lecture d'un un fichier Google Sheet en Ruby - OAuth2](/img/2015/03/Securirty-with-OAuth2.png)

La première difficulté est de comprendre les mécanismes du protocole OAuth 2.0 utilisé par Google, Facebook… Pour schématiser – beaucoup –, le principe consiste à **récupérer un jeton** (représenté par une chaîne de caractères) qui permettra ensuite d’interroger les services google **sous une certaine identité** pendant une durée définie.

De nombreux articles expliquent cette techno en détail, notamment celui-ci : « [Comprendre OAuth2](http://www.bubblecode.net/fr/2013/03/10/comprendre-oauth2/) ».

A noter : Google propose aussi une authentification par OAuth 1.0, mais la déconseille, même si elle est encore largement utilisée.

Histoire de ne pas réinventer la roue, nous allons utiliser la gem ruby [gem google drive](https://github.com/gimite/google-drive-ruby) pour l'authentification. Elle permet d’accéder aux documents Google Drive par la même occasion.

En revanche, l’exemple donné par cette gem passe par une étape où **l’utilisateur doit rentrer un code d’activation**.

En effet, il faut bien comprendre que le protocole OAuth 2.0 est principalement employé lorsqu’un utilisateur souhaite qu’**un site web tierce puisse utiliser son compte** pour accéder à ses données. Dans ce cas de figure, lorsque l’utilisateur réalise l’action concernée sur le site web A, une **page de connexion** s’affiche demandant login et mot de passe du site web B.

Ces informations permettront au site web A d’utiliser les services du site B **sous l’identité de l’utilisateur**.

![](https://66.media.tumblr.com/0fdd94bc61cdd22489b72e57b6e36d01/tumblr_inline_nl1mtk2rGO1totr0l.png)

Bien souvent, vous remarquerez qu’une liste de services est affichée sur cette page de login. Ces derniers correspondent au périmètre d’autorisation (cf. attribut « scope » plus bas) du jeton renvoyé.

Tout ceci est bien joli, mais nous cherchons une authentification « serveur à serveur », donc sans interaction de l’utilisateur, comme pendant l’exécution d’un batch par exemple.

Il n’y a pas 36 solutions, il faut utiliser un **compte de service**, et Google propose justement ce type de comptes [cf. (documentation google](https://developers.google.com/accounts/docs/OAuth2ServiceAccount)).

Ces comptes, destinés à être utilisés uniquement par des services, correspondent à des traitements serveurs. Ils sont rattachés à de vrais comptes utilisateurs, sachant que chaque utilisateur peut en créer plusieurs.

Pour **en créer un**, il faut passer par la [Google Developers Console](https://console.developers.google.com/) comme ceci :

* _Créer projet_
* Menu _API et authentification > API_
* Activer _Drive API_ pour que notre compte de service puisse accéder aux services proposés par Google Drive
* Menu _API et authentification > Identifiants_
* _Créer un identifiant client_ pour OAuth
* Choisir _Compte de Service_ : vous allez alors télécharger la **clé privée** (fichier .p12). Le **mot de passe** (notasecret) associé à cette clé sera alors affiché.
* Notez ensuite l’_identification client_ et l’_adresse email_ du compte ainsi créé

Ensuite, il ne reste plus qu’à coder avec tous ces éléments :

* [Installation de la gem - google drive](https://github.com/gimite/google-drive-ruby)
  {{< highlight bash >}}
  sudo gem install google_drive
  {{< /highlight >}}

* Ajout des librairies qui vont bien
  {{< highlight ruby >}}
  require 'rubygems'
  require 'google/api_client'
  require 'google_drive'
  {{< /highlight >}}

* Création de la clé d’activation avec le fichier .p12 et le mot de passe récupéré lors de la création du compte de service
  {{< highlight ruby >}}
  key_file = 'private-key-for-xxxxxx.p12'
  key_password = 'notasecret'
  key = Google::APIClient::KeyUtils.load_from_pkcs12(key_file, key_password)
  {{< /highlight >}}

* Authentification
  {{< highlight ruby >}}
  client = Google::APIClient.new(
      :application_name => 'my_application_name',
      :application_version => '0.0.1')

  client.authorization = Signet::OAuth2::Client.new(
    :token_credential_uri => 'https://accounts.google.com/o/oauth2/token',
    :audience => 'https://accounts.google.com/o/oauth2/token',
    # Following scope defines which services you will be authorized
    :scope => 'https://www.googleapis.com/auth/drive '
            + 'https://spreadsheets.google.com/feeds/',
    :issuer => account_email,
    :signing_key => key)
  {{< /highlight >}}

L’attribut « scope » contient les noms de domaine associés aux services Google auxquels on pourra accéder ensuite.

Vous pouvez trouver la liste des scopes avec l’[OAuth 2.0 Playground](https://developers.google.com/oauthplayground/).

Les autres attributs sont des valeurs fixes fournies par Google.

* Récupération du jeton
  {{< highlight ruby >}}
  client.authorization.fetch_access_token!
  token = client.authorization.access_token
  {{< /highlight >}}

* Connexion avec ce jeton
  {{< highlight ruby >}}
  session = GoogleDrive.login_with_oauth(token)
  {{< /highlight >}}

Il est temps de passer à la seconde étape, la juridiction.

## Gestion des autorisations

![](https://66.media.tumblr.com/554141290c7b7613945641b9f490a5d8/tumblr_inline_nl01x4nlU11totr0l.png)

Pour que notre compte de service puisse accéder à un fichier Google, il faut lui **donner accès**.

Cette autorisation se fait de la même manière qu’avec n’importe quel autre utilisateur : action _Partage_.

Par contre, il faut utiliser l’**adresse email associée au compte** : celle qu’on a noté lors de la création du compte de service.

Troisième étape : lecture du contenu.

## Lecture de fichier Google Sheet

![Lecture d'un un fichier Google Sheet en Ruby - Google Spreadsheet + Ruby](/img/2015/03/Google-Spreadsheet-Ruby.png)

Enfin, pour lire un document, on peut vouloir le faire à partir de l’**identifiant** du document.

On peut trouver cet identifiant dans l’url lorsqu’on édite le document dans son navigateur. Il correspond à l’attribut _key_.

[Prenons par exemple l’url suivante.][1]

Dans ce cas, l’identifiant est :

_0Ag7vwNTdThiNdDNNecDYclUsMzZ1R0JpbXdUaERMUVE_

Grâce à la [gem google drive](https://github.com/gimite/google-drive-ruby), nous pouvons lire le contenu de la Google Sheet relativement facilement :

{{< highlight ruby >}}
document_id = "0Ag7vwNTdThiNdDNNecDYclUsMzZ1R0JpbXdUaERMUVE"
ws = session.spreadsheet_by_key(document_id).worksheets[0]
puts ws[1,2]
{{< /highlight >}}

Ici, on va lire la cellule sur la 1ère ligne, 2ème colonne de la première page.

Il est aussi possible de modifier le document,

{{< highlight ruby >}}
ws[1, 2] = “new value”
ws.save
{{< /highlight >}}

de récupérer le nombre de colonnes ou de lignes,

{{< highlight ruby >}}
nbRows = ws.num_rows
nbColumns = ws.num_cols
{{< /highlight >}}

ou encore de rafraichir le document pour récupérer les modifications effectuées par d’autres utilisateurs :

{{< highlight ruby >}}
ws.reload
{{< /highlight >}}

## Conclusion

Avec ce petit exemple, on a maintenant toutes les bases pour piloter des Google Sheets, mais pas seulement.

On peut aller explorer l’API Google et essayer de piloter d’autres services comme Google Drive, Calendar… le tout en Ruby.

De même, l'authentification avec un compte Google standard est identique.

[1]: https://docs.google.com/a/sogilis.com/spreadsheet/ccc?key=0Ag7vwNTdThiNdDNNecDYclUsMzZ1R0JpbXdUaERMUVE&usp=sharing#gid=0
