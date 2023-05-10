'use stict'

let userForm = new UserForm();


userForm.loginFormCallback = data => ApiConnector.login(data, response => {
	if (response.success) {
		console.log(response)
		document.location.reload();
	} else {
		console.error(response.error)
	}
});

userForm.registerFormCallback = data => ApiConnector.register(data, response => console.log(response));
// 	{
// 	if (response.success) {
// 		console.log(response)
// 		location.reload();
// 	}
// 	else {
// 		console.error(response.error)
// 	}
// });