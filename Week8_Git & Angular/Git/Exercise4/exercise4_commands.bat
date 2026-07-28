@echo off
REM ============================================================
REM Git Exercise 4 - Merge Conflicts
REM ============================================================

echo === Setting up repository ===
mkdir exercise4-repo
cd exercise4-repo
git init
git config user.name "Student Name"
git config user.email "student@example.com"

echo.
echo === Create hello.xml on master ===
(
echo ^<?xml version="1.0" encoding="UTF-8"?^>
echo ^<root^>
echo     ^<greeting^>Hello World^</greeting^>
echo     ^<author^>Student^</author^>
echo ^</root^>
) > hello.xml
git add hello.xml
git commit -m "Add hello.xml with Hello World greeting"

echo.
echo === Create feature-greeting branch ===
git checkout -b feature-greeting

echo.
echo === Modify hello.xml on feature-greeting ===
(
echo ^<?xml version="1.0" encoding="UTF-8"?^>
echo ^<root^>
echo     ^<greeting^>Hello Universe^</greeting^>
echo     ^<author^>Student^</author^>
echo ^</root^>
) > hello.xml
git add hello.xml
git commit -m "Change greeting to Hello Universe on feature-greeting"

echo.
echo === Switch to master and modify hello.xml ===
git checkout master
(
echo ^<?xml version="1.0" encoding="UTF-8"?^>
echo ^<root^>
echo     ^<greeting^>Hello Everyone^</greeting^>
echo     ^<author^>Student^</author^>
echo ^</root^>
) > hello.xml
git add hello.xml
git commit -m "Change greeting to Hello Everyone on master"

echo.
echo === Attempt merge (will conflict) ===
git merge feature-greeting

echo.
echo === hello.xml now has conflict markers - open and resolve manually ===
echo After resolving, run:
echo   git add hello.xml
echo   git commit -m "Resolve merge conflict in hello.xml"
echo   git branch -d feature-greeting
echo   git log --oneline --graph --decorate --all
pause
