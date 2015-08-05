let MessageFactory = function(DS) {

	let messageResource = DS.defineResource({
		name: 'message',
		idAttribute: 'message_id',
		endpoint: '/messages',
	});

	return messageResource;

};

export default MessageFactory;
