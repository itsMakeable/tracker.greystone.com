class UserProfileController {
	constructor($state, User, user) {
		this.$state = $state;
		this.User = User;
		this.user = user;
	}
	logout() {
		this.User.logout();
		this.$state.go('login');
	}
	goToSettings() {
		this.$state.go('settings');
	}
}


export default UserProfileController;
