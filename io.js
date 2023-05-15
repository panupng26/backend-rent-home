const http = require('http')
const app = require('./app')
const io = require('socket.io')

const createServer = () => {
  const server = http.createServer(app)
  const socketIO = io(server, {
    cors: {
      origin: process.env.URL_FRONTEND || 'http://localhost:8085',
      methods: ["GET", "POST"],
      allowedHeaders: ["content-type"],
      credentials: true
    }
  })

  socketIO.on('connection', (socket) => {
    console.log('loging socket:', socket)
    console.log(`User connected: ${socket.id}`);

    socket.on('connection', (data) => {
      console.log('user one: ', data.user_id);

    });

    socket.on('disconnect', (data) => {
      console.log('data disconnected: ', data.user_id)
      console.log(`User disconnected: ${socket.id}`);
    });

    socket.on('sendMessage', (conversationId, senderId, message) => {
      // Store the message in the database
      // ...
      console.log('conversationId: ', conversationId)
      console.log('senderId: ', senderId)
      console.log('message: ', message)

      socketIO.emit('receiveMessage', conversationId, senderId, message);
    });

    // socket.on('loadMessage', (user_one, user_two) => {
    //   // Handle load message event
    // })

    socketIO.emit('loadMessage');
  });

  return server;
};

module.exports = createServer;
