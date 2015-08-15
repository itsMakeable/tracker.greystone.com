import angular from 'angular';
import CommentsBox from './comments-box/comments-box';
import FieldRow from './field-row/field-row';
import FileBox from './file-box/file-box';
import SideBar from './side-bar/side-bar';
import TaskRow from './task-row/task-row';

let directivesModule = angular.module('directives.common', [
	CommentsBox.name,
	FieldRow.name,
	FileBox.name,
	SideBar.name,
	TaskRow.name
]);

export default directivesModule;
