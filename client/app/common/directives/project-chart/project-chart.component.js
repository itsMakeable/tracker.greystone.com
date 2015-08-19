import template from './project-chart.jade';
import controller from './project-chart.controller';
import './project-chart.styl';

let ProjectChartComponent = function() {
	return {
		template,
		controller,
		restrict: 'E',
			controllerAs: 'vm',
			scope: {
				projectId: '=',
				onMilestoneSelected: '&',
				onTaskSelected: '&'
			},
			bindToController: true
	};
};

export default ProjectChartComponent;
