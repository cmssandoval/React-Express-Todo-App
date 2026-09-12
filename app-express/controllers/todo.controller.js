import { todoModel } from "../models/todo.model.js";
import { getDatabaseError } from "../lib/errors/database.error.js";
//! Implement modular error handling.
//* Research about express-valdiator, validator.js, and joi libs.

const read = async ( req, res ) => {
    try {
        const { limit = 5 } = req.query;
        
        const todos = await todoModel.findAllTodos({ limit });
        return res.json( todos );
    } catch (error) {

        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });

    }
};

const readById = async ( req, res ) => {
    const { id } = req.params;
    
    try {

        const todo = await todoModel.findTodoById( id );
        if( !todo ) return res.status(404).json({ message: 'Todo not found' });
        res.json( todo );

    } catch (error) {

        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });

    }
};

const create = async ( req, res ) => {
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
};

const update = async ( req, res ) => {
    const { id } = req.params;

    try {

        const todo = await todoModel.updateTodoDoneById( id );
        if( !todo ) return res.status(404).json({ message: 'Todo not found' });

        return res.status(200).json({ message: 'Todo updated successfully', todo, });

    } catch (error) {
        
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const remove = async ( req, res ) => {
    const { id } = req.params;

    try {

        const todo = await todoModel.removeTodoById( id );
        if ( !todo ) return res.status(404).json({ message: 'Todo not found' });

        return res.status(200).json({ message: 'Todo deleted successfully', todo, });

    } catch (error) {

        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });

    }
};

export const todoController = {
    read,
    readById,
    create,
    update,
    remove,
};