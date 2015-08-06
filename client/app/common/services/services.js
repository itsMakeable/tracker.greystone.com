import angular from 'angular';
import LocalStorage from './local-storage/local-storage';
import AuthInterceptor from './auth-interceptor/auth-interceptor';

let servicesModule = angular.module('services.common', [
	LocalStorage.name,
	AuthInterceptor.name
]);

export default servicesModule;
