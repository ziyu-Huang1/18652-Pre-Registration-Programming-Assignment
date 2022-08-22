const express = require('express')
const fs = require('fs')
const router_handler = require('./router_handler/router_handler')
const router = express.Router()


router.use(express.json())
router.use(express.urlencoded({extended:false}))

router.get('/login', (request, response)=>{
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
    console.log(request.session.username)
    response.sendFile(__dirname + '/public/chatroom.html')
})

router.get('/logout', router_handler.logoutHandle)

router.get('/chatHistory', router_handler.chatHistory)

// router.get('/userinfo', (req, res)=>{
//     if(!req.session.islogin){
//         return res.send('G!')
//     }
//     res.send(req.session.username)
// })

module.exports = router 