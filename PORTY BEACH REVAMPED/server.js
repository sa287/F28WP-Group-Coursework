/* server.js is the back-end of this project, it uses express, node-js,socket-io and of-course javascript. it sets up a localhost listen server at port 8080. It utilizes relatively new 
socket.io architecture, as it is ran on version 3.1.0.
*/
















/* Create constants for use in socket.io and express using the require() method. It will flag up when run if it cannot get a hold of these.*/
const express = require('express');
const http = require('http');
const socketio = require('socket.io');

/*Create temporary variables boolean and numberOfClients. They are global in scope however, so they can be used wherever in the code; in and out of functions. Boolean variable
 is used for creating a logic switch and numberOfClients is used to keep track of how many sockets join the server*/
let boolean = false;
let numberOfClients = 0;

// initialize express functions.
const app = express();
//here we set up express and socket.io, creating the first frameworks for the server back-end. We use express.static('base') to refer to where our files are stored.
app.use(express.static('base'))
const server = http.createServer(app);
const io = socketio(server);

// On connection to the server, every socket will do the following lines of code when clicking a room button and the server recieving the following event.
io.on('connection',function (sock) {
    // When receiving the room1 event from a io.emit or otherwise, create a function that does the following.
    sock.on('room1',() => {
        // use socket.io rooms, to join(create if it doesnt exist) what is like a lobby using a socket. This one is called Room1.
        sock.join('Room1');
        // Helpful info in console to show that you have connected/or atleast tried to connect to room 1. 
        console.log("user has connected to room 1");
        // If there are two clients in room 1, send the following out and 
        if (numberOfClients == 1) {
            console.log("game in room 1 has started");
        //Emit createGame, so when the client-side sees this it starts an instance of the game. Due to the use of io.in, it does this for every socket in the Room1 lobby
        io.in('Room1').emit('createGame');
        }
        //To cover if there is already a pair in the system, perhaps in room 2. Does the same as the previous one.
        else if(numberOfClients ==3){
            console.log("game in room 1 has started");
            io.in('Room1').emit('createGame');

        }
        // if there are too many clients(4 is max, due to 2 people needed in both rooms), it will output an event full, that responds accordingly, reporting to the user that
        // the server is full.
        else if(numberOfClients >3){
            sock.emit('full');
        }
        
        // increment numberOfClients variable to keep track of new clients.
        numberOfClients += 1;



        //here we use the boolean variable switch to select what socket is on what team. If the boolean is true it will emit to the clientside for every socket in room1.
        // with the event teamID and the value 1 to represent team 1.
        if (boolean == true) {
            io.to("Room1").emit('teamID', 1);
            }
        // otherwise the same, but with 2 for team 2.
        else{
            io.in("Room1").emit('teamID', 2);
            // flip the variable again to reset.
            boolean =!boolean;
        }
        // hardcode statement so that we have two different teams, team 1 and team 2. Do this with sock.to, which sends the message to every socket excluding the sender.
        sock.to("Room1").emit('teamID', 2);
    });
   
    // This following is all the same as before, but for the room, room2.
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

    // creates listeners that look for winners1 and winners2 events, and executes respective functions.
    sock.on('winner1',winner1);
    sock.on('winner2',winner2);

});


// The winner functions output to the console what team has one, and set the motions in place for the game to reset/close by emmiting the winner1close and winner2close events to
//clientside.
function winner1(){

    console.log("team 1 has won.");

    io.in("Room1").emit('winner1close');
}
function winner2(){
    console.log("team 2 has won.");

    io.in("Room2").emit('winner2close');
}

//if there are errors in the making,creation of the server etc, it will output this to the console.
server.on('error',(err) =>{
    console.error(err);

});
// start the listen server at port 8080 and output to the user what port this is. Also if its successful it will output to the console.
server.listen(8080, () => {
    var port = server.address().port;

    console.log("Server running at port",port);
});
