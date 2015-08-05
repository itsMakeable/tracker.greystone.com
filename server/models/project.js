module.exports = function(bookshelf) {

	if (bookshelf.model('Project')) {
		return bookshelf.model('Project');
	} else {
		var Project = bookshelf.Model.extend({
			tableName: 'projects',
			idAttribute: 'project_id',
		});

		return bookshelf.model('Project', Project);
	}


};
