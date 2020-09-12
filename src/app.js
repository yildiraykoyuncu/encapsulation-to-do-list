'use strict';

/* This is the core application object, it contains:

  the state of your web page
    encapsulated in this object in the property _state

  methods that read, write, and change state
    these play the same role as Logic functions in the last module

  some basic rules:
    methods can read and write the _state property in your object
    methods can call other methods
    methods can NOT read or write the DOM

  study tips:
    copy your app object into JS Tutor
    remove extra methods when studying in JS Tutor (for cleaner visuals)

*/
import { TodoList, Todo } from './data.js'

const newApp = {
    _state: {
        todoLists: []
    },

    addNewTodoListHandler: (event) => {
        if (event.key !== "Enter") return;

        // Create new todo list
        const name = event.target.value;
        const todoList = new TodoList(name);


        // push new todo list to the state

        newApp._state.todoLists.push(todoList)
        console.log(todoList);

        // add new todoList to DOM

        const root = document.getElementById("root");
        const renderedTodoList = todoList.renderInitialScreen();
        root.appendChild(renderedTodoList);
        renderedTodoList.querySelector('input[type="text"]')
            .addEventListener("keyup", todoList.addTodoHandler);
        renderedTodoList.querySelector("#toggle-button")
            .addEventListener("click", todoList.toggleAllHandler);

        const todosView = todoList.renderTodos(todoList.state.todos)
        todosView.addEventListener("change", todoList.toggleCompletedHandler); // event delegation!
        todosView.addEventListener("click", todoList.deleteTodoHandler);
        todosView.addEventListener("dblclick", todoList.editTodoHandler);
        renderedTodoList.appendChild(todosView)

        //clean input field

        event.target.value = ''

    }
};

export { newApp }