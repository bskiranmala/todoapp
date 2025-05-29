
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let todos = [];

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.emit('init', todos);

    socket.on('add todo', (todo) => {
        todos.push(todo);
        io.emit('todos updated', todos);
    });

    socket.on('delete todo', (index) => {
        todos.splice(index, 1);
        io.emit('todos updated', todos);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log('Server is running on port ' + port);
});
