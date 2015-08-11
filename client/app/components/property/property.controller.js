class PropertyController {
	constructor(Project, $state, project, Milestone) {
		this.$state = $state;
		this.Project = Project;
		this.project = project;
		this.Milestone = Milestone;
	}
	goToMilestone(milestone) {
		this.Milestone.inject(milestone);
		this.$state.go('milestone', {
			milestoneId: milestone.milestone_id
		});
	}
}


export default PropertyController;
