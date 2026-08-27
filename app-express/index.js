// Imports
import express from 'express';

// Settings
const app = express();
const port = 5000;

// Middleware calls
app.use(express.json());

// Server listening inicilization
app.listen( port, () => {
    console.log(`¡Server is on! Listening on port ${ port }`);
    console.log(`Go to http://localhost:${ port }`);
});

// Data
const todos = [
    { id: 1, title: "Todo 1", done: false },
    { id: 2, title: "Todo 2", done: false },
    { id: 3, title: "Todo 3", done: false },
];

// GET routes
app.get('/todos/:id', ( req, res ) => {
    const id    = Number(req.params.id);
    const todo  = todos.find( todo => todo.id === id );

    if( !todo ) {
        res.status(404).json({ message: "Todo not found" });
    }
    res.json( todo );
});

// POST routes