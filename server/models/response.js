module.exports = function(bookshelf) {

	if (bookshelf.model('Response')) {
		return bookshelf.model('Response');
	} else {
		var Response = bookshelf.Model.extend({
			tableName: 'responses',
			idAttribute: 'response_id',
		});

		return bookshelf.model('Response', Response);
	}
};
