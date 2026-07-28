@echo off
REM ============================================================
REM Git Exercise 3 - Branching and Merging
REM ============================================================

echo === Setting up repository ===
mkdir exercise3-repo
cd exercise3-repo
git init
git config user.name "Student Name"
git config user.email "student@example.com"

echo Initial content > welcome.txt
git add .
git commit -m "Initial commit: add welcome.txt"

echo.
echo === Current branches ===
git branch

echo.
echo === Create and switch to GitNewBranch ===
git checkout -b GitNewBranch
git branch

echo.
echo === Add files on GitNewBranch ===
echo Feature A content > feature-a.txt
echo Feature B content > feature-b.txt
git add .
git status

echo.
echo === Commit on GitNewBranch ===
git commit -m "Add feature-a and feature-b on GitNewBranch"

echo.
echo === Switch back to master ===
git checkout master
dir

echo.
echo === Diff between master and GitNewBranch ===
git diff master GitNewBranch

echo.
echo === Merge GitNewBranch into master ===
git merge GitNewBranch

echo.
echo === Graph log ===
git log --oneline --graph --decorate --all

echo.
echo === Delete GitNewBranch ===
git branch -d GitNewBranch

echo.
echo === Final branch list ===
git branch

echo.
echo === Exercise 3 Complete! ===
pause
