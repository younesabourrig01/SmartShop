# SmartShop

SmartShop est une application web **full stack** développée avec **React** pour le frontend et **Laravel** pour le backend.

---

## Technologies utilisées

### Frontend

- React
- Tailwind css
- Axios

### Backend

- Laravel
- sqlite
- API REST

---

## Objectifs du projet

- Comprendre l’architecture full stack
- Créer et consommer une API REST avec Laravel
- Gérer la communication entre React et Laravel

---

## Fonctionnalités prévues

- Affichage des produits
- Ajout / modification / suppression (CRUD)
- Communication via API
- Interface simple et responsive

---

## Installation et lancement du projet

### Backend (Laravel)

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

### Frontend (React)

```bash
cd frontend
npm install
npm run dev
```
