module.exports = function(app) {

	var multer = require('multer');
	var path = require('path');
	var Promise = require('bluebird');
	var bookshelf = app.get('bookshelf');
	var File = require('./models/file')(bookshelf);

	var storage = multer.diskStorage({
		destination: function(req, file, cb) {
			cb(null, 'uploads/');
		},
		filename: function(req, file, cb) {
			var fileInformation = path.parse(file.originalname);
			cb(null, fileInformation.name + '-' + new Date().getTime() + fileInformation.ext);
		}
	});

	var upload = multer({
		storage: storage
	});

	app.post('/api/upload', upload.array('file', 3), function(req, res, next) {
		console.log('/api/upload');
		// check field_id present.
		// check if field is single or multiple to update 
		// is_active
		var filesPromises = [];
		req.files.forEach(function(file) {
			var newFile = new File({
				name: file.originalname,
				user_id: req.user.user_id,
				field_id: Number(req.body.field_id),
				is_active: true,
				path: file.path
			});
			filesPromises.push(newFile.save());
		});
		Promise.all(filesPromises)
			.then(function(files) {
				res.json(files);
			})
			.catch(function(error) {
				res.json(503, {
					result: 'error',
					error: error.code
				});
			});
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
