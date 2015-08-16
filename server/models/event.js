module.exports = function(bookshelf) {

	var User = require('./user')(bookshelf);
	var File = require('./file')(bookshelf);

	if (bookshelf.model('Event')) {
		return bookshelf.model('Event');
	} else {
		var Event = bookshelf.Model.extend({
			tableName: 'events',
			idAttribute: 'event_id',
			user: function() {
				return this.belongsTo(User, ['user_id']);
			},
			assigned_user: function() {
				return this.belongsTo(User, ['task_owner_user_id']);
			},
			file: function() {
				return this.belongsTo(File, ['file_id']);
			},
		});

		return bookshelf.model('Event', Event);
	}

};
