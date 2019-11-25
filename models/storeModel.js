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

    // Get all the stores
    static getAll(zresult) {
        database.query("SELECT * FROM `ma_stores`", (error, res) => {
            if (error) {
                console.log(error);
                result(error, null);
            } else {
                let queryResult = JSON.stringify(res);
                result(null, queryResult);
            }
        });
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
    static getByTag(tag, result) {
        tag = `%${tag}%`
        database.query("SELECT * FROM `ma_stores` WHERE tags LIKE ?", tag, (error, res) => {
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