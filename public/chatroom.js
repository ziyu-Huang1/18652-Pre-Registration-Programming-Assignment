const socket = io()

function showContent(username, content, time){
    var tableBody = document.getElementById("tableBody")
    var date = new Date(Number(time))
    var contentTime = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '.'
    contentTime += (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + '.'
    contentTime += date.getFullYear() + " "
    var t = ""
    if(date.getHours() < 10){
        contentTime += '0' + date.getHours()
        t = "AM"
    }
    else if(date.getHours() < 11){
        contentTime += date.getHours()
        t = "AM"
    }
    else if(date.getHours() == 12){
        contentTime += date.getHours()
        t = "PM"
    }
    else if(date.getHours() < 24){
        if(date.getHours()-12 < 10){
            contentTime += '0' + (date.getHours()-12)
        }
        else{
            contentTime += (date.getHours()-12)
        }
        t = "PM"
    }
    else{
        contentTime += (date.getHours()-12)
        t = "AM"
    }
    contentTime += ":" + (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + t
    var row1 = document.createElement('tr')
    var row2 = document.createElement('tr')
    var rowUsername = document.createElement('td')
    var rowTime = document.createElement('td')
    var rowContent = document.createElement('td')
    rowUsername.setAttribute("id", "usr")
    rowTime.setAttribute("id", "time")
    rowContent.setAttribute("id", "cont")
    rowContent.setAttribute("colspan", "2")
    rowUsername.innerHTML = username
    rowTime.innerHTML = contentTime
    rowContent.innerHTML = content
    row1.appendChild(rowUsername)
    row1.appendChild(rowTime)
    row2.appendChild(rowContent)
    tableBody.appendChild(row1)
    tableBody.appendChild(row2)
}

async function chatHistory(){
    let res = await fetch("/chatHistory")
    return res.json()
    
}

chatHistory().then((res)=>{
    for(i = 0; i < res.length; i++){
        showContent(res[i].username, res[i].content, res[i].time)
    }
    var wrapper = document.getElementById("wrapper")
    wrapper.scrollTop = wrapper.scrollHeight
})

function logout(){
    window.location.href="/logout"
}

function post(){
    var chatContent = document.getElementById("chatContent")
    socket.emit('msg', {'content': chatContent.value})
    chatContent.value = ""
    chatContent.focus()
}

socket.on('toClient', function(ret){
    showContent(ret.username, ret.content, ret.time)
    var wrapper = document.getElementById("wrapper")
    wrapper.scrollTop = wrapper.scrollHeight
})
