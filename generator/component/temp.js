import angular from 'angular';
import uiRouter from 'angular-ui-router';
import template from './<%= name %>.jade';
import controller from './<%= name %>.controller';
import './<%= name %>.styl';

let <%= name %>
Module = angular.module('<%= name %>', [
		uiRouter
	])
	.config(($stateProvider, $urlRouterProvider) => {

		$stateProvider
			.state('<%= name %>', {
				url: '/<%= name %>',
				template,
				controller,
				controllerAs: 'vm'
			});
	});
export default <%= name %>
Module;
