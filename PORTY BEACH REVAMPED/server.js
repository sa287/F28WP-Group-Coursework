const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();

app.use(express.static('base'));

const server = http.createServer(app);
const io = socketio(server);
io.on('connection',function (sock) {
    sock.emit('message','New user connected');

});
server.on('error',(err) =>{
    console.error(err);

});
server.listen(8080, () => {
    var port = server.address().port;

    console.log("Server running at port",port);
});