import angular from 'angular';

let equalHeightDirective = function() {
	return {
		restrict: 'E',
		link: function($scope) {

			console.warn('equalHeight');

			var elements = [];
			var sideBar = document.getElementById('sideBar');
			elements.push(sideBar);
			var mainContent = document.getElementById('mainContent');
			elements.push(mainContent);
			console.warn('ELEMENTES');
			console.log(elements);

			UPDATE_HEIGHT();

			function UPDATE_HEIGHT() {
				console.log('UPDATE_HEIGHT');
				var tallest = 0;
				angular.forEach(elements, function(element) {
					console.log(element);
					var thisHeight = angular.element(element)[0].scrollHeight;
					console.log(thisHeight);
					if (thisHeight > tallest) {
						tallest = thisHeight;
					}
				});

				angular.forEach(elements, function(element) {
					console.log(thisHeight);
					angular.element(element).css('height', tallest + 'px');
				});
			}

			$scope.$on('UPDATE_HEIGHT', function() {
				UPDATE_HEIGHT();
			});
		}
	};
};


let equalHeightDirectiveModule = angular.module('equalHeightDirective', [])
	.directive('equalHeight', equalHeightDirective);

export default equalHeightDirectiveModule;
