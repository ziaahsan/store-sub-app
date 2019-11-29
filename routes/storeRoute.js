"use strict";
// Import model
const StoreModel = require('../models/storeModel');

module.exports = (app) => {
    // Get :tag stores
    app.get('/api/stores/tag', async(req, res) => {
        // Query params
        let {name, page, limit, orderby} = req.query;

        // Encode URI
        name = decodeURIComponent(String(name));
        page = decodeURIComponent(String(page));
        limit = decodeURIComponent(String(limit));
        orderby = decodeURIComponent(String(orderby));

        // Check for page
        if (isNaN(parseInt(page)) || parseInt(page) < 0)
            page = 0;

        // Get limit and check
        limit = parseInt(limit);
        if (isNaN(limit) || limit < 0 || limit > 50)
            limit = 6;

        // Get offset and check
        let offset = (page * limit) - limit;
        if (isNaN(parseInt(offset)) || parseInt(offset) < 0)
            offset = 0;
        
        // Check for valid url
        if (!name || name.length < 2
            || (orderby != 'alphabetically' && orderby != 'popular' && orderby != 'recentUpdates')) {
            // Error, send message
            res.status(400).json(
                {
                    error: true,
                    message: 'You are required to provide name, page, and orderby.'
                }
            );
        } else {
            StoreModel.getByTag(name, limit, offset, orderby, (error, store) => {
                store = JSON.parse(store);
    
                if (error) res.status(400).send(error);
                res.status(200).json(store);
            });
        }
    });

    // Get :token store
    app.get('/api/store/:token', async(req, res) => {
        let {token} = req.params;
        token = decodeURIComponent(String(token));

        if (!token || isNaN(token) 
            || token.length != 16) {
            // Error, send message
            res.status(400).json(
                {
                    error: true,
                    message: 'You are required to provide token.'
                }
            );
        } else {
            StoreModel.getByToken(token, (error, store) => {
                store = JSON.parse(store);

                if (error) res.status(400).send(error);
                res.status(200).json(store);
            });
        }
    });

    // Create a store
    // @todo: Sanitize, and checks
    app.post('/api/store', async(req, res) => {
        // Post request data
        const {body} = req;
        // Create a newStore instance
        let newStore = new StoreModel(body);
        // Handles null error 
        if (!newStore.email || !newStore.name
            || !newStore.nickName || !newStore.slogan || !newStore.logoColor
            || !newStore.tags || !newStore.website) {
                // Error, send message
                res.status(400).json(
                    {
                        error: true,
                        message: 'You are required to provide all params.'
                    }
                );
        } else {
            // No errors, create the store by @StoreMode.create
            StoreModel.create(newStore, (error, result) => {
                result = JSON.parse(result);

                if (error) res.status(400).send(error);
                res.status(201).json(result);
            });
        }
    });

    // Update store
    // @todo: Sanitize, and checks
    app.put('/api/store', async (req, res) => {
        // Post request data
        const {body} = req;
        // Update instance
        let updateStore = new StoreModel(body);
        // Handles null error 
        if (!updateStore.token || !updateStore.name 
            || !updateStore.nickName || !updateStore.slogan || !updateStore.logoColor
            || !updateStore.tags || !updateStore.website) {
                // Error, send message
                res.status(400).json(
                    {
                        error: true,
                        message: 'You are required to provide all params.'
                    }
                );
        } else {
            StoreModel.update(body, (error, result) => {
                result = JSON.parse(result);
                
                if (error) res.status(400).send(error);
                res.status(202).json(result);
            });
        }
    });
}