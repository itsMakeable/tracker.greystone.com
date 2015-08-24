class ProjectChartController {
	constructor(Project, $scope, $element, User, $state) {
		this.state = {};
		this.chartElement = $element.children()[0];
		this.$state = $state;
		var idWatcher = $scope.$watch(() => this.projectId, () => {
			if (this.projectId) {
				this.x_project = Project.get(this.projectId);
				this.user_id = User.getCurrentUser().user_id;
				this.config = {
					startAngle: -90,
					centerX: 160,
					centerY: 160,
					radius: 75,
					width: 42,
					bumpWidth: 10,
					show_milestones: false,
					collapsed_milestone_degree: 30,
					collapsed_milestone_padding_degree: 6
				};
				this.summary = {
					milestones: []
				};
				this.elements = [];
				this.state.milestone_id = this.x_project.milestones[0].milestone_id;
				this.draw();
				idWatcher();
			}
		});

		$scope.$watch(() => this.$state.params.taskId, () => {
			if (this.$state.params.taskId) {
				this.state.task_id = this.$state.params.taskId;
				this.draw();
			}
		});

		$scope.$on('TASK_ASSIGN', (event, data) => {
			Project.findAll({})
				.then(projects => {
					this.x_project = projects[0];
					var milestone_index = this.x_project.milestones.map(e => Number(e.milestone_id)).indexOf(Number(data.task.milestone_id));
					var task_index = this.x_project.milestones[milestone_index].tasks.map(e => Number(e.task_id)).indexOf(Number(data.task.task_id));
					this.x_project.milestones[milestone_index].tasks[task_index] = data.task;
					this.draw();
				});
		});

		$scope.$on('TASK_COMPLETE', (event, data) => {
			Project.findAll({})
				.then(projects => {
					this.x_project = projects[0];
					var milestone_index = this.x_project.milestones.map(e => Number(e.milestone_id)).indexOf(Number(data.task.milestone_id));
					var task_index = this.x_project.milestones[milestone_index].tasks.map(e => Number(e.task_id)).indexOf(Number(data.task.task_id));
					this.x_project.milestones[milestone_index].tasks[task_index] = data.task;
					this.draw();
				});
		});
	}
	draw() {
		this.summarize();
		this.prep();
		this.render();
	}
	summarize() {
		this.summary.milestones = [];
		for (var i = 0; i < this.x_project.milestones.length; i++) {
			var milestone = this.x_project.milestones[i];
			var effort = 0;
			var complete_effort = 0;
			for (var j = 0; j < milestone.tasks.length; j++) {
				var task = milestone.tasks[j];
				effort = effort + task.effort;
				if (task.is_complete === 1 || task.is_complete === true || task.is_complete === 'true') {
					complete_effort = complete_effort + task.effort;
				}
			}
			this.summary.milestones[i] = {
				effort: effort,
				complete_effort: complete_effort
			};
		}
	}
	prep() {
		this.elements = [];
		var angle;
		var degrees_for_collapsed, degrees_for_active;
		var element;
		if (this.config.show_milestones) {
			degrees_for_collapsed = ((this.x_project.milestones.length - 1) * this.config.collapsed_milestone_degree) + (2 * this.config.collapsed_milestone_padding_degree);
			degrees_for_active = (360 - degrees_for_collapsed);
			angle = 0;
		} else {
			degrees_for_collapsed = 0;
			degrees_for_active = (360 - 8);
			angle = 4;
		}

		for (var i = 0; i < this.x_project.milestones.length; i++) {
			var milestone = this.x_project.milestones[i];
			var milestone_total_effort = this.summary.milestones[i].effort;
			if (Number(milestone.milestone_id) === Number(this.state.milestone_id)) {

				if (this.config.show_milestones) {
					if (i > 0) {
						angle = angle + this.config.collapsed_milestone_padding_degree;
					}
				} else {
					// Store prev and nex milestone id.
					if (i > 0) {
						this.summary.prev_milestone_id = this.x_project.milestones[i - 1].milestone_id;
					} else {
						this.summary.prev_milestone_id = null;
					}
					if (i < this.x_project.milestones.length - 1) {
						this.summary.next_milestone_id = this.x_project.milestones[i + 1].milestone_id;
					} else {
						this.summary.next_milestone_id = null;
					}

				}

				element = {
					type: 'ACTIVE_MILESTONE',
					startAngle: angle,
					endAngle: angle,
					name: milestone.name,
					target: milestone.target,
					target_date: milestone.target_date,
					milestone_id: i,
					sub_elements: [],
					effort: this.summary.milestones[i].effort,
					complete_effort: this.summary.milestones[i].complete_effort,
				};

				for (var j = 0; j < milestone.tasks.length; j++) {
					var task = milestone.tasks[j];
					var degrees_for_task = (degrees_for_active * (task.effort / milestone_total_effort));
					var task_element = {
						type: 'TASK',
						name: task.name,
						startAngle: angle,
						endAngle: angle + degrees_for_task,
						is_complete: task.is_complete,
						user_id: task.user_id,
						task_id: task.task_id
					};

					angle = angle + degrees_for_task;
					element.sub_elements.push(task_element);

				}

				element.endAngle = angle;
				this.elements.push(element);

				if (this.config.show_milestones) {
					if (i < this.x_project.milestones.length) {
						angle = angle + this.config.collapsed_milestone_padding_degree;
					}
				}

			} else {
				if (this.config.show_milestones) {
					var nm;
					if (i > this.x_project.milestones.length - 2) {
						nm = this.x_project.milestones[0].milestone_id;
					} else {
						nm = this.x_project.milestones[i + 1].milestone_id;
					}


					element = {
						type: 'INACTIVE_MILESTONE',
						startAngle: angle,
						endAngle: angle + this.config.collapsed_milestone_degree,
						name: milestone.name,
						milestone_id: milestone.milestone_id,
						effort: this.summary.milestones[i].effort,
						complete_effort: this.summary.milestones[i].complete_effort,
						last: Number(nm) === Number(this.state.milestone_id)
					};
					this.elements.push(element);
					angle = angle + this.config.collapsed_milestone_degree;
				}
			}
		}

		return this.x_project.milestones[0];
	}
	render() {
		this.chartElement.innerHTML = "";

		for (var j = 0; j < this.elements.length; j++) {

			var currentElement = this.elements[j];

			if (currentElement.type === "ACTIVE_MILESTONE") {

				//drawWedge(element.startAngle,element.endAngle, 100, "#336699", "#6699CC");

				var date = new Date(currentElement.target_date);
				var month = date.getMonth() + 1;
				var day = date.getDate();
				var year = date.getFullYear() - 2000;
				var formattedTime = month + '/' + day + '/' + year;

				this.drawMilestoneText(formattedTime, currentElement.target);

				for (var k = 0; k < currentElement.sub_elements.length; k++) {

					var task_element = currentElement.sub_elements[k];
					var width, c, f;
					if (task_element.type === "TASK") {

						if (task_element.is_complete === 1 || task_element.is_complete === true || task_element.is_complete === 'true') {
							c = "#3c3c3c";
							f = "#829794";
						} else if (Number(task_element.user_id) === Number(this.user_id)) {
							c = "#3c3c3c";
							f = "#eaaa1f";
						} else {
							c = "#3c3c3c";
							f = "#555252";
						}

						if (Number(task_element.task_id) !== Number(this.state.task_id)) {
							width = this.config.width;
						} else {
							width = this.config.width + this.config.bumpWidth;
						}


						this.drawWedge(task_element.startAngle, task_element.endAngle, width, c, f, "task", "task_" + task_element.task_id);
					}
				}

				var inner = this.config.radius + this.config.width + (this.config.width / 15);
				var outer = this.config.radius + this.config.width + (this.config.width / 5);
				if (this.config.show_milestones) {

					this.drawRay(currentElement.endAngle, this.config.radius, this.config.radius + this.config.width, 3, "#fff");
					this.drawRay(currentElement.startAngle, this.config.radius, this.config.radius + this.config.width, 3, "#fff");

					this.drawRay(currentElement.endAngle, inner, outer, 3, "#fff");
					this.drawRay(currentElement.startAngle, inner, outer, 3, "#fff");

				} else {
					this.drawRay(0, this.config.radius, this.config.radius + this.config.width, 3, "#fff");
					this.drawRay(0, inner, outer, 3, "#fff");
				}

			}


			if (currentElement.type === "INACTIVE_MILESTONE") {

				this.drawWedge(currentElement.startAngle, currentElement.endAngle, this.config.width, "#3c3d3c", "#555252", "milestone", "milestone_" + currentElement.milestone_id);
				if ((currentElement.complete_effort / currentElement.effort) > 0.03) {
					this.drawWedge(currentElement.startAngle, currentElement.endAngle, this.config.width * ((currentElement.complete_effort / currentElement.effort)), "#555252", "#829794", "milestone", "milestone_" + currentElement.milestone_id);
					this.drawWedge(currentElement.startAngle, currentElement.endAngle, this.config.width, "#3c3d3c", "rgba(0,0,0,0.0)", "milestone", "milestone_" + currentElement.milestone_id);
				}
				if (!currentElement.last) {
					this.drawRay(currentElement.endAngle, this.config.radius + this.config.width + 5, this.config.radius + this.config.width + 12, 1, "#fff");
				}
			}

		}


		if (!this.config.show_milestones) {
			if (this.summary.prev_milestone_id) {
				this.drawArrow('prev', this.summary.prev_milestone_id);
			}
			if (this.summary.next_milestone_id) {
				this.drawArrow('next', this.summary.next_milestone_id);
			}
		}
	}
	wedgeclick(event) {
		var id = event.target.getAttribute('id');
		if (id) {
			var res = id.split("_");
			if (res[0] === "milestone") {
				this.state.milestone_id = res[1];
				this.onMilestoneSelected({
					$milestoneId: res[1]
				});
			} else if (res[0] === "task") {
				this.state.task_id = res[1];
				this.onTaskSelected({
					$taskId: res[1]
				});
			}
			this.draw();
		}
	}
	polarToCartesian(radius, angleInDegrees) {
		angleInDegrees = angleInDegrees + this.config.startAngle;
		var angleInRadians = angleInDegrees * Math.PI / 180.0;
		var x = this.config.centerX + radius * Math.cos(angleInRadians);
		var y = this.config.centerY + radius * Math.sin(angleInRadians);
		return [x, y];
	}
	drawArrow(direction, id) {
		var xmlns = "http://www.w3.org/2000/svg";
		var newpath = document.createElementNS(xmlns, "polyline");

		newpath.setAttribute('fill', '#3c3c3c');
		newpath.setAttribute('stroke', '#fff');
		newpath.setAttribute('stroke-width', '3');
		newpath.setAttribute('stroke-miterlimit', '10');
		newpath.setAttribute('class', 'milestone');
		if (direction === "prev") {
			newpath.setAttribute('points', ' 20,140 4,160 20,180 ');
		} else {
			newpath.setAttribute('points', ' 300,140 316,160 300,180 ');
		}
		newpath.setAttribute('id', 'milestone_' + id);

		newpath.onclick = this.wedgeclick.bind(this);

		this.chartElement.appendChild(newpath);
	}
	drawWedge(startAngle, endAngle, thickness, color, fill, cssclass, elementid) {
		var endInnerPoint = this.polarToCartesian(this.config.radius, endAngle);
		var endOuterPoint = this.polarToCartesian(this.config.radius + thickness, endAngle);

		var wedge = {};
		wedge.endInnerX = endInnerPoint[0];
		wedge.endInnerY = endInnerPoint[1];
		wedge.endOuterX = endOuterPoint[0];
		wedge.endOuterY = endOuterPoint[1];

		var nextInnerPoint = this.polarToCartesian(this.config.radius, startAngle);
		var nextOuterPoint = this.polarToCartesian(this.config.radius + thickness, startAngle);

		wedge.startInnerX = nextInnerPoint[0];
		wedge.startInnerY = nextInnerPoint[1];
		wedge.startOuterX = nextOuterPoint[0];
		wedge.startOuterY = nextOuterPoint[1];

		var xmlns = "http://www.w3.org/2000/svg";
		var newpath = document.createElementNS(xmlns, "path");

		var largeArc = 0;
		if (endAngle - startAngle > 180) {
			largeArc = 1;
		}

		var path = "M " + wedge.endInnerX + " " + wedge.endInnerY + " A " + this.config.radius + "  " + this.config.radius + " 0 " + largeArc + " 0 " + wedge.startInnerX + " " + wedge.startInnerY + " L " + wedge.startOuterX + " " + wedge.startOuterY + " " + " A " + (this.config.radius + thickness) + "  " + (this.config.radius + thickness) + " 0 " + largeArc + " 1 " + wedge.endOuterX + " " + wedge.endOuterY + " L " + wedge.endInnerX + " " + wedge.endInnerY + " ";
		newpath.setAttribute("d", path);

		if (cssclass) {
			newpath.setAttribute("class", cssclass);
		}
		if (elementid) {
			newpath.setAttribute("id", elementid);
		}

		newpath.onclick = this.wedgeclick.bind(this);
		newpath.setAttribute("stroke", color);
		newpath.setAttribute("stroke-width", 2);
		newpath.setAttribute("opacity", 1);
		newpath.setAttribute("fill", fill);

		this.chartElement.appendChild(newpath);
	}
	drawRay(angle, innerRadius, outerRadius, width, color) {
		var innerPoint = this.polarToCartesian(innerRadius, angle);
		var outerPoint = this.polarToCartesian(outerRadius, angle);

		var ray = {};
		ray.innerX = innerPoint[0];
		ray.innerY = innerPoint[1];
		ray.outerX = outerPoint[0];
		ray.outerY = outerPoint[1];

		var xmlns = "http://www.w3.org/2000/svg";
		var newpath = document.createElementNS(xmlns, "path");

		var path = "M " + ray.innerX + " " + ray.innerY + " L " + ray.outerX + " " + ray.outerY + " ";
		newpath.setAttribute("d", path);

		newpath.setAttribute("stroke", color);
		newpath.setAttribute("stroke-width", width);
		newpath.setAttribute("opacity", 1);

		this.chartElement.appendChild(newpath);
	}
	drawMilestoneText(date, line2) {
		var a = "";
		a = a + '<circle cx="' + this.config.centerX + '" cy="' + this.config.centerY + '" r="' + (this.config.radius - 3) + '" stroke="#3c3c3c" stroke-width="0" fill="#3c3c3c" />';
		//a = a + '<text text-anchor="middle" x="' + this.config.centerX + '" y="' + (this.config.centerY - 33) + '" fill="#D4D4D4" font-family="\'Avenir-Light\'" font-size="14px">' + line1 + '</text>';
		a = a + '<text text-anchor="middle" x="' + this.config.centerX + '" y="' + (this.config.centerY + 0) + '" fill="#FFFFFF" font-family="\'AvenirNextLTPro-Regular\'" font-size="30px">' + date + '</text>';
		a = a + '<text text-anchor="middle" x="' + this.config.centerX + '" y="' + (this.config.centerY + 23) + '" fill="#D4D4D4" font-family="\'AvenirNextLTPro-Regular\'" font-size="12px">' + line2 + '</text>';
		this.chartElement.innerHTML = this.chartElement.innerHTML + a;
	}
}


export default ProjectChartController;
