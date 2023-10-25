# Introduction

## Prérequis :

- Extension Prettier
- Extension Tailwind CSS IntelliSense

## Utilisation de l'import @
@ est un alias pour le dossier src. Il permet d'importer des fichiers en partant du dossier src, sans avoir à utiliser des ../../../../

## Utilisation de Prettier
Prettier est un formateur de code. Il permet de mettre en forme le code. Je vous recommande d'activer l'options "Format on save" dans les paramètres de VSCode.

## Setup

### Installer les packages

Après avoir cloné le projet ou avoir pull des modifications :
```bash
npm install
```

Supprimer les packages non utilisés (Optionel) :
```bash
npm prune
```

# Organiser le projet
## Pages

Créez un dossier pour votre page dans src/pages. Puis créez un fichier **index.tsx** pour votre page dans ce dossier **(nom en camelCase)**.

**Exemple :**
Dans src/pages/signup,créez un fichier index.tsx :
```tsx
export default function SignupPage() {
  return (
    <div>
      <h1>Login</h1>
    </div>
  );
}
```

Ensuite importez le dans src/App.tsx :
```tsx
import SignupPage from "./pages/signup";
/* Reste du code ... */

<Router>
    <Routes>
        {/* path = url de la page, element = contenu que l'on souhaite afficher sur cet URL */}
        <Route path="/signup" element={<SignupPage />} />
    </Routes>
</Router>
/* Reste du code ... */
```

***Si vous voulez créer une page sur le lien /series/:serie où /series est la page pour toutes les séries et /series/:serie est la page pour une série spécifique, créez un fichier index.tsx dans src/pages/series pour la page  de toutes les series et un fichier index.tsx dans src/pages/series/serie pour la page d'une série spécifique.***

## Components

Si vous souhaitez créer un composant qui sera utilisé dans plusieurs pages, crééz un fichier .tsx dans src/components **(nom en PascalCase)** :

Si vous souhaitez organiser votre code, et créer un composant qui sera utilisé dans une SEULE page spécifique, crééz un fichier .tsx dans le dossier de la page **(nom en PascalCase)** :

**Exemple :**
Dans src/components, il y a un composant Header.tsx :
```tsx
export default function Header() {
  return (
    <header>
      <h1>Header</h1>
    </header>
  );
}
```

Et dans src/pages/login, il y a un composant SuperLoginButton.tsx :
```tsx
export default function SuperLoginButton() {
  return (
    <button>
      Super Login Button
    </button>
  );
}
```

## Hooks

Si vous souhaitez créer un hook, qui sera utilisé dans plusieurs fichiers crééz un fichier .ts dans src/hooks **(nom sous la form useNomDuHook)** :

Si vous souhaitez organiser votre code, et créer un hook qui sera utilisé dans une SEULE page spécifique, crééz un fichier .ts dans le dossier de la page **(nom sous la forme useNomDuHook)** :

**Exemple de nommage :**

- useCounter.ts

### Exporter et importer un hook

Pour exporter un hook, je vous recommande de l'exporter depuis le fichier index.ts, puis de l'importer dans votre page/composant depuis le dossier src/hooks :

**Exemple :**
J'ai un hook useCounter dans src/hooks/useCounter.ts :
```ts
export function useCounter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount((prevCount) => prevCount + 1);
  const decrement = () => setCount((prevCount) => prevCount - 1);

  return { count, increment, decrement };
}
```


Dans src/hooks/index.ts, j'exporte useCounter :
```ts
export * from "./useCounter";
/* OU */
export { useCounter } from "./useCounter";
/* * exporte tout ce qui est exporté dans le fichier useCounter */
```

Dans src/pages/login/login.tsx, j'importe useCounter :
```tsx
import { useCounter } from "../../hooks";
/* Reste du code ... */

export default function LoginPage() {
  const { count, increment, decrement } = useCounter();
  // Reste du code ...
}
/* Reste du code ... */
```

## Types

Si vous souhaitez créer un type, crééz un fichier .ts dans src/types **(nom en PascalCase)**

### Exporter et importer un type

Pour exporter un type, je vous recommande de l'exporter depuis le fichier index.ts, puis de l'importer dans votre page/composant depuis le dossier src/types :

**Exemple :**
Dans src/types, il y a un fichier User.ts :
```ts
export interface User = {
  id: number;
  name: string;
  email: string;
};
```

Dans src/types/index.ts, j'exporte User :
```ts
export * from "./User";
/* OU */
export { User } from "./User";
```

Dans src/pages/login/login.tsx, j'importe User :
```tsx
import { User } from "../../types";

// Création d'une variable de type user
const user: User = {
  id: 1,
  name: "John Doe",
  email: "johndoe@gmail.com"
};
/* Reste du code ... */
```

## Fonctions utilitaires (Utils)
Dans src/lib il y a un fichier utils.ts. Dedans ce trouve des fonctions utilitaires qui peuvent être utilisées d'autres fichiers.

Vous pouvez ajouter vos propres fonctions utilitaires dans ce fichier, ou créer un autre fichier utilitaire en .ts dans src/lib **(nom en camelCase)**.

# Utilisation de Tailwind CSS

Tailwind génère automatiquement du CSS en fonction des classes que vous appliquez à vos éléments HTML.

**Exemple :**
```tsx
<h1 className="text-2xl font-bold text-center text-blue-500">Hello World</h1>
```
Ce titre sera en gras, centré, de taille 2xl et de couleur bleu.
Le CSS généré sera :
```css
h1 {
  font-weight: 700;
  text-align: center;
  font-size: 1.5rem;
  color: #3b82f6;
}
```

**L'extension Tailwind CSS IntelliSense permet d'avoir une autocomplétion des classes Tailwind.**

***Pour plus d'informations sur Tailwind CSS : https://tailwindcss.com/docs***

Par exemple si vous ne savez pas quels sont les classes en rapport avec les bordures, cherchez "border" dans la documentation tailwind, et vous aurez toutes les classes en rapport avec la propriété border de CSS.

***Il est possible de combiner des classes CSS avec des classes Tailwind. Cependant les propriétés de Tailwind écrasent celles de CSS***

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
