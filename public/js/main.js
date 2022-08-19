const socket = io()

$('#main').load('html/login.html')

$('#login').submit((e) => {
    e.preventDefault()
    socket.emit('login', {"username": $('#username').val(), "password": $('#password').val()}, (err, msg) => {
        msg == 'username' ? $('#username').addClass('is-invalid') : $('#username').removeClass('is-invalid')
        msg == 'password' ? $('#password').addClass('is-invalid') : $('#password').removeClass('is-invalid')
    })
})

socket.on('join', value => {

})