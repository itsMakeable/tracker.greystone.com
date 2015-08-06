let TaskFactory = function(DS) {

	let taskResource = DS.defineResource({
		name: 'task',
		idAttribute: 'task_id',
		endpoint: '/api/tasks',
	});

	return taskResource;

};

export default TaskFactory;
