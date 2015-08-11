import angular from 'angular';
import ProjectFactory from './project.factory';

let projectModule = angular.module('projectModel', [])
	.factory('Project', ProjectFactory);

export default projectModule;
