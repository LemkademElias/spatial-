import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Fonction pour créer un dossier s'il n'existe pas
function createFolder(folderPath) {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
    console.log(`📁 Créé : ${folderPath}`);
  }
}

// Fonction pour créer un fichier vide
function createFile(filePath) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '');
    console.log(`📄 Créé : ${filePath}`);
  }
}

// Initialisation du projet
console.log('🔧 Initialisation de npm...');
execSync('npm init -y', { stdio: 'inherit' });

// Installation des packages
console.log('📦 Installation de sass, bootstrap, fontawesome...');
execSync('npm install sass bootstrap @fortawesome/fontawesome-free', { stdio: 'inherit' });

// Création des dossiers
createFolder('public/assets/webfonts');
createFolder('public/img');
createFolder('public/styles');
createFolder('src/scss/partials');

// Fichiers CSS
createFile('public/styles/style.css');
createFile('public/styles/style.css.map');

// Fichiers partials
const partials = [
  '_base.scss', '_footer.scss', '_header.scss', '_icons.scss',
  '_mixins.scss', '_navbar.scss', '_responsive.scss',
  '_section1.scss', '_section2.scss', '_section3.scss',
  '_section4.scss', '_variables.scss'
];
partials.forEach(file => createFile(`src/scss/partials/${file}`));

// Fichier main.scss avec les @use
const mainScssContent = `@use "partials/variables";
@use "partials/mixins";
@use "partials/base";
@use "partials/navbar";
@use "partials/header";
@use "partials/section1";
@use "partials/section2";
@use "partials/section3";
@use "partials/section4";
@use "partials/footer";
@use "partials/icons";
@use "partials/responsive";
`;
fs.writeFileSync('src/scss/main.scss', mainScssContent);

// .gitignore
fs.writeFileSync('.gitignore', 'node_modules/\n');

// index.html de base
const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Projet Spatial</title>
  <link rel="stylesheet" href="public/styles/style.css" />
  <link rel="stylesheet" href="./node_modules/bootstrap/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="./node_modules/@fortawesome/fontawesome-free/css/all.min.css">
</head>
<body>

  <!-- NAVBAR + HERO viendront ici -->

</body>
</html>
`;
fs.writeFileSync('index.html', html);

// Ajout d’un script Sass dans package.json
const packageJsonPath = './package.json';
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
packageJson.scripts = {
  ...packageJson.scripts,
  "sass": "sass src/scss/main.scss public/styles/style.css --watch"
};
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log('✅ Projet prêt ! Lance `npm run sass` pour compiler Sass en temps réel !');
