import angular from 'angular';
import bootstrapWebpack from 'bootstrap-webpack';
import uiRouter from 'angular-ui-router';
import angularUIBootstrap from 'angular-ui-bootstrap';
import ngMessages from 'angular-messages';
import angularToastr from 'angular-toastr';
import jsData from 'js-data';
import jsDataAngular from 'js-data-angular';
require('../../node_modules/angular-toastr/dist/angular-toastr.css');

import io from 'socket.io-client';
var socket = io('http://69.164.209.184:8080');

socket.on('connect', function() {});
socket.on('event', function(data) {});
socket.on('disconnect', function() {});

import Common from './common/common';
import Components from './components/components';
import Models from './models/models';
import AppComponent from './app.component';
import 'normalize.css';

angular.module('app', [
		jsDataAngular,
		angularToastr,
		ngMessages,
		angularUIBootstrap,
		uiRouter,
		Common.name,
		Components.name,
		Models.name
	])
	.config((DSProvider, DSHttpAdapterProvider, $httpProvider, $locationProvider) => {

		DSProvider.defaults.basePath = 'http://69.164.209.184:8080/api';
		$httpProvider.useApplyAsync(true);

	})
	.directive('app', AppComponent)
	.value('socket', socket);
