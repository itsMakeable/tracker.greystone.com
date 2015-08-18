class TaskRowController {
	constructor($state, Event, $scope, User, TaskRecentlyComplete, $rootScope) {
		this.$state = $state;
		this.newEvents = 0;
		this.Event = Event;
		this.User = User;
		this.TaskRecentlyComplete = TaskRecentlyComplete;
		this.$rootScope = $rootScope;

		$scope.$watch(() => Event.lastModified(), () => {
			this.checkEvents();
		});

		$scope.$on('CHECK_EVENTS', () => {
			this.checkEvents();
		});
	}
	dismissTask($event) {
		$event.stopPropagation();
		this.TaskRecentlyComplete.destroy(this.task.task_complete_notification_id)
			.then((result) => {
				console.log(result);
				this.$rootScope.$broadcast('NOTIFICATION_DISMISSED', {
					task_complete_notification_id: this.task.task_complete_notification_id
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}
	checkEvents() {
		console.log('CHECK_EVENTS');
		this.Event.findAll({
				task_id: this.task.task_id,
				created_at: 'true'
			}, {
				bypassCache: true,
				cacheResponse: false,
			})
			.then(events => {
				console.log('EVENTS For TASK: ' + this.task.task_id);
				console.log(events.length);
				console.log(this.$state);
				if (this.$state.params.taskId == this.task.task_id) {
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
		console.log('Select Task');
		console.log($state.params.taskId);
		this.User.viewTask($state.params.taskId);
		this.$state.go('property.task', {
			taskId: this.task.task_id
		});
	}
}


export default TaskRowController;
