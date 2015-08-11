class TaskController {
	constructor(Project, $state, task, Task, $scope, Upload, File) {
		this.Upload = Upload;
		this.$state = $state;
		this.Project = Project;
		this.project = Project.filter({})[0];
		this.task = task;
		this.File = File;
		console.log(this.task);
	}
	fileDropped($files, $file, $event, $rejectedFiles, field) {
		console.log('fileDropped');
		console.log(this.field);
		console.log($files);
		console.log($file);
		console.log($rejectedFiles);
		if ($file) {
			this.Upload.upload({
				url: 'http://localhost:8080/api/upload',
				file: $file
			}).progress(evt => {
				var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
				console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
			}).success((data, status, headers, config) => {
				console.log(data[0].filename);
				this.File.create({
					name: data[0].filename,
					field_id: field.field_id
				});
			}).error((data, status, headers, config) => {
				console.log(status);

			});
		} else if ($files.length > 0) {
			this.Upload.upload({
				url: 'http://localhost:8080/api/upload',
				file: $files
			}).progress(evt => {
				var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
				console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
			}).success((data, status, headers, config) => {
				console.log(data);
			}).error((data, status, headers, config) => {
				console.log(status);
			});
		}
	}
}


export default TaskController;
