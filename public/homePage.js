// Кномка логаут
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

// Обновление колнки курсов валют
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

// Пополнение баланса
let moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = data => {
	ApiConnector.addMoney(data, data => {
		if (data.success) {
			ProfileWidget.showProfile(data.data);
			moneyManager.setMessage(data.success, 'Баланс пополнен')
		}
	})
}

// Конвертация валют
moneyManager.conversionMoneyCallback = data => {
	ApiConnector.convertMoney(data, data => {
		if (data.success) {
			ProfileWidget.showProfile(data.data);
			moneyManager.setMessage(data.success, 'Валюта конвертирована')
		} else {
			moneyManager.setMessage(!data.success, 'Произошла ошибка')
		}
	})
}

//Перевод между пользователями
moneyManager.sendMoneyCallback = data => {
	ApiConnector.transferMoney(data, data => {
		if (data.success) {
			ProfileWidget.showProfile(data.data);
			moneyManager.setMessage(data.success, 'Сумма переведена выбранному клиенту') 
		} else {
			moneyManager.setMessage(!data.success, 'Произошла ошибка')
		}
	})
}

/*
1. Запишите в свойство sendMoneyCallback функцию, которая будет выполнять запрос.
2. Внутри функции выполните запрос на перевод валюты (transferMoney).
3. Используйте аргумент функции свойства sendMoneyCallback для передачи данных в запрос.
4. После выполнения запроса выполните проверку успешности запроса.
5. В случае успешного запроса отобразите в профиле новые данные о пользователе из данных ответа от сервера (showProfile).
6. Также выведите сообщение об успехе или ошибку (причину неудачного действия) пополнении баланса в окне отображения сообщения (setMessage). 
*/

//Заполнения таблицы избранных пользователей
let favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(data => {
	if (data.success) {
		favoritesWidget.clearTable();
		favoritesWidget.fillTable(data.data);
		moneyManager.updateUsersList(data.data)
	}
})

//Добавление пользователя в избранное
favoritesWidget.addUserCallback(data => {
	
	ApiConnector.addUserToFavorites(data, data => {
		
		if (data.success) {
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(data.data);
			moneyManager.updateUsersList(data.data)
		} else {
			console.log(data)
		}
	})
})

/*1. Создайте объект типа `FavoritesWidget`
3. Реализуйте добавления пользователя в список избранных:
	1. Запишите в свойство `addUserCallback` функцию, которая будет выполнять запрос.
	2. Внутри функции выполните запрос на добавление пользователя (`addUserToFavorites`).
	3. Используйте аргумент функции свойства `addUserCallback` для передачи данных пользователя в запрос.
	4. После выполнения запроса выполните проверку успешности запроса.
	5. 2. В колбеке запроса проверяйте успешность запроса.
	3. При успешном запросе очистите текущий список избранного (`clearTable`).
	4. Отрисуйте полученные данные (`fillTable`).
	5. Заполните выпадающий список для перевода денег (`updateUsersList`).
	6. Также выведите сообщение об успехе или *ошибку* (причину неудачного действия) добавлении пользователя в окне отображения сообщения (`setMessage`).
4. Реализуйте удаление пользователя из избранного
	1. Запишите в свойство `removeUserCallback` функцию, которая будет выполнять запрос.
	2. Внутри функции выполните запрос на удаление пользователя (`removeUserFromFavorites`).
	3. Используйте аргумент функции свойства `removeUserCallback` для передачи данных пользователя в запрос.
	4. После запроса выполните пункты 3.4-3.6 */
