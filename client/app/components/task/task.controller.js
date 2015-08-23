class TaskController {
	constructor(Project, $state, task, Task, $scope, Upload, File, User, $rootScope) {
		this.Upload = Upload;
		this.$state = $state;
		this.Project = Project;
		this.Task = Task;
		this.File = File;
		this.User = User;
		this.$rootScope = $rootScope;
		this.project = Project.filter({})[0];
		if (task) {
			this.task = Task.get(task.task_id);
		}
		this.showDropdow = false;
		this.bindWatchers($scope);

		$rootScope.$broadcast('UPDATE_HEIGHT');
	}
	clearUser() {
		if (this.task.user_id) {
			this.Task.update(Number(this.task.task_id), {
				user_id: null
			});
		}
	}
	assignUser(user) {
		if (this.task.user_id !== user.user_id) {
			this.Task.update(Number(this.task.task_id), {
					user_id: user.user_id
				})
				.then(task => {
					this.$rootScope.$broadcast('TASK_ASSIGN', {
						task: task
					});
				})
				.catch(error => {
					console.log(error);
				});
		}
	}
	toggleCompletition() {
		this.Task.update(Number(this.task.task_id), {
				is_complete: !this.task.is_complete
			})
			.then(task => {
				this.$rootScope.$broadcast('TASK_COMPLETE', {
					task: task
				});
			})
			.catch(error => {
				console.log(error);
			});
	}
	bindWatchers($scope) {
		$scope.$watch(() => this.User.lastModified(), () => {
			this.users = this.User.filter();
		});

		$scope.$watch(() => this.Task.lastModified(), () => {
			this.User.viewTask(this.$state.params.taskId);
		});
	}
}


export default TaskController;
