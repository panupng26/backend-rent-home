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
const redis = require('redis');
const redisClient = redis.createClient({
    url: 'redis://redis:6379',
    legacyMode: true
});

const { API_PORT } = process.env
const port = process.env.PORT || API_PORT

server.listen(port, async () => {
    console.log(`Server runing at http://localhost:${port}`)
})

const socketService = require('./services/SocketService')
const ChatService = require('./services/ChatService')


redisClient.connect()

redisClient.on('connect', () => {
  console.log('Connected to Redis server');
});

redisClient.on('error', (err) => {
  console.error('Error connecting to Redis:', err);
});

io.on('connection', (socket) => {
    // console.log('loging socket:', socket)
    console.log(`User connected: ${socket.id}`);
    
    socket.on('connection', async (data) => {
        socketService.updateIsActive(socket.id, data.user_id)
        const form_update = {
            socket_id: socket.id,
            data: data.user_id
        }
        redisClient.setex(data.user_id, 8*60*60, socket.id)
    });
  
    socket.on('disconnect', (data) => {
      console.log('data disconnected: ', data.user_id)
      console.log(`User disconnected: ${socket.id}`);
    });
  
    socket.on('sendMessage', async (info) => {
        const chat = await ChatService.createConversation(info.message, info.user_one, info.user_two)
        if(chat.status) {
            await redisClient.get(info.user_one, async (err, reply) => {
                if(reply) {
                    const reloadMessageOne = await ChatService.getMessage1ON1(info.user_one, info.user_two)
                    const loadChatAllOne = await ChatService.getMessageUserTalk(info.user_one)
                    io.to(reply).emit('reloadMessage', reloadMessageOne)
                    io.to(reply).emit('loadChatAllFromOne', loadChatAllOne)
                }
            })

            await redisClient.get(info.user_two, async (err, reply) => {
                if(reply) {
                    const reloadMessageFromTwo = await ChatService.getMessage1ON1(info.user_two, info.user_one)
                    const loadChatAllTwo = await ChatService.getMessageUserTalk(info.user_two)
                    io.to(reply).emit('loadChatAllFromTwo', loadChatAllTwo)
                    io.to(reply).emit('sendTo', reloadMessageFromTwo,info.user_one);
                }
            })
        }
    });
    // socket.on('loadMessage', (user_one, user_two) => {

    // })
    
    io.emit('loadMessage', )
});
