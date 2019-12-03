"use strict";
// Import model
const StoreModel = require('../models/storeModel');
const { check, validationResult } = require('express-validator');

module.exports = (app) => {
    // Get store by query[name,page,limit,orderby]
    app.get('/api/store/tag', async(req, res) => {
        // Query params
        let {name, page, limit, orderby} = req.query;

        // Decode URI
        name = encodeURIComponent(String(name));
        page = encodeURIComponent(String(page));
        limit = encodeURIComponent(String(limit));
        orderby = encodeURIComponent(String(orderby));

        // Check for page
        if (isNaN(parseInt(page)) || parseInt(page) < 0)
            page = 1;

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
                    message: 'You are required to provide name, and orderby ["alphabetically", "popular", "recentUpdates"].',
                    response: null
                }
            );
        } else {
            // Fetch the tags by query params
            StoreModel.getByTag(name, limit, offset, orderby, (error, store) => {
                // Store data to json, since string was returned
                store = JSON.parse(store);
                
                // Show db error
                if (error) res.status(500).send(error);

                // Show the success message
                res.status(200).json(
                    {
                        error: null,
                        message: 'Successfully fetched',
                        response: store
                    }
                );
            });
        }
    });

    // Get store by :slug
    app.get('/api/store/:slug', async(req, res) => {
        // Get the param :slug and decode uri
        let {slug} = req.params;
        slug = encodeURIComponent(String(slug));

        // check if slug is empty or length is not > 2
        if (!slug || slug.length < 2) {
            // Error, send message
            res.status(400).json(
                {
                    error: true,
                    message: 'You are required to provide slug',
                    response: null
                }
            );
        } else {
            // Fetch the store by :slug
            StoreModel.getBySlug(slug, (error, store) => {
                // Store data to json, since string was returned
                store = JSON.parse(store);

                // Show db error
                if (error) res.status(500).send(error);

                // Show the success message
                res.status(200).json(
                    {
                        error: null,
                        message: 'Successfully fetched',
                        response: store
                    }
                );
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
                return res.status(400).json(
                    {
                        error: true,
                        message: errors.array(),
                        response: null
                    }
                );
            }

            // Post request data
            const {body} = req;

            // Create a newStore instance
            let newStore = new StoreModel(body);

            // No errors, create the store @StoreModel.create
            StoreModel.create(newStore, (error, result) => {
                // Store data to json, since string was returned
                result = JSON.parse(result);

                // Show db error
                if (error) res.status(500).send(error);
                
                // Show the success message
                res.status(201).json(
                    {
                        error: null,
                        message: 'Successfully posted',
                        response: result
                    }
                );
            });
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
                return res.status(400).json(
                    {
                        error: true,
                        message: errors.array(),
                        response: null
                    }
                );
            }

            // Post request data
            const {body} = req;

            // Update instance
            let updateStore = new StoreModel(body);

            // No errors, update the store @StoreModel.update
            StoreModel.update(updateStore, (error, result) => {
                // Store data to json, since string was returned
                result = JSON.parse(result);

                // Show db error
                if (error) res.status(400).send(error);

                // Show the success message
                res.status(202).json(
                    {
                        error: null,
                        message: 'Successfully put',
                        response: result
                    }
                );
            });
        }
    );
}