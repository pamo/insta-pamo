var config = {
  mongo: {
    "url": process.env.MONGOLAB_URI || "mongodb://localhost:27017/photos",
    "settings": {
      "db": {
        "native_parser": false
      }
    }
  },
  instagram: {
    tokens: {
      "client_id": process.env.INSTAGRAM_CLIENT_ID,
      "client_secret": process.env.INSTAGRAM_CLIENT_SECRET
    },
    query: {
      "user_id": "30792403",
      "tag": "cafefront"
    }
  }
};

module.exports = config;
