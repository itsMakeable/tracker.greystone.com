class AboutController {
	constructor(User, $scope, Upload) {
		this.User = User;
		this.Upload = Upload;
		$scope.$watch(() => this.file, file => {
			this.upload(this.file);
		});
	}
	upload(file) {
		console.log(file);
		if (file) {
			this.Upload.upload({
				url: 'http://localhost:8080/api/files/3',
				method: 'PUT',
				fields: {
					'field_id': 2
				},
				file: file
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
	uploadMulti() {
		this.Upload.upload({
			url: 'http://localhost:8080/api/files',
			file: this.files,
			fields: {
				'field_id': 2
			},
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

export default AboutController;
