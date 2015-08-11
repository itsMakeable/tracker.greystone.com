import angular from 'angular';
import uiRouter from 'angular-ui-router';
import template from './<%= dashName %>.jade';
import controller from './<%= dashName %>.controller';
import './<%= dashName %>.styl';

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
