module.exports = function(app) {

	var multer = require('multer');
	var path = require('path');

	var storage = multer.diskStorage({
		destination: function(req, file, cb) {
			cb(null, 'uploads/');
		},
		filename: function(req, file, cb) {
			console.log('File');
			var fileInformation = path.parse(file.originalname);
			cb(null, fileInformation.name + '-' + new Date().getTime() + fileInformation.ext);
		}
	});

	var upload = multer({
		storage: storage
	});

	app.post('/api/upload', upload.array('file', 3), function(req, res, next) {
		res.json(req.files);
	});

	require('./routes/field.js')(app);
	require('./routes/file.js')(app);
	require('./routes/message.js')(app);
	require('./routes/milestone.js')(app);
	require('./routes/project.js')(app);
	require('./routes/response.js')(app);
	require('./routes/task.js')(app);
	require('./routes/user.js')(app);
	require('./routes/auth.js')(app);

	// For Angular
	app.get('*', function(req, res) {
		res.sendfile('./client/index.html');
	});

};
