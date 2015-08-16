import angular from 'angular';
import userNotificationComponent from './user-notification.component';

let userNotificationModule = angular.module('userNotification', [])
	.directive('userNotification', userNotificationComponent);

export default userNotificationModule;
