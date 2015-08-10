module.exports = function(bookshelf) {

	var Milestone = require('./milestone')(bookshelf);

	if (bookshelf.model('Project')) {
		return bookshelf.model('Project');
	} else {
		var Project = bookshelf.Model.extend({
			tableName: 'projects',
			idAttribute: 'project_id',
			milestones: function() {
				return this.hasMany(Milestone, ['project_id']);
			}
		});

		return bookshelf.model('Project', Project);
	}
};
