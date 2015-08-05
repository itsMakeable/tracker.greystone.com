let ProjectFactory = function(DS) {

	let projectResource = DS.defineResource({
		name: 'project',
		idAttribute: 'project_id',
		endpoint: '/projects',
	});

	return projectResource;

};

export default ProjectFactory;
