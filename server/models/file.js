module.exports = function(bookshelf) {

	if (bookshelf.model('File')) {
		return bookshelf.model('File');
	} else {
		var File = bookshelf.Model.extend({
			tableName: 'files',
			idAttribute: 'file_id',
		});

		return bookshelf.model('File', File);
	}
};
