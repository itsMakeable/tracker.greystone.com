// jshint unused: false
let MilestoneFactory = function(DS, Task) {

	let milestoneResource = DS.defineResource({
		name: 'milestone',
		idAttribute: 'milestone_id',
		endpoint: '/api/milestones',
		relations: {
			hasMany: {
				task: {
					localField: 'tasks',
					foreignKey: 'milestone_id'
				}
			}
		}
	});

	return milestoneResource;

};

export default MilestoneFactory;
