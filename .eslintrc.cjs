// Config ESLint du site — format eslintrc (ESLint 8), en .cjs car le dépôt est
// `"type": "module"`. Le script `npm run lint` appelle eslint directement
// (`next lint` n'existe plus en Next 16), d'où `eslint-config-next` en 15.x :
// la 16.x impose ESLint 9 + flat config, incompatible avec `--ext ts,tsx`.
module.exports = {
  root: true,
  extends: ['next/core-web-vitals', 'next/typescript'],

  ignorePatterns: [
    'node_modules/',
    '.next/',
    'out/',
    'public/',
    '.netlify/',
    // Sauvegardes de l'ancienne page publicité, importées nulle part : elles
    // portent 6 violations `rules-of-hooks` qu'il serait vain de corriger dans
    // du code mort. À supprimer un jour plutôt qu'à maintenir.
    'components/ServicePages/publicite-backup.tsx',
    'components/ServicePages/publicite-full-backup.tsx',
  ],

  rules: {
    // Désactivées volontairement : elles ne signalent pas de défaut ici, et les
    // activer imposerait de réécrire tout le codebase existant.
    //
    // 294 occurrences — apostrophes et guillemets du contenu éditorial français
    // écrits directement en JSX. Purement cosmétique, aucun risque de rendu.
    'react/no-unescaped-entities': 'off',
    // 156 occurrences — dette de typage héritée. À réduire fichier par fichier,
    // pas en une passe automatique.
    '@typescript-eslint/no-explicit-any': 'off',
    // 10 occurrences — <img> délibérés (images Drive, logos externes) que
    // next/image ne sait pas servir sans reconfigurer les domaines distants.
    '@next/next/no-img-element': 'off',

    // Alignée sur les conventions déjà en place dans le dépôt : un nom préfixé
    // d'un `_` est intentionnellement inutilisé, et le rest-destructuring sert
    // à retirer des clés d'un objet (`const { a, b, ...reste } = obj`).
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
  },
}
