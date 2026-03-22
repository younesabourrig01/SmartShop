@echo off
echo Stopping all services...

taskkill /F /IM php.exe
taskkill /F /IM node.exe
taskkill /F /IM go.exe
taskkill /F /IM server.exe

echo Done
pause