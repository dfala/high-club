var deal = module.exports = {},
    Deal = require('./DealModel'),
    Amazon = require('./Amazon.js');


deal.getHomeDeals = function (req, res) {
  Deal.find({'isApproved': true}, function (err, deals) {
    if (err) return res.status(500).send(err);
    return res.json(deals);
  })
};


deal.create = function (req, res) {
  var newDeal = new Deal(req.body.data);
  if (!req.user._id) return res.status(403).send("You must be logged in.");
  newDeal.sellerId = req.user._id;

  newDeal.save(function (err, result) {
    if (err) return res.status(500).send(err);

    // Save image to Amazon
    for (var i = 0; i < req.body.images.length; i++) {
      var imageData = {
        imageBody: req.body.images[i].image,
        imageName: req.body.images[i].imageName,
        userEmail: req.user.email,
        dealId: result._id,
        imageExtension: req.body.images[i].imageExtension
      };

      Amazon.saveImage(imageData);
    }

    return res.json(result);
  });
};
