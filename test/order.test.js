const request = require('supertest')
const { password } = require('../database/config/config')
const { app } = require('../index')
const { Items } = require('../src/models')
const { response } = require('../src/routes/index.routes')


var token = null

beforeAll(async() => {
    return request(app)
        .post('/api/v1/auth/login')
        .set('Authorization', 'Bearer ' + token)
        .send({
            user_name: 'member123',
            password: "member123"
        })
        .expect('Content-Type', /json/)
        .then((response) => {
            token = response.body.data.token;
        })
})


describe('member/orders', () => {
    it('should be order successful created', async() => {
        return request(app)
            .post('/api/v1/member/orders')
            .set('Authorization', 'Bearer ' + token)
            .send({

                customer_name: "samsol",
                sender_addres: "jl. keramat",
                receiver_addres: "jl.mansyur",
                items: [{
                    id_item: 2,
                    item_quantity: 2,
                }],
            })
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.status).toBe(201)
                expect(response.body.message).toBe('Create order has successful')
            })
    })
    it('should be order unsuccessful', async() => {
        return request(app)
            .post('/api/v1/member/orders')
            .set('Authorization', 'Bearer ' + token)
            .send({

                customer_name: "samsol",
                sender_addres: "jl. keramat",
                receiver_addres: "jl.mansyur",
                items: [{
                    id_item: 2002,
                    item_quantity: 2,
                }],
            })
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.status).toBe(404)

            })
    })
    it('should be return 200 if success get all order', async() => {
        return request(app)
            .get('/api/v1/member/orders')
            .set('Authorization', 'Bearer ' + token)
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.status).toBe(200)
            })
    })

    it('should be update order successful', async() => {
        return request(app)
            .patch('/api/v1/member/orders/1')
            .set('Authorization', 'Bearer ' + token)

        .send({

                customer_name: "samsoll",
                sender_addres: "jl. keramat",
                receiver_addres: "jl.mansyur",

            })
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.status).toBe(200)
                expect(response.body.message).toBe('Update order successful')


            })
    })
    it('should be delete order successful', async() => {
        return request(app)
            .delete('/api/v1/member/orders/1')
            .set('Authorization', 'Bearer ' + token)
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.body.message).toBe('Delete order successful')
                expect(response.status).toBe(200)



            })
    })

})