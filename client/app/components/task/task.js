import angular from 'angular';
import uiRouter from 'angular-ui-router';
import template from './task.jade';
import controller from './task.controller';
import './task.styl';

let taskModule = angular.module('task', [
		uiRouter
	])
	.config(($stateProvider, $urlRouterProvider) => {

		$stateProvider
			.state('property.task', {
				url: '/task/:taskId',
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
					task: ($stateParams, Task, $q, User) => {
						User.viewTask($stateParams.taskId);
						return $q.when(Task.get($stateParams.taskId));
					}
				}
			});

	});
export default taskModule;
