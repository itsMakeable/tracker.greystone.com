import angular from 'angular';
import uiRouter from 'angular-ui-router';
import template from './home.html';
import controller from './home.controller';
import './home.styl';

let homeModule = angular.module('home', [
		uiRouter
	])
	.config(($stateProvider, $urlRouterProvider) => {
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('home', {
				url: '/',
				template,
				controller,
				controllerAs: 'vm',
				resolve: {
					project: (Project) => {
						console.log(Project);
						return Project.findAll({})
							.then(projects => {
								console.log(projects);
								return projects[0];
							});
					},
					task: Task => {
						return Task.findAll({})
							.then(tasks => {
								console.log(tasks);
								return tasks[0];
							});
					}
				}
			});
	});

export default homeModule;
