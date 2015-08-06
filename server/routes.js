module.exports = function(app) {

	require('./routes/field.js')(app);
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
