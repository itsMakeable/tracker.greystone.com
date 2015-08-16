let EventFactory = function(DS) {

	let eventResource = DS.defineResource({
		name: 'event',
		idAttribute: 'event_id',
		endpoint: '/api/events',
	});

	return eventResource;

};

export default EventFactory;
