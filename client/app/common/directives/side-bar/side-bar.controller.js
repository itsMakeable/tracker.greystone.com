class SideBarController {
	constructor($scope, $state, File, Project, Milestone, Task, User) {
		this.$state = $state;
		this.File = File;
		this.Project = Project;
		this.Milestone = Milestone;
		this.Task = Task;
		this.User = User;
		Milestone.inject(this.project.milestones);

		this.assignedToMeLimit = 7;
		this.otherLimit = 7;

		angular.forEach(this.project.milestones, milestone => {
			Task.inject(milestone.tasks);
		});

		this.milestone = Milestone.get(this.project.milestones[0].milestone_id);
		this.currentMilestoneIndex = 0;

		this.filterTasks();
		this.bindWatchers($scope);

		$state.go('property.task', {
			taskId: this.milestone.tasks[0].task_id
		});
	}
	bindWatchers($scope) {
		$scope.$watch(() => this.Task.lastModified(), () => {
			this.filterTasks();
		});
	}
	changeMilestone() {
		var task_id;
		if (this.currentMilestoneIndex < this.project.milestones.length - 1) {
			this.currentMilestoneIndex++;
		} else {
			this.currentMilestoneIndex = 0;
		}
		this.milestone = this.project.milestones[this.currentMilestoneIndex];
		this.filterTasks();
		if (this.tasksAssignedToMe[0]) {
			task_id = this.tasksAssignedToMe[0].task_id;
		} else {
			task_id = this.otherTasks[0].task_id;
		}
		this.$state.go('property.task', {
			taskId: task_id
		});
	}
	selectTask(task) {
		this.$state.go('property.task', {
			taskId: task.task_id
		});
	}
	dismissAll() {
		console.log('dismissAll');
	}
	filterTasks() {
		console.warn('filter tasks');
		this.tasksAssignedToMe = this.Task.filter({
			where: {
				milestone_id: {
					'==': this.milestone.milestone_id
				},
				user_id: {
					'==': this.User.getCurrentUser().user_id
				}
			}
		});
		this.tasksRecentlyCompleted = this.Task.filter({
			where: {
				milestone_id: {
					'==': this.milestone.milestone_id
				},
				is_complete: {
					'==': true
				},
				'task_complete.created_at': {
					'>': 'Yesterday'
				}
			}
		});
		this.otherTasks = this.Task.filter({
			where: {
				milestone_id: {
					'==': this.milestone.milestone_id
				},
				user_id: {
					'!=': this.User.getCurrentUser().user_id
				}
			}
		});
	}
}


export default SideBarController;
