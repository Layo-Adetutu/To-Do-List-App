let taskInput = document.getElementById("taskInput");
let addBtn = document.getElementById("addBtn");
let taskList = document.getElementById("taskList");
let emptyMsg = document.getElementById("emptyMsg");

// Load saved tasks
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks();

// Add task
addBtn.addEventListener("click", addTask);

// Enter key support
taskInput.addEventListener("keydown", function(e) {
  if (e.key === "Enter") addTask();
});

function addTask() {
  let text = taskInput.value.trim();
  if (text === "") return;

  let task = {
    id: Date.now(),
    text: text,
    completed: false
  };

  tasks.push(task);
  saveTasks();
  renderTasks();

  taskInput.value = "";
}

// Render tasks
function renderTasks() {
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    emptyMsg.style.display = "block";
  } else {
    emptyMsg.style.display = "none";
  }

  tasks.forEach(task => {
    let li = document.createElement("li");

    let span = document.createElement("span");
    span.textContent = task.text;
    if (task.completed) span.classList.add("completed");

    span.addEventListener("click", () => toggleTask(task.id));

    let delBtn = document.createElement("button");
    delBtn.textContent = "X";
    delBtn.classList.add("delete");
    delBtn.addEventListener("click", () => deleteTask(task.id));

    li.appendChild(span);
    li.appendChild(delBtn);

    taskList.appendChild(li);
  });
}

// Toggle complete
function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );

  saveTasks();
  renderTasks();
}

// Delete task
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
}

// Save to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}