class LoginController {
	constructor(User, $state) {
		this.User = User;
		this.$state = $state;
	}
	login() {
		console.log(this.loginForm);
		if (this.loginForm.$valid) {
			console.log(this.email);
			console.log(this.password);
			this.User.signin(this.email, this.password)
				.then(() => {
					this.$state.go('property');
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
