var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var schema = new Schema({
  tags: [],
  location: {
    latitude: Number,
    name: String,
    longitude: Number,
    id: Number
  },
  created_time: Number,
  link: String,
  likes: {
    count: Number
  },
  images: {
    low_resolution: {
      url: String
    },
    standard_resolution: {
      url: String
    },
    thumbnail: {
      url: String
    }
  },
  caption: {
    text: String
  },
  id: {
    type: String,
    unique: false
  }
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

module.exports = {
  Photo: Mongoose.model('Photo', schema)
}
