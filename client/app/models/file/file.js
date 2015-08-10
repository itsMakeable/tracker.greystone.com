import angular from 'angular';
import FileFactory from './file.factory';

let fileModule = angular.module('file', [])
	.factory('File', FileFactory);

export default fileModule;
