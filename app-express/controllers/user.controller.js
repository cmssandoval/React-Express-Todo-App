import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { getDatabaseError } from "../lib/errors/database.error.js";
import { userModel } from "../models/user.model.js";

const JWT_SECRET = process.env.JWT_SECRET;

const login = async ( req, res ) => {
    const { email, password } = req.body;
    try {
        
        const user = await userModel.validateUser({ email, password });

        const payload = {
            email,
            user_id: user.user_id,
        };

        const token = jwt.sign( payload, JWT_SECRET );

        return res.status(200).json({
            message: "User logged successfully",
            token,
            email,
        });

    } catch ( error ) {
        console.log( error );

        if (error.code) {
            const { code, message } = getDatabaseError(error.code);
            return res.status(code).json({ message });
        }

        return ( res.status(500).json({
            message: error.message,
        }));
    }
};

const register = async ( req, res ) => {
    const { email, password } = req.body;
    try {

        await userModel.create({ email, password });
        return res.status(201).json({ message: "User created successfully" });
        
    } catch (error) {
        console.log(error);

        if (error.code) {
            const { code, message } = getDatabaseError(error.code);
            return res.status(code).json({ message });
        }

        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const userController = {
    login,
    register,
};