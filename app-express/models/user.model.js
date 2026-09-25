import { pool } from "../database/connection.js";
import bcrypt from 'bcrypt';
const SALT_OR_ROUNDS = 10;

/**
 * Finds a user by its email.
 * @param {string} email User email.
 * @returns User.
 */
const findUserByEmail = async ( email ) => {
    const query = 'SELECT * FROM users WHERE email = $1';
    const { rows } = await pool.query( query, [email] );
    return rows[0];
};

const create = async ({ email, password }) => {
    try {
        const query = 'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING email';
        const encryptedPassword = bcrypt.hashSync( password, SALT_OR_ROUNDS );
        const { rows } = await pool.query( query, [email, encryptedPassword] );

        return rows[0];

    } catch (error) {
        console.log(error);
        throw error;
    }
};

const validateUser = async ({ email, password }) => {
    try {
        
        const user = await findUserByEmail( email );
       
        if ( !user ) {
            throw { message: "User not found" };
        }

        const isMatch = bcrypt.compareSync( password, user.password );

        if ( !isMatch ) {
            throw { message: "Invalid credentials" };
        }
        return user;
        
    } catch ( error ) {

        throw error;
    }
}

export const userModel = {
    findUserByEmail,
    create,
    validateUser,
};