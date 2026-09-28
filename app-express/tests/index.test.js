import request from 'supertest';
import { app } from '../index.js';

describe( 'GET /', () => {
    it( 'Responds with JSON', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            serverStatus: '200 - ON',
            message: 'Hello! Welcome to my TODOS API',
        });
    });
});