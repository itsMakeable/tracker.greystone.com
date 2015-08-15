import template from './field-row.jade';
import controller from './field-row.controller';
import './field-row.styl';

let fieldRowComponent = function() {
	return {
		template,
		controller,
		restrict: 'E',
			controllerAs: 'vm',
			scope: {
				field: '='
			},
			bindToController: true
	};
};

export default fieldRowComponent;
