var Sequelize = require('sequelize')
  , sequelize = new Sequelize(process.env.DATABASE_URL)
  , Account = require('../models/account')
  , acct = new Account(Sequelize);

exports.create = function(req, res) {
  var account = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  };

  acct
    .sync({ force: true })
    .complete(function(err) {
      acct
        .create(account)
        .complete(function(err, account) {
          if(!!err || !account) {
            console.log('An error occurred while creating account.');
            console.log(err);
            res.status(500).end();
          } else {
            console.log('Account ' + account.id + ' successfully created.');
            res.send(account);
          }
        });
    });
};

exports.getById = function(req, res) {
  acct
    .find({ where: { id: req.params.accountId } })
    .complete(function(err, account) {
      if(!!err) {
        console.log('An error occurred while searching for account ' + req.params.accountId);
        res.status(500).end();
      } else if(!account) {
        console.log('No account found for id ' + req.params.accountId);
        res.status(404).end();
      } else {
        console.log('Account located for id ' + req.params.accountId);
        res.send(account);
      }
    });
};
