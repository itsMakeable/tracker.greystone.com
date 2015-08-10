import angular from 'angular';

import About from './about/about';
import Home from './home/home';
import HomeScreen from './homeScreen/homeScreen';
import Login from './login/login';
import MessagesView from './messagesView/messagesView';
import ProjectView from './projectView/projectView';
import SignUp from './signUp/signUp';
import TaskView from './taskView/taskView';

let componentModule = angular.module('app.components', [
	About.name,
	Home.name,
	HomeScreen.name,
	Login.name,
	MessagesView.name,
	ProjectView.name,
	SignUp.name,
	TaskView.name
]);

export default componentModule;
