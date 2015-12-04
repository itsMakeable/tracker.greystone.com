import angular from 'angular';
import uiRouter from 'angular-ui-router';
import template from './task.jade';
import controller from './task.controller';
import './task.styl';

let taskModule = angular.module('task', [
		uiRouter
	])
	.config(($stateProvider) => {

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
					task: ($stateParams, Task, $q) => {
						if ($stateParams.taskId !== '') {
							return Task.find($stateParams.taskId, {
									bypassCache: true,
								})
								.then(task => {
									console.log(task);
									return task;
								});
						} else {
							return $q.when(null);
						}
					}
				}
			});

	});
export default taskModule;
