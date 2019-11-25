"use strict";
// Modules
const mysql = require('mysql');
const config = require('config');

// Database
const database = mysql.createConnection({
    host     : config.get("mysql").host,
    user     : config.get("mysql").user,
    password : config.get("mysql").password,
    database : config.get("mysql").database,
    charset  : 'utf8mb4'
});

// Connecting to database
database.connect((error) => {
    if (error) throw error;
    console.log("[App] Database Connected");
});

// Expor database for other modules
module.exports = database;