class PropertyController {
	constructor(project, User, $scope, fromLogin, socket, $rootScope) {
		this.project = project;
		this.fromLogin = fromLogin;

		User.findAll({});

		socket.on('NEW_EVENT', () => {
			$rootScope.$broadcast('CHECK_EVENTS');
		});

		this.bindEvents($scope);
		this.updateHeight();
	}
	bindEvents($scope) {
		$scope.$on('UPDATE_HEIGHT', () => {
			this.updateHeight();
		});
	}
	updateHeight() {
		var elements = [];
		var sideBar = document.getElementById('sideBar');
		elements.push(sideBar);
		var mainContent = document.getElementById('mainContent');
		elements.push(mainContent);
		var tallest = 0;
		angular.forEach(elements, function(element) {
			angular.element(element).css('height', '');
			if (element) {
				var thisHeight = angular.element(element)[0].scrollHeight;
				if (thisHeight > tallest) {
					tallest = thisHeight;
				}
			}
		});

		angular.forEach(elements, function(element) {
			angular.element(element).css('height', tallest + 'px');
		});
	}
}


export default PropertyController;
