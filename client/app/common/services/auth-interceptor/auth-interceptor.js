import angular from 'angular';
import AuthInterceptor from './auth-interceptor.factory';

let authInterceptorModule = angular.module('auth-interceptor', [])
	.factory('AuthInterceptor', AuthInterceptor)
	.config($httpProvider => {
		$httpProvider.interceptors.push('AuthInterceptor');
	});

export default authInterceptorModule;
