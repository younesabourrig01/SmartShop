# 🛒 SmartShop - Full Stack E-commerce Application

SmartShop is a full-stack e-commerce web application built with **React (Frontend)** and **Laravel (Backend)**, with an additional **Go microservice**.

---

## Technologies Used

### Frontend

* React
* TypeScript
* Tailwind CSS
* Axios
* React Hot Toast
* React Loader Spinner

### Backend

* Laravel
* SQLite
* REST API
* Laravel Sanctum (Authentication)

### Microservice

* Go (Golang)
* Runs on **http://localhost:8080**
* Go install required (go here if you dont have installet yet : **https://go.dev/** )
---

## Project Goals

* Understand full-stack architecture
* Build and consume REST APIs
* Manage communication between frontend and backend
* Introduce microservices architecture (Laravel ↔ Go ↔ React)

---

## Main Features

### E-commerce Core

* Products management (CRUD + multiple images)
* Categories management (with images)
* Shopping cart system
* Wishlist system
* Orders & checkout system
* Invoice generation (PDF)

### Authentication & Users

* Login & registration
* OTP email verification
* User roles (Admin / User)
* Profile management (with image)

### Extra Features

* Reviews & ratings
* Multi-language support
* Dark mode
* Product filtering & pagination
* Admin dashboard
* Daily reports (PDF export for admin)

### Microservice

* Password generator built with Go
* Connected via API Gateway
* Runs separately on port **8080**

---

## Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/younesabourrig01/SmartShop-Projet-Stage.git
cd SmartShop-Projet-Stage
```

---

## Backend (Laravel)

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

-> Backend runs on:

```
http://127.0.0.1:8000
```

---

## Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

---

## Microservice (Go)

```bash
cd passwordGenerator
go run main.go
```

-> Microservice runs on:

```
http://localhost:8080
```

Make sure this service is running before using password generator features.

---

## System Architecture

* React → consumes Laravel API
* Laravel → handles business logic & database
* Go Microservice → handles password generation
* Communication via REST APIs

---

## Project Structure

* `backend/` → Laravel API
* `frontend/` → React app
* `passwordGenerator/` → Go microservice

---

## Demo Data

Run:

```bash
php artisan migrate --seed
```
---
## Quick Start (Windows Only)

To make development easier, this project includes **batch scripts** to start and stop all services.

### Start All Services

```bash
start.bat
```
or
```bash
.\start.bat
```

This will automatically:

* Start Laravel backend
* Start React frontend
* Start Go microservice (port 8080)

---

### Stop All Services

```bash
stop.bat
```
or 
```bash
.\stop.bat
```
This will stop all running services.
---

📌 **Note:**

* Make sure you run these scripts from the project root directory
* Windows only (because `.bat` files)
* If any service fails, you can still run it manually.

## License

This project was developed as an internship project for educational purposes.