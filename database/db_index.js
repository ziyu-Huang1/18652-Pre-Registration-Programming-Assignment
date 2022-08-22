const mysql = require('mysql')

const db = mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'12345678',
    database:'webdata',  
})

module.exports = db

// table user
// username varchar(255) primary key
// password varchar(255)

//table chatcontent
//username varchar(255)
//content varchar(500)
//time varchar(30)