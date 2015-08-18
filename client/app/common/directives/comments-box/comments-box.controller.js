import groupBy from 'lodash.groupby';

class CommentsBoxController {
	constructor(socket, $scope, Event, $filter, Task) {
		this.textareaFunction();
		var _this = this;
		this.$filter = $filter;
		this.Event = Event;
		socket.on('NEW_EVENT', test);

		Event.findAll({
				task_id: this.taskId,
			}, {
				bypassCache: true,
			})
			.then(events => {
				this.events = events;
				this.eventsByDate = groupBy(this.events, event => {
					return this.$filter('date')(event.created_at, 'longDate');
				});
				console.log('Events by date');
				console.log(this.eventsByDate);
			})
			.catch(error => {
				console.log(error);
			});

		function test(data) {
			console.log('NEW_EVENT');
			console.log(data.data);
			var task = Task.get(_this.taskId);
			if (data.data.type == 'ASSIGN_USER') {
				task.user = data.data.assigned_user;
			} else if (data.data.type == 'CLEAR_ASSIGN') {
				delete task.user;
			}
			Task.inject(task);
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
			console.log('Events by date');
			console.log(this.eventsByDate);
		});

		$scope.$on('$destroy', () => {
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
					this.newMessage = '';
				})
				.catch(error => {
					console.log(error);
				});
		}
	}
	textareaFunction() {
		var heightLimit, textarea;
		textarea = document.getElementById('textarea');
		heightLimit = 200; /* Maximum height: 200px */
		textarea.oninput = function() {
			textarea.style.height = ''; /* Reset the height */
			textarea.style.height = Math.min(textarea.scrollHeight, heightLimit) + 'px';
		};

	}
}


export default CommentsBoxController;
