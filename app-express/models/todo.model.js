import { pool } from '../database/connection.js';

/**
 * Finds all todos from todos table.
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
    const { rows } = await pool.query(query, [id]);
    return rows;
};

export const todoModel = {
    findAllTodos,
    findTodoById,
};