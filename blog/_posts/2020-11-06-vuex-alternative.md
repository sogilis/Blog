---
title: Un état centralisé, oui, mais sans Vuex !
author: Alban et Jean-Baptiste
date: 2020-11-06
image: /img/2020-08-31-vuex-alternative/title.jpeg
altimage: 'Vuex article illustration with a big X capital letter'
category: Développement logiciel
tags:
  - Js
  - VueJs
---

Lorsque l'on a besoin de **partagser un état entre plusieurs composants** [VueJS](https://vuejs.org) quelque soit leur lien de parenté, [VueX](https://vuex.vuejs.org) est très souvent utilisé.
Pourtant, on peut se poser la question de son intérêt dans le monde Vue.
En effet, nous allons voir ici comment adresser le même problème, mais **à la main**, **en plus simple**, y compris sur une vraie application qui part en production !

## Comment est-ce possible ??!

C'est tout bête, il suffit de **profiter du mécanisme de réactivité de Vue** pour partagser la même source de vérité entre composants, comme décrit dans la documentation [VueJS](https://fr.vuejs.org/v2/guide/state-management.html#Gestion-d’etat-simple-a-partir-de-rien).
Pour illustrer notre propos, nous vous proposons l'exemple ci-dessous, un site e-commerce de jeux de plateaux : <https://github.com/sogilis/Blog-vuex_alternative/tree/master>.

![app_screenshot](/img/2020-08-31-vuex-alternative/app_screenshot.jpeg)

## Qu'est-ce que ça donne ?

Il est possible **dans notre exemple** d'organiser les choses de la façon suivante :

- **Découper au niveau fonctionnel** l'état global que l'on souhaite partagser. Exemple : ce qui concerne les articles, les commandes, les consommateurs, les livraisons…
- **Exposer des fonctions "utilitaires"** (sans notion métier) permettant l'accès et la modification de ces états. Cette partie n'est pas à négliger puisque le fonctionnement de Vue impose un certain [boilerplate](https://en.wikipedia.org/wiki/Boilerplate_code) lors de la mutation de l'état (cf [documentation](https://fr.vuejs.org/v2/guide/reactivity.html#Limitations-de-la-detection-de-changement)). Note : ces objets représentant généralement des collections d'éléments, on voit alors apparaître quelque chose qui ressemble beaucoup au pattern [Repository](https://martinfowler.com/eaaCatalog/repository.html).
- Enfin, les composants Vue n'ont plus qu'à **utiliser directement ces différent objects**.

Voilà ce que cela peut donner en terme de découpage :

```
# components/
	* Alert.vue
	* Inventory.vue
	* Product.vue
	* …
# repositories/
	* inventory.js
	* shoppingCart.js
	* …
```

Avec un `repository` [`inventory`](https://github.com/sogilis/Blog-vuex_alternative/blob/master/src/repositories/inventory.js) qui ressemble à ceci :

```javascript
import api from '@/api';

export default {
  state: {
    products: [],
  },
  add(product) {
    this.state.products.push(product);
  },
  async fetchProducts() {
    const newProducts = await api.fetchProducts();
    this.state.products = [];
    newProducts.forEach((product) => this.add(product));
  },
  get productsCount() {
    return this.state.products.length;
  },
};
```

Et voici le composant [`<Inventory>`](https://github.com/sogilis/Blog-vuex_alternative/blob/master/src/components/Inventory.vue):

```javascript
import Product from './Product';
import Alert from '@/components/Alert';
import Inventory from '@/repositories/inventory';

export default {
  name: 'Inventory',
  components: { Product, Alert },
  data() {
    return {
      inventory: Inventory.state,
      isLoading: true,
    };
  },
  computed: {
    productsCount() {
      return Inventory.productsCount;
    },
  },
  async mounted() {
    try {
      this.isLoading = true;
      await Inventory.fetchProducts();
    } finally {
      this.isLoading = false;
    }
  },
};
```

Note : l'état doit être exposé aux composants Vue afin que ceux-ci puissent observer les changements et se mettre à jour le cas échéant. C'est une contrainte de cette solution, qu'il est facile de contourner en automatisant le processus pour tous les composants avec l'utilisation d'un [mixin](https://vuejs.org/v2/guide/mixins.html#Option-Merging) dans un plugin Vue :

```javascript
import Products from '@/repositories/products';

Vue.use({
  install: function (Vue) {
    Vue.mixin({
      data: function () {
        return { products: Products.state };
      },
    });
  },
});
```

## Pourquoi se passer de VueX ?

### 1. Pas besoin de librairie

C'est toujours ça de pris, d'autant plus qu'il ne faut quasiment **aucune ligne de code supplémentaire pour remplacer VueX** !

### 2. Simplification de l'architecture

VueX nécessite d'avoir **2 modèles de données** :

- un modèle à base d'événements pour la modification de l'état
- un modèle représentant l'état

Ceci n'est ni plus ni moins qu'une architecture [CQRS](https://www.martinfowler.com/bliki/CQRS.html).
Au-delà de la complexité apportée par CQRS, ce pattern a quelques avantagses, mais la plupart n'ont pas de sens côté front (ex: facilite l'event sourcing, la scalabilité horizontale…).

Avec la solution sans VueX, cette contrainte d'architecture n'existe plus, on peut alors **choisir l'architecture adaptée à notre besoin** (CQRS ou pas).

### 3. Navigabilité du code

Une autre contrainte de VueX est l'utilisation de **modèle de programmation basé sur les événements**. En effet, [les mutateurs ne sont pas appelés directement](https://vuex.vuejs.org/guide/mutations.html#mutations), mais par l'intermédiaire d'événements qui sont publiés :

1. `store.commit('increment')` publie l'événement `increment`
2. Vuex va rechercher le ou les mutateur(s) associé(s) a cet événement
3. ces mutateurs sont exécutés

Encore une fois, ce modèle de programmation a des avantagses, mais sont-ils pertinents sur une application front ?
Toujours est-il que cela a un coût, et notamment au niveau de la navigabilité dans le code. En effet, les éditeurs et autres IDE ne permettent généralement pas de naviguer de `this.commit('increment')` vers les mutateurs associés, voir encore moins dans l'autre sens.
Cependant, certains plugins permettent de remédier à ce problème, mais il n'est pas certain de trouver le et les plugins adaptés qui résolve tous ces problèmes, et ce pour chaque éditeur / IDE et chaque language (JavaScript, TypeScript, etc.).

Sans VueX on appelle juste des fonctions JS (ex : `ArticlesRepository.removeAll()`), le problème ne se présente donc pas.

### 4. Fail early

Lorsque l'on se trompe dans le nom de l'événement (ex : `this.commit('increment')`), aucune erreur n'est remontée : pas de linter possible pour détecter l'erreur au plus tôt, et aucune erreur à l'exécution, il ne se passe juste rien.
On imagine bien que ce problème ne se présente pas sans VueX, toujours pour la même raison : on utilise un simple appel de fonction JS (ex: `Counter.increment()`).

Note : de même que pour navigabilité, il existe peut-être des plugins qui permettent de résoudre ce problème.

### 5. Découpage technique par défaut

Bien souvent, les applications utilisant VueX sont organisées avec un découpage technique (les états regroupés, les actions regroupées, les mutateurs et les accesseurs) :

```
# components/
	* Alert.vue
	* Inventory.vue
	* Product.vue
	* …
# store/
	* state.js
	# mutators/
		* inventory.js
		* shoppingCart.js
		* …
	# getters/
		* inventory.js
		* shoppingCart.js
		* …
	# actions/
		* inventory.js
		* shoppingCart.js
		* …
```

Résultat : en pratique, lorsque l'on veut comprendre un code existant, il faut suivre le déroulé des appels (actions, mutateurs …), ce qui mène à **beaucoup d'indirections**. C'est d'autant plus frustrant que, généralement, l'opération qu'on veut suivre est assez triviale comme ajouter / modifier / supprimer un élément à une collection.
Idem lorsque l'on veut ajouter une nouvelle fonctionnalité : on doit ouvrir le fichier dans lequel l'état est stocké pour ajouter un attribut, puis ouvrir le fichier des actions, etc. C'est lourd, et c'est d'autant plus **sujet à erreur** que ces éléments sont directement dépendants et éloignés les uns des autres.

Mais ceci n'est qu'indirectement lié a VueX. En effet, comme conseillé dans [un coin de la documentation](https://vuex.vuejs.org/guide/structure.html), lorsque l'application commence à grossir, il peut être préférable de regrouper les états, actions, mutateurs et getters par domaine, en utilisant des modules, ce qui donne quelque chose comme ceci :

```
# store/
	* index.js
	* actions.js
	* mutations.js
	# modules/
		* inventory.js
		* shoppingCart.js
		* …
```

En somme, l'utilisation de VueX risque d'enfermer les développements dans une organisation technique du code qui n'aide pas à la maintenance.

## Les points positifs de VueX

Malgré les nombreux avantagses à ne pas utiliser VueX, cette librairie peut dans certains cas s'avérer très intéressante :

### Aide au débogage avec Vue.js devtools

Avec [Vue.js devtools](https://github.com/vuejs/vue-devtools), il est possible de **suivre les différentes actions qui ont été déclenchées**, les différents états du store… le tout sans aucune ligne de code supplémentaire.
Il y a des applications où cela peut être utile, et beaucoup où ça ne l'est pas du tout. Nous avons constaté, parmi les équipes que nous avons rencontrées, que la plupart n'utilisent pas cet outil.

### Force une certaine architecture

VueX impose un cadre, force une certaine architecture, ce qui peut aider une équipe peu expérimentée.

### Accès facile depuis n'importe quel composant

Ah non, en fait, c'est faisable très facilement sans VueX :

```javascript
import ShoppingCartTotalPrice from './ShoppingCartTotalPrice';

export default {
  name: 'ShoppingCart',
  components: { ShoppingCartTotalPrice },
  data() {
    return {
      shoppingCart: this.$shoppingCart.state,
    };
  },
  computed: {
    totalPrice() {
      return this.$shoppingCart.getTotalPrice();
    },
  },
  methods: {
    remove(product) {
      this.$shoppingCart.remove(product);
    },
  },
};
```

On peut noter que dans cet exemple, on accède au `repository` `ShoppingCart` par le biais d'un plugin.
L'avantagse est de ne pas importer le `repository` dans chaque composant :

```javascript
import shoppingCart from '@/repositories/shoppingCart';
import Vue from 'vue';

export const ShoppingCart = {
  install: function (Vue) {
    Vue.prototype.$shoppingCart = shoppingCart;
  },
};

Vue.use(ShoppingCart);
```

## Conclusion

Concrètement, nous avons vu qu'il était **possible de se passer de VueX**.

En somme : plus grande simplicité du code, plus grande personnalisation de l'architecture, absence de dépendance à une librairie externe, pattern de programmation plus simple, navigabilité dans le code amélioré, moins de boilerplate pour les tests, tels sont les avantagses de se passer de la bibliothèque VueX.

Une question demeure : pourquoi VueX est-il si répandu ? Nous n'avons su trouver de réponse. Si vous utilisez VueX, donnez-nous les raisons qui vous ont poussées à l'utiliser, nous serions heureux d'en discuter.

## Notes

Cet article ne traite que de **Vue 2**.

Avec [Vue 3.x](https://v3.vuejs.org), les objects js partagsés entre composants doivent être encapsulés par [`Vue.observable()`](https://vuejs.org/v2/api/#Vue-observable).
