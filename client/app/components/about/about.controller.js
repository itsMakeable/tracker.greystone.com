class AboutController {
	constructor(User) {
		this.User = User;
	}
	signup() {
		this.User.signup();
	}
	signin() {
		this.User.signin();
	}
}

export default AboutController;
