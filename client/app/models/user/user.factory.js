let UserFactory = function(DS) {

	let userResource = DS.defineResource({
		name: 'user',
		idAttribute: 'user_id',
		endpoint: '/users',
	});

	return userResource;

};

export default UserFactory;
