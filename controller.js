var _ = require('lodash');
var Photo = require('./photo.js').Photo;

var getAll = function(request, reply) {
  Photo.find({}, function(err, photos) {
    if (!err) {
      reply(photos);
    } else {
      reply(err);
    }
  }).sort({
    created_time: -1
  });
}
var renderAll = function(request, reply) {
  Photo.find({}, function(err, photos) {
    if (!err) {
      var transformedPhotos = JSON.parse(JSON.stringify(photos));
      var municipalities = _.uniq(_.pluck(transformedPhotos, 'description.municipality'), false, function(municipality){
        return municipality[0] + ', ' + municipality[1];
      });
      
      reply.view('index', {
        photos: transformedPhotos,
        municipalities: municipalities
      });
    } else {
      reply(err);
    }
  }).sort({
    created_time: -1
  });
}

var getById = function(request, reply) {
  Photo.findById(request.params.id, function(err, photo) {
    if (!err) {
      reply(photo);
    } else {
      reply(err);
    }
  });
};

var controller = {
  renderAll: renderAll,
  getAll: getAll,
  getById: getById
}

module.exports = controller;
