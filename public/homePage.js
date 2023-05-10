let logOut = new LogoutButton();

logOut.action = e => {
	ApiConnector.logout(() => {
		if (logOut.logoutClick) {
			location.reload();
		}
	})
}

ApiConnector.current(data => {
	if (data.success) {
		ProfileWidget.showProfile(data.data);
	}
});


let ratestBoard = new RatesBoard();

ApiConnector.getStocks(data => {
	ratestBoard.clearTable();
	ratestBoard.fillTable(data.data);
})

let timerId = setInterval(() => {
	ApiConnector.getStocks(data => {
		if (data.success) {
			ratestBoard.clearTable();
			ratestBoard.fillTable(data.data);
		}

	})
}, 60000);

let moneyManager = new MoneyManager();

moneyManager.addMoneyCallback(data => console.log(data))

// console.log(moneyManager)
/*Создайте объект типа MoneyManager+
Реализуйте пополнение баланса:
Запишите в свойство addMoneyCallback функцию, которая будет выполнять запрос.
Внутри функции выполните запрос на пополнение баланса (addMoney).
Используйте аргумент функции свойства addMoneyCallback для передачи данных data в запрос.
После выполнения запроса выполните проверку успешности запроса.
В случае успешного запроса отобразите в профиле новые данные о пользователе из данных ответа от сервера (showProfile).
Также выведите сообщение об успехе или ошибку (причину неудачного действия) пополнении баланса в окне отображения сообщения (setMessage).
Реализуйте конвертирование валюты:
Запишите в свойство conversionMoneyCallback функцию, которая будет выполнять запрос.
Внутри функции выполните запрос на конвертацию баланса (convertMoney)
Используйте аргумент функции свойства conversionMoneyCallback для передачи данных в запрос.
Повторите пункты 2.4-2.7
Реализуйте перевод валюты:
Запишите в свойство sendMoneyCallback функцию, которая будет выполнять запрос.
Внутри функции выполните запрос на перевод валюты (transferMoney).
Используйте аргумент функции свойства sendMoneyCallback для передачи данных в запрос.
Повторите пункты 2.4-2.7 */