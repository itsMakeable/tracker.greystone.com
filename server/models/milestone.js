module.exports = function(bookshelf) {

	if (bookshelf.model('Milestone')) {
		return bookshelf.model('Milestone');
	} else {
		var Milestone = bookshelf.Model.extend({
			tableName: 'milestones',
			idAttribute: 'milestone_id',
		});

		return bookshelf.model('Milestone', Milestone);
	}

};
