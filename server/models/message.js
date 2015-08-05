module.exports = function(bookshelf) {

	if (bookshelf.model('Message')) {
		return bookshelf.model('Message');
	} else {
		var Message = bookshelf.Model.extend({
			tableName: 'messages',
			idAttribute: 'message_id',
		});

		return bookshelf.model('Message', Message);
	}

};
