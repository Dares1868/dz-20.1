$(function () {
  const form = $(".js--form");
  const input = $(".js--form__input");
  const list = $(".js--todos-wrapper");

  let todos = JSON.parse(sessionStorage.getItem("todos")) || [];

  function saveTodos() {
    sessionStorage.setItem("todos", JSON.stringify(todos));
  }

  function renderTodos() {
    list.empty();
    todos.forEach((todo) => {
      const li = $("<li>")
        .addClass("todo-item list-group-item d-flex justify-content-between align-items-center mb-2")
        .attr("data-id", todo.id);
      if (todo.done) li.addClass("todo-item--checked");

      const checkbox = $("<input type='checkbox'>")
        .prop("checked", todo.done)
        .on("change", function () {
          toggleTodo(todo.id);
        });

      const text = $("<span>")
        .addClass("todo-item__description")
        .css({ cursor: "pointer" })
        .text(todo.text)
        .on("click", function () {
          $("#modalTodoText").text(todo.text);
          const modal = new bootstrap.Modal(document.getElementById('todoModal'));
          modal.show();
        });

      const delBtn = $("<button>")
        .addClass("todo-item__delete btn btn-danger btn-sm ms-2")
        .text("Delete")
        .on("click", function () {
          deleteTodo(todo.id);
        });

      li.append(checkbox, text, delBtn);
      list.append(li);
    });
  }

  function addTodo(text) {
    const newTodo = {
      id: Date.now(),
      text: text || "Без назви",
      done: false,
    };
    todos.push(newTodo);
    saveTodos();
    renderTodos();
  }

  function deleteTodo(id) {
    todos = todos.filter((todo) => todo.id !== id);
    saveTodos();
    renderTodos();
  }

  function toggleTodo(id) {
    todos = todos.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    );
    saveTodos();
    renderTodos();
  }

  form.on("submit", function (e) {
    e.preventDefault();
    const value = input.val().trim();
    if (value) {
      addTodo(value);
      input.val("");
    }
  });

  renderTodos();
});
