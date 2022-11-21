let expect = require('expect')
const generateMessage = require('./message')

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    let from = 'john'
    let text = 'some message'
    let message = generateMessage(from, text)

    expect(message.createdAt).toBe('number')
    expect(message).toInclude({from, text})
  })
})