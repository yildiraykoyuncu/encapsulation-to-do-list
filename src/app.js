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
        this.completed = false;
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

    },
    renderAddedTodo() {
        const todosArr = app._state.todos
        const todoAdded = todosArr[todosArr.length - 1]
        const liEl = document.createElement('li');

        const checkBoxEl = document.createElement('input');
        checkBoxEl.type = 'checkbox';
        if (todoAdded.completed) {
            checkBoxEl.setAttribute('checked', true);
        }
        checkBoxEl.id = todosArr.indexOf(todoAdded);
        liEl.appendChild(checkBoxEl);

        liEl.innerHTML += todoAdded.text;

        return liEl;
    }

}

const handlers = {

    addTodo(event) {

        if (event.key !== 'Enter') return;
        //read from user
        const input = event.target.value;

        //update state
        app.addTodo(input);

        //render todo and add to DOM event listeners
        const addedTodo = view.renderAddedTodo();
        document.getElementById('todo-list').appendChild(addedTodo);

        //clear input field

        event.target.value = '';

        //developer logs
        logger.push({
            state: deepClone(app._state),
            event,
            view: addedTodo
        });

        console.log('hello')
    }
}