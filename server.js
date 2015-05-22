var config      = require('config'),
    _           = require('lodash'),
    instagram = require('instagram-node').instagram(),
    Hapi        = require('hapi'),
    port        = process.env.PORT || 8080,
    server      = new Hapi.Server(port, { cors: true });

function Photo(data){
      return {
        coordinates: [ data.location.longitude, data.location.latitude ],
        title: data.location.name,
        id: data.location.id, 
        imageSrc: data.images.standard_resolution, 
        url: data.link, 
        description: formatDescription(data.caption.text)
      }
}

function formatDescription(text){
  return _.dropRight(_.drop(text.slice(13, text.length).split('.')));
}

var nameDrop = function (request, reply) {
  reply('Pamela Ocampo <a href="http://likescoffee.com">likes coffee.</a>');
}

function configureInstagram(){
  var instaConfig = config.get('Instagram');
  var tokens = {
    client_id: process.env.CLIENT_ID || instaConfig.client.id,
    client_secret: process.env.CLIENT_SECRET || instaConfig.client.secret
  };
  instagram.use(tokens);
}
var getInstagramFeed = function (request, reply) { 
  var images = [];
  configureInstagram();

  var getNext = function(err, medias, pagination, remaining, limit){
    if(!err){
      console.log('getting medias');
      if(pagination.next){
        for (var i = 0; i < medias.length; i++){
          if(medias[i]['tags'].indexOf(request.params.tag) > -1){
            photo = new Photo(medias[i]);
            console.log(photo);
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

      var userId = process.env.USER_ID || instaConfig.user_id; 
      instagram.user_media_recent(userId, getNext);
    }
    console.log(err);
  }
}

// Routes
server.route({ method: 'GET', path: '/instagram/{tag}', handler: getInstagramFeed });
server.route({ method: 'GET', path: '/', handler: nameDrop });

// Start Server
server.start(function () {
  console.log('Server running at: ', server.info.uri);
});
