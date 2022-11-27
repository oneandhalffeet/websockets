const socket = io('ws://localhost:8080');
// ws stands for websockets

socket.on('message', (text) => {
  //on getting message from socket

  const el = document.createElement('li');
  el.innerHTML = text;
  // create new list tag element with given message

  document.querySelector('ul').appendChild(el);
  // apend it to the list
});

document.querySelector('button').onclick = () => {
  // on clicking submit button

  const text = document.querySelector('input').value;
  // get value of message

  socket.emit('message', text);
  //emit this to socket, so socket will broadcast it
};
