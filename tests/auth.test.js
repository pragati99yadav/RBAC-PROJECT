// tests/auth.test.js
const request = require('supertest');
const app = require('../server'); // Import the app for testing

describe('Authentication and RBAC', () => {
    let adminToken;
    let userToken;

    beforeAll(async () => {
        // Simulate registering Admin and User
        await request(app).post('/api/auth/register').send({ username: 'admin', password: 'adminpass', role: 'Admin' });
        await request(app).post('/api/auth/register').send({ username: 'user', password: 'userpass', role: 'User' });

        // Login as Admin and User to get tokens
        const adminLogin = await request(app).post('/api/auth/login').send({ username: 'admin', password: 'adminpass' });
        const userLogin = await request(app).post('/api/auth/login').send({ username: 'user', password: 'userpass' });

        adminToken = adminLogin.body.token;
        userToken = userLogin.body.token;
    });

    test('Admin can create a user', async () => {
        const res = await request(app)
            .post('/api/users')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({ username: 'newuser', password: 'newpass', role: 'User' });
        expect(res.statusCode).toBe(201);
    });

    test('User cannot create a user (Forbidden)', async () => {
        const res = await request(app)
            .post('/api/users')
            .set('Authorization', `Bearer ${userToken}`)
            .send({ username: 'newuser', password: 'newpass', role: 'User' });
        expect(res.statusCode).toBe(403);
    });
});
