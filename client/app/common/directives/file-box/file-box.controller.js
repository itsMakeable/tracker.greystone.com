class FileBoxController {
	constructor(Upload) {
		console.log(this.allowMultiple);
		this.Upload = Upload;
	}
	editName() {
		console.log('editName');
	}
	removeFile() {
		console.log('removeFile');
	}
	viewFile() {
		console.log('viewFile');
	}
	downloadFile() {
		console.log('downloadFile');
	}
	replaceFile() {
		console.log('replaceFile');
	}
	onFilesDropped($files, $file, $event, $rejectedFiles) {
		console.log('onFilesDropped');
		if (this.allowMultiple) {
			console.log($files);
		} else {
			console.log($file);
		}
	}
	uploadFile($file) {
		console.log('onFilesDropped');
		console.log($file);
	}


}


export default FileBoxController;
