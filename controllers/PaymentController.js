var payment = module.exports = {},
    Tokens = require('./keys.js'),
    stripe = require("stripe")(Tokens.stripeSecretKey);

payment.createCustomer = function (req, res) {
  var stripeToken = req.body.stripeToken;

  stripe.customers.create({
    email: req.user.email,
    description: req.body.description,
    card: req.body.card
  }).then(function(customer) {
    console.log('CUSTOMER: ', customer);
    return stripe.charges.create({
      amount: req.body.totalAmount, // amount in cents, again
      currency: "usd",
      customer: customer.id
    });
  }).then(function(charge) {
    // TODO: Save the customer ID and other info in a database for later!
    console.log('CHARGE: ', charge);
    res.send('Success!')
  }).catch(function(err) {
    console.error(err);
    res.status(500).json(err);
  });
};

payment.transact = function (req, res) {
  stripe.charges.create({
    amount: 10,
    currency: "usd",
    source: "tok_176wZ4CC0IkzEjtusWqn9gXJ", // obtained with Stripe.js
    description: "Charge for test@example.com"
  }, function(err, charge) {
    console.log(err, charge);
  });
};


// CUSTOMER:  { id: 'cus_7LewmgKdpM7nqC',
//   object: 'customer',
//   account_balance: 0,
//   created: 1447482862,
//   currency: null,
//   default_source: 'card_176xcACC0IkzEjtuSBovnoDP',
//   delinquent: false,
//   description: '1 shirt',
//   discount: null,
//   email: 'yofala@gmail.com',
//   livemode: false,
//   metadata: {},
//   shipping: null,
//   sources:
//    { object: 'list',
//      data: [ [Object] ],
//      has_more: false,
//      total_count: 1,
//      url: '/v1/customers/cus_7LewmgKdpM7nqC/sources' },
//   subscriptions:
//    { object: 'list',
//      data: [],
//      has_more: false,
//      total_count: 0,
//      url: '/v1/customers/cus_7LewmgKdpM7nqC/subscriptions' } }
// CHARGE:  { id: 'ch_176xcCCC0IkzEjtuVGBw5tCg',
//   object: 'charge',
//   amount: 100,
//   amount_refunded: 0,
//   application_fee: null,
//   balance_transaction: 'txn_176xcCCC0IkzEjtuejOmVkaz',
//   captured: true,
//   created: 1447482864,
//   currency: 'usd',
//   customer: 'cus_7LewmgKdpM7nqC',
//   description: null,
//   destination: null,
//   dispute: null,
//   failure_code: null,
//   failure_message: null,
//   fraud_details: {},
//   invoice: null,
//   livemode: false,
//   metadata: {},
//   paid: true,
//   receipt_email: null,
//   receipt_number: null,
//   refunded: false,
//   refunds:
//    { object: 'list',
//      data: [],
//      has_more: false,
//      total_count: 0,
//      url: '/v1/charges/ch_176xcCCC0IkzEjtuVGBw5tCg/refunds' },
//   shipping: null,
//   source:
//    { id: 'card_176xcACC0IkzEjtuSBovnoDP',
//      object: 'card',
//      address_city: null,
//      address_country: null,
//      address_line1: null,
//      address_line1_check: null,
//      address_line2: null,
//      address_state: null,
//      address_zip: null,
//      address_zip_check: null,
//      brand: 'Visa',
//      country: 'US',
//      customer: 'cus_7LewmgKdpM7nqC',
//      cvc_check: 'pass',
//      dynamic_last4: null,
//      exp_month: 12,
//      exp_year: 2016,
//      fingerprint: 'ZIsK0eYpEfW3sRLX',
//      funding: 'credit',
//      last4: '4242',
//      metadata: {},
//      name: null,
//      tokenization_method: null },
//   statement_descriptor: null,
//   status: 'succeeded' }
