# Real Estate Frontend

Frontend React pour l'application Real Estate Scraper.

## Installation

```bash
npm install
```

## Développement

```bash
npm run dev
```

L'application sera disponible sur `http://localhost:3000`

## Build

```bash
npm run build
```

## Fonctionnalités

- 🏠 Affichage des annonces immobilières
- 🔍 Recherche et filtrage
- 📱 Design responsive
- 🎨 Interface moderne et intuitive
- 🔗 Intégration API Heroku

## Structure du projet

```
src/
├── components/
│   ├── Header.tsx
│   ├── SearchBar.tsx
│   ├── ListingCard.tsx
│   └── Footer.tsx
├── App.tsx
├── App.css
└── index.tsx
```

## API

L'application se connecte à l'API Heroku :
- Base URL: `https://omnivation-api-81002a93597c.herokuapp.com`
- Endpoints: `/api/listings`, `/api/agencies`, etc.

## Technologies

- React 19
- TypeScript
- Webpack
- CSS3
