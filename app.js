const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Middleware to check for basic Auth
const authenticateUser = (req, res, next) => {
  // Get the Authorization header
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header is missing' });
  }

  // Check if it's a Basic Auth header
  const authParts = authHeader.split(' ');
  if (authParts[0] !== 'Basic') {
    return res.status(401).json({ error: 'Invalid authentication method' });
  }

  // Decode the Base64 encoded credentials
  const credentials = Buffer.from(authParts[1], 'base64').toString('ascii');
  const [username, password] = credentials.split(':');

  // Check the username and password against the config
  if (username !== config.username || password !== config.password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // If we get here, authentication was successful
  next();
};

//Middleware to check for API key
/*
const authenticateApiKey = (req, res, next) => {
  const apiKey = req.get('X-API-Key');
  
  if (!apiKey || apiKey !== config.apiKey) {
    return res.status(401).json({ error: 'Unauthorized: Invalid API Key' });
  }
  
  next();
};
*/

// Webhook endpoint with Basic Authentication
app.post('/webhook', authenticateUser, (req, res) => {
  const payload = req.body;
  console.log('Received webhook payload:', payload);

  // Process the webhook payload here
  // For this example, we'll just log it

  res.status(200).send('Webhook received successfully');
});

// Webhook endpoint with API key authentication
/*
app.post('/webhook', authenticateApiKey, (req, res) => {
  const payload = req.body;
  console.log('Received webhook payload:', payload);

  // Process the webhook payload here
  // For this example, we'll just log it

  res.status(200).send('Webhook received successfully');
});
*/



// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});




// Start the server
app.listen(config.port, () => {
  console.log(`Webhook server listening on port ${config.port}`);
});
