// const http = require('http')
// const fs = require('fs')
// const path = require('path')
// const server = http.createServer()

// server.on('request', (req, res) => {
//     fs.readFile('./index.html', 'utf-8', function(err, datastr){
//         if(err){
//             return console.log('error: ' + err.message)
//         }
//         res.end(datastr)
//     })
// })

// server.listen(8888, ()=>{
//     console.log('Server running at http://127.0.0.1:8888')
// })

const express = require('express')
const router = require('./router.js')
const app = express()
// app.get('/login', (request, response)=>{
//     fs.readFile('./index.html', 'utf-8', function(err, datastr){
//         if(err){
//             return console.log('error: ' + err.message);
//         }
//         response.end(datastr)
//     })
// })

// app.get('/ggg', (request, response)=>{
//     fs.readFile('./index.html', 'utf-8', function(err, datastr){
//         if(err){
//             return console.log('error: ' + err.message);
//         }
//         response.end(datastr)
//     })
// })

app.use(router)

app.listen(8888, () => {
    console.log('Server running at http://127.0.0.1')
})