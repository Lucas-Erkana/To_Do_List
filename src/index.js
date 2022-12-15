import './style.css';
import {
  form, todosListEl,
} from './modules/variables.js';
import showNotification from './modules/notification.js';
import setTime from './modules/dates.js';
import TextBox from './modules/constructor.js';

setTime();
let todos = JSON.parse(localStorage.getItem('todos')) || [];
let EditTodoId = -1;

function renderTodos() {
  if (todos.length === 0) {
    todosListEl.innerHTML = '<br><center>Nothing to do!</center>';
    showNotification('Nothing to Do');
    return;
  }
  todosListEl.innerHTML = '';
  todos.forEach((todo, index) => {
    todosListEl.innerHTML += `
    <div class="todo" id=${index}>
    <i 
      class="bi ${todo.checked ? 'bi-check-circle-fill' : 'bi-circle'}"
      style ="color : ${todo.color} "
      data-action='check';
      ></i>
    <p class="${todo.checked ? 'checked' : ''} " style ="background-color : ${todo.color}" data-action='check' >${todo.value}</p>
    <i class="bi bi-pencil-square" data-action="edit"></i>
    <i class="bi bi-trash" data-action="delete"></i>
  </div>`;
  });
}
const todoInput = new TextBox('type to do here', 'black', 'lightgray', '25px', todos);

renderTodos();

function saveTodo() {
  const todoValue = todoInput.node.value;
  const isEmpty = todoValue === '';
  const isDuplicate = todos.some((todo) => todo.value.toUpperCase() === todoValue.toUpperCase());
  if (isEmpty) {
    showNotification("Todo's input is empty!");
  } else if (isDuplicate) {
    showNotification("Todo's input already exists!");
  } else {
    // Step 11: add if statement
    if (EditTodoId >= 0) {
      todos = todos.map((todo, index) => ({
        ...todo,
        value: index === EditTodoId ? todoValue : todo.value,
      }));
      EditTodoId = -1;
    } else {
      todos.push({
        value: todoValue,
        checked: false,
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,

      });
    }
    todoInput.node.value = '';
  }
}

function checkTodo(todoId) {
  todos = todos.map((todo, index) => ({
    ...todo,

    checked: index === todoId ? !todo.checked : todo.checked,
  }));
  renderTodos();
  localStorage.setItem('todos', JSON.stringify(todos));
}

function editTodo(todId) {
  todoInput.node.value = todos[todId].value;
  EditTodoId = todId;
}

function deleteTodo(todoId) {
  todos = todos.filter((todo, index) => index !== todoId);
  EditTodoId = -1;
  renderTodos();
  localStorage.setItem('todos', JSON.stringify(todos));
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  saveTodo();
  renderTodos();
  localStorage.setItem('todos', JSON.stringify(todos));
});

todosListEl.addEventListener('click', (event) => {
  const { target } = event;
  const parentElement = target.parentNode;

  if (parentElement.className !== 'todo') return;

  const todo = parentElement;
  const todoId = Number(todo.id);

  const { action } = target.dataset;
  if (action === 'check') { checkTodo(todoId); }
  if (action === 'edit') { editTodo(todoId); }
  if (action === 'delete') { deleteTodo(todoId); }
});
