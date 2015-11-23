var _ = require('lodash');
var instaConfig      = require('./config.js').instagram;
var instagram = module.exports = require('instagram-node').instagram();
var Photo        = require('./photo.js').Photo;

instagram.use(instaConfig.tokens);

var fetch = function(){
  instagram.user_media_recent(instaConfig.query.user_id, getNextPage);
}
var getNextPage = function(err, medias, pagination, remaining, limit){
  if(err) {
      console.log(err);
    } else if(pagination.next){
      for (var i = 0; i < medias.length; i++){
	 if(medias[i]['tags'].indexOf(instaConfig.query.tag) > -1){
	   console.log(medias[i]);
	   savePhoto(medias[i]);
	 }
       }
       pagination.next(getNextPage);
    }

}

var transformDescription = function(description){
  return _.dropRight(_.drop(description.slice(13, description.length).split('.')));
}

var savePhoto = function(data){
   photo = new Photo(data);

   photo.save(function (err) {
    if (!err) {
      console.log('Saved new photo!', photo);
    } else {
      console.log('Internal MongoDB error', err);
    }
   });
}


var instagramController = {
    fetchAndSave: fetch
}

module.exports = instagramController;
