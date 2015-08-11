import angular from 'angular';
import uiRouter from 'angular-ui-router';
import template from './privacy-policy.jade';
import controller from './privacy-policy.controller';
import './privacy-policy.styl';

let privacyPolicyModule = angular.module('privacyPolicy', [
		uiRouter
	])
	.config(($stateProvider, $urlRouterProvider) => {

		$stateProvider
			.state('privacyPolicy', {
				url: '/privacyPolicy',
				template,
				controller,
				controllerAs: 'vm'
			});
	});
export default privacyPolicyModule;
