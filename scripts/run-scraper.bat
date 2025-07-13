@echo off
echo Starting NRL Data Scraper...
cd /d "%~dp0"
npm run update:all
echo Scraper finished!
pause 