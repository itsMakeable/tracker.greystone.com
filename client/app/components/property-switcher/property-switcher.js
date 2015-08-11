import angular from 'angular';
import uiRouter from 'angular-ui-router';
import template from './property-switcher.jade';
import controller from './property-switcher.controller';
import './property-switcher.styl';

let propertySwitcherModule = angular.module('propertySwitcher', [
		uiRouter
	])
	.config(($stateProvider, $urlRouterProvider) => {

		$stateProvider
			.state('propertySwitcher', {
				url: '/propertySwitcher',
				template,
				controller,
				controllerAs: 'vm'
			});
	});
export default propertySwitcherModule;
