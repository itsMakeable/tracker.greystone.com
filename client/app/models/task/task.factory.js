let TaskFactory = function(DS) {

	let taskResource = DS.defineResource({
		name: 'task',
		idAttribute: 'task_id',
		endpoint: '/api/tasks',
		afterUpdate(resource, data, cb) {
			var task = resource.get(data.task_id);
			if (!data.user_id) {
				delete task.user;
			}
			resource.inject(task);
			cb(null, data);
		}
	});

	return taskResource;

};

export default TaskFactory;
