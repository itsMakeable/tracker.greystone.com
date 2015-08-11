import angular from 'angular';
import uiRouter from 'angular-ui-router';
import template from './terms-and-conditions.jade';
import controller from './terms-and-conditions.controller';
import './terms-and-conditions.styl';

let termsAndConditionsModule = angular.module('termsAndConditions', [
		uiRouter
	])
	.config(($stateProvider, $urlRouterProvider) => {

		$stateProvider
			.state('termsAndConditions', {
				url: '/termsAndConditions',
				template,
				controller,
				controllerAs: 'vm'
			});
	});
export default termsAndConditionsModule;
