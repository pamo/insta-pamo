var Hapi        = require('hapi');
var Path        = require('path');
var Hoek        = require('hoek');
var routes      = require('./routes.js');
var mongoConfig      = require('./config.js').mongo;
var Mongoose    = require('mongoose');
var server      = new Hapi.Server();

Mongoose.connect(mongoConfig.url);
server.connection({
    port: parseInt(process.env.PORT) || 3000,
    routes: {cors: true}
});

server.views({
    engines: {
        html: require('handlebars')
    },
    path: 'views'
});

server.route(routes);

server.start(function () {
    console.log('Server running at:', server.info.uri);
});
