const path = require('path');
const http = require('http');
var express = require('express');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname,'../public');

const port = process.env.PORT || 3000
const {generateMessage,generateLocationMessage} = require('./utils/message')
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New User Connected');

    socket.emit('newMessage',generateMessage('Admin','Wecome to the chat app'));

    socket.broadcast.emit('newMessage',generateMessage('Admin', 'A new user has joined.'));

    socket.on('createMessage',(message, callback) => {
        io.emit('newMessage', generateMessage(message.from,message.text));
        callback();
    })

    socket.on('createLocationMessage',(coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude,coords.latitude))
    })

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    })

});



server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});