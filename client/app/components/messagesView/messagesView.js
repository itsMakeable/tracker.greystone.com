import angular from 'angular';
import uiRouter from 'angular-ui-router';
import template from './messagesView.jade';
import controller from './messagesView.controller';
import './messagesView.styl';

let messagesViewModule = angular.module('messagesView', [
		uiRouter
	])
	.config(($stateProvider, $urlRouterProvider) => {

		$stateProvider
			.state('messagesView', {
				url: '/messagesView',
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
export default messagesViewModule;
