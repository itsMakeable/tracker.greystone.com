import angular from 'angular';
import LocalStorageFactory from './local-storage.factory';

let localStorageModule = angular.module('local-storage', [])
	.factory('LocalStorage', LocalStorageFactory);

export default localStorageModule;
