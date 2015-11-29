var mongoose = require('mongoose'),
    bcrypt   = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String },
  createdDeals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Deal' }],

  shippingAddress: { type: String },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  shoppingCartItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Deal' }],
  creationDate: { type: Date, default: Date.now }
});


// methods ======================
// generating a hash
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
