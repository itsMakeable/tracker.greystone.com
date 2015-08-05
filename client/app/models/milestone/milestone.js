import angular from 'angular';
import MilestoneFactory from './milestone.factory';

let milestoneModule = angular.module('milestone', [])
	.factory('Milestone', MilestoneFactory);

export default milestoneModule;
