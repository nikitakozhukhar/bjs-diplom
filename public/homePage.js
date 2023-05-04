let logOut = new LogoutButton();

logOut.action = ApiConnector.logout(location.reload())

/*Создайте объект класса LogoutButton. В свойство action запишите функцию, которая будет вызывать запрос деавторизации (logout). В колбек запроса добавьте проверку: если запрос выполнился успешно, то обновите страницу (с помощью location.reload();).*/