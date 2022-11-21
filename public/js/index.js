let socket = io();
    socket.on('connect', () => {
      console.log('connected to server')
    })

    socket.on('disconnect', () => {
      console.log('Disconnected from server')
    })

    socket.on('newMessage', message => {
      //console.log('new message', message)

      let li = jQuery('<li></li>')
      li.text(`${message.from}: ${message.text}`)
      jQuery('#messages').append(li)
    })

    socket.on('join', message => {
      //console.log('welcome message', message)

      let li = jQuery('<li></li>')
      li.text(`${message.from}: ${message.text}`)
      jQuery('#messages').append(li)
    })
    socket.on('joinedChat', message => {
     // console.log('message to room', message)

      let li = jQuery('<li></li>')
      li.text(`${message.from}: ${message.text}`)
      jQuery('#messages').append(li)
    })

    socket.emit('createMessage', {
      from: 'frank',
      text: 'good day my man'
    }, function(data){
      !data ? console.log('message failed') : console.log(data)
    })

    jQuery('#message-form').on('submit', (e) => {
      e.preventDefault()

      socket.emit('createMessage', {
        from: 'User', text: jQuery('[name=message]').val()
      }, () => {
        console.log('sent')
      })
      jQuery('[name=message]').val('')
    })

    
