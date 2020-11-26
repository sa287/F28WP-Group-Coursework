const express = require('express');
const http = require('http');
const socketio = require('socket.io');


let numberOfClients = 0;

const app = express();

app.use(express.static('base'))
const server = http.createServer(app);
const io = socketio(server);


io.on('connection',function (sock) {
    sock.emit('message','New user connected');
    sock.on('room1',() => {
        sock.join('Room1');
        if (numberOfClients == 1) {

        io.in('Room1').emit('createGame');
        }
        numberOfClients += 1;
        console.log("1");

    });

    sock.on('room2', () =>{
            sock.join('Room2');
        if (numberOfClients == 1) {

            io.in('Room2').emit('createGame');
        }
            numberOfClients += 1;
            console.log("2");


    });

    sock.on('keydown', handleKeydown);

    sock.on('key-right', (keyright) => {
      io.in("room1").emit('keyR',keyright);
    });


});


function handleKeydown(keyCode) {
    try {
        keyCode = parseInt(keyCode);
    } catch(e) {
        console.error(e);
        return;
    }
    io.in("room1").emit('key',keyCode);


}

server.on('error',(err) =>{
    console.error(err);

});
server.listen(8080, () => {
    var port = server.address().port;

    console.log("Server running at port",port);
});