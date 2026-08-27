// Imports
import express from 'express';
import fs from 'fs/promises';

// Settings
const app = express();
const port = 5000;

// Middleware calls
app.use(express.json());

// Server listening inicilization
app.listen( port, () => {
    console.log(`¡Server is on! Listening on port ${ port }`);
    console.log(`Go to http://localhost:${ port }/`);
});

// Data
const todos = [
    { id: 1, title: "Todo 1", done: false },
    { id: 2, title: "Todo 2", done: false },
    { id: 3, title: "Todo 3", done: false },
];

// GET routes
app.get('/todos', ( req, res ) => {
    res.json( todos );
});

app.get('/todos/:id', ( req, res ) => {
    const id    = Number(req.params.id);
    const todo  = todos.find( todo => todo.id === id );

    if( !todo ) res.status(404).json({ message: "Todo not found" });
    res.json( todo );
});

// POST routes
app.post('/todos', ( req,res ) => {
    const { title } = req.body;

    const newTodo = {
        id: crypto.randomUUID(),
        title,
        done: false,
    };

    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// PUT routes
app.put('/todos/:id', async ( req, res ) => {
    const id = Number(req.params.id);
    
    //! CREATE getTodos function and refactorize
    //* todos will be readed from a json file. Delete test array.
    const todos = await getTodos(); 
    const todo = todos.find( todo => todo.id === id);

    if( !todo ) res.status(404).json({ message: "Todo not found" });

    const updatedTodos = todos.filter( todo => todo.id !== id );

    await fs.writeFile('./todos.json', JSON.stringify( updatedTodos, null, 4));
    res.json(updatedTodos);
});