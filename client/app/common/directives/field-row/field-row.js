import angular from 'angular';
import fieldRowComponent from './field-row.component';

let fieldRowModule = angular.module('fieldRow', [])
	.directive('fieldRow', fieldRowComponent);

export default fieldRowModule;
