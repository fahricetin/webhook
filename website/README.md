# webhook

## To run this setup:

Install the required packages:  
npm install express ws  
Run your server:  
node server.js 

Open a web browser and go to http://localhost:3000. You should see the "Webhook Visualizer" page.  

Use the curl command or any other method to send webhooks to your server. Each new webhook will appear at the top of the list in the browser in real-time.  

This setup provides a basic real-time visualization of incoming webhooks. The server stores the last 10 webhooks and broadcasts new ones to all connected clients. The web page connects to the server via WebSocket and displays incoming webhooks as they arrive.  

Remember, this is a basic implementation and doesn't include features like authentication for the visualization page or error handling for the WebSocket connection. In a production environment, you'd want to add these features and possibly use a more robust front-end framework for a more interactive and feature-rich visualization.  
