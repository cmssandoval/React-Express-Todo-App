/**
 * This file is for initial configuration only,
 * because I wanted to create the database, table,
 * and insertions from JavaScript instead of
 * SQL Shell or pgadmin.
*/

import { Client } from 'pg';
import 'dotenv/config';

/**
 * Main function. It sets configuration, 
 * connects and disconnects from the database,
 * and runs utility functions.
 * @returns {Promise<String>} Console log of the client connection being clossed.
 */
async function connectToPostgresDefault () {
    // Default database connection configuration
    const client = new Client({});

    // Database connection
    await client.connect();
    console.log('Connected to the database!');

    //* Utility queries goes here
    // await createDatabase( client, 'db_app_todo' );
    // await createNewTable( client, 'todos');
    // await selectAllFromTable( client, 'todos');
    // await insertExampleTodos( client );
    
    await client.end();
    return console.log('Connection closed.');
};
//! Main function call
connectToPostgresDefault();

/**
 * Creates a database.
 * @param {Client} client Client instance.
 * @param {String} databaseName Database name.
 * @returns {Promise<Void>}
 */
const createDatabase = async ( client, databaseName) => {

    const doesExists = await client.query(
        `SELECT datname FROM pg_catalog.pg_database WHERE datname = $1`,
        [databaseName]
    );

    if ( doesExists.rowCount === 0 ) {
        // Database creation
        await client.query(`CREATE DATABASE "${databaseName}"`);
        console.log(`Database ${databaseName} has been created successfully.`);
    } else {
        console.log(`Database ${databaseName} already exists.`);
    }
    return;
};

/**
 * Creates a new table.
 * @param {Client} client Client instance.
 * @param {String} tableName Table name.
 * @returns {Promise<String>} Console log of the table creation response.
 */
const createNewTable = async ( client, tableName ) => {

    // Drop if exists
    // await client.query(`DROP TABLE IF EXISTS ${tableName}`);
    
    const response = await client.query(
        `CREATE TABLE "${tableName}" (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            done BOOLEAN NOT NULL DEFAULT FALSE
        )`
    );
    return console.log(response);
};

/**
 * Selects all rows of a table.
 * @param {Client} client Client instance.
 * @param {String} tableName Table name.
 * @returns {Promise<String>} Console log of the rows selected.
 */
const selectAllFromTable = async ( client, tablename ) => {
    const { rows: response } = await client.query(`SELECT * FROM ${tablename}`)
    return console.log(response);
};

/**
 * Inserts example data to table todos.
 * @param {Client} client Client instance.
 * @returns {String} Console log of the data insertion response.
 */
const insertExampleTodos = async ( client ) => {
    const response = await client.query(
        `INSERT INTO todos (title, done) VALUES
            ('Task 1', false),
            ('Task 2', true),
            ('Task 3', false)
        `
    );
    return console.log(response);
};