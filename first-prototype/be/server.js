const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);


io.on('connection', function(socket){
	console.log('an user connected');
	socket.on('createRoom', data => {
		socket.join(data.id)
		socket.emit('joinedRoom', { id: data.id })
	})

	socket.on('joinRoom', data => {
		socket.join(data.id)
	})

	socket.on('closeStoryView', data => {
		socket.emit('closeStoryView')
		socket.broadcast.to(data.id).emit('closeStoryView')
	})

	socket.on('goToSlide', data => {
		socket.broadcast.to(data.id).emit('goToSlide', data.index)
	})

	socket.on('leaveRoom', data => {
		console.log('leaveRoom', data)
	})

	socket.on('disconnect', () => console.log('disconnect'))
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});