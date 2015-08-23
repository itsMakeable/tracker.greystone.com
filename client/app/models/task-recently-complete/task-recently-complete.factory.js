let TaskRecentlyCompleteFactory = function(DS) {

	let taskRecentlyCompleteResource = DS.defineResource({
		name: 'task-recently-complete',
		idAttribute: 'task_complete_notification_id',
		endpoint: '/api/task-complete-notifications',
		beforeInject(resource, data) {
			if (angular.isArray(data)) {
				angular.forEach(data, notification => {
					notification.task.by = notification.user;
					notification.task.task_complete_notification_id = notification.task_complete_notification_id;
				});
			} else {
				data.task.by = data.user;
				data.task.task_complete_notification_id = data.task_complete_notification_id;
			}
		}
	});

	return taskRecentlyCompleteResource;

};

export default TaskRecentlyCompleteFactory;
