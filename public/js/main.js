const socket = io()

$('#main').load('html/login.html')

$(document).on('submit', '#loginform', e => {
    e.preventDefault()
    socket.emit('login', { "username": $('#username').val(), "password": $('#password').val() }, (err, msg) => {
        msg == 'username' ? $('#username').addClass('is-invalid') : $('#username').removeClass('is-invalid')
        msg == 'password' ? $('#password').addClass('is-invalid') : $('#password').removeClass('is-invalid')
    })
})

socket.on('join', value => {
    console.log(value)
    $('#main').load('html/main.html', () => {
        $('#loginname').text(value.toUpperCase())
    })
})
    
$('#main').filedrop({
    callback: data => {
        socket.emit('upload', data, (status) => {
            console.log(status)
        })
    }
})