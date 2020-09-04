'use strict';

window.onload = () => {
    // set the initial state for your app
    app.state = deepClone(initialState);
    console.log('app:', app);

    // render initial view and attach event listeners
    const root = document.getElementById('root')

    const initialScreen = view.renderInitialScreen()
    root.appendChild(initialScreen)
    initialScreen.querySelector('input[type="text"]').addEventListener('keyup', handlers.addTodo);

    const todosView = view.renderTodos(app.state.todos);
    todosView.addEventListener('change', toggleCompletedHandler); // event delegation!
    todosView.addEventListener('click', handlers.deleteTodo)
    root.appendChild(todosView);


    // log the initiation
    logger.push({
        initialState,
        app,
        view: todosView
    });

};