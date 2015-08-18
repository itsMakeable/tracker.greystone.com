import angular from 'angular';
import TaskRecentlyCompleteFactory from './task-recently-complete.factory';

let taskRecentlyCompleteModule = angular.module('taskRecentlyCompleteModel', [])
	.factory('TaskRecentlyComplete', TaskRecentlyCompleteFactory);

export default taskRecentlyCompleteModule;
