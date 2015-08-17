import template from './task-row.jade';
import controller from './task-row.controller';
import './task-row.styl';

let taskRowComponent = function() {
	return {
		template,
		controller,
		restrict: 'E',
			controllerAs: 'vm',
			scope: {
				task: '=',
				showAlert: '=',
				showDismiss: '='
			},
			bindToController: true
	};
};

export default taskRowComponent;
