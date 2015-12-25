var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
var _ = require('lodash');

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
  description: String,
  caption: {
    text: String
  },
  id: {
    type: String,
    unique: true
  },
  geoLocation: {
    type: {
      type: String,
      default: "Point"
    },
    coordinates: [Number]
  }
});

var captionTemplate = _.spread(function(cafeName, location, drink) {
  var locality = _.first(location.split(','));
  return {
    locality: locality,
    municipality: _.takeRight(location.split(','), 2),
    drink: drink
  };
});

var transformDescription = function(description) {
  return captionTemplate(description.split('.'));
}

var transformObject = function(ret) {
  return {
    created_time: ret.created_time,
    coordinates: [ret.location.longitude, ret.location.latitude],
    geoLocation: {
      coordinates: [ret.location.longitude, ret.location.latitude]
    },
    title: ret.location.name,
    id: ret.location.id,
    imageSrc: ret.images.standard_resolution,
    url: ret.link,
    description: transformDescription(ret.caption.text),
  };
}

schema.set('toJSON', {
  transform: function(doc, ret, options) {
    return transformObject(ret);
  }
});

schema.set('toObject', {
  transform: function(doc, ret, options) {
    return transformObject(ret);
  }
});

module.exports = {
  Photo: Mongoose.model('Photo', schema)
}
