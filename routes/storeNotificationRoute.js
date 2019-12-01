"use strict";
// Model import
const StoreNotificationModel = require('../models/storeNotificationModel');

module.exports = (app) => {
    // Get :token notifications
    app.get('/api/notification/:token', async(req, res) => {
        const {token} = req.params;
        StoreNotificationModel.getByToken(token, (error, notification) => {
            notification = JSON.parse(notification);

            if (error) res.status(400).send(error);
            res.status(200).json(notification);
        });
    });

    // Get :storeToken notifications
    app.get('/api/store/notifications/:storeToken', async(req, res) => {
        const {storeToken} = req.params;
        StoreNotificationModel.getByStoreToken(storeToken, (error, storeNotifications) => {
            storeNotifications = JSON.parse(storeNotifications);

            if (error) res.status(400).send(error);
            res.status(200).json(storeNotifications);
        });
    });

    // Create a store notification
    // app.post('/api/store/notification', async(req, res) => {
    //     // Post request data
    //     const {body} = req;
    //     // Create a newNotification instance
    //     let newNotification = new StoreNotificationModel(body);
    //     // Handles null error 
    //     if (!newNotification.storeToken || !newNotification.subject
    //         || !newNotification.message || !newNotification.priority || !newNotification.html
    //         || !newNotification.deliveredDate) {
    //             // Error, send message
    //             res.status(400).json(
    //                 {
    //                     error: true,
    //                     message: 'You are required to provide all params.'
    //                 }
    //             );
    //     } else {
    //         // No errors, create the storeNotificaion by @StoreNotificationModel.create
    //         StoreNotificationModel.create(newNotification, (error, result) => {
    //             result = JSON.parse(result);

    //             if (error) res.status(400).send(error);
    //             res.status(201).json(result);
    //         });
    //     }
    // });
}