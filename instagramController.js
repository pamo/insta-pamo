var instaConfig      = require('./config.js').instagram;
var instagram = module.exports = require('instagram-node').instagram();
var Photo        = require('./photo.js').Photo;

instagram.use(instaConfig.tokens);

var fetchAndSaveCafeFronts = function(request, reply){
  var err = instagram.user_media_recent(instaConfig.query.user_id, getNextPage);
  if(err) reply(err);
  reply('Pamela Ocampo <a href="http://likescoffee.com">likescoffee</a> and #' + instaConfig.query.tag);
}

var getNextPage = function(err, medias, pagination, remaining, limit){
  if(err) {
    return err;
  } else if(pagination.next){
    for (var i = 0; i < medias.length; i++){
      if(medias[i]['tags'].indexOf(instaConfig.query.tag) > -1){
        savePhoto(medias[i]);
      }
    }
    pagination.next(getNextPage);
  }
}

var savePhoto = function(data){
  Photo.findOneAndUpdate({id: data.id}, data, {upsert: true}, function (err, savedPhoto) {
    if (!err) {
      console.info(savedPhoto.location.name);
    } else {
      console.log('Internal MongoDB error', err);
    }
  });
}

var instagramController = {
  saveCafeFronts: fetchAndSaveCafeFronts
}

module.exports = instagramController;
