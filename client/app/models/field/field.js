import angular from 'angular';
import FieldFactory from './field.factory';

let fieldModule = angular.module('fieldModel', [])
	.factory('Field', FieldFactory);

export default fieldModule;
