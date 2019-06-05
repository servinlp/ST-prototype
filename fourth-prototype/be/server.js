const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const EventEmitter = require('events')
const SSE = require('express-sse')
const sse = new SSE([])
const fs = require('fs')
const multer = require('multer')
const upload = multer()

const myEmitter = new EventEmitter();
const questionEmitter = new EventEmitter();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(bodyParser.text());

app.all('*', (req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	next()
})

app.use(express.static('static'))

app.get('/stream', (req, res) => {
	sse.init(req, res)
	console.log('init')
	setTimeout(() => sse.send({doei: true}, 'hello'), 2000)
})

app.post('/unload', (req, res) => {
	myEmitter.emit('unload', req.body)
	res.send('true')
})

app.post('/question', (req, res) => {
	questionEmitter.emit('question', req.body)
	res.send('true')
})

app.post('/question/upvote', (req, res) => {
	questionEmitter.emit('questionUpvote', req.body)
	res.send('true')
})

app.post('/getFile', upload.any(), (req, res) => {
	const file = req.files[0]
	const exists = fs.existsSync('static/' + file.originalname)
	if (exists) {
		sse.send(file.originalname, 'receiveFile')
		res.json({receivedFile: true})
	} else {
		fs.writeFile('static/' + file.originalname, file.buffer, err => {
			if (err) console.error(err)
			sse.send(file.originalname, 'receiveFile')
			res.json({receivedFile: true})
		})
	}
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

	socket.on('stopRecourseViewing', roomId => {
		console.log('stopRecourseViewing', roomId)
		socket.broadcast.to(roomId).emit('stopRecourseViewing')
	})

	socket.on('showQuestion', data => {
		socket.broadcast.to(data.id).emit('showQuestion', data.question)
	})
	
	socket.on('closeQuestion', data => {
		socket.broadcast.to(data.id).emit('closeQuestion')
	})

	myEmitter.on('unload', id => {
		console.log('id', id)
		socket.broadcast.to(id).emit('closeStoryView')
	})

	questionEmitter.on('question', data => {
		socket.emit('getQuestion', data)
	})

	questionEmitter.on('questionUpvote', data => {
		socket.emit('upvoteQuestion', data.number)
	})

	socket.on('disconnect', () => console.log('disconnect'))
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});