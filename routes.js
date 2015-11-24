var controller = require('./controller.js');
var instagramController = require('./instagramController.js');

exports.register = function(server, options, next) {
  server.route({
    method: 'GET',
    path: '/',
    handler: controller.getAll
  });

  server.route({
    method: 'GET',
    path: '/{id}',
    handler: controller.getById
  });

  server.route({
    method: 'GET',
    path: '/save/cafefront',
    handler: instagramController.saveCafeFronts
  });

  server.route({
    method: 'GET',
    path: '/tag/{tag}',
    handler: instagramController.fetchTagged
  });

  next();
};

exports.register.attributes = {
    name: 'routes',
    version: '2.0.0'
};
