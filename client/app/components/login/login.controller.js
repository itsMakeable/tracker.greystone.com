class LoginController {
	constructor(User, $state) {
		this.User = User;
		this.$state = $state;
	}
	login() {
		if (this.loginForm.$valid) {
			this.User.signin(this.email, this.password)
				.then(() => {
					this.$state.go('property', {
						fromLogin: true
					});
				})
				.catch(() => {
					this.errorMessage = 'Invalid Login';
				});
		} else {
			this.loginForm.$setSubmitted();
			this.errorMessage = 'Invalid Email';
		}
	}
}


export default LoginController;
