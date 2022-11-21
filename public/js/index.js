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

    socket.on('receiveLocation', message => {
      //console.log('new location', location)
      //let msg = JSON.parse(message.text)
      let li = jQuery('<li></li>')
      let a = jQuery('<a target=_blank>My current location</a>')
      li.text(`${message.from}: `)
      a.attr('href', message.url)
      li.append(a)
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

    let locationButton = jQuery('#send-location')
    locationButton.on('click', () => {
      if(!navigator.geolocation){
        return alert('Geolocation no supported by your browser')
      }else{
        navigator.geolocation.getCurrentPosition(position => {
          let posY = position.coords.longitude
          let posX = position.coords.latitude
            alert(`User location is longitude:${posY} and latitude:${posX}`)
            socket.emit('createLocationMessage', {from: 'User', text:{longitude: posY, latitude: posX}}, (locate) => {
              console.log(locate)
            })
        }, error => {
          alert('Unable to fetch location')
        })
      }
    })

    
