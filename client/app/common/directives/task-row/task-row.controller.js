class TaskRowController {
	constructor($state, Event, $scope, User, TaskRecentlyComplete, $rootScope, socket) {
		this.$state = $state;
		this.newEvents = 0;
		this.Event = Event;
		this.User = User;
		this.TaskRecentlyComplete = TaskRecentlyComplete;
		this.$rootScope = $rootScope;

		this.checkEvents();

		socket.on('NEW_EVENT', this.checkEvents.bind(this));
		$scope.$on('$destroy', () => {
			socket.removeListener('NEW_EVENT', this.checkEvents.bind(this));
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
			})
			.then(events => {
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
		this.User.viewTask($state.params.taskId);
		this.$state.go('property.task', {
			taskId: this.task.task_id
		});
	}
}


export default TaskRowController;
