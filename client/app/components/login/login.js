import angular from 'angular';
import uiRouter from 'angular-ui-router';
import template from './login.jade';
import controller from './login.controller';
import './login.styl';

let loginModule = angular.module('login', [
		uiRouter
	])
	.config(($stateProvider, $urlRouterProvider) => {

		$stateProvider
			.state('login', {
				url: '/login',
				template,
				controller,
				controllerAs: 'vm'
			});
	});
export default loginModule;
