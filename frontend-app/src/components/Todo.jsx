const Todo = ({ todo, removeTodo, updateTodo }) => {
    
    return (
        <li className="list-group-item">
            <div className="d-flex">
                <h5
                    className={
                        todo.done ? "text-decoration-line-through me-auto" : "me-auto"
                    }
                >
                    {todo.title}
                </h5>
                <button
                    className="btn btn-sm btn-warning fw-medium me-1"
                    onClick={() => updateTodo(todo.id)}
                >
                    {!todo.done ? "Check" : "Uncheck"}
                </button>
                <button
                    className="btn btn-sm btn-danger fw-medium"
                    onClick={() => removeTodo(todo.id)}
                >
                    Delete
                </button>
            </div>
        </li>
    );
};

export default Todo;