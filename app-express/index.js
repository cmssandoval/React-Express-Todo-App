// Imports
import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import { todoModel } from './models/todo.model.js';

//* Settings
const app = express();
const PORT = process.env.PORT || 5000;

//* Middleware calls
app.use(express.json());
app.use(cors());

//* Server listening initilization
app.listen( PORT, () => {
    console.log(`¡Server is on! Listening on port ${ PORT }`);
    console.log(`Go to http://localhost:${ PORT }/`);
});

// GET ROUTES
app.get('/todos', async ( req, res ) => {
    try {
        const todos = await todoModel.findAllTodos();
        return res.json( todos );
    } catch (error) {

        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });

    }
});

app.get('/todos/:id', async ( req, res ) => {
    const { id } = req.params;
    
    try {

        const todo = await todoModel.findTodoById( id );
        if( !todo ) return res.status(404).json({ message: 'Todo not found' });
        res.json( todo );

    } catch (error) {

        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });

    }
});

// POST METHOD
app.post('/todos', async ( req,res ) => {
    const { title } = req.body;

    if ( !title ) return res.status(400).json({ message: 'Title is required' });

    const newTodo = {
        title,
        done: false,
    };

    try {

        const todo = await todoModel.addTodo( newTodo );
        return res.status(201).json( todo );

    } catch (error) {

        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });

    }

});

// PUT METHOD
app.put('/todos/:id', async ( req, res ) => {
    const { id } = req.params;

    try {

        const todo = await todoModel.updateTodoDoneById( id );
        if( !todo ) return res.status(404).json({ message: 'Todo not found' });

        return res.status(200).json({ message: 'Todo updated successfully', todo, });

    } catch (error) {
        
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }

});

// DELETE METHOD
app.delete('/todos/:id', async ( req, res ) => {
    const { id } = req.params;

    try {

        const todo = await todoModel.removeTodoById( id );
        if ( !todo ) return res.status(404).json({ message: 'Todo not found' });

        return res.status(200).json({ message: 'Todo deleted successfully', todo, });

    } catch (error) {

        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });

    }

});