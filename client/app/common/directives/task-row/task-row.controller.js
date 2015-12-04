class TaskRowController {
	constructor($state, Event, $scope, User, TaskRecentlyComplete, $rootScope) {
		this.$state = $state;
		this.newEvents = 0;
		this.Event = Event;
		this.User = User;
		this.TaskRecentlyComplete = TaskRecentlyComplete;
		this.$rootScope = $rootScope;
		this.checkEvents();
		this.bindEvents($scope);
	}
	dismissTask($event) {
		$event.stopPropagation();
		this.TaskRecentlyComplete.destroy(this.task.task_complete_notification_id)
			.then(() => {
				this.$rootScope.$broadcast('NOTIFICATION_DISMISSED', {
					task_complete_notification_id: this.task.task_complete_notification_id
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}
	checkEvents() {
		// fire event from route state change to get events again.
		this.Event.findAll({
				task_id: this.task.task_id,
				created_at: 'true'
			}, {
				bypassCache: true
			})
			.then(events => {
				if (Number(this.$state.params.taskId) === this.task.task_id) {
					this.newEvents = 0;
				} else {
					this.newEvents = events.length;
				}
			})
			.catch(error => {
				console.log(error);
			});
	}
	selectTask() {
		this.User.viewTask(Number(this.$state.params.taskId))
			.then(() => {
				this.$state.go('property.task', {
					taskId: this.task.task_id
				});
			})
			.finally(() => {
				this.checkEvents();
			});

	}
	bindEvents($scope) {
		$scope.$on('CHECK_EVENTS', () => {
			this.checkEvents();
		});
	}
}


export default TaskRowController;
