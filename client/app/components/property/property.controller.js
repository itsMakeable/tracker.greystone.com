class PropertyController {
	constructor(File, project, User, $scope, fromLogin) {
		this.File = File;
		this.project = project;
		this.fromLogin = fromLogin;
		User.findAll({})
			.then(users => {
				console.log(users);
			});

		UPDATE_HEIGHT();

		function UPDATE_HEIGHT() {
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

		$scope.$on('UPDATE_HEIGHT', function() {
			UPDATE_HEIGHT();
		});
	}
	updateFile() {
		this.File.update(3, {
				name: 'leandro.jpg'
			})
			.then(file => {
				console.log(file);
			})
			.catch(error => {
				console.log(error);
			});
	}
}


export default PropertyController;
