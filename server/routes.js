'use strict';
export default function(app) {
    //Api
    app.use('/api/things', require('./api/thing'));
    app.use('/api/users', require('./api/user'));
    //Authorization
    app.use('/auth', require('./auth'));
}
