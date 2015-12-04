import angular from 'angular';
import uiRouter from 'angular-ui-router';
import template from './user-profile.jade';
import controller from './user-profile.controller';
import './user-profile.styl';

let userProfileModule = angular.module('userProfile', [
		uiRouter
	])
	.config(($stateProvider) => {

		$stateProvider
			.state('userProfile', {
				url: '/userProfile/:userId',
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
					user: ($stateParams, User, $q) => {
						return $q.when(User.get($stateParams.userId));
					}
				}
			});
	});

export default userProfileModule;
