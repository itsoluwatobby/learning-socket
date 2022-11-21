const express = require('express')
const path = require('path')
const app = express()
const PORT = 3200
const socketIO = require('socket.io')
const http = require('http').createServer(app)

app.use(express.json())
app.use(express.static(path.join(__dirname, './public')))
 
const io = socketIO(http)

io.on('connection', socket => {
  console.log('New user connected')

  socket.emit('join', {
    from: 'admin',
    text: 'welcome to the chat app',
    createdAt: new Date().getTime()
  })
  
  socket.broadcast.emit('joinedChat', {
    from: 'admin',
    text: 'new user joined the chat',
    createdAt: new Date().getTime()
  })
  

  socket.on('createMessage', (message) => {
    console.log('create message', message)
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    })
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // })
  })

  socket.on('disconnect', () => {
    console.log('User disconnected')
  })
})

http.listen(PORT, () => console.log(`server running on port ${PORT}`))