// Ждем, когда DOM будет полностью загружен, и только потом выполняем наш код
document.addEventListener('DOMContentLoaded', function() {
    // Получаем объект Web App
    const tg = window.Telegram.WebApp;

    // Сообщаем Telegram, что приложение готово к отображению
    tg.ready();

    const userInfoElement = document.getElementById('user-info');
    
    // Пытаемся получить данные пользователя
    const user = tg.initDataUnsafe?.user;

    // Для отладки: выводим в консоль полученные данные
    // Вы сможете увидеть это, если подключите отладку для Webview
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

        // Выводим информацию в наш элемент
        userInfoElement.innerHTML = userInfoText;

    } else {
        // Если по какой-то причине данные не пришли
        userInfoElement.innerHTML = "Не удалось получить данные о пользователе. <br> Возможно, вы открыли страницу не через Telegram.";
    }
});
