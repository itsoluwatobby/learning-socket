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

  socket.emit('newMessage', {
    from: 'michael',
    text: 'Hey, whats up',
    createdAt: 123
  })

  socket.on('createMessage', (message) => {
    console.log('create message', message)
  })

  socket.on('disconnect', () => {
    console.log('User disconnected')
  })
})

http.listen(PORT, () => console.log(`server running on port ${PORT}`))