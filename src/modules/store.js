class Store {
  static getToDo() {
    let todoL;
    if (!localStorage.getItem('todoL')) {
      todoL = [];
    } else {
      todoL = JSON.parse(localStorage.getItem('todoL'));
    }
    return todoL;
  }

  static addTodo(todo) {
    const todoL = Store.getToDo();

    todoL.push(todo);

    localStorage.setItem('todoL', JSON.stringify(todoL));
  }

  static remove(id) {
    const todoL = Store.getToDo();
    id = Number(id);
    todoL.forEach((todo, i) => {
      if (todo.id === id) {
        todoL.splice(i, 1);
      }
    });
    localStorage.setItem('todoL', JSON.stringify(todoL));
    Store.resetId();
  }

  static resetId() {
    const todoL = Store.getToDo();
    const arr = [];

    todoL.forEach((item) => {
      const newId = { ...item, id: arr.length + 1 };
      arr.push(newId);
      localStorage.setItem('todoL', JSON.stringify(arr));
    });
  }

  static checkboxCompleted(id, status) {
    const todoL = Store.getToDo();
    id = Number(id.textContent);

    todoL.forEach((x) => {
      if (x.id === id) {
        if (status) {
          x.completed = true;
        } else {
          x.completed = false;
        }
      }
      localStorage.setItem('todoL', JSON.stringify(todoL));
    });
    return todoL;
  }

  static finalRemoval() {
    const todoL = Store.getToDo();

    const notCompleted = todoL.filter((x) => x.completed === false);
    localStorage.setItem('todoL', JSON.stringify(notCompleted));
    Store.resetId();
    window.location.reload();
  }

  static deleteCompletedTask() {
    const todoL = Store.getToDo();

    const notCompleted = todoL.filter((x) => x.completed === false);
    localStorage.setItem('todoL', JSON.stringify(notCompleted));
    Store.resetId();
    // window.location.reload();
  }

  static delete(id) {
    const todoL = Store.getToDo();
    const arr = [];

    todoL.forEach((item) => {
      if (item.id !== id) {
        arr.push(item);
        localStorage.setItem('todoL', JSON.stringify(arr));
      }
    });
  }

  static updateDescription(index, desc, tasks) {
    tasks.description = desc;
    return [tasks];
  }

  static editInput(id, e, tdHide, editPara) {
    if (e.children[0].classList.contains('threeDotsImg')) {
      const todoL = Store.getToDo();
      id = Number(id);
      todoL.forEach((todo) => {
        if (id === todo.id) {
          const editItem = todo.description;

          const edit = document.getElementsByName('edit')[0];

          if (edit) {
            edit.remove();
          }

          const input = document.createElement('input');
          input.type = 'text';
          input.name = 'edit';
          input.value = editItem;
          input.classList.add('edit');

          input.addEventListener('change', () => {
            editPara.textContent = input.value;
            todo.description = input.value;
            localStorage.setItem('todoL', JSON.stringify(todoL));
          });

          tdHide.appendChild(input);
        }
      });
    }
  }
}

export default Store;
