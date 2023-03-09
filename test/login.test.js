const request = require('supertest')
const { app } = require('../index')

describe('auth', () => {
    it('Should be 200 if username and password right', async() => {
        return request(app)
            .post('/api/v1/auth/login')
            .send({
                user_name: 'admin12345',
                password: 'qwerty1234',
            })
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.status).toBe(200)
                expect(response.body.message).toBe('Login success')
            })
    })

    it('Should be 404 if username and password wrong', async() => {
        return request(app)
            .post('/api/v1/auth/login')
            .send({
                user_name: 'admin1234salah',
                password: 'passwordsalah',
            })
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.status).toBe(404)
            })
    })

    it('Should be 404 and message User not exist', async() => {
        return request(app)
            .post('/api/v1/auth/login')
            .send({
                user_name: 'admin1234salah',
                password: 'passwordsalah',
            })
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.status).toBe(404)
                expect(response.body).toEqual({
                    message: 'User not exist',
                })
            })
    })

    it('Should be 404 and message Password not valid', async() => {
        return request(app)
            .post('/api/v1/auth/login')
            .send({
                user_name: 'admin12345',
                password: 'passwordsalah',
            })
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.status).toBe(404)
                expect(response.body).toEqual({
                    message: 'Password not valid',
                })
            })
    })

    it('Should be 401 and message Pending account, Please verify Your email', async() => {
        return request(app)
            .post('/api/v1/auth/login')
            .send({
                user_name: 'admin123456',
                password: 'qwerty1234',
            })
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.status).toBe(401)
                expect(response.body).toEqual({
                    message: 'Pending account, Please verify Your email',
                })
            })
    })
})