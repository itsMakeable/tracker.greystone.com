class TaskRowController {
	constructor($state) {
		this.$state = $state;
	}
	selectTask() {
		this.$state.go('property.task', {
			taskId: this.task.task_id
		});
	}
}


export default TaskRowController;
