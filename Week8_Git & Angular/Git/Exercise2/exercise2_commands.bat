@echo off
REM ============================================================
REM Git Exercise 2 - .gitignore
REM ============================================================

echo === Setting up demo repository ===
mkdir exercise2-repo
cd exercise2-repo
git init
git config user.name "Student Name"
git config user.email "student@example.com"

echo.
echo === Creating files that should be ignored ===
mkdir logs
mkdir backup
echo Error log entry > error.log
echo App log entry > app.log
echo Log inside folder > logs\server.log
echo Backup data > backup\data.bak
echo Real source file > main.js

echo.
echo === Status BEFORE .gitignore ===
git status

echo.
echo === Creating .gitignore ===
(
echo # Ignore all log files
echo *.log
echo.
echo # Ignore the logs directory
echo logs/
echo.
echo # Ignore the backup directory
echo backup/
) > .gitignore

echo.
echo === Status AFTER .gitignore ===
git status

echo.
echo === Checking which rule ignores app.log ===
git check-ignore -v app.log

echo.
echo === Committing .gitignore and main.js ===
git add .gitignore main.js
git commit -m "Add .gitignore: ignore logs and backup"

echo.
echo === Final status (should be clean) ===
git status

echo.
echo === Exercise 2 Complete! ===
pause
