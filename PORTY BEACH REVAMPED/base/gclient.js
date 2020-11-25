

const socket= io();
    socket.on('message',(text) => console.log(text));