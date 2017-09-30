const path = require('path');
const http = require('http');
var express = require('express');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname,'../public');

const port = process.env.PORT || 3000
const {generateMessage} = require('./utils/message')
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
        callback('This is from the server.');
        // socket.broadcast.emit('newMessage',{
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // })
    })

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    })

});



server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});