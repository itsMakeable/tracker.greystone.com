class PropertyController {
	constructor(Project, $state, project, Milestone, File) {
		this.$state = $state;
		this.File = File;
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
	updateFile() {
		this.File.update(3, {
				name: 'leandro.jpg'
			})
			.then(file => {
				console.log(file);
			})
			.catch(error => {
				console.log(error);
			});
	}
}


export default PropertyController;
