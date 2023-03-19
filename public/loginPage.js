'use stict'

let userForm = new UserForm;

userForm.loginFormCallback = data => console.log(data);
userForm.registerFormCallback = data => console.log(data);
