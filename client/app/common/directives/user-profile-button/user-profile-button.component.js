import template from './user-profile-button.jade';
import controller from './user-profile-button.controller';
import './user-profile-button.styl';

let userProfileButtonComponent = function() {
	return {
		template,
		controller,
		restrict: 'E',
			controllerAs: 'vm',
			scope: {},
			bindToController: true
	};
};

export default userProfileButtonComponent;
