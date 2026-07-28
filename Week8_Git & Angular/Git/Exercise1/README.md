# Git Exercise 1 — Installation, Configuration & First Commit

## Objective
Verify Git installation, configure user identity, set default editor,
create aliases, initialize a repository, and make the first commit.

---

## Step 1: Verify Git Installation

```bash
git --version
```

Expected Output:
  git version 2.x.x.windows.x

Explanation:
  Confirms Git is installed and shows the version number.

---

## Step 2: Configure User Identity

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

Explanation:
  --global applies the setting to ALL repositories on this machine.
  Every commit you make will be tagged with this name and email.
  Without this, Git will refuse to commit.

---

## Step 3: Verify Configuration

```bash
git config --list
```

Expected Output:
  user.name=Your Name
  user.email=your.email@example.com
  core.editor=notepad++.exe -multiInst -notabbar -nosession -noPlugin
  ...

Explanation:
  Lists every Git configuration key=value pair currently active.
  Settings come from system, global (~/.gitconfig), and local (.git/config).

---

## Step 4: Configure Notepad++ as Default Editor

```bash
git config --global core.editor "'C:/Program Files/Notepad++/notepad++.exe' -multiInst -notabbar -nosession -noPlugin"
```

Explanation:
  core.editor sets the text editor Git opens for commit messages.
  -multiInst   : opens a new Notepad++ instance each time
  -notabbar    : hides the tab bar
  -nosession   : does not restore previous session
  -noPlugin    : disables plugins for speed

  To use VS Code instead:
    git config --global core.editor "code --wait"

---

## Step 5: Create a Useful Alias

```bash
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.lg "log --oneline --graph --decorate --all"
```

Explanation:
  Aliases are shortcuts. After this:
    git st   = git status
    git co   = git checkout
    git br   = git branch
    git lg   = git log --oneline --graph --decorate --all

---

## Step 6: Initialize a Repository

```bash
mkdir my-first-repo
cd my-first-repo
git init
```

Expected Output:
  Initialized empty Git repository in C:/path/my-first-repo/.git/

Explanation:
  git init creates a hidden .git/ folder inside the directory.
  This folder stores the entire version history, configuration,
  and object database for the repository.

---

## Step 7: Create welcome.txt

```bash
echo Welcome to Git! > welcome.txt
```

Or create the file manually with this content:

  Welcome to Git!
  This is my first repository.
  Created as part of Cognizant Digital Nurture 5.0 - Week 8.

---

## Step 8: Check Status

```bash
git status
```

Expected Output:
  On branch master

  No commits yet

  Untracked files:
    (use "git add <file>..." to include in what will be committed)
          welcome.txt

  nothing added to commit but untracked files present

Explanation:
  git status shows three areas:
    1. Changes to be committed (Staging Area / Index)
    2. Changes not staged for commit (Modified tracked files)
    3. Untracked files (new files Git doesn't know about yet)

---

## Step 9: Stage the File

```bash
git add welcome.txt
```

Or stage everything:
```bash
git add .
```

Expected Output after git status:
  On branch master

  No commits yet

  Changes to be committed:
    (use "git rm --cached <file>..." to unstage)
          new file:   welcome.txt

Explanation:
  git add moves files from the Working Directory to the Staging Area.
  The Staging Area (Index) is a preparation zone before committing.
  Only staged changes are included in the next commit.

---

## Step 10: Make the First Commit

```bash
git commit -m "Initial commit: add welcome.txt"
```

Expected Output:
  [master (root-commit) a1b2c3d] Initial commit: add welcome.txt
   1 file changed, 3 insertions(+)
   create mode 100644 welcome.txt

Explanation:
  git commit saves a permanent snapshot of staged changes.
  -m "message" provides the commit message inline.
  The hash (a1b2c3d) is a unique SHA-1 identifier for this commit.
  "root-commit" means this is the very first commit in the repo.

---

## Step 11: View Commit History

```bash
git log
```

Expected Output:
  commit a1b2c3d4e5f6... (HEAD -> master)
  Author: Your Name <your.email@example.com>
  Date:   Mon Jan 01 10:00:00 2025 +0530

      Initial commit: add welcome.txt

```bash
git log --oneline
```

Expected Output:
  a1b2c3d Initial commit: add welcome.txt

---

## Step 12: git pull (for remote repos)

```bash
git pull origin master
```

Explanation:
  git pull = git fetch + git merge
  Fetches changes from the remote (origin) and merges them into
  the current local branch (master).
  If no remote is configured, this will show an error — that is normal
  for a local-only repository.

---

## Step 13: git push (for remote repos)

```bash
git remote add origin https://github.com/username/my-first-repo.git
git push -u origin master
```

Explanation:
  git remote add origin <url> : registers the remote URL as "origin"
  git push -u origin master   : pushes local master to remote origin
  -u (--set-upstream)         : links local master to remote master
                                so future "git push" works without arguments

---

## Summary of Commands

| Command | Purpose |
|---------|---------|
| git --version | Check Git version |
| git config --global user.name | Set username |
| git config --global user.email | Set email |
| git config --list | View all config |
| git config --global core.editor | Set default editor |
| git config --global alias.xx | Create alias |
| git init | Initialize repo |
| git status | Check working tree status |
| git add | Stage changes |
| git commit -m | Save snapshot |
| git log | View history |
| git pull | Fetch + merge from remote |
| git push | Upload to remote |

---

## Screenshot Descriptions

Screenshot 1: Terminal showing "git --version" output
Screenshot 2: Terminal showing "git config --list" output
Screenshot 3: VS Code Explorer showing .git/ folder after git init
Screenshot 4: Terminal showing "git status" with untracked welcome.txt
Screenshot 5: Terminal showing "git status" after git add (file in green)
Screenshot 6: Terminal showing successful git commit output
Screenshot 7: Terminal showing "git log --oneline" with first commit
