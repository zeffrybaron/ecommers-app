const request = require('supertest')
const { app } = require('../index')

describe('auth', () => { 
    it('should register new user', async() => {
    return request(app)
        .post('/api/v1/auth/register')
        .send({
            role: '2',
            email: 'email@email.com',
            password: '12345678',
            user_name: 'member123',
            name: 'John Doe Admin',
            no_telephone: '08265623269'
        })
        .expect('Content-Type', /json/)
        .then((response) => {
            expect(response.status).toBe(200)
            expect(response.body.message).toBe('Register success')
        })
})  

    it('Should be 401 and Please verify Your email', async() => {
        return request(app)
            .post('/api/v1/auth/register')
            .send({
                role: '2',
                email: 'email@email.com',
                password: '12345678',
                user_name: 'member123',
                name: 'John Doe Member',
                no_telephone: '08265623269'
            })
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.status).toBe(401)
                expect(response.body).toEqual({
                    message: 'Please verify Your email',
                })
            })
    })

})