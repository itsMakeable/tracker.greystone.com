import angular from 'angular';
import TaskFactory from './task.factory';

let taskModule = angular.module('task', [])
	.factory('Task', TaskFactory);

export default taskModule;
