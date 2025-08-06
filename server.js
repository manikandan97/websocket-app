const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    fs.readFile(path.join(__dirname, 'client.html'), (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('File not found');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.send('Welcome to the WebSocket server!');

  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
    
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`Echo: ${message}`);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`WebSocket server running on http://localhost:${PORT}`);
});