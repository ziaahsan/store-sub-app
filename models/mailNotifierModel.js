"use strict";
// Package import
const mailNotifier = require('mail-notifier');

// Model Import
const StoreModel = require('./storeModel');
const StoreNotificationModel = require('./storeNotificationModel');

class MailNotifierModel {
    constructor(username, passsword) {
        // Setup imap details
        this.imap = {
            user: username,
            password: passsword,
            host: "imap.gmail.com",
            port: 993,
            tls: true,
            tlsOptions: { rejectUnauthorized: false }
        };

        // Initialize the mailnotifier with imap
        this.notifier = mailNotifier(this.imap);
    }

    // Start mail session
    start() {
        // Listener on the imap
        this.notifier.on('mail', (mail) => {
            // New mail data
            let emailData = {
                from: mail.from[0].address,
                subject: mail.headers.subject,
                message: (typeof mail.text !== 'undefined') ? mail.text : '',
                priority: mail.priority,
                html: mail.html,
                deliveredDate: mail.headers.date
            }

            console.log("Mail Incoming from: " + emailData.from);
            
            // Get store based on email
            StoreModel.getByEmail(emailData.from, (error, store) => {
                if (error) {
                    console.log(error);
                    return;
                }

                // Store token
                store = JSON.parse(store);
                if (store.length != 1) return;

                // Storetoken from email
                let storeToken = store[0].token;

                // Notification object
                let notification = {
                    storeToken: storeToken,
                    subject: emailData.subject,
                    message: emailData.message,
                    priority: emailData.priority,
                    html: emailData.html,
                    deliveredDate: emailData.deliveredDate
                }

                // Create a newNotification instance
                let newNotification = new StoreNotificationModel(notification);

                // Place the notification inside the database
                StoreNotificationModel.create(newNotification, (error, result) => {
                    if (error) {
                        console.log(error);
                        return;
                    }
                });
            });
        });

        // Initate the notifer
        this.notifier.start();

        // Place message in console about listener
        console.log("[App] Mail notifier listening");
    }

    // End mail session
    end() {
        this.notifier.end();
    }
}

// Export model
module.exports= MailNotifierModel;