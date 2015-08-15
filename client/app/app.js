import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngMessages from 'angular-messages';
import angularToastr from 'angular-toastr';
import jsData from 'js-data';
import jsDataAngular from 'js-data-angular';
require('../../node_modules/ng-file-upload/dist/ng-file-upload.js');
import appStyles from './styl/index.styl';

var server = 'http://69.164.209.184:8080';
var local = 'http://localhost:8080';

import io from 'socket.io-client';
var socket = io(local);

socket.on('connect', function() {});
socket.on('event', function(data) {});
socket.on('disconnect', function() {});

import Common from './common/common';
import Components from './components/components';
import Models from './models/models';
import AppComponent from './app.component';
import 'normalize.css';

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

		DSProvider.defaults.basePath = local;
		$httpProvider.useApplyAsync(true);

	})
	.run(($rootScope, User, $state) => {

		$rootScope.$on('$stateChangeError', (event, toState, toParams, fromState, fromParams, error) => {
			console.log('$stateChangeError');
			if (error.notAuthenticated) {
				$state.go('login');
			}
		});

	})
	.directive('app', AppComponent)
	.value('socket', socket);
