const port = process.env.PORT || 8000
const webSocketServer = require('websocket').server;
const http = require('http');

const server = http.createServer()
server.listen(port)
console.log(`listening on port: ${port}`);

const wsServer = new webSocketServer({
    httpServer: server
});

const clients = {};

// This code generates unique userid for every user
const getUniqueID = () => {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return s4() + s4() + '-' + s4()
};

wsServer.on('request', (request) => {
    // Generate user ID
    var userID = getUniqueID();
    console.log((new Date()) + 'Recieved a new connection from origin ' + request.origin + '.');

    console.log(`User ${userID} connected.`);

    // Creates a new connection
    const connection = request.accept(null, request.origin)
    clients[userID] = connection
    console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients));

    connection.on('message', (message) => {
        if(message.type === 'utf8') {
            console.log('Recieved Message: ' + message.utf8Data);

            // Sends message to all server guests
            for(key in clients) {
                clients[key].sendUTF(message.utf8Data);
            }
        }
    });
});
