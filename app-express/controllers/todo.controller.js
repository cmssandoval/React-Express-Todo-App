import { todoModel } from "../models/todo.model.js";
import { getDatabaseError } from "../lib/errors/database.error.js";
//! Implement modular error handling.
//* Research about express-valdiator, validator.js, and joi libs.

const read = async ( req, res ) => {
    const { limit = 5, order ="ASC", page = 1 } = req.query;

    const isPageValid = /^[1-9]\d*$/.test(page);

    if (!isPageValid) {
        return res.status(400).json({
            message: "Invalid page number, number > 0"
        });
    }

    try {        

        const todos = await todoModel.findAllTodos({ limit, order, page, user: req.user });
        return res.json( todos );

    } catch (error) {
        console.log(error);

        if (error.code) {
            const { code, message } = getDatabaseError(error.code);
            return res.status(code).json({ message });
        }

        return res.status(500).json({ message: 'Internal server error' });

    }
};

const readById = async ( req, res ) => {
    const { id } = req.params;
    
    try {

        const todo = await todoModel.findTodoById( id, req.user );
        if( !todo ) return res.status(404).json({ message: 'Todo not found' });

        return res.json( todo );

    } catch (error) {
        console.log(error);
                
        if (error.code) {
            const { code, message } = getDatabaseError(error.code);
            return res.status(code).json({ message });
        }

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

        const todo = await todoModel.addTodo( newTodo, req.user );
        return res.status(201).json( todo );

    } catch (error) {
        console.log(error);
        
        if (error.code) {
            const { code, message } = getDatabaseError(error.code);
            return res.status(code).json({ message });
        }

        return res.status(500).json({ message: 'Internal server error' });

    }
};

const update = async ( req, res ) => {
    const { id } = req.params;

    try {

        const todo = await todoModel.updateTodoDoneById( id, req.user );
        if( !todo ) return res.status(404).json({ message: 'Todo not found' });

        return res.status(200).json({ message: 'Todo updated successfully', todo, });

    } catch (error) {
        console.log(error);
                
        if (error.code) {
            const { code, message } = getDatabaseError(error.code);
            return res.status(code).json({ message });
        }

        return res.status(500).json({ message: 'Internal server error' });
    }
};

const remove = async ( req, res ) => {
    const { id } = req.params;

    try {

        const todo = await todoModel.removeTodoById( id, req.user );
        if ( !todo ) return res.status(404).json({ message: 'Todo not found' });

        return res.status(200).json({ message: 'Todo deleted successfully', todo, });

    } catch (error) {
        console.log(error);
        
        if (error.code) {
            const { code, message } = getDatabaseError(error.code);
            return res.status(code).json({ message });
        }

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