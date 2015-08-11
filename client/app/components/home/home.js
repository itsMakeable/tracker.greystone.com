import angular from 'angular';
import uiRouter from 'angular-ui-router';
import template from './home.jade';
import controller from './home.controller';
import './home.styl';

let homeModule = angular.module('home', [
		uiRouter
	])
	.config(($stateProvider) => {

		$stateProvider
			.state('home', {
				url: '/',
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

export default homeModule;
