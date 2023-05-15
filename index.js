const http = require('http')
const app = require('./app')
const cors = require('cors')
const server = http.createServer(app)
const io = require('socket.io')(server, {
    cors: {
        origin: process.env.URL_FRONTEND || 'http://localhost:8085',
        methods: ["GET", "POST"],
        allowedHeaders: ["content-type"],
        credentials: true
    }
})

const { API_PORT } = process.env
const port = process.env.PORT || API_PORT

server.listen(port, () => {
    console.log(`Server runing at http://localhost:${port}`)
})

const socketService = require('./services/SocketService')
io.on('connection', (socket) => {
    // console.log('loging socket:', socket)
    console.log(`User connected: ${socket.id}`);
    
    socket.on('connection', (data) => {
        socketService.updateIsActive(socket.id, data.user_id)
        const form_update = {
            socket_id: socket.id,
            data: data.user_id
        }
        io.emit('connection',form_update);
    });
  
    socket.on('disconnect', (data) => {
      console.log('data disconnected: ', data.user_id)
      console.log(`User disconnected: ${socket.id}`);
    });
  
    socket.on('sendMessage', (conversationId, senderId, message) => {
      console.log('conversationId: ', conversationId)
      console.log('senderId: ', senderId)
      console.log('message: ', message)
  
      io.emit('receiveMessage', conversationId, senderId, message);
    });
    // socket.on('loadMessage', (user_one, user_two) => {

    // })
    
    io.emit('loadMessage', )
});