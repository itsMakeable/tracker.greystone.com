let TaskRecentlyCompleteFactory = function(DS) {

	let taskRecentlyCompleteResource = DS.defineResource({
		name: 'task-recently-complete',
		idAttribute: 'task_complete_notification_id',
		endpoint: '/api/task-complete-notifications',
	});

	return taskRecentlyCompleteResource;

};

export default TaskRecentlyCompleteFactory;
