import { newApp } from './app.js'


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