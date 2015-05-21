var config      = require('config'),
    _           = require('lodash'),
    instaConfig = config.get('Instagram'),
    Hapi        = require('hapi'),
    server      = new Hapi.Server(5000, { cors: true });


function Photo(data){
      return {
        coordinates: [ data.location.longitude, data.location.latitude ],
        title: data.location.name,
        id: data.location.id, 
        imageSrc: data.images.standard_resolution, 
        url: data.link, 
        description: data.caption.text
      }
}

var nameDrop = function (request, reply) {
  reply('Pamela Ocampo <a href="http://likescoffee.com">likes coffee.</a>');
}

var getInstagramFeed = function (request, reply) { 
  instagram = require('instagram-node').instagram();
  instagram.use(instaConfig.client);
  var images = [];

  var getNext = function(err, medias, pagination, remaining, limit){
    if(pagination.next){
      for (var i = 0; i < medias.length; i++){
        if(medias[i]['tags'].indexOf(request.params.tag) > -1){
          photo = new Photo(medias[i]);
          images.push(photo);
        }
      }
      pagination.next(getNext);
    }
    else {
      reply({ 
        photos: _.flatten(images)
      });
    }
  }

  instagram.user_media_recent(instaConfig.user_id, getNext);
}

// Routes
server.route({ method: 'GET', path: '/instagram/{tag}', handler: getInstagramFeed });
server.route({ method: 'GET', path: '/', handler: nameDrop });

// Start Server
server.start(function () {
  console.log('Server running at: ', server.info.uri);
});
