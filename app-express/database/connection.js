import postgres from 'pg';
import 'dotenv/config';

const { Pool } = postgres;

export const pool = new Pool({
    allowExitOnIdle: true,
});

//* Basic test for successfull connection.
// try {
//     await pool.query("SELECT NOW()");
//     console.log("Database connected");
// } catch (error) {
//     console.log(error);
// }