var cart = module.exports = {},
    User = require('./UserModel');

// TODO: Create a user model (and combine seller and buyer schema)
cart.add = function (req, res) {
  if (!req.user) return res.status(403).send('Login required');
  User.findByIdAndUpdate(
    req.user._id,
    {$push: {"shoppingCartItems": req.params.dealId}},
    {safe: true, upsert: true, new : true},
    function(err, model) {
      if (err) return res.status(500).send(err);
      return res.json(model);
    }
  )
};

cart.update = function (req, res) {
  if (!req.user) return res.end();
  User.findById(req.user._id, function (err, user) {
    if (err) return res.status(500).json(err);

    user.shoppingCartItems = req.body;
    user.save(function (err, result) {
      if (result) return res.json(result.shoppingCartItems.length);
    });
  })
};

cart.getAmount = function (req, res) {
  if (!req.user) return res.json(0);
  User.findOne({"_id": req.user._id}, function (err, user) {
    if (err) return res.status(500).json(err);
    var cartCount = 0;
    if (user.shoppingCartItems) {
      cartCount = user.shoppingCartItems.length;
    }
    return res.json(cartCount);
  });
};

cart.removeFromCart = function (req, res) {
  if (!req.user) return res.status(403).json('Login required');
  User.findById(req.user._id, function (err, user) {
    if (err) return res.status(500).json(err);

    var index = user.shoppingCartItems.indexOf(req.params.itemId);
    if (index < 0) return res.status(500).json(err);

    user.shoppingCartItems.splice(index, 1);
    user.save(function (err, result) {
      if (err) return res.status(500).json(err);
      return res.json(result);
    });
  });
};
