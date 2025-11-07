// Получаем объект Web App
const tg = window.Telegram.WebApp;

// Функция для отображения информации о пользователе
function displayUserInfo() {
    const userInfoElement = document.getElementById('user-info');
    const user = tg.initDataUnsafe?.user;

    // Для отладки
    console.log('initDataUnsafe:', tg.initDataUnsafe);

    if (user) {
        // Если есть username, используем его, если нет - собираем имя из first_name и last_name
        const username = user.username 
            ? `@${user.username}` 
            : `${user.first_name} ${user.last_name || ''}`.trim();

        // Формируем строку для вывода
        const userInfoText = `
            Твой ID: <span>${user.id}</span>
            <br>
            Твой ник: <span>${username}</span>
        `;

        // Выводим информацию
        userInfoElement.innerHTML = userInfoText;

    } else {
        // Если данные не пришли
        userInfoElement.innerHTML = "Не удалось получить данные о пользователе. <br> Возможно, вы открыли страницу не через Telegram.";
    }
}

// Сообщаем Telegram, что приложение готово
tg.ready();

// Показываем основную кнопку
tg.MainButton.setText('Показать инфо').show();

// Пробуем отобразить информацию сразу
displayUserInfo();

// Добавляем обработчик на клик по основной кнопке
tg.onEvent('mainButtonClicked', function() {
    // При клике еще раз пробуем отобразить информацию
    displayUserInfo();
});