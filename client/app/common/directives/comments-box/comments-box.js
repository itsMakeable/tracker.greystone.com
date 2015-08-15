import angular from 'angular';
import commentsBoxComponent from './comments-box.component';

let commentsBoxModule = angular.module('commentsBox', [])
	.directive('commentsBox', commentsBoxComponent);

export default commentsBoxModule;
