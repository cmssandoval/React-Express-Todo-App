import format from 'pg-format';
import { pool } from '../database/connection.js';

/**
 * Finds all todos from the todos table.
 * @returns {Promise<Array<Object>>} Query response rows (todos).
 */
const findAllTodos = async ({ limit = 5, order = "ASC", page = 1 }) => {
    const query =
    `SELECT * FROM todos
    ORDER BY done %s
    LIMIT %s
    OFFSET %s
    `;
    const offset = ( page - 1 ) * limit;
    const formattedQuery = format( query, order, limit, offset );
    const { rows } = await pool.query( formattedQuery );
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
 * @returns {Promise<Object>} Added todo.
 */
const addTodo = async ( todo ) => {
    const query = 'INSERT INTO todos (title, done) VALUES ($1, $2) RETURNING *';
    const { rows } = await pool.query( query, [todo.title, todo.done] );
    return rows[0];
};

/**
 * Removes a todo from the todos table by the todo id.
 * @param {String} id Todo id.
 * @returns {Promise<Object>} Deleted todo.
 */
const removeTodoById = async ( id ) => {
    const query = 'DELETE FROM todos WHERE id = $1 RETURNING *';
    const { rows } = await pool.query( query, [id] );
    return rows[0];
};

/**
 * Updates the "done" boolean property of a todo from the todos table by the todo id.
 * @param {String} id Todo id.
 * @returns {Promise<Object>} Updated todo.
 */
const updateTodoDoneById = async ( id ) => {
    const query = 'UPDATE todos SET done = NOT done WHERE id = $1 RETURNING *';
    const { rows } = await pool.query( query, [id] );
    return rows[0];
}

export const todoModel = {
    findAllTodos,
    findTodoById,
    addTodo,
    removeTodoById,
    updateTodoDoneById,
};