class SideBarController {
	constructor($scope, $state, File, Project, Milestone, Task, User, socket, TaskRecentlyComplete, $rootScope, $timeout) {
		this.$state = $state;
		this.$rootScope = $rootScope;
		this.$timeout = $timeout;
		this.File = File;
		this.Project = Project;
		this.Milestone = Milestone;
		this.TaskRecentlyComplete = TaskRecentlyComplete;
		this.Task = Task;
		this.User = User;
		this.socket = socket;

		this.tasksRecentlyCompleted = [];
		this.assignedToMeLimit = 7;
		this.activeLimit = 7;
		this.completedLimit = 7;

		this.milestone = Milestone.get(this.project.milestones[0].milestone_id);
		this.currentMilestoneIndex = 0;

		this.filterTasks();
		this.bindWatchers($scope);
		this.bindEvents($scope);

		// Right now all of them, then by project.
		TaskRecentlyComplete.findAll({})
			.catch(error => {
				console.log('error notifications');
				console.log(error);
			});

		if (!this.fromLogin) {
			User.viewTask(this.milestone.tasks[0].task_id)
				.then(() => {
					$state.go('property.task', {
						taskId: this.milestone.tasks[0].task_id,
						fromLogin: this.fromLogin
					});
				});

		} else {
			$state.go('property.task', {
				taskId: null,
				fromLogin: this.fromLogin
			});
		}
	}
	taskNotification(data) {
		console.log('Task Notification');
		if (data.data.to_user_id === this.User.getCurrentUser().user_id) {
			var toDismiss = this.TaskRecentlyComplete.filter({
				where: {
					task_id: data.data.task_id
				}
			});
			console.log(toDismiss);
			if (toDismiss && toDismiss[0]) {
				this.TaskRecentlyComplete.eject(toDismiss[0].task_complete_notification_id);
			}
			this.TaskRecentlyComplete.inject(data.data);
		}
	}
	bindWatchers($scope) {
		this.socket.on('TASK_NOTIFICATION', this.taskNotification.bind(this));

		$scope.$watch(() => this.Task.lastModified(), () => {
			this.filterTasks();
		});

		$scope.$watch(() => this.TaskRecentlyComplete.lastModified(), () => {
			this.tasksRecentlyCompleted = this.TaskRecentlyComplete.filter({
				where: {
					'task.milestone_id': this.milestone.milestone_id
				}
			});
			this.filterTasks();
		});
	}
	bindEvents($scope) {
		$scope.$on('$destroy', () => {
			this.socket.removeListener('TASK_NOTIFICATION', this.taskNotification.bind(this));
		});

		$scope.$on('NOTIFICATION_DISMISSED', (event, data) => {
			this.TaskRecentlyComplete.eject(data.task_complete_notification_id);
		});

		$scope.$on('TASK_COMPLETE', (event, data) => {
			if (!data.task.is_complete) {
				var index = null;
				var currentNotification;
				angular.forEach(this.tasksRecentlyCompleted, (notification, key) => {
					if (notification.task_id === data.task.task_id) {
						index = key;
						currentNotification = notification;
					}
				});
				this.TaskRecentlyComplete.eject(currentNotification.task_complete_notification_id);
				this.tasksRecentlyCompleted.splice(index, 1);
				this.filterTasks();
			}
		});
	}
	selectMilestone(milestoneId) {
		this.assignedToMeLimit = 7;
		this.activeLimit = 7;
		this.completedLimit = 7;
		var task_id;
		this.milestone = this.Milestone.get(Number(milestoneId));
		this.filterTasks();
		this.tasksRecentlyCompleted = this.TaskRecentlyComplete.filter({
			where: {
				'task.milestone_id': this.milestone.milestone_id
			}
		});
		if (this.tasksAssignedToMe[0]) {
			task_id = this.tasksAssignedToMe[0].task_id;
		} else if (this.activeTasks[0]) {
			task_id = this.activeTasks[0].task_id;
		} else {
			task_id = this.completedTasks[0].task_id;
		}
		this.$state.go('property.task', {
			taskId: task_id
		});
		this.filterTasks();
	}
	selectTask(task_id) {
		this.$state.go('property.task', {
			taskId: task_id
		});
		this.filterTasks();
	}
	dismissAll() {
		angular.forEach(this.tasksRecentlyCompleted, notification => {
			this.TaskRecentlyComplete.destroy(notification.task_complete_notification_id);
		});
		this.tasksRecentlyCompleted = [];
		this.filterTasks();
	}
	filterTasks() {
		var task_ids = this.tasksRecentlyCompleted.map(e => e.task_id);
		this.tasksAssignedToMe = this.Task.filter({
			where: {
				milestone_id: {
					'==': this.milestone.milestone_id
				},
				user_id: {
					'==': this.User.getCurrentUser().user_id
				},
				is_complete: {
					'!=': true
				},
				task_id: {
					notIn: task_ids
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
					'!=': true
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
				},
				task_id: {
					notIn: task_ids
				}
			}
		});
		this.$timeout(() => {
			this.$rootScope.$broadcast('UPDATE_HEIGHT');
		}, 500);
	}
	logout() {
		this.User.logout();
		this.$state.go('login');
	}
}


export default SideBarController;
