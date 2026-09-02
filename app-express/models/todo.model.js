import { pool } from '../database/connection.js';

/**
 * Finds all todos from the todos table.
 * @returns {Promise<Array<Object>>} Query response rows (todos).
 */
const findAllTodos = async () => {
    const { rows } = await pool.query("SELECT * FROM todos");
    return rows;
};

/**
 * Finds a todo which id matches the id provided.
 * @param {String} id Todo id.
 * @returns {Promise<Array<Object>>} Query response rows (todo).
 */
const findTodoById = async ( id ) => {
    const query = 'SELECT * FROM todos WHERE id = $1';
    const { rows } = await pool.query( query, [id] );
    return rows;
};

/**
 * Adds a todo to the todos table.
 * @param {Object} todo Todo object, with title and done properties.
 * @returns {Promise<Object>} Todo object.
 */
const addTodo = async ( todo ) => {
    const query = 'INSERT INTO todos (title, done) VALUES ($1, $2) RETURNING *';
    const { rows } = await pool.query( query, [todo.title, todo.done] );
    return rows[0];
};


const removeTodoById = async ( id ) => {
    const query = 'DELETE FROM todos WHERE id = $1 RETURNING *';
    const { rows } = await pool.query( query, [id] );
    return rows[0];
};

export const todoModel = {
    findAllTodos,
    findTodoById,
    addTodo,
    removeTodoById,
};