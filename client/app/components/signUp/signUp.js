import angular from 'angular';
import uiRouter from 'angular-ui-router';
import template from './signUp.jade';
import controller from './signUp.controller';
import './signUp.styl';

let signUpModule = angular.module('signUp', [
		uiRouter
	])
	.config(($stateProvider, $urlRouterProvider) => {

		$stateProvider
			.state('signUp', {
				url: '/signUp',
				template,
				controller,
				controllerAs: 'vm'
			});
	});
export default signUpModule;
