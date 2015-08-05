var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 8080;
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mysql = require('mysql');

var connectionpool = mysql.createPool({
	host: 'dev.shifteight.com',
	user: 'root',
	password: 'shift',
	database: 'tracker_greystone_com'
});

app.use(function(req, res, next) {
	req.io = io;
	next();
});
app.use(function(req, res, next) {
	req.mysql = connectionpool;
	next();
});
app.use(express.static(__dirname + '/../client', {
	etag: false
}));
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
