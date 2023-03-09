const request = require('supertest')
const { app } = require('../index')

var token = null

beforeAll(async () => {
    return request(app)
        .post('api/v1/admin/promos')
        .send({
            user_name: 'admin123',
            password: 'admin123',
        })
        .expect('Content-Type', /json/)
        .then((response) => {
            token = response.body.data.token
        })
})

describe('admin/promos', () => {
    it('Should be 200 if promos id found', async () => {
        return request(app)
            .get('/api/v1/admin/promos')
            .set('Authorization', 'Bearer ' + token)
            .send({
                id: ['1', '2']
            })
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.status).toBe(200)
                expect(response.body.message).toBe('Success get all promos')
            })
    })

    it('Should be 404 if promos id not found', async () => {
        return request(app)
            .get('/api/v1/admin/promos')
            .set('Authorization', 'Bearer ' + token)
            .send({
                id: '0'
            })
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.status).toBe(404)
                expect(response.body.message).toBe('Promos not found')
            })
    })
})

describe('admin/promos', () => {
    it('should be 200 if promos id found', async () => {
        return request(app)
            .get('/api/v1/admin/promos')
            .set('Authorization', 'Bearer ' + token)
            .send({
                id: '1'
            })
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.status).toBe(200)
                expect(response.body.message).toBe('Success get promo')
            })
    })

    it('Should be 404 if promos id not found', async () => {
        return request(app)
            .get('/api/v1/admin/promos')
            .set('Authorization', 'Bearer ' + token)
            .send({
                id: '0'
            })
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.status).toBe(404)
                expect(response.body.message).toBe('Promo not found')
            })
    })
})

describe('admin/promos', () => {
    it('Should be 201 if promo successful created', async() => {
        return request(app)
            .post('/api/v1/admin/promos')
            .set('Authorization', 'Bearer ' + token)
            .send({
                promo_name: 'Promo hari kemerdekaan',
                promo_category: 'Discount',
                promo_code: 'MDK',
                promo_amount: '5000'
            })
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.status).toBe(201)
                expect(response.body.message).toBe('Success create promo')
            })
    })

    it('Should be 409 if promo code is exist', async() => {
        return request(app)
            .post('/api/v1/admin/promos')
            .set('Authorization', 'Bearer ' + token)
            .send({
                promo_name: 'Promo hari kemerdekaan',
                promo_category: 'Discount',
                promo_code: 'MDK',
                promo_amount: '5000'
            })
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.status).toBe(409)
                expect(response.body.message).toBe('Promo code is exist')
            })
    })
})

describe('admin/promos', () => {
    it('Should be 200 if promo id is found', async() => {
        return request(app)
            .patch('api/v1/admin/promos')
            .set('Authorization', 'Bearer ' + token)
            .send({
                id: '2',
                promo_code: 'Fitri'
            })
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.status).toBe(200)
                expect(response.body.message).toBe('Update promo success')
            })
    })

    it('Should be 409 if promo code is updated to existing promo code', async() => {
        return request(app)
            .patch('api/v1/admin/promos')
            .set('Authorization', 'Bearer ' + token)
            .send({
                id: '2',
                promo_code: 'MDK'
            })
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.status).toBe(409)
                expect(response.body.message).toBe('Promo code is exist')
            })
    })

    it('Should be 404 if promo id is not found', async() => {
        return request(app)
            .patch('/api/v1/admin/promos')
            .set('Authorization', 'Bearer ' + token)
            .send({
                id: '0'
            })
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.status).toBe(404)
                expect(response.body.message).toBe('Promo not found')
            })
    })
})

describe('admin/promos', () => {
    it('should be 200 if promos id found', async () => {
        return request(app)
            .delete('/api/v1/admin/promos')
            .set('Authorization', 'Bearer ' + token)
            .send({
                id: '1'
            })
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.status).toBe(200)
                expect(response.body.message).toBe('Delete promo success')
            })
    })

    it('Should be 404 if promos id not found', async () => {
        return request(app)
            .get('/api/v1/admin/promos')
            .set('Authorization', 'Bearer ' + token)
            .send({
                id: '0'
            })
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.status).toBe(404)
                expect(response.body.message).toBe('Promo not found')
            })
    })
})