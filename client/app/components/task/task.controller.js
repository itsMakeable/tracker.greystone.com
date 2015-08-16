class TaskController {
	constructor(Project, $state, task, Task, $scope, Upload, File, User) {
		this.Upload = Upload;
		this.$state = $state;
		this.Project = Project;
		this.Task = Task;
		this.File = File;
		this.User = User;

		this.project = Project.filter({})[0];
		this.task = task;
		this.showDropdow = false;
		console.log(this.task);
		this.bindWatchers($scope);
	}
	clearUser() {
		if (this.task.user_id) {
			this.Task.update(Number(this.task.task_id), {
					user_id: null
				})
				.then(task => {
					console.log(task);
				})
				.catch(error => {
					console.log(error);
				});
		}
	}
	assignUser(user) {
		if (this.task.user_id != user.user_id) {
			this.Task.update(Number(this.task.task_id), {
					user_id: user.user_id
				})
				.then(task => {
					console.log(task);
				})
				.catch(error => {
					console.log(error);
				});
		}

	}
	bindWatchers($scope) {
		$scope.$watch(() => this.User.lastModified(), () => {
			this.users = this.User.filter();
		});
	}
}


export default TaskController;
