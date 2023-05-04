'use stict'

let userForm = new UserForm();

userForm.loginFormCallback = data => ApiConnector.login(data, response => {
	if (response) {
		location.reload();
	}
});

userForm.registerFormCallback = data => ApiConnector.register(data, response => {
	if (response) {
		location.reload();
	}
});