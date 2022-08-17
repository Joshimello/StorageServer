const socket = io()

$('#login').submit((e) => {
    e.preventDefault()
    socket.emit('login', {"username": $('#username').val(), "password": $('#password').val()})
})

socket.on('join', value => {

})