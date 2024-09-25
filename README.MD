mkdir webhook-app
cd webhook-app
npm init -y
npm install express body-parser
node app.js
curl -X POST -H "Content-Type: application/json" -d '{"event": "test", "data": "Hello, webhook!"}' http://localhost:3000/webhook


curl -X POST \
  -H "Content-Type: application/json" \
  -H "X-API-Key: mykeyfortest" \
  -d '{"event": "test", "data": "Hello, authenticated webhook!"}' \
  http://localhost:3000/webhook
