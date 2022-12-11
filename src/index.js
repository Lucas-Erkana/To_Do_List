import './style.css';
// Select element step 1
const form = document.getElementById('todoform');
// Select input on form step 5
const todoInput = document.getElementById('newtodo');

// Let variables step 4 cretae array first
const todos = [];

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

// Form submit step 2
form.addEventListener('submit', (event) => {
  event.preventDefault();

  saveTodo();
});
