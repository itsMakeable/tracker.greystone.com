import angular from 'angular';
import uiRouter from 'angular-ui-router';
import template from './settings.jade';
import controller from './settings.controller';
import './settings.styl';

let settingsModule = angular.module('settings', [
		uiRouter
	])
	.config(($stateProvider, $urlRouterProvider) => {

		$stateProvider
			.state('settings', {
				url: '/settings',
				template,
				controller,
				controllerAs: 'vm'
			});
	});
export default settingsModule;
