class TaskRowController {
	constructor($state, Event, $scope) {
		this.$state = $state;
		this.newEvents = 0;
		this.Event = Event;

		$scope.$watch(() => Event.lastModified(), () => {
			this.checkEvents();
		});

		$scope.$on('CHECK_EVENTS', () => {
			this.checkEvents();
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
				this.newEvents = events.length;
			})
			.catch(error => {
				console.log(error);
			});
	}
	selectTask() {
		this.$state.go('property.task', {
			taskId: this.task.task_id
		});
	}
}


export default TaskRowController;
