import angular from 'angular';
import fileBoxComponent from './file-box.component';

let fileBoxModule = angular.module('fileBox', [])
	.directive('fileBox', fileBoxComponent);

export default fileBoxModule;
