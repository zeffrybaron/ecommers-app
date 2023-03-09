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
    })

})