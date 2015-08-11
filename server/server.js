var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 8080;
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');

var SECRET = 'shhhhhhared-secret';

var knex = require('knex')({
	client: 'mysql',
	connection: {
		host: 'dev.shifteight.com',
		user: 'root',
		password: 'shift',
		database: 'tracker_greystone_com'
	}
});
var bookshelf = require('bookshelf')(knex);

bookshelf.plugin('registry');
bookshelf.plugin('virtuals');
bookshelf.plugin('visibility');
app.set('bookshelf', bookshelf);

app.set('SECRET', SECRET);
app.use('/api', expressJwt({
	secret: SECRET
}));
app.use(function(req, res, next) {
	req.io = io;
	next();
});
app.use(express.static(__dirname + '/../client', {
	etag: false
}));
app.use('/uploads', express.static(__dirname + '/../uploads'));
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
	'extended': 'true'
}));
app.use(bodyParser.json());
app.use(bodyParser.json({
	type: 'application/vnd.api+json'
}));
app.use(methodOverride());

require('./routes.js')(app);

io.on('connection', function(socket) {
	console.log('connection');
});

server.listen(port);
console.log("App listening on port " + port);
