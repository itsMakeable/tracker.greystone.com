import angular from 'angular';
import Field from './field/field';
import File from './file/file';
import Event from './event/event';
import Milestone from './milestone/milestone';
import Project from './project/project';
import Response from './response/response';
import Task from './task/task';
import User from './user/user';

let modelsModule = angular.module('models.common', [
	Field.name,
	File.name,
	Event.name,
	Milestone.name,
	Project.name,
	Response.name,
	Task.name,
	User.name,
]);

export default modelsModule;
