
# create a new repository on the command line

echo "# webhook" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/fahricetin/webhook.git
git push -u origin main

# push an existing repository from the command line
git remote add origin https://github.com/fahricetin/webhook.git
git branch -M main
git push -u origin main

# local testing
mkdir webhook-app
cd webhook-app
npm init -y
npm install express body-parser
node app.js
# test without auth username and password or API key
curl -X POST -H "Content-Type: application/json" -d '{"event": "test", "data": "Hello, webhook!"}' http://localhost:3000/webhook

# test with API key auth
curl -X POST \
  -H "Content-Type: application/json" \
  -H "X-API-Key: mykeyfortest" \
  -d '{"event": "test", "data": "Hello, authenticated webhook!"}' \
  http://localhost:3000/webhook

# test with username and password basic auth for Prisma Cloud Compute webhook
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Basic $(echo -n 'username:password' | base64)" \
  -d '{
  "type": "event",
  "time": "2023-05-24T10:30:00Z",
  "container": "web-app",
  "containerID": "abc123def456",
  "image": "nginx:latest",
  "imageID": "sha256:123456789abcdef",
  "tags": ["production", "web"],
  "host": "server-01",
  "fqdn": "server-01.example.com",
  "function": "web-server",
  "region": "us-west-2",
  "provider": "aws",
  "osRelease": "Ubuntu 20.04",
  "osDistro": "ubuntu",
  "runtime": "docker",
  "appID": "web-app-001",
  "rule": "high-cpu-usage",
  "message": "High CPU usage detected",
  "aggregatedAlerts": 3,
  "dropped": false,
  "forensics": "cpu-profile-123.json",
  "category": "performance",
  "command": "nginx -g daemon off;",
  "startupProcess": "/docker-entrypoint.sh nginx -g daemon off;",
  "labels": ["env=prod", "app=web"],
  "collections": ["web-servers", "production-apps"],
  "complianceIssues": ["PCI-DSS-Req-6.2"],
  "vulnerabilities": ["CVE-2023-1234"],
  "clusters": ["prod-cluster-01"],
  "namespaces": ["default"],
  "accountIDs": ["123456789012"],
  "user": "system",
  "incidentTime": "2023-05-24T10:29:55Z"
}' \
  http://localhost:3000/webhook


  # create docker image

  docker build -t mywebhook:1.0.0 .
  docker run -d --name mywebhook -p 3000:3000 mywebhook:1.0.0
