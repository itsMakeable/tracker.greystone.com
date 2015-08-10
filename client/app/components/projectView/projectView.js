import angular from 'angular';
import uiRouter from 'angular-ui-router';
import template from './projectView.jade';
import controller from './projectView.controller';
import './projectView.styl';

let projectViewModule = angular.module('projectView', [
		uiRouter
	])
	.config(($stateProvider, $urlRouterProvider) => {

		$stateProvider
			.state('projectView', {
				url: '/projectView/:milestoneId',
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
					milestoneId: $stateParams => $stateParams.milestoneId
				}
			});
	});
export default projectViewModule;
