import angular from 'angular';
import projectChartComponent from './project-chart.component';

let projectChartModule = angular.module('projectChart', [])
	.directive('projectChart', projectChartComponent);


export default projectChartModule;
