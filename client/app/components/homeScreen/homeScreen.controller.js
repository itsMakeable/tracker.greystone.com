class HomeScreenController {
	constructor(LocalStorage, $state, User, project, Milestone) {
		this.LocalStorage = LocalStorage;
		this.Milestone = Milestone;
		this.$state = $state;
		this.User = User;
		this.project = project;
		console.warn(project);
	}
	logout() {
		this.LocalStorage.removeItem('auth_token');
		this.$state.go('login');
	}
	goToMilestone(milestone) {
		console.log(milestone);
		this.Milestone.inject(milestone);
		this.$state.go('projectView', {
			milestoneId: milestone.milestone_id
		});
	}
}


export default HomeScreenController;
