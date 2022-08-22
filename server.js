const express = require('express')
const session = require('express-session')
const router = require('./router.js')
const app = express()

app.use(express.static("public"))

const http = require('http')
const db = require('./database/db_index.js')
const httpserver = http.createServer(app)
const io = require('socket.io')(httpserver)

const sessionMiddleware = session({
    secret: "18652",
    resave: false,
    saveUninitialized: false
});

io.use(function(socket, next){
    sessionMiddleware(socket.request, socket.request.res || {}, next)
  })

app.use(sessionMiddleware)

io.on('connection', (socket)=>{
    console.log("connected")
    // console.log(socket.request.session.username)
    socket.on('msg', (msg)=>{
        username = socket.request.session.username
        contentTime = Date.now()
        // console.log(typeof contentTime)
        const insertContent = 'insert into chatcontent set ?'
        db.query(insertContent, {username:socket.request.session.username, content: msg.content, time: contentTime}, (error, result)=>{
            if(error){
                console.log(error.message)
                throw error
            }
        })
        io.emit('toClient', {username:socket.request.session.username, content: msg.content, time: contentTime})
    })
    socket.on('disconnect', ()=>{
        console.log("disconnected")
    })
})

app.use(router)

httpserver.listen(8888, () => {
    console.log('Server running at http://127.0.0.1:8888/login')
})

module.exports = {
    httpserver, 
    app, 
    io
  }