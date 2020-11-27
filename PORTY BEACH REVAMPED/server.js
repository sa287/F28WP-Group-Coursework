const express = require('express');
const http = require('http');
const socketio = require('socket.io');

let temp;
let boolean = false;
let numberOfClients = 0;

const app = express();

app.use(express.static('base'))
const server = http.createServer(app);
const io = socketio(server);


io.on('connection',function (sock) {
    sock.on('room1',() => {
        sock.join('Room1');
        console.log("user has connected to room 1");
        if (numberOfClients == 1) {
            console.log("game in room 1 has started");

        io.in('Room1').emit('createGame');
        }
        else if(numberOfClients ==3){
            console.log("game in room 1 has started");
            io.in('Room1').emit('createGame');

        }
        else if(numberOfClients >3){
            sock.emit('full');
        }

        numberOfClients += 1;




        if (boolean == true) {
            io.to("Room1").emit('teamID', 1);
            }
        else{
            io.in("Room1").emit('teamID', 2);
            boolean =!boolean;
        }
        sock.to("Room1").emit('teamID', 2);
    });
    io.in("Room1").emit('teamID', 2);

    sock.on('room2', () =>{
            sock.join('Room2');

        console.log("user has connected to room 2");
        if (numberOfClients == 1) {
            console.log("game in room 2 has started");

            io.in('Room2').emit('createGame');
        }
        else if(numberOfClients ==3){
            console.log("game in room 2 has started");
            io.in('Room2').emit('createGame');
        }
        else if(numberOfClients >3){
            sock.emit('full');
        }

        numberOfClients += 1;




        if (boolean == true) {
            io.to("Room2").emit('teamID', 1);
            }
        else{
            io.in("Room2").emit('teamID', 2);
            boolean =!boolean;
        }
        sock.to("Room2").emit('teamID', 2);
    });

    io.in("Room2").emit('teamID', 2);




    sock.on('keydown', handleKeydown);

  //  io.to(team1).emit('teamID', 0);
   // io.to(team2).emit('teamID', 1);


    sock.on('winner1',winner1);
    sock.on('winner2',winner2);

});


function handleKeydown(keyCode) {
    try {
        keyCode = parseInt(keyCode);
    } catch(e) {
        console.error(e);
        return;
    }
    io.in("Room1").emit('key',keyCode);


}

function winner1(){

    console.log("team 1 has won.");

    io.in("Room1").emit('winner1close');
}
function winner2(){
    console.log("team 2 has won.");

    io.in("Room2").emit('winner2close');
}

server.on('error',(err) =>{
    console.error(err);

});
server.listen(8080, () => {
    var port = server.address().port;

    console.log("Server running at port",port);
});