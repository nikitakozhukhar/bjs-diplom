'use stict'

//Вход в приложение
let userForm = new UserForm();

userForm.loginFormCallback = data => ApiConnector.login(data, response => {
	if (response.success) {
		console.log(response)
		document.location.reload();
	} else {
		console.error(response.error)
	}
});

//Регистрация нового пользователя
userForm.registerFormCallback = data => ApiConnector.register(data, response => {
	if (response.success) {
		document.location.reload();
	} else {
		console.error(response.error)
	}
})
