module.exports = function(bookshelf) {

	if (bookshelf.model('User')) {
		return bookshelf.model('User');
	} else {
		var User = bookshelf.Model.extend({
			tableName: 'users',
			idAttribute: 'user_id',
		});

		return bookshelf.model('User', User);
	}


};
