class ProjectViewController {
	constructor(Project, milestoneId, Milestone, Task, $state, $modal) {
		this.Task = Task;
		this.$modal = $modal;
		this.$state = $state;
		this.Project = Project;
		this.project = Project.filter()[0];
		this.milestone = Milestone.get(milestoneId);
	}
	goToTask(task) {
		console.log(task);
		this.Task.inject(task);
		this.$state.go('taskView', {
			taskId: task.task_id
		});
	}
}


export default ProjectViewController;
