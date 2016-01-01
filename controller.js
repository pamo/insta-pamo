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
      var municipalities = _.uniq(_.pluck(transformedPhotos, 'description.municipality'), false, function(municipality) {
        return (municipality[0] + ', ' + municipality[1]).trim();
      });
      reply.view('index', {
        photos: transformedPhotos,
        places: municipalities.sort()
      });
    } else {
      reply(err);
    }
  }).sort({
    created_time: -1
  });
}
var getByPlace = function(request, reply) {
  Photo.find({
      'caption.text': new RegExp(request.params.place, 'i')
    },
    function(err, photos) {
      if (!err) {
      var transformedPhotos = JSON.parse(JSON.stringify(photos));
        reply.view('place', {
          place: request.params.place,
          photos: transformedPhotos
        });
      } else {
        reply(err);
      }
    });
};

var controller = {
  renderAll: renderAll,
  getAll: getAll,
  getByPlace: getByPlace
}

module.exports = controller;
