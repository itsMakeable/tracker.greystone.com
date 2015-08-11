import angular from 'angular';
import ResponseFactory from './response.factory';

let responseModule = angular.module('responseModel', [])
	.factory('Response', ResponseFactory);

export default responseModule;
