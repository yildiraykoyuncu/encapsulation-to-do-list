import { newApp } from './app.js'
const addNewTodoListHandler = (event) => {
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

};

window.onload = () => {
    document
        .getElementById("add-new")
        .addEventListener("keyup", newApp.addNewTodoListHandler);
    // set the initial state for your app
    // if (localStorage.getItem("state")) {
    //     app.state = JSON.parse(localStorage.getItem("state"));
    // } else {
    //     app.state = {
    //         todos: [],
    //     };
    // }
    //app.state = deepClone(initialState);
    console.log("app:", newApp);


    // log the initiation
    logger.push({
        state: newApp.state,
        newApp,
        //view: todosView,
    });
};