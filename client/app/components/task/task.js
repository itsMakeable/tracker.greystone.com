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
						console.log('task');
						console.log($stateParams.hasOwnProperty('taskId'));
						console.log($stateParams);
						if ($stateParams.hasOwnProperty('taskId')) {
							User.viewTask($stateParams.taskId);
							return $q.when(Task.get(Number($stateParams.taskId)));
						} else {
							return $q.when(null);
						}
					}
				}
			});

	});
export default taskModule;
