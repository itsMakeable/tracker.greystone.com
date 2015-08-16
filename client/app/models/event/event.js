import angular from 'angular';
import EventFactory from './event.factory';

let eventModule = angular.module('eventModel', [])
	.factory('Event', EventFactory);

export default eventModule;
