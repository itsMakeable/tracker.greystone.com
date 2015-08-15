import angular from 'angular';
import taskRowComponent from './task-row.component';

let taskRowModule = angular.module('taskRow', [])
	.directive('taskRow', taskRowComponent);

export default taskRowModule;
