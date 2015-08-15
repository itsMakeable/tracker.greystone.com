module.exports = function(bookshelf) {

	var User = require('./user')(bookshelf);

	if (bookshelf.model('File')) {
		return bookshelf.model('File');
	} else {
		var File = bookshelf.Model.extend({
			tableName: 'files',
			idAttribute: 'file_id',
			user: function() {
				return this.belongsTo(User, ['user_id']);
			}
		});

		return bookshelf.model('File', File);
	}
};
