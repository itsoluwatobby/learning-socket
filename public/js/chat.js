let socket = io();
    socket.on('connect', () => {
      let params = jQuery.deparam(window.location.search)
      socket.emit('join', params, (err) => {
        if(err){
          alert(err)
          window.location.href = '/'
        }else{
          console.log('no err')
        }
      })
    })

    socket.on('disconnect', () => {
      console.log('Disconnected from server')
    })

    socket.on('updateUserList', (users) => {
      console.log('usersList', users)
      const li = jQuery('<li></li>')
    })

    function scrollToBottom(){
      let messages = jQuery('#messages')
      let newMessage = messages.children('li:last-child')

      let clientHeight = messages.prop('clientHeight')
      let scrollTop = messages.prop('scrollTop')
      let scrollHeight = messages.prop('scrollHeight')

      let newMessageHeight = newMessage.innerHeight()
      let lastMessageHeight = newMessage.prev().innerHeight()

      if(clientHeight + scrollTop + lastMessageHeight + newMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight)
      }
    }

    socket.on('newMessage', message => {
      let formattedTime = moment(message.createdAt).format('h:mm a')
      let template = jQuery('#message-template').html()
      let html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
      })

      jQuery("#messages").append(html)
      scrollToBottom()
    })

    socket.on('receiveLocation', message => {
      let formattedTime = moment(message.createdAt).format('h:mm a')
  
      let template = jQuery('#location-template').html()
      let html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formattedTime
      })

      jQuery("#messages").append(html)
      scrollToBottom()
    })

    socket.on('joins', message => {
      let formattedTime = moment(message.createdAt).format('h:mm a')

      let li = jQuery('<li></li>')
      li.text(`${message.from}: ${message.text} at ${formattedTime}`)
      jQuery('#messages').append(li)
    })

    socket.on('joinedChat', message => {
      let li = jQuery('<li></li>')
      li.text(`${message.from}: ${message.text}`)
      jQuery('#messages').append(li)
    })

    socket.emit('createMessage', {
      text: 'good day my man'
    }, function(data){
      !data ? console.log('message failed') : console.log(data)
    })

    jQuery('#message-form').on('submit', (e) => {
      e.preventDefault()

      socket.emit('createMessage', {
        from: 'User', text: jQuery('[name=message]').val()
      }, () => {
        jQuery('[name=message]').val('')
        console.log('sent')
      })
    })

    let locationButton = jQuery('#send-location')
    locationButton.on('click', () => {
      if(!navigator.geolocation){
        return alert('Geolocation no supported by your browser')
      }else{
        locationButton.attr('disabled', 'disabled').text('Sending Location...')
        navigator.geolocation.getCurrentPosition(position => {
          let posY = position.coords.longitude
          let posX = position.coords.latitude
            alert(`User location is longitude:${posY} and latitude:${posX}`)
            locationButton.removeAttr('disabled').text('Send Location')
            socket.emit('createLocationMessage', {text:{longitude: posY, latitude: posX}}, (locate) => {
              console.log(locate)
            })
        }, error => {
          locationButton.removeAttr('disabled').text('Send Location')
          alert('Unable to fetch location')
        })
      }
    })

    
