import angular from 'angular';
import MilestoneFactory from './milestone.factory';

let milestoneModule = angular.module('milestoneModel', [])
	.factory('Milestone', MilestoneFactory);

export default milestoneModule;
