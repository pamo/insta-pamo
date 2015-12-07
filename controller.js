var Photo        = require('./photo.js').Photo;

var getAll = function(request, reply){
  Photo
  .find({}, function (err, photos) {
    if (!err) {
      reply.view('index', { photos: photos });
    //   reply(photos);
    } else {
      reply(err);
    }
  })
  .sort({created_time: -1});
};

var getById = function(request, reply){
  Photo.findById(request.params.id, function(err, photo){
    if (!err){
      reply(photo);
    } else {
      reply(err);
    }
  });
};

var controller = {
    getAll: getAll,
    getById: getById
}

module.exports = controller;
