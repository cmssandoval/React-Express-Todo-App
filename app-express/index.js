// Imports
import express from 'express';
import { writeFile, readFile } from 'fs/promises';
import cors from 'cors';

// Settings
const app = express();
const port = 5000;

// Middleware calls
app.use(express.json());
app.use(cors());

// Server listening initilization
app.listen( port, () => {
    console.log(`¡Server is on! Listening on port ${ port }`);
    console.log(`Go to http://localhost:${ port }/`);
});

// Read and parse array of todos from todos.json
const getTodos = async () => {
    const fsResponse = await readFile('./todos.json', 'utf-8');
    const todos = JSON.parse( fsResponse )
    return todos;
};

// GET ROUTES
app.get('/todos', async ( req, res ) => {
    const todos = await getTodos();
    res.json( todos );
});

app.get('/todos/:id', async ( req, res ) => {
    const id    = req.params.id;
    
    const todos = await getTodos();
    const todo  = todos.find( todo => todo.id === id );

    if( !todo ) res.status(404).json({ message: 'Todo not found' });
    res.json( todo );
});

// POST METHOD
app.post('/todos', async ( req,res ) => {
    const { title } = req.body;

    const newTodo = {
        id: crypto.randomUUID(),
        title,
        done: false,
    };

    const todos = await getTodos();
    todos.push( newTodo );

    await writeFile('./todos.json', JSON.stringify( todos, null, 4 ));

    res.status(201).json( newTodo );
});

// PUT METHOD
app.put('/todos/:id', async ( req, res ) => {
    const id = req.params.id;

    const todos = await getTodos(); 
    const todo = todos.find( todo => todo.id === id );

    if( !todo ) res.status(404).json({ message: 'Todo not found' });

    const updatedTodos = todos.map( todo => {
        if ( todo.id === id ) return { ...todo, done: !todo.done };
        return todo;
    });

    await writeFile('./todos.json', JSON.stringify( updatedTodos, null, 4 ));
    res.json( updatedTodos );
});

// DELETE METHOD
app.delete('/todos/:id', async ( req, res ) => {
    const id = req.params.id;

    const todos = await getTodos();
    const todo = todos.find( todo => todo.id === id );

    if ( !todo ) res.status(404).json({ message: 'Todo not found' });

    const updatedTodos = todos.filter( todo => todo.id !== id );

    await writeFile('./todos.json', JSON.stringify( updatedTodos, null, 4 ));
    res.json( updatedTodos );
});