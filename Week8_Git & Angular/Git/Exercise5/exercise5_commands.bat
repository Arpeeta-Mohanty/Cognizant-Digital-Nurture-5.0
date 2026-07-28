@echo off
REM ============================================================
REM Git Exercise 5 - Remote Repository (Push and Pull)
REM Replace YOUR_GITHUB_URL with your actual repository URL
REM ============================================================

set REMOTE_URL=https://github.com/username/repo-name.git

echo === Step 1: Verify clean master ===
git status

echo.
echo === Step 2: List all branches ===
git branch -a
git branch -v

echo.
echo === Step 3: Check remote configuration ===
git remote -v

echo.
echo === Step 4: Add remote (if not already added) ===
REM Uncomment the next line if remote is not configured:
REM git remote add origin %REMOTE_URL%

echo.
echo === Step 5: Pull latest changes ===
git pull origin master

echo.
echo === Step 6: Make a local change ===
echo Week 8 complete! > progress.txt
git add progress.txt
git commit -m "Add progress.txt: Week 8 complete"

echo.
echo === Step 7: Push to remote ===
git push origin master

echo.
echo === Step 8: Verify with log ===
git log --oneline --graph --decorate --all

echo.
echo === Exercise 5 Complete! ===
pause
