class TaskController {
	constructor(Project, $state, task, Task, $scope, Upload, File, User, $rootScope) {
		this.Upload = Upload;
		this.$state = $state;
		this.Project = Project;
		this.Task = Task;
		this.File = File;
		this.User = User;
		this.$rootScope = $rootScope;

		console.warn(task);

		this.project = Project.filter({})[0];
		this.task = task;
		this.showDropdow = false;
		console.log(this.task);
		this.bindWatchers($scope);

		$scope.$watch(() => Task.lastModified(), () => {
			User.viewTask($state.params.taskId);
		});

		$rootScope.$broadcast('UPDATE_HEIGHT');
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
					this.$rootScope.$broadcast('TASK_ASSIGN', {
						task: task
					});
					console.log(task);
				})
				.catch(error => {
					console.log(error);
				});
		}
	}
	toggleCompletition() {
		// show modal for confirmation
		console.log(this.task);
		this.Task.update(Number(this.task.task_id), {
				is_complete: !this.task.is_complete
			})
			.then(task => {
				this.$rootScope.$broadcast('TASK_COMPLETE', {
					task: task
				});
				console.log(task);
			})
			.catch(error => {
				console.log(error);
			});
	}
	bindWatchers($scope) {
		$scope.$watch(() => this.User.lastModified(), () => {
			this.users = this.User.filter();
		});
	}
}


export default TaskController;
