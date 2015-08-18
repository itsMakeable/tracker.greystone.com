import angular from 'angular';
import uiRouter from 'angular-ui-router';
import template from './property.jade';
import controller from './property.controller';
import './property.styl';

let propertyModule = angular.module('property', [
		uiRouter
	])
	.config(($stateProvider, $urlRouterProvider) => {

		$stateProvider
			.state('property', {
				url: '/property',
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
								console.log(projects[0]);
								return projects[0];
							});
					}
				}
			});
	});
export default propertyModule;
