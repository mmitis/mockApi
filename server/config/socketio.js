/**
 * Socket.io configuration
 */
'use strict';

import config from './config';



var socketed = function(socketio) {

    socketio.on('connection', function(socket) {
        socket.address = socket.request.connection.remoteAddress +
            ':' + socket.request.connection.remotePort;

        socket.connectedAt = new Date();

        socket.log = function(...data) {
            console.log('SocketIO ${socket.nsp.name} [${socket.address}]', ...data);
        };

        // Call onDisconnect.
        socket.on('disconnect', () => {
            onDisconnect(socket);
            socket.log('DISCONNECTED');
        });

        // Call onConnect.
        onConnect(socket);
        socket.log('CONNECTED');



        // When the user disconnects.. perform this
        function onDisconnect(socket) {
        }

        function onConnect(socket) {
            // When the client emits 'info', this listens and executes
            socket.on('info', data => {
                socket.log(JSON.stringify(data, null, 2));
            });

            // Insert sockets below
            require('../api/thing/thing.socket').register(socket);
        }
    });
}
export default socketed;
