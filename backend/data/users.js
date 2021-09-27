import bcrypt from 'bcryptjs'

const users =
  [{
    "_id": {
      "$oid": "60781509cf16354648c2ffb0"
    },
    "isAdmin": true,
    "name": "admin",
    "email": "admin@example.com",
    "password": "$2a$10$es56nszRjTPDsFecTC3iweCvtGdoct2cXVHf35bG9s/7iioKJ5Nwq",
    "__v": 0,
    "createdAt": {
      "$date": "2021-04-15T10:27:21.488Z"
    },
    "updatedAt": {
      "$date": "2021-06-18T04:16:57.079Z"
    },
    "mobile": "0369771213"
  }, {
    "_id": {
      "$oid": "607d8c710730b92230aca143"
    },
    "isAdmin": false,
    "name": "user user1",
    "email": "user2@user.com",
    "password": "$2a$10$NWtlBcVa3GMJaY6E7oglXuK0fGyrFakG5zaYXTuhXs1cRSdTJIds.",
    "createdAt": {
      "$date": "2021-04-19T13:58:09.021Z"
    },
    "updatedAt": {
      "$date": "2021-06-17T16:21:23.183Z"
    },
    "__v": 0,
    "mobile": "0363536790"
  }, {
    "_id": {
      "$oid": "60da9d2dc42e3e4a80fe9aff"
    },
    "isAdmin": false,
    "name": "user user",
    "mobile": "0123456789",
    "email": "user1@user.com",
    "password": "$2a$10$dxbY4UYiKjjGfnMAKtrWVOaM/Vo68snvkvKHKqrTEjE3niJIo0IAK",
    "createdAt": {
      "$date": "2021-06-29T04:10:21.728Z"
    },
    "updatedAt": {
      "$date": "2021-06-29T04:10:21.728Z"
    },
    "__v": 0
  }
  ]

export default users
