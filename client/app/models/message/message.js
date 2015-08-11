import angular from 'angular';
import MessageFactory from './message.factory';

let messageModule = angular.module('messageModel', [])
	.factory('Message', MessageFactory);

export default messageModule;
