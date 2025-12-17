/***********************
 * CONFIGURATION
 ***********************/
const API_URL =
  "https://ydql7dk3sg.execute-api.us-east-1.amazonaws.com/prod/todo";

// 🔐 Cognito Login URL (REPLACE VALUES)
const COGNITO_LOGIN_URL =
  "https://us-east-1vwyv2sz8d.auth.us-east-1.amazoncognito.com/login" +
  "?client_id=29ris85v67n4t2bd381aaid7hq" +
  "&response_type=token" +
  "&scope=openid+email+profile" +
  "&redirect_uri=https://d30ko9r3gyio14.cloudfront.net";

/***********************
 * AUTH
 ***********************/
function login() {
  window.location.href = COGNITO_LOGIN_URL;
}

// Save token after redirect
if (window.location.hash.includes("id_token")) {
  const token = window.location.hash
    .split("id_token=")[1]
    .split("&")[0];

  localStorage.setItem("id_token", token);
  window.location.hash = "";
}

/***********************
 * CRUD OPERATIONS
 ***********************/
async function addTodo() {
  const taskInput = document.getElementById("task");
  const task = taskInput.value.trim();
  if (!task) return;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: "frontenduser",
      task: task
    })
  });

  taskInput.value = "";
  loadTodos();
}

async function loadTodos() {
  const res = await fetch(API_URL);
  const todos = await res.json();

  const list = document.getElementById("list");
  list.innerHTML = "";

  todos.forEach(todo => {
    const li = document.createElement("li");

    const text = document.createElement("span");
    text.textContent = todo.task;
    if (todo.completed) text.classList.add("completed");

    const actions = document.createElement("div");
    actions.className = "actions";

    const doneBtn = document.createElement("button");
    doneBtn.textContent = "Done";
    doneBtn.className = "done-btn";
    doneBtn.onclick = () =>
      markDone(todo.userId, todo.todoId);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = () =>
      deleteTodo(todo.userId, todo.todoId);

    actions.append(doneBtn, deleteBtn);
    li.append(text, actions);
    list.appendChild(li);
  });
}

async function markDone(userId, todoId) {
  await fetch(API_URL, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId,
      todoId,
      completed: true
    })
  });

  loadTodos();
}

async function deleteTodo(userId, todoId) {
  await fetch(API_URL, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId,
      todoId
    })
  });

  loadTodos();
}

// Initial load
loadTodos();
