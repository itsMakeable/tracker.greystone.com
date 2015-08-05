import angular from 'angular';
import FieldFactory from './field.factory';

let fieldModule = angular.module('field', [])
	.factory('Field', FieldFactory);

export default fieldModule;
