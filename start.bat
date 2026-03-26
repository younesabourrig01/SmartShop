@echo off
echo Starting SMARTSHOP services...

:: Frontend
cd frontend
start cmd /k npm run dev
cd ..

:: Backend
cd backend
start cmd /k php artisan serve
cd ..

:: Password Generator
cd passwordGenerator
start cmd /k go run main.go
cd ..

echo All services started!
pause