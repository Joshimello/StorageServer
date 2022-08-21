const socket = io()
const siofu = new SocketIOFileUpload(socket);

$('#main').load('html/login.html')

$(document).on('submit', '#loginform', e => {
    e.preventDefault()
    socket.emit('login', { "username": $('#username').val(), "password": $('#password').val() }, (err, msg) => {
        msg == 'username' ? $('#username').addClass('is-invalid') : $('#username').removeClass('is-invalid')
        msg == 'password' ? $('#password').addClass('is-invalid') : $('#password').removeClass('is-invalid')
    })
})

const humanFileSize = size => {
    var i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024))
    return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'KB', 'MB', 'GB', 'TB'][i]
}

socket.on('join', data => {
    $('#main').load('html/main.html', () => {
        $('#loginname').text(data.name)
        data.children.forEach(index => {
            $('#storagelist').append(`
                <div class="directory p-2 d-flex align-items-center">
                    <i class="far fa-${index.type == 'directory' ? icons['dir'] : icons[index.extension.replace('.', '')]} fa-fw mx-2"></i>
                    <span class="font-1 me-auto w-50 overflow-hidden text-nowrap">${index.name}</span>
                    <i class="fal fa-external-link fa-fw mx-2"></i>
                    <i class="fal fa-edit fa-fw me-1"></i>
                    <i class="fal fa-trash fa-fw me-2"></i>
                    <span class="font-1 ms-auto text-nowrap filesize">${humanFileSize(index.size)}</span>
                </div>`
            )
        })
    })
})
    
siofu.listenOnDrop($('#main')[0])
$('#main').on("drop", function(event) {
    event.preventDefault()
    event.stopPropagation()
    $('#uploadprogress').fadeIn(100)
})

siofu.addEventListener('progress', e => {
    var percent = e.bytesLoaded / e.file.size * 100
    $('#uploadprogress').text(percent.toFixed(0))
})

siofu.addEventListener('complete', e => {
    // on upload complete
})