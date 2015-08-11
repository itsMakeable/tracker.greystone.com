import angular from 'angular';
import Navbar from './navbar/navbar';
import UserProfileButton from './user-profile-button/user-profile-button';

let directivesModule = angular.module('directives.common', [
	Navbar.name,
	UserProfileButton.name,
]);

export default directivesModule;
