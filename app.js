const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todos");

todoList.addEventListener("click", checkRemove);
todoButton.addEventListener("click", addTodos);
filterOption.addEventListener("click", filterTodos);
document.addEventListener("DOMContentLoaded", getLocalTodo);

function addTodos(e) {
   e.preventDefault();
   const todoDiv = document.createElement("div");
   if (todoInput.value === "") return;
   todoDiv.classList.add("todo");
   const newTodo = `
    <p>${todoInput.value}</p>
    <span class="material-symbols-outlined done"> done </span>
    <span class="material-symbols-outlined trash"> delete </span>`;
   todoDiv.innerHTML = newTodo;
   todoList.appendChild(todoDiv);
   saveLocalTodos(todoInput.value);
   todoInput.value = "";
}

function checkRemove(e) {
   if (e.target.classList[1] === "done") {
      const todo = e.target.parentElement;
      todo.classList.toggle("completed");
      todo.firstElementChild.classList.toggle("comtext");
   } else if (e.target.classList[1] === "trash") {
      e.target.parentElement.remove();
      removeLocalTodos(e.target.parentElement);
   }
}

function filterTodos(e) {
   const todos = [...todoList.childNodes];
   todos.forEach((i) => {
      console.log(i);
      switch (e.target.value) {
         case "all":
            i.style.display = "flex";
            break;
         case "done":
            if (i.classList.contains("completed")) {
               i.style.display = "flex";
            } else {
               i.style.display = "none";
            }
            break;
         case "nDone":
            if (!i.classList.contains("completed")) {
               i.style.display = "flex";
            } else {
               i.style.display = "none";
            }
            break;
      }
   });
   console.log(e.target.value);
}

function saveLocalTodos(todo) {
   let savedTodos = localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : [];
   savedTodos.push(todo);
   localStorage.setItem("todos", JSON.stringify(savedTodos));
}

function getLocalTodo() {
   let savedTodos = localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : [];
   savedTodos.forEach((i) => {
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo");
      const newTodo = `
    <p>${i}</p>
    <span class="material-symbols-outlined done"> done </span>
    <span class="material-symbols-outlined trash"> delete </span>`;
      todoDiv.innerHTML = newTodo;
      todoList.appendChild(todoDiv);
   });
}

function removeLocalTodos(todo) {
   console.log(todo.firstElementChild.textContent);
   let savedTodos = localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : [];
   savedTodos = savedTodos.filter(
      (i) => i !== todo.firstElementChild.textContent
   );
   localStorage.setItem("todos", JSON.stringify(savedTodos));
}
