import angular from 'angular';
import Services from './services/services';
import Directives from './directives/directives';
import font from '../assets/font.css';

let commonModule = angular.module('roomho.common', [
	Services.name,
	Directives.name,
]);

export default commonModule;
