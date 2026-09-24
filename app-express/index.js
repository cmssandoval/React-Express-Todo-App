import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import todoRoute from './routes/todo.route.js';
import userRoute from './routes/user.route.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/todos', todoRoute);
app.use('/users', userRoute);

const PORT = process.env.PORT || 5000;

app.listen( PORT, () => {
    console.log(`¡Server is on! Listening on port ${ PORT }`);
    console.log(`Go to http://localhost:${ PORT }/`);
});