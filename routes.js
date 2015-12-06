var controller = require('./controller.js');
var instagramController = require('./instagramController.js');

module.exports = [{
    method: 'GET',
    path: '/',
    handler: controller.getAll
}, {
    method: 'GET',
    path: '/{id}',
    handler: controller.getById
}, {
    method: 'GET',
    path: '/save/cafefront',
    handler: instagramController.saveCafeFronts
}, {
    method: 'GET',
    path: '/tag/{tag}',
    handler: instagramController.fetchTagged
}];
