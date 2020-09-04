const renderTodos = (todosArr) => {
    const ulEl = document.createElement('ul');
    ulEl.id = 'todo-list'

    for (const todo of todosArr) {
        //create <li>
        const liEl = document.createElement('li');
        liEl.classList.add('todo-item')

        //Create and add checkbox
        const checkBoxEl = document.createElement('input');
        checkBoxEl.type = 'checkbox';
        if (todo.completed) {
            checkBoxEl.setAttribute('checked', true);
        }
        checkBoxEl.id = todosArr.indexOf(todo);
        liEl.appendChild(checkBoxEl);

        //create todo body

        const p = document.createElement('p')
        p.innerText = todo.text;

        liEl.appendChild(p);

        //create delete button
        const deleteButton = document.createElement('button');
        deleteButton.type = 'button'
        deleteButton.classList.add('delete')
        deleteButton.innerText = 'X'

        liEl.appendChild(deleteButton)
        ulEl.appendChild(liEl);
    }

    return ulEl;
};


describe('renderTodos: renders a list of todos', () => {
    const expect = chai.expect;


    describe('renders no todos', () => {
        const singleTodo = renderTodos([]);
        it('has tagName: "UL"', () => {
            expect(singleTodo).to.have.tagName('UL');
        });
        it('has childElementCount: 0', () => {
            expect(singleTodo).to.have.property('childElementCount', 0);
        });
    });

    describe('renders a single todo', () => {
        const singleTodo = renderTodos([
            { text: 'hello', completed: false }
        ]);
        it('has tagName: "UL"', () => {
            expect(singleTodo).to.have.tagName('UL');
        });
        it('has childElementCount: 1', () => {
            expect(singleTodo).to.have.property('childElementCount', 1);
        });
        describe('.children[0]', () => {
            const childElement = singleTodo.children[0];
            it('has tagName: "LI"', () => {
                expect(childElement).to.have.tagName('LI');
            });
            it('has text: "hello"', () => {
                expect(childElement).to.have.text('hello');
            });
            it('has childElementCount: 1', () => {
                expect(childElement).to.have.property('childElementCount', 1);
            });
            describe('.children[0]', () => {
                const childChildElement = childElement.children[0];
                it('has tagName: "INPUT"', () => {
                    expect(childChildElement).to.have.tagName('INPUT');
                });
                it('is not checked', () => {
                    expect(childChildElement).to.have.property('checked', false);
                });
            });
        });
    });


    describe('renders 2 todos', () => {
        const doubleTodo = renderTodos([
            { text: 'hello', completed: false },
            { text: 'bye', completed: true }
        ]);
        it('has tagName: "UL"', () => {
            expect(doubleTodo).to.have.tagName('UL');
        });
        it('has childElementCount: 2', () => {
            expect(doubleTodo).to.have.property('childElementCount', 2);
        });
        describe('.children[0]', () => {
            const childElement = doubleTodo.children[0];
            it('has tagName: "LI"', () => {
                expect(childElement).to.have.tagName('LI');
            });
            it('has text: "hello"', () => {
                expect(childElement).to.have.text('hello');
            });
            it('has childElementCount: 1', () => {
                expect(childElement).to.have.property('childElementCount', 1);
            });
            describe('.children[0]', () => {
                const childChildElement = childElement.children[0];
                it('has tagName: "INPUT"', () => {
                    expect(childChildElement).to.have.tagName('INPUT');
                });
                it('is not checked', () => {
                    expect(childChildElement).to.have.property('checked', false);
                });
            });
        });
        describe('.children[1]', () => {
            const childElement = doubleTodo.children[1];
            it('has tagName: "LI"', () => {
                expect(childElement).to.have.tagName('LI');
            });
            it('has text: "hello"', () => {
                expect(childElement).to.have.text('bye');
            });
            it('has childElementCount: 1', () => {
                expect(childElement).to.have.property('childElementCount', 1);
            });
            describe('.children[0]', () => {
                const childChildElement = childElement.children[0];
                it('has tagName: "INPUT"', () => {
                    expect(childChildElement).to.have.tagName('INPUT');
                });
                it('is checked', () => {
                    expect(childChildElement).to.have.property('checked', true);
                });
            });
        });
    });
}, true);