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
        from: 'Timmy',
        text: 'yea sure',
        createdAt: 123123
    });

    socket.on('createMessage',(message) => {
        console.log(message);
    })
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    })

});



server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});