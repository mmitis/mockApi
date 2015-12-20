/**
 * Express configuration
 */

'use strict';

import express from 'express';
import morgan from 'morgan';
import compression from 'compression';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import errorHandler from 'errorhandler';
import path from 'path';
import lusca from 'lusca';
import config from './config';
import passport from 'passport';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import mongoose from 'mongoose';
var mongoStore = connectMongo(session);

export default function(app) {
    var env = app.get('env');
    app.set('views', config.root + '/server/views');
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
    app.use(compression());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(cookieParser());
    app.use(passport.initialize());

    app.use(session({
        secret: config.secrets.session,
        saveUninitialized: true,
        resave: false,
        store: new mongoStore({
            mongooseConnection: mongoose.connection,
            db: 'empty-api'
        })
    }));

    if ('development' === env) {
        app.use(require('connect-livereload')());
    }
    if ('development' === env || 'test' === env) {
        app.use(morgan('dev'));
        app.use(errorHandler()); // Error handler - has to be last
    }
}
