var Photo        = require('./photo.js').Photo;

var addUrl = function(server, photo){
   var baseUrl = 'http://' + server.host;
   photo.url = baseUrl + '/' + photo._id;
   return photo;
}

var save = function(request, reply){
   photo = new Photo();
   photo.title = request.payload.title;
   photo.order = request.payload.order;

   photo.save(function (err) {
    if (!err) {
      var response = addUrl(request.info, photo);
      reply(response);
    } else {
      reply(Hapi.error.internal('Internal MongoDB error', err));
    }
   });
};

var update = function(request, reply){
   Photo.findOneAndUpdate(request.params.id, request.payload, function (err, photo) {
    if (!err) {
      var response = addUrl(request.info, photo);
      reply(response);
    } else {
      reply(Hapi.error.internal('Internal MongoDB error', err));
    }
  });
};

var getAll = function(request, reply){
   var photosWithUrl = [];
   Photo.find({}, function (err, photos) {
      if (!err) {
	       for(i in photos){
		 photosWithUrl.push(addUrl(request.info, photos[i]));
	       }
	 reply(photosWithUrl);
      } else {
        reply(err);
      }
   });
};

var getById = function(request, reply){
  Photo.findById(request.params.id, function(err, photo){
      if (err){
	       reply(err);
      }
      var response = addUrl(request.info, photo);
      reply(response);
   });
};

var deleteAll = function(request, reply) {
  Photo.remove({}, function (err, photos) {
       if (err) return reply(Hapi.error.internal('Internal MongoDB error', err));
       return reply("Deleted all photos");
    });
};

var deleteById = function(request, reply) {
  Photo.findById(request.params.id, function (err, photo){
        if (err) return reply(Hapi.error.internal('Internal MongoDB error', err));
	photo.remove();
        reply("Record Deleted");
    });
};

var controller = {
    save: save,
    update: update,
    getAll: getAll,
    deleteAll: deleteAll,
    getById: getById,
    deleteById: deleteById
}

module.exports = controller;
