import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngMessages from 'angular-messages';
import jsData from 'js-data';
import jsDataAngular from 'js-data-angular';
require('../../node_modules/ng-file-upload/dist/ng-file-upload.js');
import appStyles from './styl/index.styl';

var server = 'http://69.164.209.184:8080';
// var server = 'http://localhost:8080';

import io from 'socket.io-client';
var socket = io(server);

socket.on('connect', function() {});
socket.on('event', function(data) {});
socket.on('disconnect', function() {});

import Common from './common/common';
import Components from './components/components';
import Models from './models/models';
import AppComponent from './app.component';

angular.module('app', [
		'ngFileUpload',
		jsDataAngular,
		ngMessages,
		uiRouter,
		Common.name,
		Components.name,
		Models.name
	])
	.config((DSProvider, DSHttpAdapterProvider, $httpProvider, $urlRouterProvider) => {

		if (window.localStorage.auth_token) {
			$urlRouterProvider.otherwise('/property');
		} else {
			$urlRouterProvider.otherwise('/login');
		}

		DSProvider.defaults.basePath = server;
		$httpProvider.useApplyAsync(true);

	})
	.run(($rootScope, User, $state) => {

		$rootScope.$on('$stateChangeError', (event, toState, toParams, fromState, fromParams, error) => {
			console.log('$stateChangeError');
			if (error.notAuthenticated) {
				$state.go('login');
			}
		});

		$rootScope.$on('$stateChangeSuccess', (event, toState, toParams, fromState, fromParams) => {
			console.log($state.current);
			$rootScope.current = $state.current;
		});

	})
	.directive('app', AppComponent)
	.value('socket', socket);
