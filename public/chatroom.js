const socket = io()

function logout(){
    window.location.href="/logout"
}

socket.on('msg', function(ret){
    console.log('a user connected')
})
