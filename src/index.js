import './style.css';

const container = document.querySelector('.todo-list');

const list = [{
  description: 'brush teeth',
  completed: true,
  index: 0,
},
{
  description: 'wash the dishes',
  completed: false,
  index: 2,
},
{
  description: 'have breakfast',
  completed: false,
  index: 1,
}];

const showlist = () => {
  let todoListContent = '';
  list.sort((a, b) => a.index - b.index);
  list.forEach((item) => {
    if (item.completed === true) {
      todoListContent += `<li class='list-item'><div><input class='item-check' id='desc' type='checkbox' checked/>${item.description}</div><a href='#'></a><i class='fas fa-ellipsis-v'></i></li>`;
    } else {
      todoListContent += `
      <li class='list-item'><div><input class='item-check' id='desc' type='checkbox'/>${item.description}</div><i class='fas fa-ellipsis-v'></i></li>`;
    }
  });
  container.innerHTML += todoListContent;
  container.innerHTML += '<li class=\'clear-item\'><a href=\'#\'>Clear all completed</a></li>';
};

document.addEventListener('DOMContentLoaded', showlist);