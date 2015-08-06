let UserFactory = function(DS, $http, LocalStorage) {

	let userResource = DS.defineResource({
		name: 'user',
		idAttribute: 'user_id',
		endpoint: '/api/users',
	});

	userResource.signup = function(user) {
		return $http.post(DS.defaults.basePath + '/auth/signup', {
				email: 'leandro.zubrezki@gmail.com',
				password: '1234'
			})
			.then(response => {
				console.log(response);
			})
			.catch(response => {
				console.log(response);
			});
	};

	userResource.signin = function(email, password) {
		return $http.post(DS.defaults.basePath + '/auth/signin', {
				email: 'leandro.zubrezki@gmail.com',
				password: '1234'
			})
			.then(response => {
				console.log(response);
				LocalStorage.set('auth_token', response.data.token);
			})
			.catch(response => {
				console.log(response);
			});
	};

	return userResource;

};

export default UserFactory;
