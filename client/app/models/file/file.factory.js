let FileFactory = function(DS, Upload, $q) {

	let fileResource = DS.defineResource({
		name: 'file',
		idAttribute: 'file_id',
		endpoint: '/api/files',
	});

	fileResource.upload = function(task_id, field_id, files) {
		var deferred = $q.defer();
		Upload.upload({
				url: DS.defaults.basePath + this.endpoint,
				method: 'POST',
				fields: {
					field_id: field_id,
					task_id: task_id
				},
				file: files
			})
			.progress(evt => {
				var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
				deferred.notify(progressPercentage);
			})
			.success((data, status, headers, config) => {
				this.inject(data);
				deferred.resolve(data);
			})
			.error((data, status, headers, config) => {
				deferred.reject(data);
			});

		return deferred.promise;
	};

	fileResource.replace = function(prevFile, newFile) {
		var deferred = $q.defer();
		Upload.upload({
				url: DS.defaults.basePath + this.endpoint + '/' + prevFile.file_id,
				method: 'PUT',
				fields: {
					field_id: prevFile.field_id
				},
				file: newFile
			})
			.progress(evt => {
				var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
				deferred.notify(progressPercentage);
			})
			.success((data, status, headers, config) => {
				this.inject(data);
				deferred.resolve(data);
			})
			.error((data, status, headers, config) => {
				deferred.reject(data);
			});

		return deferred.promise;
	};

	return fileResource;

};

export default FileFactory;
