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
	"client_id": process.env.instagram_client_id || "",
	"client_secret": process.env.instagram_client_secret || ""
      },
      query: {
	"user_id": "30792403",
	"tag": "cafefront"
      }
    }
};

module.exports = config;
