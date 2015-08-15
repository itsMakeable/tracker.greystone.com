class SideBarController {
	constructor($state, File, Project, Milestone, Task) {
		this.$state = $state;
		this.File = File;
		this.Project = Project;
		this.Milestone = Milestone;
		this.Task = Task;
		Milestone.inject(this.project.milestones);
		this.milestone = Milestone.get(this.project.milestones[0].milestone_id);
		Task.inject(this.milestone.tasks[0]);
		this.currentMilestoneIndex = 0;

		this.tasksAssignedToMe = this.project.milestones[this.currentMilestoneIndex].tasks;

		$state.go('property.task', {
			taskId: this.milestone.tasks[0].task_id
		});
	}

	changeMilestone() {
		if (this.currentMilestoneIndex < this.project.milestones.length - 1) {
			this.currentMilestoneIndex++;
		} else {
			this.currentMilestoneIndex = 0;
		}
		this.Milestone.inject(this.project.milestones[this.currentMilestoneIndex]);
		this.milestone = this.project.milestones[this.currentMilestoneIndex];
		this.tasksAssignedToMe = this.project.milestones[this.currentMilestoneIndex].tasks;
		this.Task.inject(this.tasksAssignedToMe);
		this.$state.go('property.task', {
			taskId: this.tasksAssignedToMe[0].task_id
		});
	}
	selectTask(task) {
		this.Task.inject(task);
		this.$state.go('property.task', {
			taskId: task.task_id
		});

	}
}


export default SideBarController;
