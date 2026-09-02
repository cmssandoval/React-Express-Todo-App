import { useEffect, useState } from 'react';

import TodoForm from "./components/TodoForm.jsx";
import Todos from "./components/Todos.jsx";

const App = () => {
    /**
     * URL used to fetch data and send http requests.
     */
    const backendURL = `http://localhost:${ import.meta.env.VITE_BACKEND_PORT }`;
    
    const [ todos, setTodos ] = useState([]);

    useEffect(() => {
        const getTodos = async () => {
            try {
                const response = await fetch(`${backendURL}/todos`);
                const todos = await response.json();
                setTodos(todos);
            } catch (error) {
                alert(error);
                console.log(error);
            }
        };

        getTodos();
    }, []);

    /**
     * Adds a todo to the todos list.
     * @param {String} title description of the todo.
     */
    const addTodo = async ( title ) => {
        const response = await fetch(`${backendURL}/todos`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title })
        });
        const todo = await response.json();
        setTodos([ ...todos, todo ]);
    };

    /**
     * Removes a todo from the todos list.
     * @param {String} id id of the todo.
     */
    const removeTodo = async ( id ) => {
        const response = await fetch(`${backendURL}/todos/${id}` ,{
            method: "DELETE",
        });
        if ( response.status !== 200 ) return alert("Something went wrong");
        setTodos(todos.filter( todo => todo.id !== id ));
    };

    /**
     * Updates a todo to the todos list toggling its done value.
     * @param {String} id id of the todo.
     */
    const updateTodo = async ( id ) => {
        const response = await fetch(`${backendURL}/todos/${id}`, {
            method: "PUT",
        });
        if ( response.status !== 200 ) return alert("Something went wrong");
        setTodos(
            todos.map( todo => {
                if ( todo.id === id ) todo.done = !todo.done;
                return todo;
            })
        );
    };

    return(
        <div className='container'>
            <h1 className='my-5'>Todos APP</h1>
            <TodoForm addTodo={addTodo} />
            <Todos
                todos={todos}
                removeTodo={removeTodo}
                updateTodo={updateTodo}
            />
        </div>
    );
};

export default App;