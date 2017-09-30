var socket = io();
socket.on('connect', function () {
    console.log('connect to server');
    socket.emit('createMessage', {
        from: 'Andy',
        text: 'that works'
    });
})

socket.on('disconnect', function () {
    console.log('Disconnected from server');
})

socket.on('newMessage', function(message){
    console.log('NewMessage', message);
})

