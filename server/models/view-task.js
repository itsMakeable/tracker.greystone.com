module.exports = function(bookshelf, knex) {

	var Task = require('./task')(bookshelf);
	var User = require('./user')(bookshelf);

	if (bookshelf.model('ViewTask')) {
		return bookshelf.model('ViewTask');
	} else {
		var ViewTask = bookshelf.Model.extend({
			tableName: 'user_view_task',
			idAttribute: 'user_view_task_id',
			user: function() {
				return this.belongsTo(User, ['user_id']);
			},
			task: function() {
				return this.belongsTo(Task, ['task_id']);
			}
		});

		return bookshelf.model('ViewTask', ViewTask);
	}

};
