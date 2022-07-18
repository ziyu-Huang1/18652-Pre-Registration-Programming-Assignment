var express = require('express')
const fs = require('fs')
var router = express.Router()

router.get('/login', (request, response)=>{
    fs.readFile('./index.html', 'utf-8', function(err, datastr){
        if(err){
            return console.log('error: ' + err.message);
        }
        response.end(datastr)
    })
})

module.exports = router 