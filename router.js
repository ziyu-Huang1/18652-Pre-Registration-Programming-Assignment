const express = require('express')
const fs = require('fs')
const session = require('express-session')
const router_handler = require('./router_handler/router_handler')
const router = express.Router()

router.use(session({
    secret: '18652',
    resave: false,
    saveUninitialized: true,
}))


router.use(express.json())
router.use(express.urlencoded({extended:false}))

router.get('/login', (request, response)=>{
    // fs.readFile('./index.html', 'utf-8', function(err, datastr){
    //     if(err){
    //         return console.log('error: ' + err.message);
    //     }
    //     response.end(datastr)
    // })
    response.sendFile(__dirname + '/public/index.html')
})


router.post('/login', router_handler.loginPageHandle)

router.get('/chatroom', (request, response)=>{
    // fs.readFile('./chatroom.html', 'utf-8', function(err, datastr){
    //     if(err){
    //         return console.log('error: ' + err.message);
    //     }
    //     response.end(datastr)
    // })
    console.log(request.session.user.username)
    response.sendFile(__dirname + '/public/chatroom.html')
})

router.get('/logout', (req, res)=>{
    req.session.destroy()
})

// router.get('/userinfo', (req, res)=>{
//     if(!req.session.islogin){
//         return res.send('G!')
//     }
//     res.send(req.session.user.username)
// })

module.exports = router 