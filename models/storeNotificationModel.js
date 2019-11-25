"use strict";
// Pacakge import
const database = require('../database');
const crypto = require('crypto-random-string');

// Model import
const EventModel = require('./eventModel');

class StoreNotificationModel {
    // StoreNotificationModel Contructor
    constructor(notification) {
        this.token = crypto({length: 16, type: 'url-safe'});
        this.storeToken = notification.storeToken;
        this.subject = notification.subject;
        this.message = notification.message;
        this.priority = notification.priority;
        this.html = notification.html;
        this.deliveredDate = notification.deliveredDate;
    }

    // Get a notification based on :token
    static getByToken(token, result) {
        database.query("SELECT * FROM `lu_stores_notifications` WHERE token = ?", token, (error, res) => {
            if (error) {
                console.log(error);
                result(error, null);
            } else {
                let queryResult = JSON.stringify(res);
                result(null, queryResult);
            }
        });
    }

    // Get all notifications of a given :storeToken
    static getByStoreToken(storeToken, result) {
        database.query("SELECT * FROM `lu_stores_notifications` WHERE storeToken = ? ORDER BY `createdAt` DESC LIMIT 50", storeToken, (error, res) => {
            if (error) {
                console.log(error);
                result(error, null);
            } else {
                let queryResult = JSON.stringify(res);
                result(null, queryResult);
            }
        });
    }

    // Create a new store notification
    static create(newNotification, result) {
        database.query("INSERT INTO `lu_stores_notifications` SET ?", newNotification, (error, res) => {
            if (error) {
                console.log(error);
                result(error, null);
            } else {
                let queryResult = JSON.stringify(res);
                result(null, queryResult);

                // Post events to clients
                let eventData = { code: 202, event: 'create', type: 'storeNotification', queryData: newNotification };
                EventModel.send(eventData);
            }
        });
    }
}

// Export model
module.exports= StoreNotificationModel;