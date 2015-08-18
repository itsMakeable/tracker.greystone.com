module.exports = function(bookshelf) {

	var Promise = require('bluebird');
	var bcrypt = require('bcrypt');

	if (bookshelf.model('User')) {
		return bookshelf.model('User');
	} else {
		var User = bookshelf.Model.extend({
			tableName: 'users',
			idAttribute: 'user_id',
			hidden: ['password']
		}, {
			login: Promise.method(function(email, password) {
				if (!email || !password) throw new Error('Email and password are both required');
				return new this({
						email: email.toLowerCase().trim()
					})
					.fetch({
						require: true
					})
					.tap(function(user) {
						var salt = bcrypt.genSaltSync(10);
						var passwordHash = bcrypt.hashSync(password, salt);
						var result = bcrypt.compareSync(password, user.get('password'));
						if (result) {
							return result;
						} else {
							return Promise.reject(new TypeError("password is not valid"));
						}
					});
			})
		});

		return bookshelf.model('User', User);
	}


};
