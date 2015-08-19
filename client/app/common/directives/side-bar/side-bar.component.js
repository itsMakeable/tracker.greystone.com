import template from './side-bar.jade';
import controller from './side-bar.controller';
import './side-bar.styl';


let sideBarComponent = function() {
	return {
		template,
		controller,
		restrict: 'E',
			controllerAs: 'vm',
			scope: {
				project: '=',
				fromLogin: '='
			},
			bindToController: true
	};
};

export default sideBarComponent;
