import angular from 'angular';
import uiRouter from 'angular-ui-router';
import template from './taskView.jade';
import controller from './taskView.controller';
import './taskView.styl';

let taskViewModule = angular.module('taskView', [
		uiRouter
	])
	.config(($stateProvider, $urlRouterProvider) => {

		$stateProvider
			.state('taskView', {
				url: '/taskView/:taskId',
				template,
				controller,
				controllerAs: 'vm',
				resolve: {
					authentication: (User, $q) => {
						return User.checkLogin()
							.then(() => {
								return true;
							})
							.catch(() => {
								return $q.reject({
									notAuthenticated: true
								});
							});
					},
					taskId: $stateParams => $stateParams.taskId
				}
			});
	});
export default taskViewModule;
