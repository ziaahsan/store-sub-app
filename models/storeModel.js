"use strict";
// Package import
const database = require('../database');
const crypto = require('crypto-random-string');

// Model import
const EventModel = require('./eventModel');

class StoreModel {
    // StoreModel contructor
    constructor(store) {
        this.token = crypto({length: 16, type: 'url-safe'});
        this.email = store.email;
        this.name = store.name;
        this.nickName = store.nickName;
        this.slogan = store.slogan;
        this.logoColor = store.logoColor;
        this.tags = store.tags;
        this.website = store.website;
    }
  
    // Get a store by token
    static getByToken(token, result) {
        database.query("SELECT * FROM `ma_stores` WHERE token = ?", token, (error, res) => {
            if (error) {
                console.log(error);
                result(error, null);
            } else {
                let queryResult = JSON.stringify(res);
                result(null, queryResult);
            }
        });
    }

    // Get a store by email
    static getByEmail(email, result) {
        database.query("SELECT * FROM `ma_stores` WHERE email = ?", email, (error, res) => {
            if (error) {
                console.log(error);
                result(error, null);
            } else {
                let queryResult = JSON.stringify(res);
                result(null, queryResult);
            }
        });
    }

    // Get a stores by tag
    static getByTag(tag, limit, offset, orderby, result) {
        tag = `%${tag}%`
        // Make query based on type
        let strQuery = '';
        switch (orderby) {
            case 'recentUpdates':
                strQuery =
                `
                    SELECT mas.token, mas.nickName, mas.slogan, mas.logoColor, mas.website, mas.image, COUNT(lusn.storeToken) as notifications FROM ma_stores mas
                    LEFT JOIN lu_stores_notifications as lusn ON mas.token = lusn.storeToken
                    WHERE tags LIKE ? AND lusn.createdAt >= (CURDATE() + INTERVAL -7 DAY) GROUP BY mas.token ORDER BY lusn.createdAt DESC LIMIT ?, ?
                `;
                break;
            case 'popular':
                strQuery =
                `
                    SELECT mas.token, mas.nickName, mas.slogan, mas.logoColor, mas.website, mas.image, COUNT(lusn.storeToken) as notifications FROM ma_stores mas
                    LEFT JOIN lu_stores_notifications as lusn ON mas.token = lusn.storeToken
                    WHERE tags LIKE ? GROUP BY mas.token ORDER BY notifications DESC LIMIT ?, ?
                `;
                break;
            case 'alphabetically':
                strQuery =
                `
                    SELECT mas.token, mas.nickName, mas.slogan, mas.logoColor, mas.website, mas.image, COUNT(lusn.storeToken) as notifications FROM ma_stores mas
                    LEFT JOIN lu_stores_notifications as lusn ON mas.token = lusn.storeToken
                    WHERE tags LIKE ? GROUP BY mas.token ORDER BY nickName ASC LIMIT ?, ?
                `;
                break;
        }

        database.query(strQuery, [tag, offset, limit], (error, res) => {
            if (error) {
                console.log(error);
                result(error, null);
            } else {
                let queryResult = JSON.stringify(res);
                result(null, queryResult);
            }
        });
    }

    // Create a new store
    static create(newStore, result) {
        database.query("INSERT INTO `ma_stores` SET ?", newStore, (error, res) => {
            if (error) {
                console.log(error);
                result(error, null);
            } else {
                let queryResult = JSON.stringify(res);
                result(null, queryResult);

                // Post events to clients
                let eventData = { code: 201, event: 'create', type: 'store', queryData: newStore };
                EventModel.send(eventData);
            }
        });
    }

    // Update a store
    static update(store, result) {
        database.query("UPDATE `ma_stores` SET ? WHERE token = ?", [store, store.token], (error, res) => {
            if (error) {
                console.log(error);
                result(error, null);
            } else {
                let queryResult = JSON.stringify(res);
                result(null, queryResult);

                // Post events to clients
                let eventData = { code: 202, event: 'update', type: 'store', queryData: store };
                EventModel.send(eventData);
            }
        });
    }
}

// Export model
module.exports= StoreModel;