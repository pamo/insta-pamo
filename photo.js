var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var schema = new Schema({
  attribution: Schema.Types.Mixed,
  tags: [String],
  location: Schema.Types.Mixed,
  comments: Schema.Types.Mixed,
  filter: String,
  created_time: Number,
  link: String,
  likes: Schema.Types.Mixed,
  images: Schema.Types.Mixed,
  users_in_photo: Array,
  caption: Schema.Types.Mixed,
  type: String,
  id: {
    type: String,
    unique: true
  },
  user: Schema.Types.Mixed
});

schema.set('toJSON', {
  transform: function(doc, ret, options) {
    return {
      created_time: ret.created_time,
      coordinates: [ ret.location.longitude, ret.location.latitude ],
      title: ret.location.name,
      id: ret.location.id,
      imageSrc: ret.images.standard_resolution,
      url: ret.link,
      description: ret.caption.text
    }
  }
});

module.exports = Mongoose.model('Photo', schema);
