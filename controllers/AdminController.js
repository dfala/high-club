var admin = module.exports = {},
    Deal = require('../models/DealModel');

admin.approveDeal = function (req, res) {
  var itemId = req.params.itemId;
  Deal.findOneAndUpdate({'_id': itemId}, {$set: {'isApproved': 'true'}}, function(err, result) {
    if (err) return res.status(500).json(err);
    return res.json('Item approved');
  })
};

admin.disapproveDeal = function (req, res) {
  var itemId = req.params.itemId;
  Deal.findOneAndUpdate({'_id': itemId}, {$set: {'isApproved': 'false'}}, function(err, result) {
    if (err) return res.status(500).json(err);
    return res.json('Item disapproved');
  })
};
