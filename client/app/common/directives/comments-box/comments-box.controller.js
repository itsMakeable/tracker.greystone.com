import groupBy from 'lodash.groupby';

class CommentsBoxController {
	constructor(socket, $scope, Event, $filter, Task, $rootScope, $timeout, User) {
		this.textareaFunction();
		this.$rootScope = $rootScope;
		this.$timeout = $timeout;
		this.$filter = $filter;
		this.user = User.getCurrentUser();
		this.Event = Event;
		this.Task = Task;
		this.socket = socket;

		this.bindWatchers($scope);
		this.bindEvents($scope);

		Event.findAll({
				task_id: this.taskId,
			}, {
				bypassCache: true,
			})
			.then(events => {
				this.events = events;
				var eventsByDate = groupBy(this.events, event => {
					return this.$filter('date')(event.created_at, 'longDate');
				});
				this.eventsByDate = eventsByDate;
				this.$timeout(() => {
					this.$rootScope.$broadcast('UPDATE_HEIGHT');
				}, 500);
			})
			.catch(error => {
				console.log(error);
			});

	}
	bindWatchers($scope) {


		$scope.$watch(() => this.Event.lastModified(), () => {
			var eventsByDate = groupBy(this.Event.filter({
				where: {
					task_id: {
						'==': this.taskId
					}
				}
			}), event => {
				return this.$filter('date')(event.created_at, 'longDate');
			});
			this.eventsByDate = eventsByDate;
			this.$timeout(() => {
				this.$rootScope.$broadcast('UPDATE_HEIGHT');
			}, 500);
		});
	}
	bindEvents($scope) {
		var _this = this;

		function onNewEvent(data) {
			var task = _this.Task.get(_this.taskId);
			if (data.data.type === 'ASSIGN_USER') {
				task.user = data.data.assigned_user;
			} else if (data.data.type === 'CLEAR_ASSIGN') {
				delete task.user;
			}
			_this.Task.inject(task);
			_this.Event.inject(data.data);
		}

		this.socket.on('NEW_EVENT', onNewEvent);

		$scope.$on('$destroy', () => {
			this.socket.removeListener('NEW_EVENT', onNewEvent);
		});
	}
	submitMessage() {
		if (this.newMessage !== '') {
			this.Event.create({
					message: this.newMessage,
					task_id: this.taskId
				})
				.then(() => {
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
		heightLimit = 200;
		textarea.oninput = function() {
			textarea.style.height = '';
			textarea.style.height = Math.min(textarea.scrollHeight, heightLimit) + 'px';
		};

	}
}


export default CommentsBoxController;
