const WebSocket = require('ws');

console.log('Testing WebSocket connection to server...');

const ws = new WebSocket('ws://209.97.168.12:8080');

ws.on('open', function open() {
  console.log('✅ Connected to WebSocket server!');
  ws.send('Test message from client');
});

ws.on('message', function message(data) {
  console.log('📨 Received:', data.toString());
});

ws.on('error', function error(err) {
  console.log('❌ WebSocket error:', err.message);
});

ws.on('close', function close() {
  console.log('🔌 Connection closed');
});

// Close after 5 seconds
setTimeout(() => {
  ws.close();
}, 5000);