const http = require('http').createServer();
// Added http package

const io = require('socket.io')(http, {
  cors: { origin: '*' },
});
// added socket packege for usage of websockets for multiple users

io.on('connection', (socket) => {
  // on every connection new user is connected
  console.log('a new user is connected');

  // on getting message from socket
  socket.on('message', (message) => {
    // print message in server logs
    console.log(message);

    // emit this message to all users
    io.emit('message', `${socket.id.substr(0, 2)} said ${message}`);
  });
});

// http will listen to 8080 port
http.listen(8080, () => console.log('Listening on port 8080'));

const socket = io('ws://localhost:8080');

socket.on('message', (text) => {
  const el = document.createElement('li');
  el.innerHTML = text;
  document.querySelector('ul').appendChild(el);
});

document.querySelector('button').onclick = () => {
  const text = document.querySelector('input').value;
  socket.emit('message', text);
};
