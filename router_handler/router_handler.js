const bcrypt = require('bcryptjs')
const fs = require('fs')
const db = require('../database/db_index')


exports.loginPageHandle = (request, response)=>{
    const userinfo = request.body
    if(userinfo.button == 'register'){
        const userCheck = 'select * from user where username=?'
        db.query(userCheck, userinfo.username, (error, results)=>{
            // console.log(userinfo)
            if(error){
                return response.send(error.message)
            }
            if(results.length > 0){
                return response.send('Username has been used!')
            }
            userinfo.password = bcrypt.hashSync(userinfo.password, 10)
            const insertUser = 'insert into user set ?'
            db.query(insertUser, {username: userinfo.username, password: userinfo.password}, (error, results)=>{
                if(error){
                    return response.send(error.message)
                }
                if(results.affectedRows !== 1){
                    return response.send("Register fail!")
                }
                request.session.username = request.body.username
                request.session.islogin = true
                response.send("Success!")
            })
        })        
    } 
    if(userinfo.button == 'login'){
        const userCheck = 'select * from user where username=?'
        db.query(userCheck, userinfo.username, (error, results)=>{
            // console.log(userinfo)
            if(error){
                return response.send(error.message)
            }
            if(results.length == 0){
                return response.send('User not exist!')
            }
            const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
            if(!compareResult){
                return response.send("Wrong password!")
            }
            request.session.username = request.body.username
            request.session.islogin = true
            response.redirect('/chatroom')
        })        
    } 
}

exports.chatHistory = (req, res)=>{
    const content = 'select * from chatcontent'
    db.query(content, (error, result)=>{
        if(error){
            return res.send(error.message)
        }
        return res.json(result)
    })
}

exports.logoutHandle = (req, res)=>{
    req.session.destroy()
    res.redirect('/login')
}