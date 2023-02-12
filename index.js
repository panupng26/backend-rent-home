const http = require('http')
const app = require('./app')
const cors = require('cors')
// app.use(cors())
const server = http.createServer(app)
// const io = require('socket.io')(server, {
//     cors: {
//       origin: "http://localhost:8082",
//       methods: ["GET", "POST"]
//     },
//     allowRequest: (req, callback) => {
//         const noOriginHeader = req.headers.origin === undefined;
//         callback(null, noOriginHeader);
//     }
//   });
const io = require('socket.io')(server, {
    cors: {
        // The `*` is used as the wildcard here.
        origin: process.env.URL_FRONTEND || 'http://localhost:8085',
        // Set the other options according to your needs.
        // The docs are here:
        // https://www.npmjs.com/package/cors#configuration-options
        methods: ["GET", "POST"],
        allowedHeaders: ["content-type"],
        credentials: true
    }
})

// console.log('why do can this')

const { API_PORT } = process.env
const port = process.env.PORT || API_PORT

server.listen(port, () => {
    console.log(`Server runing at http://localhost:${port}`)
})


// io.set('transports', [
//     'polling'
// ])
  
// io.origins([
//   'http://localhost:8082',
// //   'https://entermeme.com',
// ])

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);
    
    socket.on('connection', (data) => {
        console.log('user one: ', data.userone);
    });
  
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  
    socket.on('sendMessage', (conversationId, senderId, message) => {
      // Store the message in the database
      // ...
      console.log('conversationId: ', conversationId)
      console.log('senderId: ', senderId)
      console.log('message: ', message)
  
      io.emit('receiveMessage', conversationId, senderId, message);
    });
    // socket.on('loadMessage', (user_one, user_two) => {

    // })
    
    io.emit('loadMessage', )
});