const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'tasks.json');

const loadTasks = () => {
  if (!fs.existsSync(filePath)){
    fs.writeFileSync(filePath, JSON.stringify([], null, 2));
  };
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

const saveTasks = (tasks) => {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}

const args = process.argv.slice(2);

// Command functions
const addTask = (title) => {
  const tasks = loadTasks();
  const newTask = {
    id: tasks.length + 1,
    title,
    status: 'not done',
  };
  tasks.push(newTask);
  saveTasks(tasks);
  console.log(`Task added: "${title}"`);
};

const updateTask = (id, title) => {
  const tasks = loadTasks();
  const task = tasks.find((t) => t.id == id);
  if (task) {
    task.title = title;
    saveTasks(tasks);
    console.log(`Task was updated: "${title}"`);
  } else {
    console.log('Task not found.');
  }
};

const deleteTask = (id) => {
  const tasks = loadTasks();
  const filteredTasks = tasks.filter((t) => t.id != id);
  saveTasks(filteredTasks);
  console.log(`Task was ${id} deleted.`);
};

const markTask = (id, status) => {
  const tasks = loadTasks();
  const task = tasks.find((t) => t.id == id);
  if (task) {
    task.status = status;
    saveTasks(tasks);
    console.log(`Task was ${id} marked as ${status}.`);
  } else {
    console.log('Task not found.');
  }
};

const listTasks = (filter) => {
  const tasks = loadTasks();
  let filteredTasks = tasks;
  if (filter) {
    filteredTasks = tasks.filter((t) => t.status === filter);
  }
  if (filteredTasks.length === 0) {
    console.log('No tasks found.');
  } else {
    filteredTasks.forEach((task) =>
      console.log(`[${task.id}] ${task.title} - ${task.status}`)
    );
  }
};

// CLI Command Handler
const handleCommands = () => {
  const command = args[0];
  switch (command) {
    case 'add':
      const title = args[1];
      if (title) {
        addTask(title);
      } else {
        console.log('Please enter a task title.');
      }
      break;
    case 'update':
      const updateId = args[1];
      const updateTitle = args[2];
      if (updateId && updateTitle) {
        updateTask(updateId, updateTitle);
      } else {
        console.log('Please enter task ID and new title.');
      }
      break;
    case 'delete':
      const deleteId = args[1];
      if (deleteId) {
        deleteTask(deleteId);
      } else {
        console.log('Please enter task ID to delete.');
      }
      break;
    case 'mark':
      const markId = args[1];
      const markStatus = args[2];
      if (markId && (markStatus === 'done' || markStatus === 'in progress' || markStatus === 'not done')) {
        markTask(markId, markStatus);
      } else {
        console.log('Please enter a valid task ID and status (done, in progress, not done)');
      }
      break;
    case 'list':
      listTasks();
      break;
    case 'list-done':
      listTasks('done');
      break;
    case 'list-not-done':
      listTasks('not done');
      break;
    case 'list-in-progress':
      listTasks('in progress');
      break;
    default:
      console.log('Wrong command. Please choose: add, update, delete, mark, list, list-done, list-not-done or list-in-progress');
  }
};

// Main
handleCommands();
