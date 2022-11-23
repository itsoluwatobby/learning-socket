const express = require('express')
const path = require('path')
const app = express()
const PORT = 3200
const socketIO = require('socket.io')
const {Users} = require('./utils/users')
const { generateMessage, generateLocationMessage } = require('./utils/message')
const { isString } = require('./utils/validation')
const http = require('http').createServer(app)

const users = new Users()

app.use(express.json())
app.use(express.static(path.join(__dirname, './public')))
 
const io = socketIO(http)

io.on('connection', socket => {

  socket.on('join', (params, callback) => {
    if(!isString(params.name) || !isString(params.room)){
      callback('name and room are required and must be strings')
    }else{
      socket.join(params.room)
      users.removeUser(socket.id)
      users.addUser({id:socket.id,name:params.name,room:params.room})
      //io.to(user)
      //socket.broadcast.to()
      io.to(params.room).emit('updateUserList', users.getUsersList(params.room))
      socket.emit('joins', generateMessage('Admin', 'welcome to the chat app'))
      socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} joined the chat`))
      callback()
      //socket.leave() to leave a room
    }
  })

  socket.on('createMessage', (message, callback) => {
    let user = users.getUser(socket.id)
    //io.emit('newMessage', generateMessage(message.from, message.text));
    //socket.emit('newMessage', generateMessage(message.from, message.text));
    user && isString(message.text) && io.to(user.room).emit('newMessage',  generateMessage(user.name, message.text))
    callback('this is from the server')
  })

  socket.on('createLocationMessage', (message, callback) => {
    let user = users.getUser(socket.id)

    io.to(user.room).emit('receiveLocation',  generateLocationMessage(user.name, message.text.latitude, message.text.longitude))
    callback('location shared successfully')
  })

  socket.on('disconnect', () => {
    let user = users.removeUser(socket.id)
    user && io.to(user.room).emit('updateUserList', users.getUsersList(user.room))
    user && io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`))
    console.log('User disconnected')
  })
})

http.listen(PORT, () => console.log(`server running on port ${PORT}`))