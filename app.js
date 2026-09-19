const STORAGE_KEY = "todo-list-items";

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const emptyState = document.querySelector("#empty-state");
const remainingCount = document.querySelector("#remaining-count");
const clearCompletedButton = document.querySelector("#clear-completed");
const themeToggle = document.querySelector("#theme-toggle");
const themeIcon = document.querySelector("#theme-icon");
const themeLabel = document.querySelector("#theme-label");
const filterButtons = document.querySelectorAll("[data-filter]");

let todos = loadTodos();
let currentFilter = "all";

// 從瀏覽器儲存空間讀取待辦，資料損壞時回到空清單。
function loadTodos() {
  try {
    const savedTodos = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(savedTodos) ? savedTodos : [];
  } catch (error) {
    return [];
  }
}

// 將目前清單保存起來，讓重新整理後仍能保留資料。
function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// 依照目前篩選條件重新繪製清單，但統計數字仍使用完整資料。
function renderTodos() {
  todoList.replaceChildren();
  const visibleTodos = todos.filter((todo) => {
    if (currentFilter === "active") return !todo.completed;
    if (currentFilter === "completed") return todo.completed;
    return true;
  });

  emptyState.hidden = visibleTodos.length > 0;
  if (visibleTodos.length === 0) {
    emptyState.textContent = todos.length === 0
      ? "還沒有任何待辦事項，新增一個吧!"
      : currentFilter === "active"
        ? "太棒了，目前沒有未完成事項!"
        : "目前沒有已完成事項。";
  }

  visibleTodos.forEach((todo) => {
    const item = document.createElement("li");
    item.className = `todo-item${todo.completed ? " completed" : ""}`;

    const checkbox = document.createElement("input");
    checkbox.className = "todo-check";
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.setAttribute("aria-label", `標記「${todo.text}」為完成`);
    checkbox.addEventListener("change", () => toggleTodo(todo.id));

    const text = document.createElement("span");
    text.className = "todo-text";
    text.textContent = todo.text;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.type = "button";
    deleteButton.textContent = "刪除";
    deleteButton.setAttribute("aria-label", `刪除「${todo.text}」`);
    deleteButton.addEventListener("click", () => deleteTodo(todo.id));

    item.append(checkbox, text, deleteButton);
    todoList.append(item);
  });

  const unfinishedTodos = todos.filter((todo) => !todo.completed).length;
  remainingCount.textContent = `未完成: ${unfinishedTodos} 項`;
  clearCompletedButton.disabled = !todos.some((todo) => todo.completed);
}

// 套用主題並更新切換按鈕的圖示與文字。
function applyTheme(theme) {
  const isDark = theme === "dark";
  document.documentElement.dataset.theme = isDark ? "dark" : "light";
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeIcon.textContent = isDark ? "☀️" : "🌙";
  themeLabel.textContent = isDark ? "淺色模式" : "深色模式";
}

// 優先使用使用者手動選擇，沒有選擇時才跟隨作業系統設定。
function loadInitialTheme() {
  const savedTheme = localStorage.getItem("todo-theme");
  if (savedTheme === "dark" || savedTheme === "light") return savedTheme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

// 新增一筆已去除前後空白的待辦事項。
function addTodo(text) {
  todos.push({
    id: crypto.randomUUID(),
    text,
    completed: false,
  });
  saveTodos();
  renderTodos();
}

function toggleTodo(todoId) {
  todos = todos.map((todo) => (
    todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
  ));
  saveTodos();
  renderTodos();
}

function deleteTodo(todoId) {
  todos = todos.filter((todo) => todo.id !== todoId);
  saveTodos();
  renderTodos();
}

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = todoInput.value.trim();

  if (!text) {
    todoInput.focus();
    return;
  }

  addTodo(text);
  todoInput.value = "";
  todoInput.focus();
});

clearCompletedButton.addEventListener("click", () => {
  const completedCount = todos.filter((todo) => todo.completed).length;
  if (!completedCount || !window.confirm(`確定要清除 ${completedCount} 項已完成的待辦事項嗎？`)) {
    return;
  }

  todos = todos.filter((todo) => !todo.completed);
  saveTodos();
  renderTodos();
});

themeToggle.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem("todo-theme", nextTheme);
  applyTheme(nextTheme);
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });
    renderTodos();
  });
});

applyTheme(loadInitialTheme());
renderTodos();