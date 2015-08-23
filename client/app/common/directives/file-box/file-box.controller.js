class FileBoxController {
	constructor(Upload, File, $scope, DS) {
		this.Upload = Upload;
		this.DS = DS;
		this.File = File;
		this.editModes = {};
		$scope.$watch(() => this.files.length, () => {
			if (this.files) {
				angular.forEach(this.files, file => {
					this.editModes[file.file_id] = false;
				});
			}
		});
	}
	editName(file) {
		this.editModes[file.file_id] = true;
	}
	cancelEdit(file) {
		this.editModes[file.file_id] = false;
	}
	saveName(file) {
		if (file.name) {
			this.File.update(file.file_id, {
					name: file.name
				})
				.then(new_file => {
					file.name = new_file.name;
					this.editModes[file.file_id] = false;
				})
				.catch(error => {
					console.log(error);
				});
		}
	}
	removeFile(file) {
		var index = this.files.indexOf(file);
		this.File.destroy(file.file_id)
			.then(() => {
				this.files.splice(index, 1);
			})
			.catch(error => {
				console.log(error);
			});
	}
	viewFile(file) {
		window.open(this.DS.defaults.basePath + '/' + file.path, '_blank');
	}
	downloadFile(file) {
		var downloadLink = angular.element('<a></a>');
		downloadLink.attr('href', this.DS.defaults.basePath + '/' + file.path);
		downloadLink.attr('download', file.name);
		downloadLink[0].click();
	}
	replaceFile(prevFile, newFile) {
		if (newFile) {
			this.onFileReplaced({
				$newFile: newFile,
				$prevFile: prevFile
			});
		}
	}
	onFilesDropped($files, $file) {
		if ($files.length > 0) {
			this.onFileSelected({
				$files: $files
			});
		} else if ($file) {
			this.onFileSelected({
				$files: [$file]
			});
		}
	}
	uploadFile($files, $file) {
		if ($files.length > 0) {
			this.onFileSelected({
				$files: $files
			});
		} else if ($file) {
			this.onFileSelected({
				$files: [$file]
			});
		}
	}


}


export default FileBoxController;
