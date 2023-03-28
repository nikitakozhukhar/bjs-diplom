'use stict'

let userForm = new UserForm();

userForm.loginFormCallback = data => ApiConnector.login(data, location.reload);
userForm.registerFormCallback = data => ApiConnector.register(data, console.log);