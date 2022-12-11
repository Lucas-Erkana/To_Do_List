import './style.css';
// Select element step 1
const form = document.getElementById('todoform');
// Select input on form step 5
const todoInput = document.getElementById('newtodo');
// Let variables step 4 cretae array first
let todos = [];
let EditTodoId = -1;
// add this when adding step 6- area where task are going to be stored
const todosListEl = document.getElementById('todos-list');
//add with step 13
const notificationEl = document.querySelector('.notification');

todoInput.placeholder = 'type to do here';
todoInput.style.color = 'black';
todoInput.style.backgroundColor = 'lightgray';
todoInput.style.borderRadius = '25px';

// define SaveTo function do step 3
function saveTodo() {
  const todoValue = todoInput.value;
  // check if the todo is empty
  const isEmpty = todoValue === '';
  // check for duplicate values in array
  const isDuplicate = todos.some((todo) => todo.value.toUpperCase() === todoValue.toUpperCase());
  if (isEmpty) {
    // check if it empty
    // alert("Todo's is empty")

    //add with step 13
    showNotification("Todo's input is empty!");
  } else if (isDuplicate) {
    // display in console whether there is duplicate value
    // console.log(todoInput.value,' already exist in list')
    // alert('Todo exists');
    //add with step 13
    showNotification("Todo's input already exists!");

  } else {
    // Step 11: add if statement
    if (EditTodoId >= 0) {
      // update the edit todo
      todos = todos.map((todo, index) => ({
        ...todo,
        value: index === EditTodoId ? todoValue : todo.value,
      }));
      EditTodoId = -1;
    } else {
      // push task, color and checked object into todos array
      todos.push({
        value: todoValue,
        checked: false,
        // randomly generate a color
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,

      });
    }

    // clear the input after task is added
    todoInput.value = '';
    // console.log(todos);
  }
}

// Step 6- // define renderTodos function
function renderTodos() {
  // Clear element before a re-render
  todosListEl.innerHTML = '';
  // Render todos
  todos.forEach((todo, index) => {
    todosListEl.innerHTML += `
    <div class="todo" id=${index}>
    <i 
      class="bi ${todo.checked ? 'bi-check-circle-fill' : 'bi-circle'}"
      style ="color : ${todo.color} "
      data-action='check';
      ></i>
    <p class=""  style ="background-color : ${todo.color}" data-action='check' >${todo.value}</p>
    <i class="bi bi-pencil-square" data-action="edit"></i>
    <i class="bi bi-trash" data-action="delete"></i>
  </div>`;
  });
}
// Step 10- Add checkTodo(todoId) funtion
function checkTodo(todoId) {
  todos = todos.map((todo, index) => ({
    // value : todo.value,
    // color : todo.color, both compacted in ...todo
    ...todo,

    checked: index === todoId ? !todo.checked : todo.checked,
  }));
  renderTodos(); // re-render the data
}
// Step 11- Add editTodo function
function editTodo(todId) {
  todoInput.value = todos[todId].value;
  EditTodoId = todId;
}
// step 12= add deleteTodo function
function deleteTodo(todoId){
  todos = todos.filter((todo, index) => index !== todoId);
  //re-renderTOdos
  EditTodoId = -1;
  renderTodos();
}
// Form submit step 2
form.addEventListener('submit', (event) => {
  event.preventDefault();
  saveTodo();
  renderTodos();
  todoInput.placeholder = 'type next task';
  todoInput.style.color = 'black';
  todoInput.style.backgroundColor = 'lightgray';
  todoInput.style.borderRadius = '25px';
});

// Step 7 Click event listner for  all the todos
todosListEl.addEventListener('click', (event) => {
  const { target } = event;
  const parentElement = target.parentNode;

  if (parentElement.className !== 'todo') return;

  // Step 8: the id that has been click on
  const todo = parentElement;
  const todoId = Number(todo.id);

  // Step 9: target action
  const { action } = target.dataset;
  action === 'check' && checkTodo(todoId);
  action === 'edit' && editTodo(todoId);
  action === "delete" && deleteTodo(todoId);
});

//Step 13 add shownotification function when error occurs
function showNotification(msg) {
  notificationEl.innerHTML = msg;
  notificationEl.classList.add('notif-enter');
  setTimeout(() => {
    notificationEl.classList.remove('notif-enter')
  }, 2000)
}