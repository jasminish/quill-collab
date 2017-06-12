const express = require('express');
const http = require('http');
const url = require('url');
const WebSocket = require('ws');

const app = express();
const port = 8001; 

app.use(express.static(__dirname));
app.get('/', function (req, res) {
    res.sendFile('index.html');
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ 
    'server': server,
    'path': '/ws'
});

wss.on('connection', function connection(ws, req) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        wss.clients.forEach(function(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
    
});

server.listen(port, function listening() {
    console.log('Listening on ' + port);
});
