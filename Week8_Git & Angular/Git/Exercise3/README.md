# Git Exercise 3 — Branching & Merging

## Objective
Create a branch named GitNewBranch, add files, commit, switch back to master,
view differences, merge, view the graph log, and delete the branch.

---

## Git Branching Concept

A branch is a lightweight movable pointer to a commit.
master (or main) is the default branch.
Creating a branch lets you work on features in isolation
without affecting the stable master branch.

  master:        A --- B --- C
                              \
  GitNewBranch:               D --- E

After merge:
  master:        A --- B --- C --- F (merge commit)
                              \   /
  GitNewBranch:               D-E

---

## Step 1: Verify Current Branch

```bash
git branch
```

Expected Output:
  * master

Explanation:
  Lists all local branches. The * marks the current branch.

---

## Step 2: Create GitNewBranch

```bash
git branch GitNewBranch
```

Or create AND switch in one command:
```bash
git checkout -b GitNewBranch
```

Modern Git syntax:
```bash
git switch -c GitNewBranch
```

Explanation:
  git branch <name>     : creates the branch but stays on current branch
  git checkout -b <name>: creates AND switches to the new branch
  git switch -c <name>  : modern equivalent of checkout -b

---

## Step 3: Switch to GitNewBranch

```bash
git checkout GitNewBranch
```

Or modern syntax:
```bash
git switch GitNewBranch
```

Expected Output:
  Switched to branch 'GitNewBranch'

---

## Step 4: Add Files on the New Branch

```bash
echo "Feature A content" > feature-a.txt
echo "Feature B content" > feature-b.txt
git add .
git status
```

Expected Output:
  On branch GitNewBranch
  Changes to be committed:
    new file: feature-a.txt
    new file: feature-b.txt

---

## Step 5: Commit on GitNewBranch

```bash
git commit -m "Add feature-a and feature-b on GitNewBranch"
```

Expected Output:
  [GitNewBranch 3f4a5b6] Add feature-a and feature-b on GitNewBranch
   2 files changed, 2 insertions(+)

---

## Step 6: Switch Back to master

```bash
git checkout master
```

Expected Output:
  Switched to branch 'master'

Observation:
  feature-a.txt and feature-b.txt DISAPPEAR from the working directory.
  This is correct — they exist only on GitNewBranch.
  Git swaps out the files when you switch branches.

---

## Step 7: View Differences Between Branches

```bash
git diff master GitNewBranch
```

Expected Output:
  diff --git a/feature-a.txt b/feature-a.txt
  new file mode 100644
  index 0000000..abc1234
  --- /dev/null
  +++ b/feature-a.txt
  @@ -0,0 +1 @@
  +Feature A content

Explanation:
  git diff <branch1> <branch2> shows what is different between two branches.
  Lines with + are additions (in GitNewBranch but not master).
  Lines with - are deletions (in master but not GitNewBranch).

---

## Step 8: Merge GitNewBranch into master

```bash
git merge GitNewBranch
```

Expected Output (Fast-forward merge):
  Updating a1b2c3d..3f4a5b6
  Fast-forward
   feature-a.txt | 1 +
   feature-b.txt | 1 +
   2 files changed, 2 insertions(+)

Explanation:
  Fast-forward merge: master pointer simply moves forward to GitNewBranch tip.
  This happens when master has no new commits since the branch was created.
  No merge commit is created in a fast-forward merge.

  To force a merge commit even for fast-forward:
    git merge --no-ff GitNewBranch -m "Merge GitNewBranch into master"

---

## Step 9: View Graph Log

```bash
git log --oneline --graph --decorate --all
```

Expected Output:
  * 3f4a5b6 (HEAD -> master, GitNewBranch) Add feature-a and feature-b
  * a1b2c3d Initial commit: add welcome.txt

Explanation:
  --oneline  : one line per commit (short hash + message)
  --graph    : ASCII art showing branch/merge lines
  --decorate : shows branch and tag names next to commits
  --all      : shows ALL branches, not just current

---

## Step 10: Delete the Branch

```bash
git branch -d GitNewBranch
```

Expected Output:
  Deleted branch GitNewBranch (was 3f4a5b6).

Explanation:
  -d (safe delete): only deletes if branch is fully merged.
  -D (force delete): deletes even if unmerged (use with caution).

---

## Step 11: Verify Branch Deleted

```bash
git branch
```

Expected Output:
  * master

---

## Summary of Branch Commands

| Command | Purpose |
|---------|---------|
| git branch | List local branches |
| git branch <name> | Create branch |
| git checkout -b <name> | Create and switch |
| git switch -c <name> | Create and switch (modern) |
| git checkout <name> | Switch branch |
| git switch <name> | Switch branch (modern) |
| git diff b1 b2 | Compare two branches |
| git merge <name> | Merge branch into current |
| git branch -d <name> | Delete merged branch |
| git branch -D <name> | Force delete branch |
| git log --oneline --graph | Visual commit history |

---

## Screenshot Descriptions

Screenshot 1: git branch showing * master before creating GitNewBranch
Screenshot 2: git checkout -b GitNewBranch output
Screenshot 3: git status on GitNewBranch showing new files staged
Screenshot 4: git checkout master — files disappear from explorer
Screenshot 5: git diff master GitNewBranch output
Screenshot 6: git merge GitNewBranch fast-forward output
Screenshot 7: git log --oneline --graph --decorate --all
Screenshot 8: git branch -d GitNewBranch deletion confirmation
