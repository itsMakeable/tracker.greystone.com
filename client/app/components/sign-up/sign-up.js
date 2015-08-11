import angular from 'angular';
import uiRouter from 'angular-ui-router';
import template from './sign-up.jade';
import controller from './sign-up.controller';
import './sign-up.styl';

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
