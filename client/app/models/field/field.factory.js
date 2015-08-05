let FieldFactory = function(DS) {

	let fieldResource = DS.defineResource({
		name: 'field',
		idAttribute: 'field_id',
		endpoint: '/fields',
	});

	return fieldResource;

};

export default FieldFactory;
