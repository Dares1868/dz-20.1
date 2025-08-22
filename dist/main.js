"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
$(function () {
  var form = $(".js--form");
  var input = $(".js--form__input");
  var list = $(".js--todos-wrapper");
  var todos = JSON.parse(sessionStorage.getItem("todos")) || [];
  function saveTodos() {
    sessionStorage.setItem("todos", JSON.stringify(todos));
  }
  function renderTodos() {
    list.empty();
    todos.forEach(function (todo) {
      var li = $("<li>").addClass("todo-item list-group-item d-flex justify-content-between align-items-center mb-2").attr("data-id", todo.id);
      if (todo.done) li.addClass("todo-item--checked");
      var checkbox = $("<input type='checkbox'>").prop("checked", todo.done).on("change", function () {
        toggleTodo(todo.id);
      });
      var text = $("<span>").addClass("todo-item__description").css({
        cursor: "pointer"
      }).text(todo.text).on("click", function () {
        $("#modalTodoText").text(todo.text);
        var modal = new bootstrap.Modal(document.getElementById('todoModal'));
        modal.show();
      });
      var delBtn = $("<button>").addClass("todo-item__delete btn btn-danger btn-sm ms-2").text("Delete").on("click", function () {
        deleteTodo(todo.id);
      });
      li.append(checkbox, text, delBtn);
      list.append(li);
    });
  }
  function addTodo(text) {
    var newTodo = {
      id: Date.now(),
      text: text || "Без назви",
      done: false
    };
    todos.push(newTodo);
    saveTodos();
    renderTodos();
  }
  function deleteTodo(id) {
    todos = todos.filter(function (todo) {
      return todo.id !== id;
    });
    saveTodos();
    renderTodos();
  }
  function toggleTodo(id) {
    todos = todos.map(function (todo) {
      return todo.id === id ? _objectSpread(_objectSpread({}, todo), {}, {
        done: !todo.done
      }) : todo;
    });
    saveTodos();
    renderTodos();
  }
  form.on("submit", function (e) {
    e.preventDefault();
    var value = input.val().trim();
    if (value) {
      addTodo(value);
      input.val("");
    }
  });
  renderTodos();
});
