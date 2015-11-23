var controller = require('./controller.js');
var instagramController = require('./instagramController.js');

exports.register = function(server, options, next) {
    server.route({
	method: 'GET',
	path: '/',
	handler: controller.getAll
    });

    server.route({
	method: 'POST',
	path: '/',
	handler: controller.save
    });

    server.route({
	method: 'PATCH',
	path: '/{id}',
	handler: controller.update
    });

    server.route({
	method: 'DELETE',
	path: '/',
	handler: controller.deleteAll
    })

    server.route({
	method: 'GET',
	path: '/{id}',
	handler: controller.getById
    });

    server.route({
	method: 'DELETE',
	path: '/{id}',
	handler: controller.deleteById
    });

    server.route({
	method: 'GET',
	path: '/fetchAndSaveFromInstagram',
	handler: instagramController.fetchAndSave
    });

    next();
};

exports.register.attributes = {
    name: 'routes',
    version: '1.0.0'
};
