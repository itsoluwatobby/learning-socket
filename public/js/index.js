let socket = io();
    socket.on('connect', () => {
      console.log('connected to server')

      socket.emit('createMessage', {
        from: 'tobby',
        text: 'good day man'
      })
    })

    socket.on('disconnect', () => {
      console.log('Disconnected from server')
    })

    socket.on('newMessage', message => {
      console.log('new message', message)
    })

    socket.on('join', message => {
      console.log('welcome message', message)
    })
    socket.on('joinedChat', message => {
      console.log('message to room', message)
    })