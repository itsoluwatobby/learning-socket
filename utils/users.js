[
  {
    "id": "we3456rdfgtres455/fg",
    "name": "john",
    "room": "eng"
  }
]

class Users{
  constructor(){
    this.users = []
  }

  addUser(user){
    this.users.push(user)
  }
  getUser(id){
    const user = this.users.find(user => user.id === id) 
    return user ? user : false
  }
  removeUser(id){
    const targetUser = this.getUser(id)
    this.users = this.users.filter(user => user.id !== targetUser.id)
    return targetUser 
  }
  getUsersList(room){
    const user = this.users.filter(user => user.room === room)
    const name = user.map(us => us.name)
    return name
  }

}
module.exports = {Users}

// class Person{

//   constructor(name, age){
//     this.name = name;
//     this.age = age
//   }

//   getUsers(name){
//     if(this.name = name) return `User name is ${this.name}, user age is ${this.age}`
//     else return 'user not found'
//   }
  
// }
// const person1 = new Person('John', 54)
// const person2 = new Person('Sam', 24)
// const person3 = new Person('Dave', 34)
