const bcrypt = require('bcryptjs')
const db = require('../database/db_index')

exports.loginPageHandle = (request, response)=>{
    const userinfo = request.body
    if(userinfo.button == 'register'){
        const userCheck = 'select * from user where username=?'
        db.query(userCheck, userinfo.username, (error, results)=>{
            console.log(userinfo)
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
                response.send("Success!")
            })
        })        
    } 
}