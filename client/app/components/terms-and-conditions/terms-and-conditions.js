import angular from 'angular';
import uiRouter from 'angular-ui-router';
import template from './terms-and-conditions.jade';
import controller from './terms-and-conditions.controller';
import './terms-and-conditions.styl';

let termsAndConditionsModule = angular.module('termsAndConditions', [
		uiRouter
	])
	.config(($stateProvider, $urlRouterProvider) => {

		$stateProvider
			.state('termsAndConditions', {
				url: '/termsAndConditions',
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
export default termsAndConditionsModule;
