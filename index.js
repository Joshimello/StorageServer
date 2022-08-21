const fs = require('fs')
const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const siofu = require('socketio-file-upload')
const dirTree = require('directory-tree')

const app = express().use(siofu.router)
const server = http.createServer(app)
const io = socketio(server)
const config = JSON.parse(fs.readFileSync('config.json', 'utf8'))
app.use(express.static(path.join(__dirname, 'public')))

fs.existsSync('users') ? null : fs.mkdirSync('users')

io.on('connection', socket => {

	socket.on('login', (data, cb) => {
		data.username in config.login ?
			data.password == config.login[data.username] ?
				loginApprove(data.username) :
				cb('error', 'password') :
			cb('error', 'username')
	})

	const loginApprove = (username) => {
		// create & set user folder path
		let userFolder = path.join(__dirname, 'users', username)
		fs.existsSync(userFolder) ? null : fs.mkdirSync(userFolder)

		socket.emit('join', dirTree(userFolder, {attributes: ['size', 'type', 'extension']}))

		var uploader = new siofu()
		uploader.dir = userFolder
		uploader.listen(socket)

		uploader.on('saved', e => {
		    socket.emit('join', dirTree(userFolder, {attributes: ['size', 'type', 'extension']}))
		})

		uploader.on('error', e => {
		    console.log('upload error', e)
		})
	}

	socket.on('disconnect', () => {
		// on disconnect
	})

	// Send to 1 client -- socket.emit('key', value);
	// Send to everyone except that client -- socket.broadcast.emit();
	// Send to everyone -- io.emit();
	// Send to specific -- io.to(id).emit();
})

server.listen(config.port || process.env.PORT, () => {
	console.log(`Server running on port ${config.port}`)
})