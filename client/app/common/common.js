import angular from 'angular';
import Services from './services/services';
import Directives from './directives/directives';

let commonModule = angular.module('roomho.common', [
	Services.name,
	Directives.name,
]);

export default commonModule;
