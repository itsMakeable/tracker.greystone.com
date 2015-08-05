let MilestoneFactory = function(DS) {

	let milestoneResource = DS.defineResource({
		name: 'milestone',
		idAttribute: 'milestone_id',
		endpoint: '/milestones',
	});

	return milestoneResource;

};

export default MilestoneFactory;
