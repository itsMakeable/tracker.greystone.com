class PropertyController {
	constructor(File, project, User) {
		this.File = File;
		this.project = project;
		User.findAll({})
			.then(users => {
				console.log(users);
			});

		File.findAll()
			.then(files => {
				console.log(files);
			})
			.catch(error => {
				console.log(error);
			});
	}
	updateFile() {
		this.File.update(3, {
				name: 'leandro.jpg'
			})
			.then(file => {
				console.log(file);
			})
			.catch(error => {
				console.log(error);
			});
	}
}


export default PropertyController;
