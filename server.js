const express = require('express')
const router = require('./router.js')
const app = express()

app.use(express.static("public"))
app.use(router)

app.listen(8888, () => {
    console.log('Server running at http://127.0.0.1:8888/login')
})