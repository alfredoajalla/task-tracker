Task tracker CLI
****************
Project: https://roadmap.sh/projects/task-tracker

Command syntax

* Add a task
node cli.js add "Buy a car"

* Update a task
node cli.js update 1 "Buy a bike"

* Mark a task as done / in-progress / not done
node cli.js mark 1 "in progress"

* Delete a task
node cli.js delete 1

* List all tasks
node cli.js list

* List done tasks
node cli.js list-done

* List no-done tasks
node cli.js list-no-done

* List in progress tasks
node cli.js list-in-progress



Error Handling:
If the tasks.json file doesn't exist, it will be created automatically.
It checks if tasks exist before performing update, delete, or marking operations.
If a user doesn't provide the necessary arguments for a command, it prompts them to do so.


