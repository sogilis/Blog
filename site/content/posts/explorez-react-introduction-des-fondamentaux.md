---
title: "Explorez React : Introduction des fondamentaux "
author: "Nicolas Viviani "
date: 2024-02-20T09:25:40.892Z
description: >-
  Découvrez les fondamentaux de React dans ce guide pratique. Conçu pour les
  développeurs à tous les niveaux, cet article offre un aperçu des concepts clés
  de React, la bibliothèque JavaScript libre. Idéal pour ceux qui cherchent à
  élargir leur compréhension de React et à rester à jour avec les dernières
  tendances et techniques dans le développement frontend.


  Restez connecté pour d'autres articles approfondis sur des sujets liés à React.
image: /img/2008-création-de-sogilis-à-grenoble.png
tags:
  - dev
---
### Plan

Les concepts les plus importants de React

1. 🏁 **\*Introduction\**** - présentation globale de la librairie React
2. ⌨️ **\*Installation et CLI\**** - comment installer et utiliser la CLI
3. 🧑‍💻 **\*Le langage JSX\**** - introduction au langage JSX
4. ✂️ **\*Composants\**** - l'architecture découpée en composants
5. 🏛️ **\*Hooks\**** - le state, les effets
6. 🛣️ **\*Route et navigation\**** - navigation entre les pages
7. 🗣️ **\*Props\**** - communication entre les composants
8. 🩺 **\*Test\**** - faire des tests sur son appli React
9. ✏️ **\*Formulaires\**** - gérer les interactions utilisateurs
10. 📜 **\*Style\**** - mise en forme avec du CSS

Pour en savoir plus : [react.dev](https://react.dev/)



- - -

## 1. Introduction

### Qu’est ce que React ?

[React](https://fr.wikipedia.org/wiki/React) est une librairie Frontend permettant de créer des éléments d'interface réutilisable.

### Popularité

React est développé et maintenu par Meta (Facebook) et [est l'une des librairies Front les plus utilisées](https://2022.stateofjs.com/fr-FR/libraries/front-end-frameworks/). De nombreux modules existent pour étendre son fonctionnement.

### Quelle différence avec un framework ?

Un framework est plus lourd et plus complet qu’une librairie. React ne possède que des fonctionnalités pour créer des interfaces graphiques. Il est cependant possible de l’étendre avec des modules pour faire du routing, des tests etc.

[Is React a Library or a Framework? Here's Why it Matter](https://www.freecodecamp.org/news/is-react-a-library-or-a-framework/)



- - -

## 2. Installation et CLI 

Pour commencer à utiliser React il suffit d'une ligne de commande

```shell
npm install react react-dom
```

Cependant, au lieu de se lancer de zéro, il est plus aisé et beaucoup plus simple d'utiliser un outil qui permet de créer un squelette de projet. Il est en existe plusieurs :

* [Vite](https://vitejs.dev/)

```shell
npm create vite@latest
```

* CreateReactApp

```shell
npm create-react-app my-app
```

* Next.js
* Gatsby
* …

- - -



Si on génère le projet avec *Vite*, trois fichiers importants sont générés `index.html`, `main.jsx`et `App.jsx`.

`index.html` contient un squelette de site et l'élément racine sur lequel React va attacher notre application.

```html
<div id="root"></div>
<script type="module" src="/src/main.jsx"></script>
```

C'est `main.jsx` qui s'occupe de ça. Par défaut le fichier `App.jsx` sera rendu dans l'élément HTML `root`.

```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

Enfin, `App.jsx`constitue la porte d'entrée de notre application, c'est ce qui est affiché, c'est donc là qu'on commence à coder en React.

React fournit également une extension pour navigateur, les ***[React Developer Tools](https://react.dev/learn/react-developer-tools)*** qui permettent d'étendre l'inspecteur d'élément du navigateur en y ajoutant un nouvel onglet incluant divers éléments spécifiques à React

* [Installer pour Chrome](https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
* [Installer pour Firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)
* [Installer pour Edge](https://microsoftedge.microsoft.com/addons/detail/react-developer-tools/gpphkfbcpidddadnkolkpfckpihlkkil)



- - -

## **3. Le langage JSX**

<https://grafikart.fr/tutoriels/syntaxe-jsx-react-1314>

- - -



### C’est quoi le JSX ?

JSX est un langage utilisé par React permettant de mélanger Javascript et HTML.

```javascript
function App() {
  const name = "World";
  return <h1>Hello {name}! </h1>;
}

export default App
```

En réalité il s'agit simplement d'une extension syntaxique de JavaScript, on écrit pas vraiment de l’HTML mais une redéfinition JSX qui ressemble beaucoup.

Cette syntaxe n'est pas une syntaxe JS valide, mais JSX permet de faire ça afin de retourner du HTML plus simplement.

- - -

JSX a plusieurs avantages

* Pas de séparation du template et de la logique
* Reprend la syntaxe de JavaScript

[Writing Markup with JSX](https://react.dev/learn/writing-markup-with-jsx)

[JavaScript in JSX with Curly Braces](https://react.dev/learn/javascript-in-jsx-with-curly-braces)

- - -

Le JSX est automatiquement transpilé par React vers du Javascript classique.

### Les balises HTML

Il est possible d'inclure des balises HTML dans le code JSX

```javascript
function Component() {
  return <input id="name"/>
}
export default Component
```

Attention cependant, certaines balises diffèrent du HTML classique. C'est le cas notamment de la balise `class` qui devient `className` en JSX.

On notera aussi que les attributs HTML avec des tirets (à l'exception des attributs `aria-` et `data-`) doivent être écrit en JSX en utilisant du **camelCase**.

```javascript
function Component() {
  return <input id="name" className="name" type="text" minLength="4" aria-autocomplete />
}
export default Component
```

- - -

Le langage JSX ne permet de renvoyer qu'un seul élément racine. Le code ci-dessous est faux et affichera une erreur ↓

```javascript
function Item() {
  return (
    <h2>Titre</h2>
    <p>Description</p>
  )
}
export default Item
```

Il faut donc soit tout imbriquer dans une balise `<div></div>` soit utiliser un `<React.Fragment>` ou sa syntaxe alternative `<></>`.

```javascript
import React from 'react'
function Item() {
  return (
      <React.Fragment>
        <h2>Titre</h2>
        <p>Description</p>
      </React.Fragment>
    )
}
export default Item
```

- - -

### Interpolation

L'interpolation est l'affichage de texte à la volée. En JSX, l'interpolation s'utilise avec des accolades `{}`.

```javascript
function App() {
  const name = "panier";
  return <div className={name}>Pour vider le {name}, cliquez ici</div>;
}

export default App
```

Il est possible d'interpoler plus que des variables, on peut écrire du code JSX à l'intérieur des accolades `{}`.

```javascript
function ItemDescription() {
  const doesDescriptionExist = false;
  const description = "Ceci est une description";
  return (
    <div> 
      <h1>Titre</h1>
      {doesDescriptionExist ? <p>{description}</p> : <p>Pas de description</p>}
    </div>
  )
}
export default ItemDescription
```

```javascript
function ItemDescription() {
  const doesDescriptionExist = false;
  const description = "Ceci est une description";
  return (
    <div> 
      <h1>Titre</h1>
      {doesDescriptionExist && <p>{description}</p>}
    </div>
  )
}
export default ItemDescription
```

- - -

En réalité on peut écrire n’importe quelle expression JavaScript à l’intérieur des accolades `{}` mais pas d’instructions. De la même manière qu'en Javascript on ne ferait pas ↓

```
let i = if (code === 42) { "Loire" } else { "Rhône" }
```

Le code ci-dessous est donc invalide ↓

```javascript
function App() {
  const citation = "I'm doing a (free) operating system (just a hobby, won't be big and professional like gnu)"
  return <blockquote cite="<https://groups.google.com/g/comp.os.minix/c/dlNtH7RRrGA/m/SwRavCzVE7gJ>">
      <p>{citation}</p>
      <footer>{
        if (citation.includes("free")) {
          "Linus Torvalds"
        } else {
          "Bill Gates"
        }
      }</footer>
    </blockquote>
}
export default App
```

- - -

### Événements

On peut interpoler des fonctions et même les écrire directement dans les accolades `{}` grâce aux lambdas notamment pour gérer les événements.

```javascript
function Button() {
  const handleHover = (e) => {
    alert("Vous avez passé la souris")
  }
  return <button onMouseOver={handleHover}>Passez la souris ici</button>
}
```

```javascript
function Button() {
  return <button onClick={(e) => alert("Vous avez cliqué")}>Cliquez ici</button>
}
```

```javascript
function handleKeyPress(e) {
  alert("Vous avez appuyé sur une touche")
}

function Button() {
  return <button onKeyDown={handleKeyPress}>Appuyez sur une touche</button>
}
```

- - -

En utilisant l'interpolation, on peut aussi créer des listes grâce à la fonction `map`.

```javascript
function List() {
  const todos = [
    "Se former sur React",
    "Faire un site en React",
    "Ajouter React sur mon CV"
  ]
  return <ul>
    {todos.map((todo) => (<li key={todo}>{todo}</li>))}
  </ul>
}
export default List
```

On remarque l'attribut `key` dans la balise `li`, en React cela est obligatoire dans une liste et permet d'identifier les différents éléments de manière unique.

[Keeping list items in order with `key`](https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key)

[Démonstration vidéo du problème](https://www.youtube.com/watch?v=A8AxHueElo0)

Une clé unique `key` est important pour React afin qu’il manipule les bonnes données lors des rendus.

- - -

## 4. Composants

- - -

### Créer des composants

En React, un composant est un élément d'interface réutilisable et indépendant.

C'est en réalité une simple fonction (dans le cadre des composants fonctionnels) qui retourne un ou plusieurs éléments de balisage. Ici `<Home>` est un composant React.

```javascript
function Home() {
  return <>
    <h1>Accueil</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    <button>Plus d'infos</button>
  </>
}
export default Home
```

Les mots réservés `export default` permettent de rendre le composant importable dans d'autres composants, le rendant ainsi réutilisable.

- - -

Comme dit précédemment, un composant est réutilisable, c'est à dire qu'on peut l'utiliser dans un autre composant. Il existe alors une hiérarchie entre les composants.

Dans l'exemple ci-dessous, le composant `<App>` va retourner les composants que l'on souhaite afficher comme `<Header>`, `<Content>` et `<Footer>`.

```javascript
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";

function App() {
  return (
    <>
      <Header></Header>
      <Content></Content>
      <Footer></Footer>
    </>
  )
}
export default App
```

```javascript
function Header() {
  return (
      <nav>
        <ul>
          <li>Accueil</li>
          <li>À propos</li>
          <li>Contact</li>
        </ul>
      </nav>
    )
}
export default Header
```

`<App>` est donc un composant parent tandis que `<Header>` est l'un des composants enfants de `<App>`.

- - -

### Découpe en composants

Construire une application avec React peut vite amener à de mauvaises pratiques étant donné la liberté qui nous est laissée, ainsi il faut retenir une chose, [en React il faut penser React](https://react.dev/learn/thinking-in-react).

Une interface est un ensemble de divers composants qui vont chacun servir des buts différents avec leur propre logique, qui vont être réutilisés, qui sont hiérarchisés et qui vont interagir entre eux.

![](/img/components-organization.png)

Toute la difficulté consiste donc à savoir comment découper notre interface efficacement. Cela dépend de chaque cas et chaque choix doit être minutieusement réfléchi.

- - -

### Organisation du code

React n'impose aucune architecture ni organisation de code, c'est donc à nous de gérer de quelle manière regrouper et hiérarchiser nos fichiers et dossiers.

Il existe cependant des frameworks React qui sont considérés comme plus *opinionated* comme *Next.js* et *Remix*, qui poussent une certaine architecture.

Une manière de faire pourrait être de séparer nos fichiers par utilité. Ainsi on placerait tous les composants d'éléments réutilisable comme un composant `<Bouton>` ou `<Sidebar>` dans un dossier `components`. Les composants correspondant à des pages de notre site et qui réutilisent plusieurs composants élémentaires pourraient être placés dans un dossier `pages`. Les hooks personnalisés que l'on créerait se placeraient dans un dossier `hooks` etc.

```
└── /src
    ├── /components
    ├── /pages
    ├── /hooks
    ├── /services
    └── /assets
```

- - -

Chaque composant serait regroupé dans son propre dossier en y incluant tous les fichiers le concernant (style, test etc.).

```
└── /src
    └── /components
        ├── Button
            ├── Button.jsx
            ├── Button.style.css
            └── Button.test.jsx
        └── Sidebar
            ├── Sidebar.jsx
            ├── Sidebar.style.css
            └── Sidebar.test.jsx
```

Mais on aurait très bien pu avoir un dossier regroupant tous les styles et un autre regroupant tous les tests.

En bref, il existe plusieurs manières d'organiser son code, cela dépend de ses besoins ou même de ses préférence

- - -

## 5. Hooks

<https://grafikart.fr/tutoriels/react-hook-useState-1327>

<https://grafikart.fr/tutoriels/react-hook-useeffect-1328>

<https://grafikart.fr/tutoriels/react-hook-usememo-1330>

<https://grafikart.fr/tutoriels/react-hook-useref-1331>

<https://grafikart.fr/tutoriels/react-contextes-1335>

<https://grafikart.fr/tutoriels/react-hook-personnalise-1329>



- - -

### C'est quoi un hook ?

Les hooks sont des fonctions React qui permettent de bénéficier d'un état local et d'autres fonctionnalités sans avoir à écrire de composant de classe. Ils sont un moyen d'utiliser les composants fonctionnels avec les mêmes possibilités qu'offre une classe.

Ce sont de simples fonctions qui commencent toujours par « **use** ». Par exemple `useState` est un hook.

Voici une liste non exhaustive de différents hooks :

* **`[useState](<https://react.dev/reference/react/useState>)`** : ajoute un état à un composant, une sorte de mémoire entre les rendus. [Plus d'infos](https://react.dev/learn/state-a-components-memory)
* **`[useEffect](<https://react.dev/reference/react/useEffect>)`** : génère des effets de bord (side effect) lors de modification de données.
* `[useContext](<https://react.dev/reference/react/useContext>)` : fait passer des données vers des composants enfants sans utiliser de props.
* `[useRef](<https://react.dev/reference/react/useRef>)` : similaire à `useState` mais pour des informations qui ne doivent pas être rendues.
* `[useMemo](<https://react.dev/reference/react/useMemo>)` : met en cache le résultat d'un calcul long et coûteux
* [tous les autres hooks sont listés ici…](https://react.dev/reference/react/hooks)

- - -

### Quelques remarques sur les hooks

* Les hooks ne peuvent s'utiliser que dans des composants React et uniquement des composants fonctionnels.
* Les hooks doivent systématiquement être appelé à la racine d'un composant. Ils ne peuvent donc pas être appelés à l'intérieur d'une boucle, d'une condition ou d'une fonction imbriquée.

```javascript
export default function App () {
  if (…) {
    const [x, setX] = useState(0)
  }
  return x
```

Dans le code ci-contre, on déclare un hook dans un `if` ce qui n'est pas autorisé par React.

* Ils commencent toujours par `use`
* Ils permettent de réutiliser de la logique à état entre différents composants

- - -

### Le hook useState

C'est le hook le plus connu et le plus utile. Il permet de garder en mémoire des données qui seront automatiquement mises à jour sur l'écran à chaque modification de celles-ci.

Il s'utilise d'une façon un peu particulière :

```javascript
import { useState } from 'react';

function Counter() {

  const [count, setCount] = useState(0)
  const increment = () => {
    setCount(count + 1)
  }

  return (<>
    <p>Compteur : {count}</p>
    <button onClick={increment}>Incrémenter</button>
  </>)
}
export default Counter
```

Déclare une variable `count`, une fonction `setCount` (qui agira sur la variable `count`) et une valeur initiale `0`.

La fonction `increment` utilise le *setter* de l'état `setCount` qui mettra donc à jour la variable associée `count`

La variable d'état `count` est affichée et réactualisée à chaque changement. La fonction `increment` est appelée à chaque clic sur le bouton.

- - -

Pourquoi on n'utilise pas une simple variable ?

**Parce que ça ne fonctionne pas !**

[When a regular variable isn’t enough](https://react.dev/learn/state-a-components-memory#when-a-regular-variable-isnt-enough)

Deux raisons à cela :

* Les variables locales ne sont pas persistées entre les rendus. C'est à dire que quand React va recharger la page, la variable sera remise à zéro.
* Les changements de valeurs des variables locales ne déclenchent pas de re-rendu. React ne sait pas qu'il faut recharger la page.

- - -

Il est possible d'avoir plusieurs états dans un même composant, il suffit d'utiliser `useState` plusieurs fois.

À noter que l'état (et par conséquent `useState`) ne se limite pas à des valeurs numériques ou textuelles, on peut tout à fait déclarer des objets JavaScript.

```javascript
const [person, setPerson] = useState({firstname: "Youri", lastname: "Gagarine", age: 34})
```

En revanche, on ne peut pas utiliser de mutation pour modifier un objet état. Le code ci-dessous ne fonctionnera donc pas :

```javascript
person.firstname = "Valentina"
person.lastname = "Terechkova"
setPerson(person)
```

React pense qu'il s'agit du même objet qui n'a pas été modifié, il ne le rendra donc pas à nouveau pour afficher les changements.

- - -

Pour modifier une partie de l'objet il faudra donc utiliser la décomposition grâce au spread operator (`...`), ceci afin de transférer le reste des données non modifiées dans le nouvel objet.

```javascript
import { useState } from 'react';
function Person() {

  const [person, setPerson] = useState({firstname: "Youri", lastname: "Gagarine", job: "Cosmonaute"})
  const changeName = () => {
    setPerson({ ...person, firstname: "Valentina", lastname: "Terechkova"})
  }

  return (<>
    <p>Personne : {person.firstname} {person.lastname} ({person.job})</p  >
    <button onClick={changeName}>Changer le nom</button>
  </>)
}

export default Person
```

- - -

### Le hook useEffect

Ce hook permet de lancer des effets de bord en parallèle de l'exécution d'une fonction.

```javascript
useEffect(() => {
  console.log("effect")
}, [])
```

Il prend deux paramètres, un *callback* qui est la fonction qui va s'exécuter à chaque fois que `useEffect` sera appelé et un tableau de dépendance qui permet de déterminer quand il faudra appelé le hook.

**Attention :** les effets sont une échappatoire au paradigme React. Ils doivent être utilisés uniquement pour sortir de l'environnement React, pour synchroniser des composants avec un système externe comme le DOM, le réseau ou un module non React. Utiliser des effets pour modifier des composants est une mauvaise pratique.

[You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)

- - -

Avec un tableau de dépendance vide `([])`, `useEffect` est appelé uniquement au montage du composant (la première fois que le composant est rendu). Cela permet de définir des effets globaux pour enregistrer des événements par exemple.

```javascript
import { useEffect } from 'react';

function Listener() {
  useEffect(() => {
    const handler = () => alert("Clic !")
    window.addEventListener("click", handler)
    return () => window.removeEventListener("click", handler)
  }, [])

  return <h1>Cliquez !</h1>
}
export default Listener
```

Il est important de nettoyer les effets de bord lors du démontage des composants. Pour cela, dans le `useEffect` on peut retourner une fonction qui s'en chargera.

- - -

Ajouter une variable d'état dans le tableau de dépendance ne va lancer l'effet de bord que quand cette variable est modifiée (et lors du montage du composant)

```javascript
import { useEffect, useState } from 'react';
function Title() {
  const [title, setTitle] = useState("Default Title")

  useEffect(() => {
    document.title = title
  }, [title])

  return <input onChange={(e) => setTitle(e.target.value)}></input>
}

export default Title
```

**Attention :** Les dépendances de `useEffect` doivent être des variables d'état (déclarées avec `useState`), en effet les effets ne s'applique que lors des re-rendus. Une variable classique ne déclenchera pas de re-rendu et l'effet ne sera donc pas appliqué.

- - -

`useEffect` est l'équivalent fonctionnel des méthodes de cycle de vie des classes React.

```javascript
useEffect(() => {
  //componentDidMount (s'exécute au montage du composant)
  return () => {
    //componentWillUnmount (s'exécute au démontage du composant)
  }
}, [])
```

```javascript
useEffect(() => {
  //componentDidUpdate (s'exécute au re-rendu du composant)
  return () => {
    //componentWillUnmount (s'exécute au démontage du composant)
  }
}, [dependency])
```

[Using React’s useEffect Hook with lifecycle methods](https://blog.logrocket.com/using-react-useeffect-hook-lifecycle-methods/)

- - -

### Le hook useMemo

Permet de mémoriser une valeur et de ne la changer que lorsqu'une dépendance change. Sans `useMemo` cette valeur serait recalculée à chaque rendu React. En général on l'utilise pour mettre en mémoire le résultat de calculs lents.

Il s'utilise de la même manière que `useEffect` avec une fonction de *callback* et un tableau de dépendance

```javascript
const security = useMemo(() => {
  return passwordSecurity(password)
}, [password])
```

### Le hook useId

Permet de générer un ID spécifique à une instance d'un composant.

```javascript
const id = useId()
```

- - -

### Le hook useRef

Permet de conserver une variable entre les rendus sans pour autant déclencher de re-rendu.

Il s'utilise pratiquement de la même manière que `useState` en mettant le résultat dans une variable et en définissant une valeur initiale (pas de *setter* en revanche). Et contrairement à `useState`, il est mutable.

```javascript
const ref = useRef(0)
```

Il est utile pour manipuler le DOM directement. En l'associant au paramètre HTML de React `ref`, on peut accéder au nœud DOM correspondant via le champ `nodeRef.content`.

```javascript
import { useRef } from 'react'
export default function Content() {
  const nodeRef = useRef(null)
  const handleClick = () => ref.current.play()
  return (<>
    <video ref={nodeRef}><source src="<https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4>" type="video/mp4"></source></video>
    <button onCLick={handleClick}>Play</button>
  </>)
}
```

[Referencing Values with Refs](https://react.dev/learn/referencing-values-with-refs)

- - -

### Le hook useContext

Permet d'envoyer des données à des composants enfants sans utiliser de props (problème de « [props drilling](https://www.freecodecamp.org/news/avoid-prop-drilling-in-react/) »).

Au préalable il faut créer un contexte grâce à la fonction React `createContext`. Les composants pourront alors récupérer ce contexte avec le hook `useContext`

```javascript
export const ThemeContext = createContext("light")
```

```javascript
const theme = useContext(ThemeContext)
```

[Détails sur les contextes React](https://react.dev/learn/passing-data-deeply-with-context)

- - -

```javascript
import { useContext } from "react"
import { ThemeContext } from "./ThemeContext"

export default function Content() {
  const theme = useContext(ThemeContext)
  return <div style={{ backgroundColor: theme === "dark" ? "#000000" : "#FFFFFF" }}>
    Content
  </div>
}
```

```javascript
import Header from "./Header.jsx"
import Content from "./Content.jsx"
import Footer from "./Footer.jsx"
import { ThemeContext } from './ThemeContext';

export default function App() {
  return (<>
    <Header></Header>
    <ThemeContext.Provider value="dark">
      <Content></Content>
      <Footer></Footer>
    </ThemeContext.Provider>
  </>)
}
```

```javascript
import Header from "./Header.jsx"
import Content from "./Content.jsx"
import Footer from "./Footer.jsx"
import { ThemeContext } from './ThemeContext';

export default function App() {
  return (<>
    <Header></Header>
    <ThemeContext.Provider value="dark">
      <Content></Content>
      <Footer></Footer>
    </ThemeContext.Provider>
  </>)
}
```

Notre composant `Content` contient une `div` qui change sa couleur de fond selon le `theme` fourni par le contexte. Pour cela, on utilise `useContext` en lui passant le nom du contexte `ThemeContext`.

Notre contexte `ThemeContext` est défini en utilisant la fonction `createContext` et a pour valeur par défaut `light`.

Enfin notre composant racine `App` utilise `<ThemeContext.Provider value="dark">`, pour passer la valeur du thème à ses enfants.

- - -

### Les hooks personnalisés

Il est possible de créer ses propres hooks afin de créer des fonctions qui pourront être réutilisées dans plusieurs composants. Un hook personnalisé est une fonction Javascript classique qui utilise elle-même un hook React. Ils ne peuvent donc s'utiliser que dans des composants React comme tout hook.

```javascript
function useToggle(initial) {
  const [state, setState] = useState(initial)
  const toggle = () => setState(v => !v)
  return [state, toggle]
}
```

La fonction `useToggle` est un hook personnalisé car elle utilise le hook `useState` de React. On peut donc la ré-utiliser dans des composants React.

```javascript
export default function App() {
  const [checked, toggleCheck] = useToggle(false)
  return <>
    <input type='checkbox' checked={checked} onChange={toggleCheck}></input>
    {checked && "Je suis coché"}
  </>
}
```

De nombreux sites référencent les hooks les plus usuels écrits par la communauté. Ils peuvent être téléchargés via `npm` et réutilisés à volonté. Pour ne pas réinventer la roue, jetez-y un œil :

* [usehooks.com](https://usehooks.com/)
* [usehooks-ts.com](https://usehooks-ts.com/)
* [react-use](https://github.com/streamich/react-use)

[Plus d'infos sur les hooks personnalisés](https://react.dev/learn/reusing-logic-with-custom-hooks#extracting-your-own-custom-hook-from-a-component)

- - -

## 6. Route et navigation 

<https://grafikart.fr/tutoriels/react-router-dom-2159>

- - -

React n'est qu'une simple librairie et ne gère de base, ni les routes, ni la navigation entre les pages.

Pour palier à ce manque, il est possible d'utiliser un framework React comme *Next.js* ou *Remix* qui supporte (entre autres) le routage. Sinon plusieurs modules communautaires existent comme TanStack Router, Wouter ou Brouther mais le plus connu reste **React Router** que nous allons voir ici.

```shell
npm install react-router-dom
```

[Documentation de React Router](https://reactrouter.com/en/main)

- - -

### Comment créer des routes avec React Router ?

On commence par créer un *router* avec `createBrowserRoute` à l'intérieur duquel on définit nos différentes routes.

Ensuite on utilise le composant fourni par React Router `<RouterProvider/>` en lui précisant le `router` précédemment créé.

```javascript
import { createBrowserRouter, RouterProvider } from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/article",
    element: <Article/>
  },
])

export default function App() {
  return <RouterProvider router={router}/>
}
```

- - -

Ainsi on peut naviguer entre les pages `/` et `/article` en changeant l'URL dans la barre d'adresse.

Cette solution n'est évidement pas idéale. C'est pourquoi afin de naviguer entre les pages grâce à des liens on peut utiliser des `<Link/>` ou `<NavLink/>` fourni par React Router.

```javascript
function Home() {
  return <div>
    <h1>Accueil</h1>
    <NavLink to="/article">Voir les articles</NavLink>
  </div>
}
```

### Barre de navigation

Pour aller plus loin et avoir une véritable expérience « barre de navigation », c'est à dire un composant contenant des liens qui va s'occuper d'afficher d'autres composants sur la page selon l'URL, il faut modifier légèrement notre `router` en y imbriquant des routes.

```javascript
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children: [
      {
        path: "",
        element: <Home/>
      },
      {
        path: "article",
        element: <Article/>
      }
    ]
  }
])
```

```javascript
function Root() {
  return <>
    <nav>
        <NavLink to="/">Accueil</NavLink>
        <NavLink to="/article">Blog</NavLink>
    </nav>
    <Outlet></Outlet>
  </>
}

export default function App() {
  return <RouterProvider router={router}/>
}
```

Dans le `router` on utilise le champs `children` pour définir les routes enfants (on utilise des chemins relatifs). Par exemple la route `/article` sera un enfant de la route `/`.

Dans notre route parente on affiche le composant que l'on a créé `<Root/>`, dans lequel on utilise `<Outlet/>`. Ce dernier s'occupe d'afficher le composant de la route enfant correspondante à l'URL actuelle.

- - -

### Paramètres passés via l'URL

On peut également faire passer des paramètres dans les URL, pour cela, dans la route, on précède le paramètre de `:` (deux-points).

```javascript
{
  path: "article/:id",
  element: <ArticleDetail></ArticleDetail>
},

```

Puis on utilise ce paramètre dans le composant grâce au hook fourni par React Router `useParams`.

```javascript
import { useParams } from "react-router-dom"

export default function ArticleDetail() {
  const {id} = useParams()
  return <h1>Article {id}</h1>
}
```

- - -

### Page d'erreur

Par défaut React Router affiche une page d'erreur générique lorsqu'il ne connaît pas la route spécifiée dans l'URL mais il est possible de personnaliser ceci en utilisant le champs `errorElement` du `router`.

```javascript
const router = createBrowserRouter([
{
  path: "/",
  element: <Root />,
  errorElement: <Error/>,
  children: [
    //...
  ]
}])
```

On récupère alors l'erreur grâce au hook `useRouteError` fourni par React Router.

```javascript
export default function Error() {
  const error = useRouteError()
  return <strong>{error?.error?.toString() ?? error?.toString()}</strong>
}
```

- - -

### Récupérer des données grâce aux loaders

Un `loader` permet de récupérer des données **avant** que le composant correspondant à la route ne s'affiche.

```javascript
{
  path: "article",
  element: <Article/>,
  loader: () => fetch("<https://jsonplaceholder.typicode.com/posts?_limit=10>")
}
```

React Router s'occupe de résoudre la promesse automatiquement, ce qui nous permet de mapper sur le résultat récupéré grâce au hook `useLoaderData` directement.

```javascript
export default function Article() {
  const articles = useLoaderData()

  return <ul>
    {articles.map((article) => (
      <li key={article.id}>
        <NavLink to={article.id}>{article.title}</NavLink>
      </li>
    ))}
  </ul>
}
```

- - -

Le problème avec ceci est que la page ne s'affichera que quand les données seront arrivées. D'un point de vue UX, ce n'est pas terrible car rien ne se passe pour l'utilisateur en attendant.

Pour améliorer ça on peut se servir du hook `useNavigation` qui permet de connaître l'état du chargement et ainsi afficher un message ou une animation d'attente.

```javascript
import {NavLink, Outlet, useNavigation} from "react-router-dom"
function Root() {
  const {state} = useNavigation()
  return <>
    <nav>
      <NavLink to="/">Accueil</NavLink>
      <NavLink to="/article">Articles</NavLink>
      <NavLink to="/contact">Contact</NavLink>
    </nav>
    {state === "loading" && <p>Chargement…</p>}
    <Outlet></Outlet>
  </>
}
```

Cependant bien qu'on ai un message de chargement, la nouvelle page ne s'affichera tout de même que quand les données seront arrivées.

- - -

Il est certainement mieux d'afficher la nouvelle page à l'utilisateur directement et de différer l'affichage des données. On doit pour cela résoudre la promesse nous même en utilisant les composants `Suspense` et `Await` fournis par React et React Router ainsi que la fonction `defer`.

<div grid="~ cols-2 gap-4"> <div>

```javascript
loader: () => {
  const articles = fetch("<https://jsonplaceholder.typicode.com/posts?_limit=10>").then(r => r.json())
  return defer({articles})
}
```

On dit à React comment résoudre la promesse et on utilise la fonction `defer` pour différer le résultat.

```javascript
import { useLoaderData, Await } from "react-router-dom"
import { Suspense } from "react"
export default function Article() {
      const {articles} = useLoaderData()
      return <>
            <h1>Article</h1>
            <Suspense fallback="Chargement…">
                  <Await resolve={articles}>
                        {(res) => <ul>
                        //...
                        </ul>}
                  </Await>
            </Suspense>
      </>
}
```

`<Suspense>` via son prop `fallback` permet d'afficher un contenu de secours en attendant que ses composants enfants se chargent.

`<Await>` permet de récupérer les données qui ont été différées grâce à `defer` via son prop `resolve`.

- - -

### Redirection

Enfin la redirection s'effecture grâce à la fonction `redirect` ou encore via le hook `useNavigate`.

`redirect` s'utilise dans les *loaders*.

```javascript
import { redirect } from "react-router-dom"

{
  path: "posts",
  loader: () => redirect("/article")
}
```

La fonction retournée par `useNavigate` s'utilise à l'intérieur des composants.

```javascript
import { useNavigate } from "react-router-dom";

export default function Posts() {
      const navigate = useNavigate()
      useEffect(() => {
            navigate("/article")
      }, [])
}
```

## 7. Props

<https://grafikart.fr/tutoriels/data-flow-react-1319>

- - -

Les props sont simplement un moyen de faire passer de l'information entre composants parent et enfant.

### Comment utiliser les props ?

#### Dans le parent

Pour passer un props à un enfant, on définit dans le composant parent des attributs personnalisés à l'intérieur des balises en y associant une valeur.

```javascript
export default function List() {
  const [name, setName] = useState("Alain Prost")
  const [age, setAge] = useState(68)
  const [city, setCity] = useState("Saint-Chamond")
  return <ListItem name={name} age={age} address={city}></ListItem>
}
```

Par exemple, ici on passe au composant enfant `ListItem` les props `name`, `age` et `address` qui contiennent respectivement nos variables `name`, `age` et `city`.

- - -

### Dans l'enfant

Les props sont récupérés dans les paramètres de la fonction qui définit notre composant enfant.

```javascript
export default function ListItem({ name, age, address }) {
  return <div>
    <p>Nom : { name }</p>
    <p>Age : { age }</p>
    <p>Ville : { address }</p>
  </div>

```

On utilise la destructuration pour récupérer les props qui nous intéressent, mais il est également possible de récupérer un objet spécial nommé props qui contiendra tous les `props` envoyé par le parent.

```javascript
export default function ListItem(props) {
  return <div>
    <p>Nom : { props.name }</p>
    <p>Age : { props.age }</p>
    <p>Ville : { props.address }</p>
  </div>
}
```

- - -

### Remonter une action

Il est également possible de remonter une action utilisateur réalisé dans un composant enfant vers son parent. Pour cela on peut passer en props une fonction qui agira sur l'état du parent mais qui sera utilisé par l'enfant.

```javascript
export default function Watchlist() {
  const [watchedList, setWatchedList] = useState([{ id: 1, title: "Jeanne Dielman, 23, quai du commerce, 1080 Bruxelles", date: "2023-05-02" }, { id: 2, title: " Le Charme discret de la bourgeoisie", date: "2023-11-03" }])
  const addFilm = (newFilm) => {
    setWatchedList([...watchedList, newFilm])
  }
  return <Item watchedList={watchedList} onAdd={addFilm}></Item>
}
```

```javascript
export default function Item({ watchedList, onAdd }) {
      const [filmName, setFilmName] = useState("")
      const [filmWatchedDate, setFilmWatchedDate] = useState("")
      return <>
            <ul>{watchedList.map((film) => (<li key={film.id}>{film.title} ({film.date})</li>))}</ul>
            <input type="text" value={filmName} onChange={(e) => setFilmName(e.target.value)}></input>
            <input type= "date" value={filmWatchedDate} onChange={(e) => setFilmWatchedDate(e.target.value)}></input>
            <button onClick={() => onAdd({id: crypto.randomUUID(), title: filmName, date: filmWatchedDate})}>Ajouter</button>
      </>
}
```

Dans le parent, on passe le props `onAdd` avec pour valeur une fonction `addFilm` qui agit sur la variable d'état `watchedList`. Lors de l'appuie sur le bouton, l'enfant utilise `onAdd` comme s'il s'agissait de la fonction `addFilm`

- - -

### Props spéciaux

Il existe des props spéciaux notamment deux props réservés que sont `ref` et `key` mais il existe surtout un props `children` qui permet d'accéder aux enfants d'un composant.

Tous les éléments qui se situent entre les alises d'un composant peuvent être récupérés via le props `children` dans ce composant.

```javascript
export default function App() {
  return <ChildComponent>
    <h1>Titre</h1>
    <p>Description</p>
  </ChildComponent>
}
```

```javascript
export default function ChildComponent({children}) {
  return <div>{children}</div>
}
```

C'est donc l'enfant qui s'occupera d'afficher les balises `h1` et `p` définie dans le parent via l'utilisation de `children`.

Ce props peut être intéressant dans le cas ou un composant ne connaît pas ses enfants à l'avance par exemple.

- - -

### Type des props

Le passage de props d'un composant à l'autre peut amener à des problèmes de typage. C'est particulièrement vrai lorsqu'on écrit des composants réutilisable qui attendent des props précis pour fonctionner.

Afin de prévenir l'apparition de ce problème au moment du développement en facilitant le débogage, deux solutions : utiliser un langage typée statiquement (comme [TypeScript](https://react.dev/learn/typescript) ou [Flow](https://flow.org/en/docs/getting-started/)), ou [utiliser un module Javascript](https://www.npmjs.com/package/prop-types) permettant de vérifier le type des props (`npm install prop-types`).

Ce module s'utilise en dehors du composant en définissant un type pour chaque prop. [Plus d'infos](https://blog.logrocket.com/validate-react-props-proptypes/)

```javascript
import PropTypes from "prop-types"

export default function PercentageStat({ label, showAlert, score, total = 1 }) {
  return <div onMouseEnter={showAlert}><span>{label}:{ Math.round(score / total * 100) }%</span></div>
}

PercentageStat.propTypes = {
  score: PropTypes.number.isRequired,
  total: PropTypes.number,
  label: PropTypes.string,
  showAlert: PropTypes.func
}
```

## 8. Test

<https://grafikart.fr/tutoriels/react-test-2158>

- - -

### Mise en place de l'environnement

Plusieurs bibliothèques de test existent, la plus connue étant *Jest* mais dans le cadre de *Vite* nous allons utiliser *Vitest* inclus avec ce dernier qui fournit plusieurs fonctions permettant de tester du code Javascript.

La bibliothèque *React Testing Library*, quant à elle, nous permettra de tester des spécificités React comme des composants ou des hooks mais également les interactions utilisateurs.

```shell
npm install -D vitest @testing-library/react @testing-library/user-event jsdom
```

Il faut également dire à *Vite* d'utiliser l'environnement *jsdom* pour les tests en modifiant le fichier `vite.config.js`. Cet environnement est nécessaire si l'on souhaite tester des caractéristiques liées au navigateur comme le DOM. Pour exécuter des fonctions après ou avant chaque test, on peut aussi ajouter un fichier de configuration via le champ `setupFiles`.

```javascript
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "./setupTest.js"
  }
```

```javascript
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => {
      cleanup()
})
```

- - -

Il faut ensuite ajouter une recette dans le `package.json` pour pouvoir lancer les futurs tests avec la commande `npm run test`.

```json
{
  //...
  "scripts": {
    //...
    "test": "vitest"
  }
}
```

Tout est prêt pour pouvoir tester notre application React.

On nommera nos fichiers de test de la manière suivante `*.test.js` ou `*.test.jsx` afin d'être détectés par *Vitest*.

- - -

### Tester des hooks

`describe` groupe des tests similaires afin d'améliorer la lisibilité des résultats de test. On lui fournit donc une description pour expliciter ce que l'on teste.

`test` ou son alias `it` définit un test individuel et un nom pour celui-ci.

`expect` compare le résultat réel au résultat attendu.

```javascript
import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";

describe('useIncrement', () => {
      it('should increment value', () => {
            const { result } = renderHook(() => useIncrement({ base: 5 }))
            act(() => result.current.increment())
            expect(result.current.count).toBe(6)
      })
})
```

Pour rappel, un hook ne s'utilise qu'à l'intérieur d'un composant, c'est là que `renderHook` et `act` fournies par *RTL* entrent en jeu. `renderHook` retourne le résultat du hook dans un champ `result.current` qu'on utilise pour vérifier son bon fonctionnement. `act` permet d'agir sur celui-ci.

- - -

### Tester des composants

#### Tester le rendu

Afin de tester qu'un composant s'affiche toujours de la même manière, la méthode `render` provenant de *RTL* nous permet de générer l'arbre DOM de ce dernier dans un objet `container` qu'on peut ensuite comparer à un *snapshot* grâce à la fonction `toMatchSnapshot`.

```javascript
import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import Alert from "./Alert"

describe("<Alert>", () => {
  it("should render correctly", () => {
    const { container } = render(<Alert type="danger">Erreur</Alert>)
    expect(container.firstChild).toMatchSnapshot()
  })
})
```

**Attention :** `toMatchSnapshot` génère une copie de l'arbre du composant concerné lors de la première exécution du test, lorsque le composant est modifié après coup, le test ne passera plus et il faudra mettre à jour le *snapshot*. On peut ne vérifier qu'une partie du composant en sélectionnant des enfants en particulier. Ici, par exemple, on utilise `firstChild`.

- - -

### Tester une interaction utilisateur

La librairie *RTL user-event* va nous permettre de simuler des interactions utilisateurs. Par exemple `userEvent.click` simule un clic et prend en paramètre l'élément sur lequel appuyer.

Ici on veut sélectionner un bouton « Fermer » qui désaffiche le composant. Pour ça on utilise `screen` qui permet de parcourir le DOM.

```javascript
import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { describe, it, expect } from "vitest"
import Alert from "./Alert"

describe("<Alert>", () => {
  it("should close the alert on click", async () => {
    const { container } = render(<Alert type="danger">Erreur</Alert>)
    await userEvent.click(screen.getByText("Fermer"))
    expect(container.firstChild).toBeNull()
  })
})

```

**Attention :** Un événement utilisateur est une promesse et doit donc être attendue grâce à `await`.

- - -

## 9. Formulaires

<https://grafikart.fr/tutoriels/formulaires-react-1317>

- - -

En React il existe deux types de formulaires, les **formulaires contrôlés** et les **formulaires non-contrôlés**. Quand on parle de contrôlé on sous entend contrôlé par React.

### Quand utiliser l'un, quand utiliser l'autre ?

**Cela dépend de la situation.**

Il peut être parfois largement suffisant d'utiliser un formulaire non contrôlé lorsque l'on souhaite simplement récupérer les informations entrées par l'utilisateur lorsque celui-ci les soumet.

Par contre si on veut modifier l'interface selon ce que tape l'utilisateur ou lui renvoyer un retour en direct pour l'avertir de la force du mot de passe qu'il tape par exemple, un formulaire contrôlé est nécessaire.

- - -

### Les formulaires non contrôlés

Si un formulaire n'est pas contrôlé, il est contrôlé non pas par React mais par le DOM directement. Il faut le gérer comme on le ferait classiquement en Javascript. Un formulaire n'est pas géré lorsqu'il n'a pas de balise `value` dans ses champs d'entrée utilisateur.

```javascript
export default function Form() {
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(e.target.name.value)
  }
  return <form onSubmit={handleSubmit}>
    <input type="text" name="name" defaultValue="Défaut"/>
    <input type="checkbox" name="check"/>
    <button type="submit">Envoyer</button>
  </form>
}
```

Ici, on a donc de simples entrées utilisateur dont le résultat sera récupéré à la soumission du formulaire par l'utilisateur.

- - -

### Les formulaires contrôlés

Pour qu'un formulaire soit contrôlé, il faut utiliser la balise `value` (ou `checked` pour des cases à cocher) associé à la balise `onChange` pour rendre le champ modifiable. Un formulaire contrôlé associe donc une entrée utilisateur à un état React.

```javascript
export default function Form() {
  const [text, setText] = useState("")
  const [checked, setChecked] = useState(false)
  const handleChange = (e) => { setText(e.target.value)}
  const toggleCheck = () => { setChecked(!checked) }
  const handleSubmit = (e) => { e.preventDefault(); console.log("envoyé")}
  return <form onSubmit={handleSubmit}>
    <input type="text" value={text} onChange={handleChange}/>
    <input type="checkbox" checked={checked} onChange={toggleCheck} />
    <button type="submit" disabled={!checked}>Envoyer</button>
  </form>
}
```

Les valeurs `text` et `checked` sont donc modifiées en direct et on peut par exemple vérifier la validité d'un courriel, ou le cochage préalable d'une case.

**Attention :** `value` ne peut être `undefined`, sinon React considère l'entrée comme non contrôlée.

- - -

## 10. Style

- - -

Il existe plusieurs approches pour ajouter du style à son application React.

Certaines de ces approches sont *scopées*, d'autres non. C'est à dire que certains styles ne vont s'appliquer que dans les composants qui les importent, d'autres s'appliqueront à l'application entière.

* Faire du *Inline styling* en incorporant le CSS directement dans les balises JSX via le prop `style` (*scopée* mais limitée)
* Écrire du CSS classiquement et l'utiliser via le prop `className` (globale)
* Utiliser des *CSS modules* qui permettent de limiter la portée de ses fichiers CSS (*scopée*)
* Faire du *CSS in JS* qui permet d'écrire du style en Javascript (*scopée*)

[Différentes approches pour styliser son app React](https://blog.logrocket.com/styling-react-5-ways-style-react-apps/)

[Scoper son CSS](https://www.upbeatcode.com/react/css-scoping-in-react-everything-you-need-to-know/)

- - -

### Style *inline*

Il est définie dans le prop `style` de nos éléments en y fournissant un objet reprenant une syntaxe CSS.

```javascript
export default function Button() {
  return <button
    style={{ backgroundColor: "#25d366", padding: "16px", color: "white" }}
  >Confirmer</button>
}
```

On peut faire la même chose en utilisant des variables.

```javascript
export default function Button() {
  const style = {
    backgroundColor: "#25d366",
    padding: "16px",
    color: "white"
  }
  return <button style={style}>Confirmer</button>
}
```

Cette approche, bien que *scopée*, a le gros désavantage d'être limitée dans le CSS que l'on peut utiliser. Impossible de faire usage de pseudo-classes par exemple.

- - -

### Méthode classique

Il est tout à fait possible d'écrire des fichiers CSS séparément en définissant des noms de classes.

```css
.button {
  background-color: #25d366;      border-radius: 1rem;      border: none;
  padding: 16px;                  color: white;
}
```

Puis d'importer ces fichiers dans un composant et utiliser les classes grâce au prop className.

```javascript
import "./button.css"

export default function Button() {
  return <button className="button">Confirmer</button>
}
```

Cependant, même s'ils ne sont pas importés dans les autres composants explicitement, les styles définis dans `button.css` sont accessibles de partout (pas seulement dans notre composant `<Button>`). Cette approche est donc globale. La réutilisation involontaire de noms de classe pourrait être source d'erreurs.

- - -

### Modules CSS

Les [modules CSS](https://github.com/css-modules/css-modules) ne sont pas une fonctionnalité native de React, il faut utiliser un outil qui les gèrent ou en installer un. *Vite* par exemple gère les modules CSS nativement.

En général, une convention de nommage permet d'utiliser ces modules CSS. Ce sont de simples fichiers CSS dont le nom se termine par `*.module.css`.

```css
.button {
  background-color: #25d366;      border-radius: 1rem;      border: none;
  padding: 16px;                  color: white;
}
```

On importe ensuite un objet dans notre composant qui nous permet d'utiliser les classes définies.

```javascript
import classes from "./button.module.css"

export default function Button() {
  return <button className={classes.button}>Confirmer</button>
}
```

Nos styles sont donc limités aux fichiers qui importent et utilisent cet objet.

- - -

### *CSS in JS*

Il existe plusieurs solutions qui permettent de faire ça, notamment ***[styled-components](https://styled-components.com/)*** que nous allons voir.

```shell
npm install styled-component
```

L'objet `styled` importé permet de redéfinir les balises ainsi que nos propres composants en y appliquant un style par dessus.

```javascript
import styled from 'styled-components';

export default function Button() {
  const StyledButton = styled.button`
    background-color: #25d366;
    padding: 16px;
    color: white;
    border: none;
    border-radius: 1rem;
  `
  return <StyledButton>Confirmer</StyledButton>
}
```

On réutilise alors `StyledButton` dans notre JSX comme s'il s'agissait d'un nouveau composant.

- - -

### Quoi utiliser ?

React n'a pas d'avis sur comment nous devons styliser nos composants. La manière de faire dépend donc de notre besoin. Cependant il faut retenir plusieurs choses importantes.

Les styles *inline* sont moins performants que l'utilisation de classes CSS. Ils sont également limités dans le code CSS utilisable (pas de pseudo-classes etc.)

Certaines approches sont *scopées* d'autres globales. Il faut faire attention avec celles qui sont globales pour ne pas appliquer de styles involontairement.

Il est tout à fait possible d'utiliser un mélange de plusieurs de ces approches précédemment citées.



- - -

## Fin

[Documentation](https://react.dev/) · [GitHub](https://github.com/facebook/react) · [Showcases](https://reactshowcase.com/)