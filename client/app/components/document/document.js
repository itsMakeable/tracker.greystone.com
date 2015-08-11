import angular from 'angular';
import uiRouter from 'angular-ui-router';
import template from './document.jade';
import controller from './document.controller';
import './document.styl';

let documentModule = angular.module('document', [
		uiRouter
	])
	.config(($stateProvider, $urlRouterProvider) => {

		$stateProvider
			.state('document', {
				url: '/document',
				template,
				controller,
				controllerAs: 'vm'
			});
	});
export default documentModule;
