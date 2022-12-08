import './style.css';
import DomToDo from './modules/domDisplay.js';
import CreateToDo from './modules/constructor.js';
import Store from './modules/store.js';

document.addEventListener('DOMContentLoaded', DomToDo.displayToDo);
document.getElementById('completedBtn').addEventListener('click', () => {
  Storage.removeCompleted();
});

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const todoL = Storage.getToDo();
  const toDoInput = document.getElementById('todo-input').value;
  const id = todoL.length + 1;
  const completed = false;
  const todo = new CreateToDo(toDoInput, id, completed);
  DomToDo.addToDoList(todo);
  Storage.addTodo(todo);
  DomToDo.clearField();
});
document.getElementById('to-do-container').addEventListener('click', (e) => {
  Storage.editInput(
    e.target.parentElement.parentElement.children[4].textContent,
    e.target.parentElement,
    e.target.parentElement.parentElement,
    e.target.parentElement.parentElement.children[2].children[0],
  );
  DomToDo.deleteTodo(e.target);
  if (e.target.classList.contains('check')) {
    Storage.checkboxCompleted(
      e.target.parentElement.parentElement.children[4],
      e.target.checked,
    );
    e.target.parentElement.parentElement.children[2].children[0].classList.toggle(
      'strike-through',
    );
  }
  Storage.remove(
    e.target.parentElement.previousElementSibling.previousElementSibling
      .textContent,
  );
});
