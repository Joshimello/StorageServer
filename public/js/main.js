const socket = io()

$('#login').submit((e) => {
    e.preventDefault()
    socket.emit('login', {"username": $('#username').val(), "password": $('#password').val()}, (err, msg) => {
        console.log(err, msg)
    })
})

socket.on('join', value => {

})