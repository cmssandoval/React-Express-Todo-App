import { todoModel } from "../models/todo.model.js";

import { Router } from "express";

const router = Router();

// GET ROUTES
router.get('/', async ( req, res ) => {
    try {
        const todos = await todoModel.findAllTodos();
        return res.json( todos );
    } catch (error) {

        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });

    }
});

router.get('/:id', async ( req, res ) => {
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
router.post('/', async ( req,res ) => {
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
router.put('/:id', async ( req, res ) => {
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
router.delete('/:id', async ( req, res ) => {
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

export default router;