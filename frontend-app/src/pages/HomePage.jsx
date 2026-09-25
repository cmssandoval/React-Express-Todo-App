import { useContext, useEffect, useState } from 'react';

import TodoForm from "../components/TodoForm.jsx";
import Todos from "../components/Todos.jsx";
import TodoFooter from '../components/TodoFooter.jsx';
import { UserContext } from '../providers/UserProvider.jsx';

const BASE_URL = import.meta.env.VITE_BASE_URL;
    

const HomePage = () => {
   
    const { token } = useContext(UserContext);

    const [ todos, setTodos ] = useState([]);

    const [ page, setPage ] = useState(1);
    const [ totalPages, setTotalPages] = useState(1);
    const [ next, setNext ] = useState(null);
    const [ previous, setPrevious ] = useState(null);
    const [ order, setOrder ] = useState("");

    const getTodos = async (  page = 1, order = "asc", limit = 5 ) => {
            try {
                const response = await fetch(
                    `${BASE_URL}/todos?page=${page}&limit=${limit}&order=${order}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    }
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
        const response = await fetch(`${BASE_URL}/todos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
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
        const response = await fetch(`${BASE_URL}/todos/${id}` , {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        if ( response.status !== 200 ) return alert("Something went wrong");
        
        await getTodos();

    };

    /**
     * Updates a todo to the todos list toggling its done value.
     * @param {String} id id of the todo.
     */
    const updateTodo = async ( id ) => {
        const response = await fetch(`${BASE_URL}/todos/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
            }
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

export default HomePage;