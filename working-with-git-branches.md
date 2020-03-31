# Working with branches

Git source control can be used in many ways, so it's good to standardise the flow of work.

## Tasks, issues and branches

When you want to deliver a piece of work, there should be a documented reason for that commit to be put in, to track what it does in greater detail.
We create issues on the XXX-Project-Plan (i.e. MyAwesomeProject-Project-Plan repository) and put them in the related ZenHub column.
Defects/bugs should be tagged with the 'bug' label and features tagged with either enhancement or development.
The tags make the work items easier to find. You can put a point estimate on a task to show how much effort it should be.
Rule of thumb is, if you think it will be a huge number, there's probably a chance that the task/story/issue/defect should be divided into smaller chunks.


### Delivering a task

Whenever you work on a task if should be worked on a branch off the `develop` branch. 
Starting a task therefore should start with:

```PowerShell
$ git fetch origin
$ git checkout -b bug/123 origin/develop
```

Here it's assumed you're working off one repository and not forking the main repo.

Naming conventions for branches are:
- **bug/123** for bugs/defects
- **feat/123** for enhancements / features and other misc dev tasks 

After making changes and adding in some unit tests you can commit and deliver the changes.

```PowerShell
$ git add [your] [files]
$ git commit -m "[Bug 123] Commit message should be the same as issue title"
$ git push origin bug/123

```

Optionally your message can say _'Closes TheOrganisation/MyAwesomeProject-Project-Plan#400'_ to make use of the hot linking feature on github to close the issue automatically after merging the Pull request.

## Creating a Pull Request and Code Reviews

Once you push your branch Github should automatically pick up that there is a new branch and show a yellowish strip on the <> code page.
You can create a pull request from the newly created branch into develop.

This is where you would select your reviewer(s) to take a look at the code if you're not making any obvious mistakes.
It's very easy to forget something, and there's no shame in getting a PR rejected. The code reviews should catch small obvious things.
We would assume that the works otherwise it shouldn't be pushed to the dev environment.
Once at least one review is approved the code can be merged into the `develop` branch.
The develop and master branches automatically deploy the code to their respective environments. You should check the Slack channels (i.e. **#iix-devops-midas**) if the code has been deployed properly.

## Merging dev to production
The production environment on the `master` branch is supposed to be working all the time and some changes need to be strutinised and tested on the dev environment before being pushed to production.
New features and bug fixes should go through `develop` to test first.

To push a couple of tasks onto the `master` branch we will create a special branch called `merge_dev_to_master_20190311`

```PowerShell
$ git fetch origin
$ git checkout -b merge_dev_to_prod_20190311 origin/develop
$ git merge origin/master # fix merge conflicts if any
$ git commit -m "merge_dev_to_prod_20190311"
$ git rebase origin/master # rebasing here helps to keep the history pretty with only the commits that matter
$ git push origin merge_dev_to_prod_20190311
```

