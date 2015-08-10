import angular from 'angular';
import uiRouter from 'angular-ui-router';
import template from './homeScreen.jade';
import controller from './homeScreen.controller';
import './homeScreen.styl';

let homeScreenModule = angular.module('homeScreen', [
		uiRouter
	])
	.config(($stateProvider, $urlRouterProvider) => {

		$stateProvider
			.state('homeScreen', {
				url: '/homeScreen',
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
					project: (Project) => {
						return Project.findAll({})
							.then(projects => {
								console.log(projects);
								return projects[0];
							});
					}
				}
			});
	});
export default homeScreenModule;
