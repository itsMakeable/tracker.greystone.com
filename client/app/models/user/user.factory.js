let UserFactory = function(DS, $http, LocalStorage, $q, $rootScope) {

	let userResource = DS.defineResource({
		name: 'user',
		idAttribute: 'user_id',
		endpoint: '/api/users',
	});

	let currentUser = LocalStorage.getObject('user');
	if (currentUser && currentUser.user_id) {
		userResource.inject(currentUser);
	}

	userResource.setCurrentUser = function(user) {
		LocalStorage.setObject('user', user);
		currentUser = user;
		this.inject(user);
	};

	userResource.logout = function() {
		LocalStorage.removeItem('auth_token');
		LocalStorage.removeItem('user');
		currentUser = null;
	};

	userResource.signup = function(user) {
		return $http.post(DS.defaults.basePath + '/auth/signup', user)
			.then(response => {
				LocalStorage.set('auth_token', response.data.token);
				this.setCurrentUser(response.data.user);
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
				LocalStorage.set('auth_token', response.data.token);
				this.setCurrentUser(response.data.user);
				return response.data;
			})
			.catch(response => {
				return $q.reject(response.data);
			});
	};

	userResource.checkLogin = function() {
		return $http.post(DS.defaults.basePath + '/auth/verify_token', {
				token: LocalStorage.get('auth_token'),
			})
			.then(response => {
				if (!response.data.success) {
					return $q.reject(response.data.message);
				} else {
					return response.data.decoded.user_id;
				}

			})
			.catch(response => {
				return $q.reject(response);
			});
	};

	userResource.getCurrentUser = function() {
		return this.get(currentUser.user_id);
	};

	userResource.resetPassword = function(user_id, password) {
		return $http.post(DS.defaults.basePath + '/auth/reset_password', {
				user_id: user_id,
				password: password
			})
			.then(response => {
				return response.data;
			})
			.catch(response => {
				return $q.reject(response);
			});
	};

	userResource.viewTask = function(task_id) {
		return $http.post(DS.defaults.basePath + '/api/users/view_task', {
				task_id: task_id,
			})
			.then(response => {
				$rootScope.$broadcast('CHECK_EVENTS');
				return response.data;
			})
			.catch(response => {
				return $q.reject(response);
			});
	};

	return userResource;

};

export default UserFactory;
