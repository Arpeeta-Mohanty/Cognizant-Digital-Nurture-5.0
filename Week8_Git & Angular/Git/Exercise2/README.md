# Git Exercise 2 — .gitignore

## Objective
Create a .gitignore file to exclude log files, log directories,
and backup directories from version control.

---

## Why .gitignore?

Git tracks every file in a repository by default.
Some files should NEVER be committed:
  - Log files (*.log) — generated at runtime, not source code
  - Build output (dist/, build/) — can be regenerated
  - Secrets (.env) — contain passwords/API keys
  - OS files (.DS_Store, Thumbs.db) — machine-specific
  - Dependency folders (node_modules/) — too large, reinstallable

---

## Step 1: Check Status Before .gitignore

First, create some files that should be ignored:

```bash
mkdir logs
mkdir backup
echo "Error log entry" > error.log
echo "App log entry" > app.log
echo "Log inside folder" > logs/server.log
echo "Backup data" > backup/data.bak
echo "Real source file" > main.js
```

Now check status:

```bash
git status
```

Expected Output (everything shows as untracked):
  Untracked files:
    app.log
    backup/
    error.log
    logs/
    main.js

---

## Step 2: Create .gitignore

Create a file named exactly: .gitignore (no extension)

```bash
# Ignore all .log files anywhere in the repo
*.log

# Ignore the entire logs/ directory
logs/

# Ignore the entire backup/ directory
backup/
```

---

## Step 3: Check Status After .gitignore

```bash
git status
```

Expected Output (log files and folders are now hidden):
  Untracked files:
    .gitignore
    main.js

Explanation:
  Git now ignores app.log, error.log, logs/, and backup/.
  Only .gitignore itself and main.js appear as untracked.

---

## Step 4: Commit .gitignore

```bash
git add .gitignore
git add main.js
git commit -m "Add .gitignore and main.js"
```

---

## Step 5: Verify Ignored Files

```bash
git status --ignored
```

Expected Output:
  Ignored files:
    app.log
    backup/
    error.log
    logs/

```bash
git check-ignore -v app.log
```

Expected Output:
  .gitignore:1:*.log    app.log

Explanation:
  git check-ignore -v shows WHICH rule in .gitignore is causing
  a file to be ignored. Very useful for debugging.

---

## .gitignore Pattern Rules

| Pattern | Meaning |
|---------|---------|
| *.log | Ignore all files ending in .log |
| logs/ | Ignore the logs directory |
| backup/ | Ignore the backup directory |
| !important.log | Do NOT ignore important.log (exception) |
| /TODO | Ignore TODO only in root, not subdirs |
| doc/*.txt | Ignore .txt in doc/ but not doc/sub/*.txt |
| doc/**/*.txt | Ignore .txt in doc/ and all subdirectories |
| # comment | Lines starting with # are comments |

---

## Common Mistakes

1. Adding a file to .gitignore AFTER it was already committed
   Solution: git rm --cached filename
   This removes it from tracking without deleting the actual file.

2. .gitignore not working
   Check: Is the file named exactly ".gitignore" (no .txt extension)?
   Check: Is the pattern correct? Use git check-ignore -v to debug.

3. Ignoring node_modules after it was committed
   Solution:
     git rm -r --cached node_modules
     echo "node_modules/" >> .gitignore
     git add .gitignore
     git commit -m "Remove node_modules from tracking"

---

## Screenshot Descriptions

Screenshot 1: git status showing all files including logs before .gitignore
Screenshot 2: .gitignore file open in VS Code with the three rules
Screenshot 3: git status after .gitignore showing only .gitignore and main.js
Screenshot 4: git check-ignore -v output showing which rule matched
