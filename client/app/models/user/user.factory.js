let UserFactory = function(DS, $http, LocalStorage, $q) {

	let userResource = DS.defineResource({
		name: 'user',
		idAttribute: 'user_id',
		endpoint: '/api/users',
	});

	let currentUser = null;

	userResource.signup = function(user) {
		return $http.post(DS.defaults.basePath + '/auth/signup', user)
			.then(response => {
				console.log(response);
				LocalStorage.set('auth_token', response.data.token);
				currentUser = response.data.user;
				return response.data;
			})
			.catch(response => {
				console.log(response);
				return $q.reject(response.data);
			});
	};

	userResource.signin = function(email, password) {
		return $http.post(DS.defaults.basePath + '/auth/signin', {
				email,
				password,
			})
			.then(response => {
				console.log(response);
				LocalStorage.set('auth_token', response.data.token);
				currentUser = response.data.user;
				return response.data;
			})
			.catch(response => {
				console.log(response);
				return $q.reject(response.data);
			});
	};

	userResource.checkLogin = function() {
		return $http.post(DS.defaults.basePath + '/auth/verify_token', {
				token: LocalStorage.get('auth_token'),
			})
			.then(response => {
				console.log(response);
				if (!response.data.success) {
					return $q.reject(response.data.message);
				} else {
					console.log('is logged in');
					return response.data.decoded.user_id;
				}

			})
			.catch(response => {
				console.log(response);
				console.log('is NOT logged in');
				return $q.reject(response);
			});
	};

	userResource.getCurrentUser = () => currentUser;

	return userResource;

};

export default UserFactory;
