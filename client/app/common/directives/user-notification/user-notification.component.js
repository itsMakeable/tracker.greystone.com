import template from './user-notification.jade';
import controller from './user-notification.controller';
import './user-notification.styl';

let userNotificationComponent = function() {
	return {
		template,
		controller,
		restrict: 'E',
			controllerAs: 'vm',
			scope: {
				event: '='
			},
			bindToController: true
	};
};

export default userNotificationComponent;
