# Git Exercise 5 — Remote Repository (Push & Pull)

## Objective
Verify a clean master branch, list all branches, pull latest changes
from remote, push local changes to remote, and understand the
complete remote workflow.

---

## Remote Repository Concepts

Local Repository  <-->  Remote Repository (GitHub/GitLab/Bitbucket)

  git push  : Upload local commits to remote
  git pull  : Download remote commits to local (fetch + merge)
  git fetch : Download remote commits WITHOUT merging
  git clone : Copy an entire remote repository to local

  origin    : Default name for the remote repository URL
  upstream  : Common name for the original repo (in forks)

---

## Step 1: Verify Clean master Branch

```bash
git status
```

Expected Output (clean working tree):
  On branch master
  nothing to commit, working tree clean

Explanation:
  Before pushing/pulling, always ensure your working tree is clean.
  If there are uncommitted changes, either commit or stash them first.

```bash
git stash        # temporarily save uncommitted changes
git stash pop    # restore stashed changes later
```

---

## Step 2: List All Branches

```bash
git branch -a
```

Expected Output:
  * master
    remotes/origin/master

Explanation:
  -a (--all) shows both local and remote-tracking branches.
  remotes/origin/master is a local copy of the remote master branch.
  It updates when you run git fetch or git pull.

```bash
git branch -v
```

Expected Output:
  * master  a1b2c3d Resolve merge conflict in hello.xml

Explanation:
  -v (--verbose) shows the last commit hash and message for each branch.

---

## Step 3: Add Remote (if not already added)

```bash
git remote add origin https://github.com/username/repo-name.git
```

Verify:
```bash
git remote -v
```

Expected Output:
  origin  https://github.com/username/repo-name.git (fetch)
  origin  https://github.com/username/repo-name.git (push)

Explanation:
  git remote -v shows all configured remotes with their fetch and push URLs.
  You can have multiple remotes (origin, upstream, backup, etc.)

---

## Step 4: Pull Latest Changes

```bash
git pull origin master
```

Expected Output (if up to date):
  From https://github.com/username/repo-name
   * branch            master     -> FETCH_HEAD
  Already up to date.

Expected Output (if there are remote changes):
  From https://github.com/username/repo-name
   * branch            master     -> FETCH_HEAD
  Updating a1b2c3d..9z8y7x6
  Fast-forward
   README.md | 5 +++++
   1 file changed, 5 insertions(+)

Explanation:
  git pull = git fetch + git merge
  Always pull before pushing to avoid conflicts.
  If pull causes a conflict, resolve it the same way as Exercise 4.

---

## Step 5: Make Local Changes

```bash
echo "Week 8 complete!" > progress.txt
git add progress.txt
git commit -m "Add progress.txt: Week 8 complete"
```

---

## Step 6: Push Changes to Remote

```bash
git push origin master
```

Expected Output:
  Enumerating objects: 4, done.
  Counting objects: 100% (4/4), done.
  Delta compression using up to 8 threads
  Compressing objects: 100% (2/2), done.
  Writing objects: 100% (3/3), 312 bytes | 312.00 KiB/s, done.
  Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
  To https://github.com/username/repo-name.git
     a1b2c3d..9z8y7x6  master -> master

Explanation:
  Git uploads only the NEW commits (delta compression).
  The output shows: old hash..new hash  local-branch -> remote-branch

---

## Step 7: Verify Push

```bash
git log --oneline origin/master
```

Or check on GitHub/GitLab in the browser.

---

## Step 8: Fetch vs Pull

```bash
# Fetch: download remote changes but DON'T merge
git fetch origin

# See what changed remotely
git log HEAD..origin/master --oneline

# Then merge manually
git merge origin/master
```

Explanation:
  git fetch is safer than git pull because it lets you review
  remote changes before merging them into your local branch.
  git pull is a convenience shortcut that does both automatically.

---

## Step 9: Push a New Branch to Remote

```bash
git checkout -b new-feature
echo "New feature" > new-feature.txt
git add .
git commit -m "Add new feature"
git push -u origin new-feature
```

Explanation:
  -u (--set-upstream) links the local branch to the remote branch.
  After this, you can just use "git push" without specifying origin/branch.

---

## Step 10: Delete Remote Branch

```bash
git push origin --delete new-feature
```

Expected Output:
  To https://github.com/username/repo-name.git
   - [deleted]         new-feature

---

## Complete Remote Workflow Summary

```
1. git clone <url>              # First time: get the repo
2. git pull origin master       # Always pull first
3. git checkout -b feature-xyz  # Create feature branch
4. (make changes)
5. git add .
6. git commit -m "message"
7. git push -u origin feature-xyz  # Push feature branch
8. (Create Pull Request on GitHub)
9. (After PR merged) git checkout master
10. git pull origin master      # Get the merged changes
11. git branch -d feature-xyz   # Clean up local branch
```

---

## Common Remote Errors and Solutions

Error: "rejected - non-fast-forward"
  Cause: Remote has commits you don't have locally.
  Fix: git pull origin master, resolve conflicts, then push.

Error: "Authentication failed"
  Cause: Wrong credentials or expired token.
  Fix: Use Personal Access Token (PAT) instead of password.
       GitHub Settings > Developer Settings > Personal Access Tokens

Error: "remote: Repository not found"
  Cause: Wrong URL or no access.
  Fix: git remote set-url origin <correct-url>

---

## Screenshot Descriptions

Screenshot 1: git remote -v showing origin URL
Screenshot 2: git pull output showing "Already up to date" or new commits
Screenshot 3: git push output showing objects written and branch updated
Screenshot 4: GitHub repository page showing the pushed commit
Screenshot 5: git log --oneline showing local and remote branch pointers aligned
