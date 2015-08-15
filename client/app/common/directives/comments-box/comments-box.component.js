import template from './comments-box.jade';
import controller from './comments-box.controller';
import './comments-box.styl';

let commentsBoxComponent = function() {
	return {
		template,
		controller,
		restrict: 'E',
			controllerAs: 'vm',
			scope: {},
			bindToController: true
	};
};

export default commentsBoxComponent;
