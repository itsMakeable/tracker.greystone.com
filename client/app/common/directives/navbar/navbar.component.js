import template from './navbar.jade';
import controller from './navbar.controller';
import './navbar.styl';

let navbarComponent = function() {
	return {
		template,
		controller,
		restrict: 'E',
			controllerAs: 'vm',
			scope: {},
			bindToController: true
	};
};

export default navbarComponent;
