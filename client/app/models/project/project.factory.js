// jshint unused: false
let ProjectFactory = function(DS, Milestone) {

	let projectResource = DS.defineResource({
		name: 'project',
		idAttribute: 'project_id',
		endpoint: '/api/projects',
		relations: {
			hasMany: {
				milestone: {
					localField: 'milestones',
					foreignKey: 'project_id'
				}
			}
		}
	});

	return projectResource;

};

export default ProjectFactory;
