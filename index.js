// Packages Info:
// In this project we use Express.js, a very popular framework for Node.js applications.
// + body-parser is used to parse incoming request bodies in a middleware before your handlers, available under the req.body property.
// + mysql as database
// + nodemon is a package that runs the node.js application and listen to any file change, updating the entire app.
// -> nodeman located in package.json file under "scripts"->"server":"node index.js"
// + Concurrently allows us to run multiple npm commands at the same time.
// + http-proxy-middleware is used to create a proxy from our react app to the backend app while on development.
// + axios is a very popular promise based HTTP client for the browser and node.js.
"use strict";
// Package import
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('config');

// Models import
const MailNotifierModel = require('./models/mailNotifierModel');

// Express app
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(compression());


//Import Routes after app due to @(app)
require('./routes/eventRoute')(app);
require('./routes/storeRoute')(app);
require('./routes/storeNotificationRoute')(app);

// Production env
if (process.env.NODE_ENV === 'production') {
    /* DONT KNOW WHAT THIS CODE DOES */
    app.use(express.static('client/build'));

    const path = require('path');
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
    /* ***************************** */
}

// Mail notifier
let mailNotifier = new MailNotifierModel(config.get("imap").username, config.get("imap").password);
mailNotifier.start();

// App's port
const PORT = process.env.PORT || config.get("server").port;
app.listen(PORT, () => { console.log(`[App] Running on port ${PORT}`) });

// Disconnect from database
// database.end();