module.exports = function(bookshelf) {

	var Promise = require('bluebird');
	var bcrypt = require('bcrypt');

	if (bookshelf.model('User')) {
		return bookshelf.model('User');
	} else {
		var User = bookshelf.Model.extend({
			tableName: 'users',
			idAttribute: 'user_id',
		}, {
			login: Promise.method(function(email, password) {
				if (!email || !password) throw new Error('Email and password are both required');
				return new this({
					email: email.toLowerCase().trim()
				}).fetch({
					require: true
				}).tap(function(user) {
					return bcrypt.compareSync(password, user.get('password'));
				});
			})
		});

		return bookshelf.model('User', User);
	}


};
