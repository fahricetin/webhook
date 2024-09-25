const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const bodyParser = require('body-parser');
const path = require('path'); // Add this line to import the path module
const config = require('./config');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(bodyParser.json());
app.use(express.static('public'));

// Store recent webhooks
const recentWebhooks = [];
const MAX_WEBHOOKS = 10;

// WebSocket connection handling

// Basic Authentication middleware
const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header is missing' });
  }

  const auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
  const username = auth[0];
  const password = auth[1];

  // Replace these with your actual username and password
  const validUsername = config.username
  const validPassword = config.password;

  if (username === validUsername && password === validPassword) {
    next();
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
};

// Webhook endpoint with Basic Authentication
app.post('/webhook', authenticateUser, (req, res) => {
  const payload = req.body;
  console.log('Received webhook payload:', payload);

  // Add new webhook to the list and remove old ones if necessary
  recentWebhooks.unshift(payload);
  if (recentWebhooks.length > MAX_WEBHOOKS) {
    recentWebhooks.pop();
  }

  // Broadcast the new webhook to all connected clients
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify([payload]));
    }
  });

  res.status(200).send('Webhook received successfully');
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});


server.listen(config.port, () => {
  console.log('Server is running on http://localhost:3000');
});
