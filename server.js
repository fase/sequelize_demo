var express = require('express')
	, app = express()
	, path = require('path')
	, bodyParser = require('body-parser');

process.env.DATABASE_URL = process.env.DATABASE_URL || "postgres://username:password@localhost:5432/pi";

process.env.PORT = process.env.PORT || 8080;

app.use(bodyParser.json()); // for parsing application/json

var account = require('./app/controllers/account');
app.get('/accounts/:accountId', account.getById);
app.post('/accounts', account.create);

app.use(express.static(path.resolve('./public')));

app.listen(process.env.PORT, function() {
	console.log('Server listening on port %s', process.env.PORT);
});
