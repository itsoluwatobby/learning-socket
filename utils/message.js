const moment = require('moment')

const date = moment().valueOf()

exports.generateMessage = (from, text) => {
  return {
    from, text, createdAt: date
  }
}

exports.generateLocationMessage = (from, latitude, longitude) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${latitude},${longitude}`, 
    createdAt: date
  }
}