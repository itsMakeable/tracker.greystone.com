import angular from 'angular';

import About from './about/about';
import Document from './document/document';
import Home from './home/home';
import Login from './login/login';
import Milestone from './milestone/milestone';
import PrivacyPolicy from './privacy-policy/privacy-policy';
import Property from './property/property';
import PropertySwitcher from './property-switcher/property-switcher';
import Settings from './settings/settings';
import SignUp from './sign-up/sign-up';
import Task from './task/task';
import TermsAndConditions from './terms-and-conditions/terms-and-conditions';
import UserProfile from './user-profile/user-profile';

console.log(Milestone.name);

let componentModule = angular.module('app.components', [
	About.name,
	Document.name,
	Home.name,
	Login.name,
	Milestone.name,
	PrivacyPolicy.name,
	Property.name,
	PropertySwitcher.name,
	Settings.name,
	SignUp.name,
	Task.name,
	TermsAndConditions.name,
	UserProfile.name
]);

export default componentModule;
