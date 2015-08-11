import angular from 'angular';
import uiRouter from 'angular-ui-router';
import template from './milestone.jade';
import controller from './milestone.controller';
import './milestone.styl';

let milestoneModule = angular.module('milestone', [
		uiRouter
	])
	.config(($stateProvider) => {

		$stateProvider
			.state('milestone', {
				url: '/milestone/:milestoneId',
				template,
				controller,
				controllerAs: 'vm',
				resolve: {
					milestone: ($stateParams, Milestone, $q) => {
						// TODO: then get from server.
						console.log($stateParams.milestoneId);
						return $q.when(Milestone.get($stateParams.milestoneId));
					}
				}
			});
	});
export default milestoneModule;
