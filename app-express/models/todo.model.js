import 'dotenv/config';
import format from 'pg-format';
import { pool } from '../database/connection.js';

const BASE_URL =
    process.env.NODE_ENV === "production"
        ? process.env.DOMAIN_URL_APP
        : `http://localhost:${process.env.PORT}`;

/**
 * Finds all todos from the todos table.
 * @returns {Promise<Array<Object>>} Query response rows (todos).
 */
const findAllTodos = async ({ limit = 5, order = "ASC", page = 1, user }) => {

    const countQuery = 'SELECT COUNT(*) FROM todos WHERE user_id = $1';
    const { rows: countResult } = await pool.query( countQuery, [user.user_id] );
    const total_rows = parseInt( countResult[0].count, 10 );

    const total_pages = Math.ceil(total_rows / limit);
    
    const query =
    `SELECT * FROM todos
    WHERE user_id = %s
    ORDER BY done %s, id DESC
    LIMIT %s
    OFFSET %s
    `;
    const orderList = ["ASC", "DESC"];
    const safeOrder =
        orderList.includes(order.toUpperCase())
            ? order.toUpperCase()
            : "ASC";
        
    const offset = ( page - 1 ) * limit;
    const formattedQuery = format( query, user.user_id, safeOrder, limit, offset );
    const { rows } = await pool.query( formattedQuery );

    const results = rows.map(( row ) => {
        return {
            ...row,
            href: `${BASE_URL}/todos/${row.id}`,
        };
    });

    return {
        results,
        total_pages,
        page,
        limit,
        next:
            (total_pages <= parseInt(page, 10))
                ? null
                : `${BASE_URL}/todos?limit=${limit}&page=${parseInt(page, 10) + 1}`,
        previous:
            (page <= 1)
                ? null
                : `${BASE_URL}/todos?limit=${limit}&page=${parseInt(page, 10) - 1}`
    };
};

/**
 * Finds a todo which id matches the id provided.
 * @param {String} id Todo id.
 * @returns {Promise<Array<Object>>} Query response rows (todo).
 */
const findTodoById = async ( id, user ) => {
    const query = 'SELECT * FROM todos WHERE id = $1 AND user_id = $2';
    const { rows } = await pool.query( query, [id, user.user_id] );
    return rows[0];
};

/**
 * Adds a todo to the todos table.
 * @param {Object} todo Todo object, with title and done properties.
 * @returns {Promise<Object>} Added todo.
 */
const addTodo = async ( todo, user ) => {
    const query = 'INSERT INTO todos (title, done, user_id) VALUES ($1, $2, $3) RETURNING *';
    const { rows } = await pool.query( query, [todo.title, todo.done, user.user_id] );
    return rows[0];
};

/**
 * Removes a todo from the todos table by the todo id.
 * @param {String} id Todo id.
 * @returns {Promise<Object>} Deleted todo.
 */
const removeTodoById = async ( id, user ) => {
    const query = 'DELETE FROM todos WHERE id = $1 AND user_id = $2 RETURNING *';
    const { rows } = await pool.query( query, [id, user.user_id] );
    return rows[0];
};

/**
 * Updates the "done" boolean property of a todo from the todos table by the todo id.
 * @param {String} id Todo id.
 * @returns {Promise<Object>} Updated todo.
 */
const updateTodoDoneById = async ( id, user ) => {
    const query = 'UPDATE todos SET done = NOT done WHERE id = $1 AND user_id = $2 RETURNING *';
    const { rows } = await pool.query( query, [id, user.user_id] );
    return rows[0];
}

export const todoModel = {
    findAllTodos,
    findTodoById,
    addTodo,
    removeTodoById,
    updateTodoDoneById,
};