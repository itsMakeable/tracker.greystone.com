module.exports = function(bookshelf, knex) {

	var Task = require('./task')(bookshelf);
	var User = require('./user')(bookshelf);

	if (bookshelf.model('TaskCompleteNotification')) {
		return bookshelf.model('TaskCompleteNotification');
	} else {
		var TaskCompleteNotification = bookshelf.Model.extend({
			tableName: 'task_complete_notification',
			idAttribute: 'task_complete_notification_id',
			user: function() {
				return this.belongsTo(User, ['user_id']);
			},
			task: function() {
				return this.belongsTo(Task, ['task_id']);
			}
		});

		return bookshelf.model('TaskCompleteNotification', TaskCompleteNotification);
	}

};
