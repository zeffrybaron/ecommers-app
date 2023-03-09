const express = require('express')
const app = express()

const auth = require('./auth.routes')
const adminItems = require('./admin/items.routes')
const adminOrders = require('./admin/orders.routes')
const adminUser = require('./admin/user.routes')
const adminUpload = require('./admin/uploadfile.routes')
const adminPromo = require('./admin/promos.routes')

const memberUser = require('./member/user.routes')
const memberItems = require('./member/items.routes')
const memberOrders = require('./member/orders.routes')
const memberCart = require('./member/cart.routes')
const memberpayment = require('./member/payments.routes')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.group('/api/v1', (router) => {
    router.use('/auth', auth)
})

app.group('/api/v1/admin', (router) => {
    router.use('/items', adminItems)
    router.use('/orders', adminOrders)
    router.use('/users', adminUser)
    router.use('/upload', adminUpload)
    router.use('/promos', adminPromo)
})

app.group('/api/v1/member', (router) => {
    router.use('/users', memberUser)
    router.use('/items', memberItems)
    router.use('/orders', memberOrders)
    router.use('/carts', memberCart)
    router.use('/payments', memberpayment)
})

module.exports = app