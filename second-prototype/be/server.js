const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const EventEmitter = require('events')

const myEmitter = new EventEmitter();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(bodyParser.text());

app.post('/unload', (req, res) => {
	myEmitter.emit('unload', req.body)
	res.send('true')
})

const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', function(socket){
	console.log('an user connected');
	socket.on('createRoom', data => {
		console.log('createRoom', data)
		socket.join(data.id)
		socket.emit('joinedRoom', { id: data.id })
	})

	socket.on('joinRoom', data => {
		console.log('joinRoom', data)
		socket.join(data.id)
	})

	socket.on('closeStoryView', data => {
		socket.emit('closeStoryView')
		socket.broadcast.to(data.id).emit('closeStoryView')
	})

	socket.on('goToSlide', data => {
		console.log('goToSlide', data)
		socket.broadcast.to(data.id).emit('goToSlide', data.index)
	})

	socket.on('leaveRoom', data => {
		console.log('leaveRoom', data)
	})

	myEmitter.on('unload', id => {
		console.log('id', id)
		socket.broadcast.to(id).emit('closeStoryView')
	})

	socket.on('disconnect', () => console.log('disconnect'))
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});