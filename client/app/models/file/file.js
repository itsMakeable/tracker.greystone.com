import angular from 'angular';
import FileFactory from './file.factory';

let fileModule = angular.module('fileModel', [])
	.factory('File', FileFactory);

export default fileModule;
