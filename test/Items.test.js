const request = require('supertest')
const { app } = require('../index')


describe('admin/items', () => {
    it('should be items successful created', async() => {
        return request(app)
            .post('/api/v1/admin/items')
            .send({
                item_name:"Kipas",
                item_category:"Elektronik",
                item_price:50000,
                item_image:"https://ik.imagekit.io/34nabbgwi/photo-1662540161854-image_2022-09-07_11-17-11_KsKUnFDUN.png"
            })
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.status).toBe(201)
                expect(response.body.message).toBe('Create items has successful')
            })
    }),

    it('should be items successful updated', async() => {
        return request(app)
            .put('/api/v1/admin/items')
            .send({
                item_name:"Ayam",
                item_category:"Hewan",
                item_price:100000,
                item_image:"https://ik.imagekit.io/34nabbgwi/photo-1662540161854-image_2022-09-07_11-17-11_KsKUnFDUN.png"
            })
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.status).toBe(201)
                expect(response.body.message).toBe('Update items has successful')
            })
    }),

    it('should be items successful deleted', async() => {
        return request(app)
            .delete('/api/v1/admin/items/1')
            .then((response) => {
                expect(response.status).toBe(201)
                expect(response.body.message).toBe('deleted items has successful')
            })
    }),

    it('should be get all items successful', async() => {
        return request(app)
            .get('/api/v1/admin/items')
            .then((response) => {
                expect(response.status).toBe(201)
                expect(response.body.message).toBe('get all items has successful')
            })
    }),

    it('should be get items by Id successful', async() => {
        return request(app)
            .get('/api/v1/admin/items/1')
            .then((response) => {
                expect(response.status).toBe(201)
                expect(response.body.message).toBe('get items by Id has successful')
            })
    })


})

describe('member/items', () => {
   
    it('should be get all items successful', async() => {
        return request(app)
            .get('/api/v1/member/items')
            .then((response) => {
                expect(response.status).toBe(201)
                expect(response.body.message).toBe('get all items has successful')
            })
    }),

    it('should be get items by Id successful', async() => {
        return request(app)
            .get('/api/v1/member/items/1')
            .then((response) => {
                expect(response.status).toBe(201)
                expect(response.body.message).toBe('get items by Id has successful')
            })
    })


})