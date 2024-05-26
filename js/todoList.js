
      function showContent(section) {
        const sections = document.querySelectorAll(".content-section");
        sections.forEach((sec) => {
          sec.style.display = sec.id === section ? "block" : "none";
        });
      }

      const todoForm = document.querySelector("#todo-form");
      const todoList = document.querySelector("#todo-list");
      const todoInput = todoForm.querySelector("input");

      const TODOS_KEY = "todos";
      let toDos = [];

      function deleteToDo(event) {
        const li = event.target.parentElement;
        li.remove();
        toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
        saveToDos();
      }

      function saveToDos() {
        localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
      }

      function paintToDo(todo) {
        const li = document.createElement("li");
        li.id = todo.id;
        const span = document.createElement("span");
        const button = document.createElement("button");
        button.innerText = "X";
        button.addEventListener("click", deleteToDo);
        span.innerText = todo.text;
        li.appendChild(span);
        li.appendChild(button);
        todoList.appendChild(li);
      }

      function handleToDoSubmit(event) {
        event.preventDefault();
        const newTodo = todoInput.value;
        todoInput.value = "";
        const newTodoObj = {
          text: newTodo,
          id: Date.now(),
        };
        toDos.push(newTodoObj);
        paintToDo(newTodoObj);
        saveToDos();
      }

      todoForm.addEventListener("submit", handleToDoSubmit);

      const savedToDos = localStorage.getItem(TODOS_KEY);

      if (savedToDos) {
        const parsedToDos = JSON.parse(savedToDos);
        toDos = parsedToDos;
        parsedToDos.forEach(paintToDo);
      }
