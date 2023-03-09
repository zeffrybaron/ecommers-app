require('dotenv').config()
require('express-group-routes')

const {
    notFound,
    error,
} = require('./src/middlewares/errorHandling.middleware')
const routes = require('./src/routes/index.routes')
const swaggerJson = require('./openapi.json')
const swaggerUi = require('swagger-ui-express')

const express = require('express')

const app = express()
const port = process.env.PORT || 3000
    // const server = require('./server')

// const io = socketio(server);

// io.on('connection', (socket) => {
//     console.log('a user connected');
//     socket.on('chat message', (msg) => {
//         console.log('message : ' + msg);
//     })
//     socket.on('disconnect', () => {
//         console.log('user disconected');
//     })

// })

app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerJson))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(routes)
app.use('*', notFound)
app.use(error)

module.exports = {
    app,
    port,
}