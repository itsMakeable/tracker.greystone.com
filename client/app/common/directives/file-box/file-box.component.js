import template from './file-box.jade';
import controller from './file-box.controller';
import './file-box.styl';

let fileBoxComponent = function() {
	return {
		template,
		controller,
		restrict: 'E',
			controllerAs: 'vm',
			scope: {
				files: '=',
				allowMultiple: '='
			},
			bindToController: true
	};
};

export default fileBoxComponent;
