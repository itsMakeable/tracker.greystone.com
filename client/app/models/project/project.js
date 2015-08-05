import angular from 'angular';
import ProjectFactory from './project.factory';

let projectModule = angular.module('project', [])
	.factory('Project', ProjectFactory);

export default projectModule;
