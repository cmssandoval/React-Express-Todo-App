import { pool } from '../database/connection.js';

/**
 * Finds all todos from todos table.
 * @returns {Array<Object>}
 */
const findAll = async () => {
    const { rows } = await pool.query("SELECT * FROM todos");
    return rows;
};

export const todoModel = {
    findAll,
};