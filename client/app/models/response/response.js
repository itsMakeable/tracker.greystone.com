import angular from 'angular';
import ResponseFactory from './response.factory';

let responseModule = angular.module('response', [])
	.factory('Response', ResponseFactory);

export default responseModule;
