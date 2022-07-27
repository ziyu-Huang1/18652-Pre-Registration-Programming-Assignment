const express = require('express')
const fs = require('fs')
const router_handler = require('./router_handler/router_handler')
const router = express.Router()

router.use(express.json())
router.use(express.urlencoded({extended:false}))

router.get('/login', (request, response)=>{
    fs.readFile('./index.html', 'utf-8', function(err, datastr){
        if(err){
            return console.log('error: ' + err.message);
        }
        response.end(datastr)
    })
})


router.post('/login', router_handler.loginPageHandle)

module.exports = router 