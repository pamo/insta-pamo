var _ = require('lodash');
var instaConfig      = require('./config.js').instagram;
var instagram = module.exports = require('instagram-node').instagram();
var Photo        = require('./photo.js').Photo;

instagram.use(instaConfig.tokens);
var fetchAndSave = function(){
  instagram.user_media_recent(instaConfig.user_id, getNextPage);
}
var getNextPage = function(err, medias, pagination, remaining, limit){
  if(err) {
      console.err(err);
    } else if(pagination.next){

      for (var i = 0; i < medias.length; i++){
	 if(medias[i]['tags'].indexOf(request.params.tag) > -1){
	   reply(savePhoto(medias[i]));
	 }
       }
       pagination.next(getNext);

    }

}

var transformDescription = function(description){
  return _.dropRight(_.drop(description.slice(13, description.length).split('.')));
}

var savePhoto = function(data){
   photo = new Photo();
   photo.save(function (err) {
    if (!err) {
      reply('Saved new photo!', photo.toJSON());
    } else {
      reply(Hapi.error.internal('Internal MongoDB error', err));
    }
   });
}


var instagramController = {
    fetchAndSave: fetchAndSave
}

module.exports = instagramController;
