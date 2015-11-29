var Tokens = require('../config/keys.js'),
    AWS    = require('aws-sdk'),
    Deal   = require('../models/DealModel.js');

// Hard amazon aws config
AWS.config.update({
  accessKeyId: Tokens.amazonAccess,
  secretAccessKey: Tokens.amazonSecret,
  region: Tokens.amazonRegion
});

var s3 = new AWS.S3();

var exports = module.exports = {};

exports.saveImage = function (imageData) {
	buf = new Buffer(imageData.imageBody.replace(/^data:image\/\w+;base64,/, ""), 'base64');

	var bucketName = 'jake-deals/' + imageData.userEmail;
	var params = {
		  Bucket: bucketName
		, Key: imageData.imageName
		, Body: buf
		, ContentType: 'image/' + imageData.imageExtension
		, ACL: 'public-read'
	};

  s3.upload(params, function (err, data) {
    if (err) return console.error(err);

    data.imageName = imageData.imageName;
    data.imageExtension = imageData.imageExtension;

    Deal.findByIdAndUpdate(
      imageData.dealId,
      {$push: {"images": data}},
      {safe: true, upsert: true, new : true},
      function(err, model) {
        console.log(err);
      }
    );
  });
};
