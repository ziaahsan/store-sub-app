"use strict";
// Model import
const EventModel = require('../models/eventModel');

module.exports = (app) => {
    app.get('/sse', async(req, res) => {
        // Headers and http status to keep connection open
        res.status(200).set({
            "Connection": "keep-alive",
            "Cache-Control": "no-cache",
            "Content-Type": "text/event-stream"
        });

        // Add a new client
        let clientId = EventModel.addClient(res);

        // When client closes connection we update the clients list
        req.on('close', () => {
            EventModel.removeClient(clientId);
        });
    });
}