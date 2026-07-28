# Git Exercise 4 — Merge Conflicts

## Objective
Deliberately create a merge conflict using hello.xml, resolve it manually,
commit the resolution, update .gitignore, delete the merged branch,
and view the final log.

---

## What is a Merge Conflict?

A merge conflict occurs when two branches modify the SAME line(s)
of the SAME file differently. Git cannot automatically decide which
version to keep, so it marks the conflict and asks you to resolve it.

  master branch:      <greeting>Hello World</greeting>
  feature branch:     <greeting>Hello Universe</greeting>
  Conflict: Git doesn't know which greeting to use!

---

## Step 1: Set Up the Repository

```bash
mkdir exercise4-repo
cd exercise4-repo
git init
git config user.name "Student Name"
git config user.email "student@example.com"
```

---

## Step 2: Create hello.xml on master

Create hello.xml with this content:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<root>
    <greeting>Hello World</greeting>
    <author>Student</author>
</root>
```

```bash
git add hello.xml
git commit -m "Add hello.xml with Hello World greeting"
```

---

## Step 3: Create a Feature Branch

```bash
git checkout -b feature-greeting
```

Edit hello.xml — change the greeting line to:
```xml
    <greeting>Hello Universe</greeting>
```

```bash
git add hello.xml
git commit -m "Change greeting to Hello Universe on feature-greeting"
```

---

## Step 4: Modify master Branch Too

```bash
git checkout master
```

Edit hello.xml — change the greeting line to:
```xml
    <greeting>Hello Everyone</greeting>
```

```bash
git add hello.xml
git commit -m "Change greeting to Hello Everyone on master"
```

---

## Step 5: Attempt to Merge (Conflict!)

```bash
git merge feature-greeting
```

Expected Output:
  Auto-merging hello.xml
  CONFLICT (content): Merge conflict in hello.xml
  Automatic merge failed; fix conflicts and then commit the result.

---

## Step 6: View the Conflict Markers

Open hello.xml — it will look like this:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<root>
<<<<<<< HEAD
    <greeting>Hello Everyone</greeting>
=======
    <greeting>Hello Universe</greeting>
>>>>>>> feature-greeting
    <author>Student</author>
</root>
```

Explanation of conflict markers:
  <<<<<<< HEAD          : Start of YOUR changes (current branch = master)
  =======               : Separator between the two versions
  >>>>>>> feature-greeting : End of THEIR changes (incoming branch)

---

## Step 7: Resolve the Conflict

Edit hello.xml to keep the desired version.
For this exercise, combine both greetings:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<root>
    <greeting>Hello Everyone and Hello Universe</greeting>
    <author>Student</author>
    <resolved>true</resolved>
</root>
```

Remove ALL conflict markers (<<<<<<, =======, >>>>>>>).

---

## Step 8: Stage and Commit the Resolution

```bash
git add hello.xml
git status
```

Expected Output:
  All conflicts fixed but you are still merging.
    (use "git commit" to conclude merge)

```bash
git commit -m "Resolve merge conflict in hello.xml: combine greetings"
```

Expected Output:
  [master 7a8b9c0] Resolve merge conflict in hello.xml: combine greetings

---

## Step 9: Update .gitignore

```bash
echo "*.tmp" >> .gitignore
echo "*.bak" >> .gitignore
git add .gitignore
git commit -m "Update .gitignore: add *.tmp and *.bak"
```

---

## Step 10: Delete the Merged Branch

```bash
git branch -d feature-greeting
```

Expected Output:
  Deleted branch feature-greeting (was 4d5e6f7).

---

## Step 11: View Final Log

```bash
git log --oneline --graph --decorate --all
```

Expected Output:
  *   7a8b9c0 (HEAD -> master) Resolve merge conflict in hello.xml
  |\
  | * 4d5e6f7 Change greeting to Hello Universe on feature-greeting
  * | 3c4d5e6 Change greeting to Hello Everyone on master
  |/
  * a1b2c3d Add hello.xml with Hello World greeting

Explanation:
  The graph shows the branch diverging (|\) and merging back (|/).
  This is a TRUE merge commit (not fast-forward) because both branches
  had commits after the branch point.

---

## Conflict Resolution Strategies

1. Keep HEAD (master) version:
   Delete everything from <<<<<<< to >>>>>>> keeping only the HEAD section.

2. Keep incoming (feature) version:
   Delete everything from <<<<<<< to >>>>>>> keeping only the feature section.

3. Keep both:
   Manually combine both versions and remove all markers.

4. Use a merge tool:
   git mergetool
   Opens a visual 3-way merge tool (VS Code, KDiff3, etc.)

   Configure VS Code as merge tool:
   git config --global merge.tool vscode
   git config --global mergetool.vscode.cmd 'code --wait $MERGED'

---

## Screenshot Descriptions

Screenshot 1: hello.xml with conflict markers open in VS Code
Screenshot 2: VS Code showing the 3-way merge view (Current/Incoming/Result)
Screenshot 3: Resolved hello.xml without conflict markers
Screenshot 4: git status showing "All conflicts fixed but still merging"
Screenshot 5: git log --oneline --graph showing the merge commit with branches
