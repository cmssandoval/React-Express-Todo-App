import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import todoRoute from './routes/todo.route.js';
import userRoute from './routes/user.route.js';

export const app = express();

app.use(express.json());
app.use(cors());
app.use('/todos', todoRoute);
app.use('/users', userRoute);

app.get('/', ( req, res ) => {
    return res.json({
        serverStatus: '200 - ON',
        message: 'Hello! Welcome to my TODOS API',
    });
});

const PORT = process.env.PORT || 5000;

app.listen( PORT, () => {
    console.log(`¡Server is on! Listening on port ${ PORT }`);
    console.log(`Go to http://localhost:${ PORT }/`);
});