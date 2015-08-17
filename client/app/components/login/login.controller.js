class LoginController {
	constructor(User, $state) {
		this.User = User;
		this.$state = $state;
	}
	login() {
		console.log(this.loginForm);
		if (this.loginForm.$valid) {
			this.User.signin(this.email, this.password)
				.then(() => {
					this.$state.go('property');
				})
				.catch(() => {

				});
		} else {
			this.loginForm.$setSubmitted();
		}

	}
}


export default LoginController;
