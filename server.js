var express     = require('express'),
    bodyParser  = require('body-parser'),
    cors        = require('cors'),
    mongoose    = require('mongoose'),
    session     = require('express-session'),
    passport    = require('passport'),
    CronJob     = require('cron').CronJob,
    ejs         = require('ejs'),
    path        = require('path'),
    keys        = require('./config/keys.js');

// App definition
var app = express();
app.set('view engine', 'ejs');

require('./config/passport')(passport);

// Middleware
app.use(session({
    secret: 'super mega secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());

// Expanding server capacity
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// Routing
app.use(express.static(path.join(__dirname, 'app')));
// app.use(express.static(__dirname + '/'));

var Routes = require('./config/routes.js');

////////////////////////////////////
// ROUTES
app.get('/', Routes.setRoute, Routes.index);
app.get('/signup', Routes.setRoute, Routes.signup);
app.get('/dashboard', Routes.isAuth, Routes.setRoute, Routes.dashboard);
app.get('/deal/:slug/:dealId', Routes.setRoute, Routes.deal);
app.get('/checkout', Routes.setRoute, Routes.checkout);
app.get('/admin-dashboard', Routes.isAdmin, Routes.setRoute, Routes.adminDashboard);
app.get('/preview/:dealId', Routes.setRoute, Routes.previewDeal);


// Controllers
var DealController = require('./controllers/DealController'),
    CartController = require('./controllers/CartController'),
    AdminController = require('./controllers/AdminController'),
    PaymentController = require('./controllers/PaymentController');

////////////////////////////////////
// API
app.get('/api/deals/home', DealController.getHomeDeals);
app.post('/api/deal', DealController.create);
app.post('/api/cart/:dealId', CartController.add);
app.post('/api/cart-total', CartController.update);
app.get('/api/cart-count', CartController.getAmount);
app.put('/api/cart/:itemId', CartController.removeFromCart);

// -> Transact
app.post('/api/create-customer', PaymentController.createCustomer);
app.post('/api/payment', PaymentController.transact);

// -> Admin
app.put('/api/approve/:itemId', AdminController.approveDeal);
app.put('/api/disapprove/:itemId', AdminController.disapproveDeal);

// -> Auth
app.post('/api/user', passport.authenticate('local-signup', {
   successRedirect : '/dashboard', // redirect to the secure profile section
   failureRedirect : '/signup', // redirect back to the signup page if there is an error
   failureFlash : true // allow flash messages
}));

// app.post('/api/seller', logout, passport.authenticate('local-signup'), function(req, res){
//   res.redirect('dashboard');
//   // if(req.user == 401){
// 	// 	res.redirect('signup');
// 	// } else {
//   // res.redirect('dashboard', { user: req.user });
//   // }
// });

app.post('/auth/login', passport.authenticate('local-login'), function (req, res){
	if(!req.user){
		res.redirect('/signup');
	}
    res.send(req.user); // redirect to the secure profile section
});

// What does this do?
app.get('/api/signup', Routes.isAuth, function(req, res) {
	res.json(req.user)
});

app.get('/logout', function(req, res) {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

// Custom middleware
function logout (req, res, next) {
    if (req.session || req.user) {
        req.logout();
    }
    next();
}


////////////////////////////////////
// CONNECTIONS
if (keys.env == 'DEVELOPMENT') {
  var portNum = 3000;
} else {
  var portNum = 80;
}

var mongooseUri = 'mongodb://localhost/high-club';
mongoose.connect(mongooseUri);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('Mongoose uri:', mongooseUri);
});


app.listen(portNum, function () {
    console.log('High-club is watching on port: ' + portNum, 'in ' + keys.env + ' mode.');
});
