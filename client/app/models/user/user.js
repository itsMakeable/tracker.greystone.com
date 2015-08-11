import angular from 'angular';
import UserFactory from './user.factory';

let userModule = angular.module('userModel', [])
	.factory('User', UserFactory);

export default userModule;
