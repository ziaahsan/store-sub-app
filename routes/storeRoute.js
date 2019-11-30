"use strict";
// Import model
const StoreModel = require('../models/storeModel');
const { check, validationResult } = require('express-validator');

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

    // Get :slug store
    app.get('/api/store/:slug', async(req, res) => {
        let {slug} = req.params;
        slug = decodeURIComponent(String(slug));

        if (!slug) {
            // Error, send message
            res.status(400).json(
                {
                    error: true,
                    message: 'You are required to provide slug.'
                }
            );
        } else {
            StoreModel.getBySlug(slug, (error, store) => {
                store = JSON.parse(store);

                if (error) res.status(400).send(error);
                res.status(200).json(store);
            });
        }
    });

    // Create a store
    app.post('/api/store',
        [
            check('email').isEmail().normalizeEmail().stripLow(),
            check('slug').isLength({ min: 2 }).trim().escape().stripLow(),
            check('name').isLength({ min: 3 }).trim().escape().stripLow(),
            check('description').isLength({ min: 3 }).trim().escape().stripLow(),
            check('category').isLength({ min: 2 }).trim().escape().stripLow(),
            check('tags').trim().escape().stripLow(),
            check('website').trim().escape().stripLow(),
            check('image').trim().escape().stripLow(),
            check('countryCode').isLength({ min: 2 }).trim().escape().stripLow()
        ],
        async(req, res) => {
            // Handle error of body params
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json(
                    {
                        errors: errors.array()
                    }
                );
            }

            // Post request data
            const {body} = req;

            // Create a newStore instance
            let newStore = new StoreModel(body);

            // Handles null error 
            if (!newStore.token || !newStore.name 
                || !newStore.slug || !newStore.name || !newStore.description || !newStore.category
                || !newStore.tags || !newStore.website || !newStore.image || !newStore.countryCode) {
                    // Error, send message
                    return res.status(400).json(
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
        }
    );

    // Update store
    app.put('/api/store',
        [
            check('email').isEmail().normalizeEmail().stripLow(),
            check('slug').isLength({ min: 2 }).trim().escape().stripLow(),
            check('name').isLength({ min: 3 }).trim().escape().stripLow(),
            check('description').isLength({ min: 3 }).trim().escape().stripLow(),
            check('category').isLength({ min: 2 }).trim().escape().stripLow(),
            check('tags').trim().escape().stripLow(),
            check('website').trim().escape().stripLow(),
            check('image').trim().escape().stripLow(),
            check('countryCode').isLength({ min: 2 }).trim().escape().stripLow()
        ],
        async (req, res) => {
            // Handle error of body params
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json(
                    {
                        errors: errors.array()
                    }
                );
            }

            // Post request data
            const {body} = req;

            // Update instance
            let updateStore = new StoreModel(body);

            // Handles null error 
            if (!updateStore.token || !updateStore.name 
                || !updateStore.slug || !updateStore.name || !updateStore.description || !updateStore.category
                || !updateStore.tags || !updateStore.website || !updateStore.image || !updateStore.countryCode) {
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
        }
    );
}