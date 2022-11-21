const express = require('express')
const path = require('path')
const app = express()
const PORT = 3200
const socketIO = require('socket.io')
const { generateMessage, generateLocationMessage } = require('./utils/message')
const http = require('http').createServer(app)

app.use(express.json())
app.use(express.static(path.join(__dirname, './public')))
 
const io = socketIO(http)

io.on('connection', socket => {
  console.log('New user connected')

  socket.emit('join', generateMessage('admin', 'welcome to the chat app'))
  
  socket.broadcast.emit('joinedChat', generateMessage('admin', 'new user joined the chat'))
  

  socket.on('createMessage', (message, callback) => {
    console.log('create message', message);
    //io.emit('newMessage', generateMessage(message.from, message.text));
    socket.broadcast.emit('newMessage',  generateMessage(message.from, message.text))
    callback('this is from the server')
  })

  socket.on('createLocationMessage', (message, callback) => {
    socket.broadcast.emit('receiveLocation',  generateLocationMessage(message.from, message.text.latitude, message.text.longitude))
    callback('location shared successfully')
  })

  socket.on('disconnect', () => {
    console.log('User disconnected')
  })
})

http.listen(PORT, () => console.log(`server running on port ${PORT}`))