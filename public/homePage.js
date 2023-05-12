'use stict'

// Кнопка логаут
let logout = new LogoutButton();

logout.action = () => {
	ApiConnector.logout(() => {
		if (logout.logoutClick) {
			document.location.reload();
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
		} else {
			moneyManager.setMessage(!data.success, data.error)
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
			moneyManager.setMessage(!data.success, data.error)
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
			moneyManager.setMessage(!data.success, data.error)
		}
	})
}

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
favoritesWidget.addUserCallback = data => {
	ApiConnector.addUserToFavorites(data, data => {
		if (data.success) {
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(data.data);
			moneyManager.updateUsersList(data.data)
		} else {
			moneyManager.setMessage(!data.success, data.error)
		}
	})
}

// Удаление из избранного 
favoritesWidget.removeUserCallback = data => {
	ApiConnector.removeUserFromFavorites(data, data => {
		if (data.success) {
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(data.data);
			moneyManager.updateUsersList(data.data)
		} else {
			moneyManager.setMessage(!data.success, data.error)
		}
	})
}

