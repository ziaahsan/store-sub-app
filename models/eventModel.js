"use strict";
// All the clients connected to @/sse
let clients = []

class EventModel {
    // Adds a new client
    static addClient(res) {
        const clientId = Date.now();
        const newClient = { id: clientId, res };
        // Push the client into clients
        clients.push(newClient);

        console.log(`Client ${clientId} connected`);
        
        // Return the :newClient.id
        return newClient.id;
    }

    // Removes a client based on :clientId
    static removeClient = (clientId) => {
        clients = clients.filter(client => client.id !== clientId);
        console.log(`${clientId} Connection closed`);
        //console.log(`Open clients remaining: ${clients.length}`);
    }

    // Sends :data to all clients
    static send = (data) => {
        clients.forEach(
            client => {
                client.res.write(`data: ${JSON.stringify(data)}\n\n`)
            }
        );
    }
}

// Export module
module.exports= EventModel;