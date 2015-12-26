var controller = require('./controller.js');
var instagramController = require('./instagramController.js');

module.exports = [{
    method: 'GET',
    path: '/',
    handler: controller.renderAll
}, {
    method: 'GET',
    path: '/place/{place}',
    handler: controller.getByPlace
}, {
    method: 'GET',
    path: '/save/cafefront',
    handler: instagramController.saveCafeFronts
}, {
    method: 'GET',
    path: '/tag/cafefront',
    handler: controller.getAll
}, {
    method: 'GET',
    path: '/tag/{tag}',
    handler: instagramController.fetchTagged
}, {
    method: 'GET',
    path: '/{filename*}',
    handler: function(request, reply) {
        reply.file(request.params.filename);
    }
}];
