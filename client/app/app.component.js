import template from './app.jade';
import './app.styl';

let appComponent = () => {
	return {
		template, // because we have a variable name template we can use the shorcut here
		restrict: 'E'
	};
};

export default appComponent;
