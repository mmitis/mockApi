/**
 * Created by mmitis on 19.12.15.
 */
'use strict';

import path from 'path';
export default {
    appName : 'mockApi',

    root: path.normalize(__dirname),
    env: process.env.NODE_ENV,
    ip: process.env.IP || '0.0.0.0',
    mongo: {
        dbname: 'empty-api',
        uri: process.env.MONGO_URL || 'mongodb://localhost/mock',
        options: {
            db: {
                safe: true
            }
        }
    },
    port: process.env.PORT || '9000',
    secrets: {
        session: 'mock'
    },
    facebook: {
        clientID: process.env.FACEBOOK_ID || 'id',
        clientSecret: process.env.FACEBOOK_SECRET || 'secret',
        callbackURL: (process.env.DOMAIN || '') + '/auth/facebook/callback'
    },
    twitter: {
        clientID: process.env.TWITTER_ID || 'id',
        clientSecret: process.env.TWITTER_SECRET || 'secret',
        callbackURL: (process.env.DOMAIN || '') + '/auth/twitter/callback'
    },
    google: {
        clientID: process.env.GOOGLE_ID || 'id',
        clientSecret: process.env.GOOGLE_SECRET || 'secret',
        callbackURL: (process.env.DOMAIN || '') + '/auth/google/callback'
    },
    mail : {
        host: process.env.MAIL_HOST || 'mail4.mydevil.net',
        port: 465,
        auth: {
            user: process.env.MAIL_USER || 'santaclaus@santadraw.com',
            pass: process.env.MAIL_PASSWORD || 'SantaClaus4Everyone'
        },
        secure : true,
        debug: true,
        email: process.env.MAIL_EMAIL || 'SantaDraw.com <santaclaus@santadraw.com>',
        interval : 8000,
        mailsPerInterval: 10
    }
};
