const path = require('path');
const http = require('http');
var express = require('express');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname,'../public');

const port = process.env.PORT || 3000

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New User Connected');

    socket.emit('newMessage',{
        text: 'Welcome to the chat app',
        from: 'Admin',
        createdAt: new Date().getTime()
    })
    socket.broadcast.emit('newMessage',{
        from: 'Admin',
        text: 'A new user has joined',
        createdAt: new Date().getTime()
    })

    socket.on('createMessage',(message) => {
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        })

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