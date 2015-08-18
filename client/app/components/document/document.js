import angular from 'angular';
import uiRouter from 'angular-ui-router';
import template from './document.jade';
import controller from './document.controller';
import './document.styl';

let documentModule = angular.module('resetPassword', [
		uiRouter
	])
	.config(($stateProvider, $urlRouterProvider) => {

		$stateProvider
			.state('resetPassword', {
				url: '/resetPassword',
				template,
				controller,
				controllerAs: 'vm'
			});
	});
export default documentModule;
