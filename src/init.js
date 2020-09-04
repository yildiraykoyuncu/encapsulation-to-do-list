'use strict';

window.onload = () => {
    // set the initial state for your app
    app.state = deepClone(initialState);
    console.log('app:', app);

    // render initial view and attach event listeners
    const root = document.getElementById('root')
    root.appendChild(view.renderInitialScreen())

    const todosView = renderTodos(app.state.todos);
    todosView.addEventListener('change', toggleCompletedHandler); // event delegation!
    root.appendChild(todosView);


    // log the initiation
    logger.push({
        initialState,
        app,
        view: todosView
    });

};