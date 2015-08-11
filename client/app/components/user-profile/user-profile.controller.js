class UserProfileController {
	constructor(LocalStorage, $state, User) {
		this.LocalStorage = LocalStorage;
		this.$state = $state;
		this.User = User;
	}
	logout() {
		this.LocalStorage.removeItem('auth_token');
		this.$state.go('login');
	}
}


export default UserProfileController;
