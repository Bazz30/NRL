@echo off
echo NRL Fantasy Data Updater
echo ========================
echo.

cd /d "%~dp0"

echo Installing dependencies...
call npm install

echo.
echo Starting data update...
node config-scraper.js all

echo.
echo Data update complete!
pause 