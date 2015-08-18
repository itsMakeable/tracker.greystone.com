class DocumentController {
	constructor(User) {
		this.User = User;
	}
	updatePassword() {
		this.User.resetPassword(this.user_id, this.password)
			.then(() => {
				alert('Password Reseted');
			})
			.catch(() => {
				alert('Error');
			});
	}
}


export default DocumentController;
