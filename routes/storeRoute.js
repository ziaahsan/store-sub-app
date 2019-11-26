"use strict";
// Import model
const StoreModel = require('../models/storeModel');

module.exports = (app) => {
    // Get all stores
    app.get('/api/stores', async(req, res) => {
        StoreModel.getAll((error, stores) => {
            stores = JSON.parse(stores);

            if (error) res.status(400).send(error);
            res.status(200).json(stores);
        });
    });

    // Get :tag stores
    app.get('/api/stores/tag/:tag/:offset', async(req, res) => {
        const {tag, offset} = req.params;
        StoreModel.getByTag(tag, 6, parseInt(offset), (error, store) => {
            store = JSON.parse(store);

            if (error) res.status(400).send(error);
            res.status(200).json(store);
        });
    });

    // Get :token store
    app.get('/api/store/:token', async(req, res) => {
        const {token} = req.params;
        StoreModel.getByToken(token, (error, store) => {
            store = JSON.parse(store);

            if (error) res.status(400).send(error);
            res.status(200).json(store);
        });
    });

    // Create a store
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