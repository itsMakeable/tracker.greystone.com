import groupBy from 'lodash.groupby';

class CommentsBoxController {
	constructor(socket, $scope, Event, $filter) {
		console.log('NEW COMMENT BOX');
		var _this = this;
		this.$filter = $filter;
		this.Event = Event;
		socket.on('NEW_EVENT', test);

		Event.findAll({
				task_id: this.taskId
			})
			.then(events => {
				console.log(events);
				this.events = events;
				this.eventsByDate = groupBy(this.events, event => {
					return this.$filter('date')(event.created_at, 'longDate');
				});
				console.log(this.eventsByDate);
			})
			.catch(error => {
				console.log(error);
			});

		function test(data) {
			console.log('NEW_EVENT');
			console.log(data.data);
			Event.inject(data.data);
		}

		$scope.$watch(() => Event.lastModified(), () => {
			this.eventsByDate = groupBy(this.Event.filter({
				where: {
					task_id: {
						'==': this.taskId
					}
				}
			}), event => {
				return this.$filter('date')(event.created_at, 'longDate');
			});
			console.log(this.eventsByDate);
		});

		$scope.$on('$destroy', () => {
			console.log('COMMENT BOX $destroy');
			socket.removeListener('NEW_EVENT', test);
		});
	}
	submitMessage() {
		if (this.newMessage !== '') {
			this.Event.create({
					message: this.newMessage,
					task_id: this.taskId
				})
				.then(event => {
					console.log(event);
					this.newMessage = '';
				})
				.catch(error => {
					console.log(error);
				});
		}
	}
}


export default CommentsBoxController;
