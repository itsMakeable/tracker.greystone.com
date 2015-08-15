import angular from 'angular';
import sideBarComponent from './side-bar.component';

let sideBarModule = angular.module('sideBar', [])
	.directive('sideBar', sideBarComponent);

export default sideBarModule;
