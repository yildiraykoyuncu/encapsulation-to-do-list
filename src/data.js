'use strict';

class Todo {
    constructor(text) {
        this.text = text;
        this.completed = false;
    }
};

class TodoList {
    constructor(name) {
        this.name = name;
    }


    _state = {
        todos: []
    }

    get state() {
        return this._state;
    }

    set state(newState) {
        this._state = newState
    }

    addTodo(text) {
        const newTodo = new Todo(text);
        this._state.todos.push(newTodo);

    }

    deleteTodo(position) {
        this._state.todos.splice(position, 1)
    }

    toggleCompleted(position) {
        if (position < 0 || this._state.todos.length <= position) {
            return;
        }
        const todo = this._state.todos[position];
        todo.completed = !todo.completed;
    }

    renderInitialScreen() {
        //container
        const div = document.createElement('div');
        div.classList.add('container');

        //page title
        const h1 = document.createElement('h1');
        h1.textContent = this.name;

        //toggle button
        const toggleButton = document.createElement('button');
        toggleButton.id = 'toggle-button'
        toggleButton.innerText = 'V'


        //input field

        const input = document.createElement('input');
        input.type = 'text';

        //append to div
        div.appendChild(h1);
        div.appendChild(toggleButton)
        div.appendChild(input);

        return div;

    }

    renderTodos(todosArr) {
        const ulEl = document.createElement('ul');
        ulEl.id = this.name

        for (const todo of todosArr) {
            //create <li>
            const liEl = document.createElement('li');
            liEl.classList.add('todo-item');
            liEl.setAttribute('data-index', todosArr.indexOf(todo));


            //Create and add checkbox
            const checkBoxEl = document.createElement('input');
            checkBoxEl.type = 'checkbox';
            if (todo.completed) {
                checkBoxEl.setAttribute('checked', true);
            }
            checkBoxEl.setAttribute('data-index', todosArr.indexOf(todo));
            liEl.appendChild(checkBoxEl);

            //create todo body

            const p = document.createElement('p')
            p.innerText = todo.text;

            liEl.appendChild(p);

            //create delete button
            const deleteButton = document.createElement('button');
            deleteButton.type = 'button'
            deleteButton.classList.add('delete')
            deleteButton.setAttribute('data-index', todosArr.indexOf(todo))
            deleteButton.innerText = 'X'

            liEl.appendChild(deleteButton)
            ulEl.appendChild(liEl);
        }

        return ulEl;
    }
    renderAddedTodo() {
        const todosArr = this._state.todos
        const todoAdded = todosArr[todosArr.length - 1]
        const liEl = document.createElement('li');

        liEl.classList.add('todo-item');
        liEl.setAttribute('data-index', todosArr.length - 1)

        const checkBoxEl = document.createElement('input');
        checkBoxEl.type = 'checkbox';
        if (todoAdded.completed) {
            checkBoxEl.setAttribute('checked', true);
        }
        checkBoxEl.setAttribute('data-index', todosArr.indexOf(todoAdded))
        liEl.appendChild(checkBoxEl);

        const p = document.createElement('p')
        p.innerText = todoAdded.text;
        liEl.appendChild(p)

        const deleteButton = document.createElement('button')
        deleteButton.type = 'button'
        deleteButton.classList.add('delete');
        deleteButton.setAttribute('data-index', todosArr.indexOf(todoAdded))
        deleteButton.innerText = 'X'

        liEl.appendChild(deleteButton);

        return liEl;
    }

    addTodoHandler = (event) => {

        if (event.key !== 'Enter') return;
        //read from user
        const input = event.target.value;

        //update state

        this.addTodo(input);


        //update local storage

        //localStorage.setItem('state', JSON.stringify(app.state))

        //render todo and add to DOM event listeners
        const addedTodo = this.renderAddedTodo();
        const id = this.name
        document.getElementById(id).appendChild(addedTodo);

        //clear input field

        event.target.value = '';

        //developer logs
        logger.push({
            action: 'add',
            state: deepClone(this._state),
            event,
            view: addedTodo
        });

        console.log('logs', logger.logs)
    }

    deleteTodoHandler = (event) => {
        //check if the delete button is clicked
        if (!event.target.classList.contains('delete')) return;

        //find the index of todo inside todos array
        const position = Number(event.target.dataset.index);

        //delete todo from state
        this.deleteTodo(position)

        //update local storage

        // localStorage.setItem('state', JSON.stringify(app.state))

        //delete from dom
        const todoItem = event.target.parentElement

        todoItem.parentElement.removeChild(todoItem);


        //developer logs
        logger.push({
            action: 'delete',
            state: deepClone(this._state),
            event,

        });
        console.log('logs', logger.logs)

    }

    toggleCompletedHandler = (event) => {
        // event delegation!
        const target = event.target;
        if (target.nodeName !== 'INPUT' && target.type !== 'checkbox') {
            return;
        }

        // update state using app method
        const todoIndex = Number(target.dataset.index);
        this.toggleCompleted(todoIndex);

        //update local storage
        // localStorage.setItem('state', JSON.stringify(app.state))

        //developer logs
        logger.push({
            action: 'toggle todo',
            event,
            todoIndex,
            state: this.state
        });

        console.log('logs', logger.logs)
    }

    toggleAllHandler = (event) => {
        const todosArr = this.state.todos;
        const ulId = this.name;
        //update state and dom
        if (todosArr.every(todo => todo.completed === true)) {
            todosArr.forEach((todo, i) => {
                todo.completed = false;
                const selector = `ul#${ulId} input[data-index="${i}"]`
                document.querySelector(selector).checked = false;
                console.log(selector)
            })
        } else {
            todosArr.forEach((todo, i) => {
                todo.completed = true;
                const selector = `ul#${ulId} input[data-index="${i}"]`
                document.querySelector(selector).checked = true;
                console.log(selector)
            })
        }

        //update local storage

        // localStorage.setItem('state', JSON.stringify(app.state))

        //developer logs
        logger.push({
            action: 'toggle-all',
            state: deepClone(this._state),
            event,

        });
        console.log('logs', logger.logs)

    }
    editTodoHandler = (event) => {

        if (event.target.nodeName === 'P') {
            const p = event.target;
            const input = document.createElement('input');
            input.type = 'text';
            input.id = 'edit-todo'
            input.value = event.target.innerText
            p.parentElement.replaceChild(input, p);
        } else {
            const newP = document.createElement('p')
            const input = document.getElementById('edit-todo')

            //read new todo text
            const newText = input.value
            newP.innerText = newText;

            //update State
            const position = input.parentElement.dataset.index;
            this._state.todos[position].text = newText

            //update DOM
            input.parentElement.replaceChild(newP, input)
        }

        //update local storage

        // localStorage.setItem('state', JSON.stringify(app.state))
        //developer logs
        logger.push({
            action: 'edit',
            state: deepClone(this._state),
            event,

        });
        console.log('logs', logger.logs)
    }
}

export { TodoList, Todo }