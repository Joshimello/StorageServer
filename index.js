const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)
const config = JSON.parse(fs.readFileSync('config.json', 'utf8'))
app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', socket => {

	






	socket.on('disconnect', () => {
		
	})

	// Send to 1 client -- socket.emit('key', value);
	// Send to everyone except that client -- socket.broadcast.emit();
	// Send to everyone -- io.emit();
	// Send to specific -- io.to(id).emit();
}

server.listen(config.port || process.env.PORT, () => {
	console.log(`Server running on port ${PORT}`)
})