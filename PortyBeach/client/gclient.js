
const sock= io();

sock.on('message',(text) => console.log(text));

