class LoginController {
	constructor(User, $state) {
		this.User = User;
		this.$state = $state;
	}
	login() {
		this.User.signin(this.email, this.password)
			.then(() => {
				this.$state.go('property');
			})
			.catch(() => {

			});
	}
}


export default LoginController;
