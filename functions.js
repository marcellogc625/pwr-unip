const taskInput = document.getElementById("taskInput");
const taskDesc = document.getElementById("taskDesc");
const taskList = document.getElementById("taskList");

function toggleDescInput() {
  taskDesc.style.display = taskDesc.style.display === "none" ? "block" : "none";
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) =>
    createTaskElement(task.text, task.done, task.timestamp, task.description)
  );
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll(".task-item").forEach((item) => {
    tasks.push({
      text: item.querySelector(".task-text").textContent,
      description: item.querySelector(".task-text").getAttribute("title") || "",
      done: item.querySelector(".task-text").classList.contains("done"),
      timestamp: item.querySelector(".task-time").textContent,
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function createTaskElement(
  text,
  done = false,
  timestamp = null,
  description = ""
) {
  const li = document.createElement("li");
  li.className = "task-item";

  const taskInfo = document.createElement("div");

  const span = document.createElement("span");
  span.textContent = text;
  span.className = "task-text";
  if (description) span.setAttribute("title", description);
  if (done) span.classList.add("done");

  const time = document.createElement("small");
  time.className = "task-time";
  time.textContent = timestamp || new Date().toLocaleString();

  taskInfo.appendChild(span);
  taskInfo.appendChild(time);

  const actions = document.createElement("div");
  actions.className = "actions";

  const completeBtn = document.createElement("button");
  completeBtn.textContent = "✔";
  completeBtn.className = "complete-btn";
  completeBtn.onclick = () => {
    span.classList.toggle("done");
    saveTasks();
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "✖";
  deleteBtn.className = "delete-btn";
  deleteBtn.onclick = () => {
    li.remove();
    saveTasks();
  };

  actions.appendChild(completeBtn);
  actions.appendChild(deleteBtn);

  li.appendChild(taskInfo);
  li.appendChild(actions);

  taskList.appendChild(li);
  saveTasks();
}

function addTask() {
  const text = taskInput.value.trim();
  if (text !== "") {
    createTaskElement(text, false, null);
    taskInput.value = "";
  }
}

window.onload = loadTasks;
