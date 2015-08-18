class SideBarController {
	constructor($scope, $state, File, Project, Milestone, Task, User, socket, TaskRecentlyComplete) {
		this.$state = $state;
		this.File = File;
		this.Project = Project;
		this.Milestone = Milestone;
		this.TaskRecentlyComplete = TaskRecentlyComplete;
		this.Task = Task;
		this.User = User;
		var _this = this;
		Milestone.inject(this.project.milestones);

		this.assignedToMeLimit = 7;
		this.activeLimit = 7;
		this.completedLimit = 7;

		angular.forEach(this.project.milestones, milestone => {
			Task.inject(milestone.tasks);
		});

		this.milestone = Milestone.get(this.project.milestones[0].milestone_id);
		this.currentMilestoneIndex = 0;

		this.filterTasks();
		this.bindWatchers($scope);

		// Right now all of them, then by project.
		TaskRecentlyComplete.findAll({})
			.then(notifications => {
				console.log('notifications');
				console.log(notifications);
				angular.forEach(notifications, notification => {
					notification.task.by = notification.user;
					notification.task.task_complete_notification_id = notification.task_complete_notification_id;
				});
				this.tasksRecentlyCompleted = notifications;
			})
			.catch(error => {
				console.log('error notifications');
				console.log(error);
			});


		socket.on('TASK_NOTIFICATION', taskNotification);

		function taskNotification(data) {
			console.log('TASK_NOTIFICATION');
			console.log(data.data);
			data.data.task.by = data.data.user;
			data.data.task.task_complete_notification_id = data.data.task_complete_notification_id;
			_this.tasksRecentlyCompleted.push(data.data);
		}

		$scope.$on('NOTIFICATION_DISMISSED', (event, data) => {
			var index = this.tasksRecentlyCompleted.map(e => e.task_complete_notification_id).indexOf(data.task_complete_notification_id);
			console.log(index);
			this.tasksRecentlyCompleted.splice(index, 1);
		});


		$scope.$on('$destroy', () => {
			socket.removeListener('TASK_NOTIFICATION', taskNotification);
		});

		$state.go('property.task', {
			taskId: this.milestone.tasks[0].task_id
		});
	}
	bindWatchers($scope) {
		$scope.$watch(() => this.Task.lastModified(), () => {
			this.filterTasks();
		});
	}
	changeMilestone() {
		var task_id;
		if (this.currentMilestoneIndex < this.project.milestones.length - 1) {
			this.currentMilestoneIndex++;
		} else {
			this.currentMilestoneIndex = 0;
		}
		this.milestone = this.project.milestones[this.currentMilestoneIndex];
		this.filterTasks();
		if (this.tasksAssignedToMe[0]) {
			task_id = this.tasksAssignedToMe[0].task_id;
		} else {
			task_id = this.activeTasks[0].task_id;
		}
		this.$state.go('property.task', {
			taskId: task_id
		});
	}
	selectTask(task) {
		this.$state.go('property.task', {
			taskId: task.task_id
		});
	}
	dismissAll() {
		console.log('dismissAll');
		angular.forEach(this.tasksRecentlyCompleted, notification => {
			this.TaskRecentlyComplete.destroy(notification.task_complete_notification_id);
		});
		this.tasksRecentlyCompleted = [];
	}
	filterTasks() {
		console.warn('filter tasks');
		this.tasksAssignedToMe = this.Task.filter({
			where: {
				milestone_id: {
					'==': this.milestone.milestone_id
				},
				user_id: {
					'==': this.User.getCurrentUser().user_id
				}
			}
		});
		this.activeTasks = this.Task.filter({
			where: {
				milestone_id: {
					'==': this.milestone.milestone_id
				},
				user_id: {
					'!=': this.User.getCurrentUser().user_id
				},
				is_complete: {
					'==': false
				}
			}
		});
		this.completedTasks = this.Task.filter({
			where: {
				milestone_id: {
					'==': this.milestone.milestone_id
				},
				is_complete: {
					'==': true
				}
			}
		});
	}
	logout() {
		this.User.logout();
		this.$state.go('login');
	}
	changeProject() {
		console.log('changeProject');
	}
	editProfile() {
		console.log('editProfile');
	}
}


export default SideBarController;
