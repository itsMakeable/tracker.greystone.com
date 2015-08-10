module.exports = function(bookshelf) {

	var Task = require('./task')(bookshelf);

	if (bookshelf.model('Milestone')) {
		return bookshelf.model('Milestone');
	} else {
		var Milestone = bookshelf.Model.extend({
			tableName: 'milestones',
			idAttribute: 'milestone_id',
			tasks: function() {
				return this.hasMany(Task, ['milestone_id']);
			}
		});

		return bookshelf.model('Milestone', Milestone);
	}

};
