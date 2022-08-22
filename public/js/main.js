const socket = io()
const siofu = new SocketIOFileUpload(socket)

Cookie.get('auth') == undefined ? 
$('#main').load('html/login.html') : 
socket.emit('auth', Cookie.get('auth'), cb => {
    cb ? null : $('#main').load('html/login.html')
})


$(document).on('submit', '#loginform', e => {
    e.preventDefault()
    socket.emit('login', { "username": $('#username').val(), "password": $('#password').val() }, cb => {
        cb == 'username' ? $('#username').addClass('is-invalid') : $('#username').removeClass('is-invalid')
        cb == 'password' ? $('#password').addClass('is-invalid') : $('#password').removeClass('is-invalid')
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
                <div class="${index.type == 'directory' ? `folder` : 'file'} directory p-2 d-flex align-items-center">
                    <i class="far fa-${index.type == 'directory' ? icons['dir'] : icons[index.extension.replace('.', '')]} fa-fw mx-2"></i>
                    <span class="font-1 me-auto w-50 overflow-hidden text-nowrap">${index.name}</span>
                    <i class="fal fa-external-link fa-fw mx-2"></i>
                    <i class="fal fa-edit fa-fw me-1"></i>
                    <i class="fal fa-trash fa-fw me-2"></i>
                    <span class="font-1 ms-auto text-nowrap filesize">${humanFileSize(index.size)}</span>
                </div>`
            )
        })

        siofu.listenOnInput($('#addfile')[0])
        $('#addfile').on('change', e => {
            $('#addfilemodal').fadeOut('fast')
            $('#uploadprogress').fadeIn(100)
        })
            
        siofu.listenOnDrop($('#main')[0])
        $('#main').on('drop', e => {
            e.preventDefault()
            e.stopPropagation()
            $('#uploadprogress').fadeIn(100)
        })

        siofu.addEventListener('progress', e => {
            var percent = e.bytesLoaded / e.file.size * 100
            $('#uploadprogress').text(percent.toFixed(0))
        })

        siofu.addEventListener('complete', e => {
            // on upload complete
        })

        $(document).on('click', '#addfolderbtn', () => {
            socket.emit('addfolder', $('#addfolder').val(), cb => {
                cb ? $('#addfolder').addClass('is-invalid') : $('#addfoldermodal').fadeOut('fast')
            })
        })

        $(document).on('click', '#addfileopen', () => {
            $('#addfilemodal').fadeIn('fast')
        })

        $(document).on('click', '#addfolderopen', () => {
            $('#addfoldermodal').fadeIn('fast')
        })

        $(document).on('click', '#addfileclose', () => {
            $('#addfilemodal').fadeOut('fast')
        })

        $(document).on('click', '#addfolderclose', () => {
            $('#addfoldermodal').fadeOut('fast')
        })




        $(document).on('click', '.directory', e => {
            fileType = $(e.delegateTarget).hasClass('folder') ? 'folder' : 'file'
            fileName = $(e.delegateTarget).children('')

            if (fileType == 'folder') {

            }
            if($(e.target).prop('tagName') == 'SPAN') {
                console.log($(e.target).text())
            }

            if($(e.target).prop('tagName') == 'I') {
                if($(e.target).hasClass('fa-external-link')) {
                    console.log('share')
                }

                if($(e.target).hasClass('fa-edit')) {
                    console.log('rename')
                }

                if($(e.target).hasClass('fa-trash')) {
                    console.log('delete')
                }
            }
        })




















    })
})