class TermsAndConditionsController {
	constructor(Project, Milestone, Task, Field) {
		Project.findAll({})
			.then(projects => {
				console.log(projects[0]);
				console.log(Milestone.filter());
				console.log(Task.filter());
				console.log(Field.filter());
			});
	}
}


export default TermsAndConditionsController;
