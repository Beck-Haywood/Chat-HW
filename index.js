var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
io.on('connection', (socket) => {
    let user;
    socket.on('name', (name) => {
      user = name
      console.log(`${user} connected`);
      io.emit('greetings/goodbye', `✋ ${user} has joined the chat! ✋`);
    });
    socket.on('disconnect', () => {
      console.log(`${user} disconnected`);
      io.emit('greetings/goodbye', `✋ ${user} has left the chat! ✋`);
    });
    socket.on('chat message', msg => {
      io.emit('chat message', `${user}: ${msg}`)
    })
});

http.listen(3000, () => {
  console.log('listening on localhost:3000');
});