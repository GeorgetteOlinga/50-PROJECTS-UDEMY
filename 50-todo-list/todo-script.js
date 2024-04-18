const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUL = document.getElementById("todos");

let todos = JSON.parse(localStorage.getItem("todos")) || []; // Fixed variable name and added default empty array

if (todos) {
  todos.forEach((todo) => addTodo(todo));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo();
});

function addTodo(todo) {
  let todoText = input.value;

  if (todo) {
    todoText = todo.text;
  }

  if (todoText) {
    const todoEl = document.createElement("li");

    if (todo && todo.completed) {
      todoEl.classList.add("completed");
    }

    todoEl.innerText = todoText;

    todoEl.addEventListener("click", () => {
      todoEl.classList.toggle("completed");
      updateLS(); // Added to update local storage when todo is clicked
    });

    todoEl.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      todoEl.remove();
      updateLS(); // Added to update local storage when todo is removed
    });

    todosUL.appendChild(todoEl);

    input.value = "";

    todos.push({ text: todoText, completed: false }); // Added to push new todo to array

    updateLS(); // Added to update local storage after adding new todo
  }
}

function updateLS() {
  const todoEl = document.querySelectorAll("li");
  todos = []; /*initialize todo array  this is the empty array*/
  todoEl.forEach((todo) => {
    todos.push({/* push the array here======   todoEl the list of elts created */
      text: todo.innerText,
      completed: todo.classList.contains("completed"), 
    });
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

// // function updateLS(){
// //     todoEL= document.querySelectorAll("li")

// //     const todos =[]

// //     todoEL.forEach
// // }

// // localStorage.setItem("name", JSON.stringify(obj))
// // JSON.parse(localStorage.getItem(obj))
