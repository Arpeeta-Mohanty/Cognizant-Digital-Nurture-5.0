@echo off
REM ============================================================
REM Git Exercise 1 - Setup, Init, and First Commit
REM Run this script from any directory to practice Exercise 1
REM ============================================================

echo === Step 1: Verify Git Installation ===
git --version

echo.
echo === Step 2: Configure User Identity ===
REM Replace with your actual name and email
git config --global user.name "Student Name"
git config --global user.email "student@example.com"

echo.
echo === Step 3: Create Aliases ===
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.lg "log --oneline --graph --decorate --all"

echo.
echo === Step 4: View All Config ===
git config --list

echo.
echo === Step 5: Initialize Repository ===
mkdir exercise1-repo
cd exercise1-repo
git init

echo.
echo === Step 6: Create welcome.txt ===
(
echo Welcome to Git!
echo This is my first repository.
echo Created as part of Cognizant Digital Nurture 5.0 - Week 8.
) > welcome.txt

echo.
echo === Step 7: Check Status (Untracked) ===
git status

echo.
echo === Step 8: Stage the File ===
git add welcome.txt
git status

echo.
echo === Step 9: First Commit ===
git commit -m "Initial commit: add welcome.txt"

echo.
echo === Step 10: View Log ===
git log --oneline

echo.
echo === Exercise 1 Complete! ===
pause
