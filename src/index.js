import './style.css';
// Select element step 1
const form = document.getElementById('todoform');
// Select input on form step 5
const todoInput = document.getElementById('newtodo');
// Let variables step 4 cretae array first
const todos = [];
//add this when adding step 6- area where task are going to be stored
const todosListEl = document.getElementById('todos-list');

todoInput.placeholder = 'type to do here';
todoInput.style.color = 'black';
todoInput.style.backgroundColor = 'lightgray';
todoInput.style.borderRadius = "25px";

// define SaveTo function do step 3
function saveTodo() {
  const todoValue = todoInput.value;
  // check if the todo is empty
  const isEmpty = todoValue === '';
  // check for duplicate values in array
  const isDuplicate = todos.some((todo) => todo.value.toUpperCase() === todoValue.toUpperCase);
  if (isEmpty) {
    // check if it empty
    // alert("Todo's is empty")
  } else if (isDuplicate) {
    // display in console whether there is duplicate value
    // console.log(todoInput.value,' already exist in list')

  } else {
    // push task, color and checked object into todos array
    todos.push({
      value: todoValue,
      checked: false,
      // randomly generate a color
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,

    });
    // clear the input after task is added
    todoInput.value = '';
    // console.log(todos);
  }
}

//Step 6- // define renderTodos function
function renderTodos(){
  // Clear element before a re-render
  todosListEl.innerHTML = '';
  // Render todos
  todos.forEach((todo, index) => {
    todosListEl.innerHTML += `
    <div class="todo" id=${index}>
    <i 
      class="bi ${todo.checked ? 'bi-check-circle-fill' : 'bi-circle' }"
      style ="color : ${todo.color} "
      ></i>
    <p class="" style ="background-color : ${todo.color}" >${todo.value}</p>
    <i class="bi bi-pencil-square"></i>
    <i class="bi bi-trash"></i>
  </div>`

  })
}

// Form submit step 2
form.addEventListener('submit', (event) => {
  event.preventDefault();
  saveTodo();
  renderTodos();
  todoInput.placeholder = 'type next task';
  todoInput.style.color = 'black';
  todoInput.style.backgroundColor = 'lightgray';
  todoInput.style.borderRadius = "25px";
});
