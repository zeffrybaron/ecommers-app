const { app, port } = require('./index')

const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
const socketio = require('socket.io')
const io = socketio(server);

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('message', (msg) => {
        io.emit('chat', msg);
    })
    socket.on('chat', (msg) => {
        io.emit('message', msg);
    })
    socket.on('disconnect', () => {
        console.log('a user disconected');
    })
})