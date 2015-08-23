class FieldRowController {
	constructor(Upload, File) {
		this.Upload = Upload;
		this.File = File;
		this.showDescription = false;
	}
	uploadFile(files) {
		this.File.upload(this.field.task_id, this.field.field_id, files)
			.then(files => {
				console.log(files);
				console.log(this.field.files);
				this.field.files.push.apply(this.field.files, files);
			});
	}
	replaceFile(prevFile, newFile) {
		this.File.replace(prevFile, newFile)
			.then(file => {
				var index = this.field.files.indexOf(prevFile);
				this.field.files[index] = file;
			});

	}
}


export default FieldRowController;
