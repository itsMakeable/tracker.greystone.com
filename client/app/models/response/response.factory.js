let ResponseFactory = function(DS) {

	let responseResource = DS.defineResource({
		name: 'response',
		idAttribute: 'response_id',
		endpoint: '/api/responses',
	});

	return responseResource;

};

export default ResponseFactory;
