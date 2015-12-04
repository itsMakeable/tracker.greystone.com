class MilestoneController {
	constructor(milestone, Project, $state, Task) {
		this.Task = Task;
		this.milestone = milestone;
		this.$state = $state;
		this.project = Project.filter({})[0];
	}
	goToTask(task) {
		this.$state.go('task', {
			taskId: task.task_id
		});
	}
}


export default MilestoneController;
