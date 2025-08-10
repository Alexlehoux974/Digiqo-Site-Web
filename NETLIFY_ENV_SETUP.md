# Configuration des Variables d'Environnement pour Netlify

## Variables requises pour l'intégration Airtable des témoignages

### 1. AIRTABLE_PAT (Obligatoire)
**Description**: Token d'accès personnel (Personal Access Token) pour l'API Airtable

**Comment l'obtenir**:
1. Connectez-vous à votre compte Airtable
2. Allez sur https://airtable.com/create/tokens
3. Cliquez sur "Create new token"
4. Donnez un nom au token (ex: "Digiqo Website")
5. Dans "Scopes", sélectionnez:
   - `data.records:read` (lecture des enregistrements)
6. Dans "Access", ajoutez:
   - La base "Témoignage Clients" (appH46IBnNdYNrwZ9)
7. Créez le token et copiez-le immédiatement (il ne sera plus visible après)

### 2. AIRTABLE_BASE_ID (Optionnel)
**Valeur par défaut**: `appH46IBnNdYNrwZ9`
**Description**: ID de la base Airtable "Témoignage Clients"
- Normalement, vous n'avez pas besoin de modifier cette valeur
- L'ID est déjà configuré pour pointer vers votre base existante

### 3. AIRTABLE_TABLE_ID (Optionnel)
**Valeur par défaut**: `tbloGgkShulfnYDCw`
**Description**: ID de la table contenant les témoignages (Table 1)
- Normalement, vous n'avez pas besoin de modifier cette valeur
- L'ID est déjà configuré pour pointer vers la bonne table

## Configuration dans Netlify

### Étapes de configuration:

1. **Accédez aux paramètres du site**:
   - Connectez-vous à Netlify
   - Sélectionnez votre site
   - Allez dans "Site configuration" > "Environment variables"

2. **Ajoutez les variables**:
   - Cliquez sur "Add a variable"
   - Sélectionnez "Add a single variable"
   
3. **Configurez AIRTABLE_PAT** (OBLIGATOIRE):
   - Key: `AIRTABLE_PAT`
   - Value: `[Votre token Airtable]`
   - Scopes: Laissez sur "All scopes"
   
4. **Optionnel - Si vous utilisez une base différente**:
   - AIRTABLE_BASE_ID: `[ID de votre base]`
   - AIRTABLE_TABLE_ID: `[ID de votre table]`

5. **Redéployez le site**:
   - Les variables d'environnement sont prises en compte au prochain build
   - Déclenchez un nouveau déploiement depuis Netlify ou via un push Git

## Structure des données Airtable

La table doit contenir les champs suivants:
- **Nom d'entreprise** (text): Nom de l'entreprise cliente
- **Témoignage écrit** (long text): Le texte du témoignage
- **Vidéos** (text): Lien vers la vidéo Instagram (optionnel)
- **Url Image** (text): URL de l'image/logo de l'entreprise (optionnel)
- **Date de création** (created time): Date automatique de création

## Comportement du système

### Avec les variables configurées:
- Les témoignages sont récupérés dynamiquement depuis Airtable
- Mise à jour automatique quand vous modifiez les données dans Airtable
- Cache de 1 heure pour optimiser les performances

### Sans les variables (fallback):
- Le site utilise automatiquement les témoignages statiques définis dans le code
- Aucune erreur n'est affichée aux utilisateurs
- Permet de déployer le site même sans configuration Airtable

## Test local

Pour tester localement:
1. Créez un fichier `.env.local` à la racine du projet
2. Copiez le contenu de `.env.local.example`
3. Ajoutez votre token Airtable
4. Relancez le serveur de développement: `npm run dev`

## Troubleshooting

### Les témoignages ne s'affichent pas:
1. Vérifiez que le token a les bonnes permissions
2. Vérifiez que la base et la table ID sont correctes
3. Consultez les logs Netlify Functions pour voir les erreurs

### Erreur 401 Unauthorized:
- Le token est invalide ou expiré
- Créez un nouveau token sur Airtable

### Erreur 404 Not Found:
- L'ID de la base ou de la table est incorrect
- Vérifiez les IDs dans l'URL Airtable de votre base