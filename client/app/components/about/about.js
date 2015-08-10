import angular from 'angular';
import uiRouter from 'angular-ui-router';
import template from './about.jade';
import controller from './about.controller';
import './about.styl';

let aboutModule = angular.module('about', [
		uiRouter
	])
	.config(($stateProvider) => {
		$stateProvider
			.state('about', {
				url: '/about',
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
					}
				}
			});
	});

export default aboutModule;
