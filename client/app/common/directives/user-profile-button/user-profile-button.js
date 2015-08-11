import angular from 'angular';
import userProfileButtonComponent from './user-profile-button.component';

let userProfileButtonModule = angular.module('userProfileButton', [])
	.directive('userProfileButton', userProfileButtonComponent);

export default userProfileButtonModule;
