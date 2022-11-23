let expect = require('expect')
const {generateMessage} = require('./message')
const { isString } = require('./validation')

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    let from = 'john'
    let text = 'some message'
    let message = generateMessage(from, text)

    expect(typeof message.createdAt).toBe('number')
    expect(message).toInclude({from, text})
  })
})

describe('isString', () => {
  it('should accept string values with no space', () => {
    expect(isString('hello')).toBe(true)
  })

  it('should reject non-string values', () => {
    expect(isString(4)).toBe(false)
  })
  
  it('should reject string only spaces', () => {
    expect(isString('   ')).toBe(false)
  })
})