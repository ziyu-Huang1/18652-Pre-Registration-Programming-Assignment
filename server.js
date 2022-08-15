const express = require('express')
const router = require('./router.js')
const app = express()

app.use(express.static("public"))
app.use(router)

const http = require('http')
const httpserver = http.createServer(app)
const io = require('socket.io')(httpserver)

io.on('connection', (socket)=>{
    console.log("connected")
    socket.on('disconnect', ()=>{
        console.log("disconnected")
    })
})

httpserver.listen(8888, () => {
    console.log('Server running at http://127.0.0.1:8888/login')
})

module.exports = io