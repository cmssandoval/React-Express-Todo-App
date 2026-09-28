import request from 'supertest';
import { app } from '../index.js';

describe( 'GET /', () => {
    let token = '';

    it( 'Responds with valid body', async () => {
        const response = await request(app)
            .post("/users/login")
            .send({ email: "test@test.com", password: "123123" });
        token = response.body.token;

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("token");
        expect(response.body).toHaveProperty("email");
    });
    it( 'Responds with all valid data format', async () => {
        const response = await request(app)
            .get('/todos')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.results).toBeInstanceOf(Array);
    });
});