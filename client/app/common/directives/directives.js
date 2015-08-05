import angular from 'angular';
import Navbar from './navbar/navbar';
import Hero from './hero/hero';

let directivesModule = angular.module('directives.common', [
	Navbar.name,
	Hero.name,
]);

export default directivesModule;
