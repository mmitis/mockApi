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
        uri: process.env.MONGO_URL || 'mongodb://localhost/mock',
        options: {
            db: {
                safe: true
            }
        }
    },
    port: process.env.PORT || '9000',
    secrets: {
        session: 'empty-api-secret'
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
    }
}
