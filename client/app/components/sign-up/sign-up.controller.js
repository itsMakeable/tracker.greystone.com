class SignUpController {
	constructor(User, $state) {
		this.User = User;
		this.$state = $state;
		this.userModel = {};
	}
	submit() {
		if (this.signUpForm.$valid) {
			this.User.signup(this.userModel)
				.then(() => {
					this.$state.go('property');
				})
				.catch(data => {
					console.error(data);
				});
		} else {
			this.signUpForm.$setSubmitted();
		}
	}
}


export default SignUpController;
