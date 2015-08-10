let FileFactory = function(DS) {

	let fileResource = DS.defineResource({
		name: 'file',
		idAttribute: 'file_id',
		endpoint: '/api/files',
	});

	return fileResource;

};

export default FileFactory;
