import postgres from 'pg';
const { Pool } = postgres;

export const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'postgres',
    allowExitOnIdle: true,
});

//* Basic test for successfull connection.
// try {
//     await pool.query("SELECT NOW()");
//     console.log("Database connected");
// } catch (error) {
//     console.log(error);
// }