const {Users} = require('./users')
const expect = require('expect')

describe('user class', () => {
  let users;
  beforeEach(() => {
    users = new Users()
    users.users = [
      {id: '1', name: 'Sam', room: 'raw'},
      {id: '2', name: 'Dave', room: 'node'},
      {id: '3', name: 'John', room: 'raw'}
    ]
  })

  it('should add a new user', () => {
    const newUser = new Users()
    newUser.addUser({id: '1234567', name: 'Sam', room: 'raw'})

    expect(newUser.users).toEqual([{id: '1234567', name: 'Sam', room: 'raw'}])
  })

  it('should return a user', () => {
    //const user = new Users()
    expect(users.getUser('2')).toEqual(users.users[1])
  })

  it('should return user not found', () => {
    //const user = new Users()
    expect(users.getUser('5')).toNotExist()
  }) 
  
  it('should remove a user', () => {
    expect(users.removeUser('3').length).toBe(2)
  })

  it('should not find user with wrong ID', () => {
    expect(users.removeUser('5')).toNotExist()
    expect(users.users.length).toBe(3)
  }) 

  it('should return users in RAW room', () => {
    expect(users.getUsersList('raw')).toEqual(['Sam', 'John'])
  }) 

  it('should return users in NODE room', () => {
    //const user = new Users()
    expect(users.getUsersList('node')).toEqual(['Dave'])
  }) 
})
