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

class Todo {
    constructor(text) {
        this.text = text;
        this.isCompleted = false;
    }
}

const app = {
    _state: {
        todos: []
    },
    get state() {
        return this._state;
    },
    set state(newState) {
        this._state = newState
    },
    addTodo(text) {
        const newTodo = new Todo(text);
        this._state.todos.push(newTodo);

    },

    toggleCompleted: function(position) {
        if (position < 0 || this._state.todos.length <= position) {
            return;
        }
        const todo = this._state.todos[position];
        todo.completed = !todo.completed;
    }
}

const view = {
    renderInitialScreen() {
        //container
        const div = document.createElement('div');
        div.classList.add('container');

        //page title
        const h1 = document.createElement('h1');
        h1.textContent = 'TODOS';

        //input field

        const input = document.createElement('input');
        input.type = 'text';

        //append to div
        div.appendChild(h1);
        div.appendChild(input);

        return div;

    }
}
view.renderInitialScreen()