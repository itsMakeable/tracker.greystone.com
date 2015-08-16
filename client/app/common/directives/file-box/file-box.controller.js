class FileBoxController {
	constructor(Upload, File) {
		this.Upload = Upload;
		this.File = File;
		this.editNameMode = false;
	}
	editName(file) {
		this.editNameMode = true;
	}
	cancelEdit() {
		this.editNameMode = false;
	}
	updateFileName(file) {
		this.File.update(file.file_id, {
				name: file.name
			})
			.then(file => {
				console.log(file);
			})
			.catch(error => {
				console.log(error);
			});
	}
	removeFile(file) {
		// Probably create a new event then. onFileRemove
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
		console.log('viewFile ->');
	}
	downloadFile(file) {
		console.log('downloadFile ->');
	}
	replaceFile(prevFile, newFile) {
		if (newFile) {
			this.onFileReplaced({
				$newFile: newFile,
				$prevFile: prevFile
			});
		}
	}
	onFilesDropped($files, $file, $event, $rejectedFiles) {
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
	uploadFile($files, $file, $rejectedFiles) {
		console.log('uploadFile');
		console.log($files);
		console.log($file);
		console.log($rejectedFiles);
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
