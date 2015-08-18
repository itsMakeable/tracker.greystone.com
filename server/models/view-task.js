module.exports = function(bookshelf, knex) {

	if (bookshelf.model('ViewTask')) {
		return bookshelf.model('ViewTask');
	} else {
		var ViewTask = bookshelf.Model.extend({
			tableName: 'user_view_task',
			idAttribute: 'user_view_task_id'
		});

		return bookshelf.model('ViewTask', ViewTask);
	}

};
