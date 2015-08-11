class UserProfileButtonController {
	constructor($state, User) {
		this.$state = $state;
		this.userId = User.getCurrentUser().user_id;
	}
	onClick() {
		this.$state.go('userProfile', {
			userId: this.userId
		});
	}
}


export default UserProfileButtonController;
