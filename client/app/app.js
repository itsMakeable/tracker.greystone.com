import angular from 'angular';
import bootstrapWebpack from 'bootstrap-webpack';
import uiRouter from 'angular-ui-router';
import angularUIBootstrap from 'angular-ui-bootstrap';
import ngMessages from 'angular-messages';
import angularToastr from 'angular-toastr';
import mentio from 'ment.io';

import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';
import 'normalize.css';

angular.module('app', [
		mentio,
		angularToastr,
		ngMessages,
		angularUIBootstrap,
		uiRouter,
		Common.name,
		Components.name
	])
	.directive('app', AppComponent);
