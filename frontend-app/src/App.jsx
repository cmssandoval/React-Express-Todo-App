import { useEffect, useState } from 'react';

import TodoForm from "./components/TodoForm.jsx";
import Todos from "./components/Todos.jsx";
import TodoFooter from './components/TodoFooter.jsx';

const App = () => {
    /**
     * URL used to fetch data and send http requests.
     */
    const backendURL = `http://localhost:${ import.meta.env.VITE_BACKEND_PORT }`;
    
    const [ todos, setTodos ] = useState([]);

    const [ page, setPage ] = useState(1);
    const [ totalPages, setTotalPages] = useState(1);
    const [ next, setNext ] = useState(null);
    const [ previous, setPrevious ] = useState(null);
    const [ order, setOrder ] = useState("");

    const getTodos = async (  page = 1, order = "asc", limit = 5 ) => {
            try {
                const response = await fetch(
                    `${backendURL}/todos?page=${page}&limit=${limit}&order=${order}`
                );
                const {
                    results,
                    total_pages,
                    next,
                    previous,
                } = await response.json();

                setTodos(results);
                setTotalPages(total_pages);
                setNext(next);
                setPrevious(previous);

            } catch (error) {

                alert(error);
                console.log(error);

            }
        };

    useEffect(() => {
        getTodos( page, order );
    }, [ page, order ]);

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

        await response.json();
        await getTodos();

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
        
        await getTodos();

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

        await getTodos();
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
            <TodoFooter
                page={page}
                setPage={setPage}
                totalPages={totalPages}
                next={next}
                previous={previous}
                order={order}
                setOrder={setOrder}
            />
        </div>
    );
};

export default App;