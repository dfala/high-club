var routes = module.exports = {},
    Deal = require('./DealModel.js'),
    User = require('./UserModel.js');

////////////////////////////////////
// MIDDLEWARE

routes.isAdmin = function (req, res, next) {
  if (req.user && req.user.email) {
    // TODO: Change them to correct emails
    if (req.user.email === 'jose@jose.com' || req.user.email === 'bencallis1@gmail.com') {
      next();
    } else {
      return res.redirect('/');
    }
  } else {
    return res.redirect('/');
  }
};

routes.isAuth = function (req, res, next) {
    if (req.user) {
        next();
    } else {
   	// if they aren't redirect them to the home page
      //res.status(403).send('not allowed');
      res.redirect('/signup');
    }
};

routes.setRoute = function (req, res, next) {
  if (req.user) {
    req.passedUser = req.user;
    req.passedUser.password = undefined;
    delete req.passedUser['password'];
  } else {
    req.passedUser = null
  }
  next()
};

////////////////////////////////////
// ACTUAL ROUTING

routes.index = function(req, res) {
  Deal.find({}, function (err, deals) {
    if (err) return console.error(err);
    res.render('index', {deals:JSON.stringify(deals), user: req.passedUser});
  })
};

routes.signup = function(req, res) {
  res.render('signup', {user: JSON.stringify(req.passedUser)});
};

routes.dashboard = function(req, res) {
  if ((req.user && req.user.email === 'jose@jose.com') || (req.user && req.user.email === 'bencallis1@gmail.com')) {
    Deal.find({}, function (err, deals) {
      if (err) return res.status(500).json(err);
      res.redirect('admin-dashboard');
    })
  } else {
    res.render('dashboard', {user: req.passedUser});
  }
};

routes.deal = function (req, res) {
  Deal.findById(req.params.dealId, function (err, deal) {
    if (err) return console.error(err);
    res.render('deal', {deal: deal, user: req.passedUser});
  });
};

routes.checkout = function(req, res) {
  if (!req.user) return res.render('checkout', {deals: null, user: req.passedUser});
  User.findById(req.user._id)
    .populate('shoppingCartItems')
    .exec(function (err, user) {
      if (err) return res.render('checkout', {deals: null, user: req.passedUser});
      return res.render('checkout', {deals: JSON.stringify(user.shoppingCartItems), user: req.passedUser});
    })
};

routes.adminDashboard = function(req, res) {
  User.findById(req.user._id, function (err, result) {
    if (err) return res.status(500).json(err);
    Deal.find({isApproved: false}, function (err, deals) {
      if (err) return res.status(500).json(err);
      res.render('admin-dashboard', {user: req.passedUser, deals: deals});
    })
  });
};

routes.previewDeal = function(req, res) {
  Deal.findById(req.params.dealId, function (err, deal) {
    if (err) return res.status(500).json(err);
    res.render('deal', {deal: deal, user: req.passedUser});
  });
};
