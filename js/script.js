// Функция для вывода логов на страницу
function logToPage(message) {
    const logOutput = document.getElementById('log-output');
    if (logOutput) {
        const timestamp = new Date().toISOString();
        // Для объектов и массивов используем JSON.stringify для красивого вывода
        const formattedMessage = typeof message === 'object' ? JSON.stringify(message, null, 2) : message;
        logOutput.textContent += `${timestamp}: ${formattedMessage}\n`;
        // Автоматическая прокрутка вниз
        logOutput.scrollTop = logOutput.scrollHeight;
    }
    // Также выводим в консоль для обратной совместимости и удобства отладки в браузере
    console.log(message);
}

// Добавляем подробное логирование состояния объекта window.Telegram.WebApp сразу после загрузки скрипта
logToPage('Initial window.Telegram.WebApp state:', window.Telegram.WebApp);

// Получаем объект Web App
const tg = window.Telegram.WebApp;

let userInfoDisplayed = false; // Флаг для отображения данных пользователя только один раз

// Функция для отображения информации о пользователе и отладки
function displayUserInfo() {
    const userInfoElement = document.getElementById('user-info');
    let debugMessages = [];

    if (userInfoDisplayed) {
        const message = 'Данные пользователя уже были отображены. Пропускаем повторное отображение.';
        debugMessages.push(message);
        logToPage(message);
        // Обновляем отладочную информацию на странице, даже если данные пользователя не отображаются повторно
        userInfoElement.innerHTML += `<br><br><strong>Отладочная информация:</strong><br>${debugMessages.join('<br>')}`;
        return;
    }

    debugMessages.push('Вызов displayUserInfo()...');
    logToPage('Вызов displayUserInfo()...');

    debugMessages.push(`tg.initData: ${tg.initData ? 'Присутствует' : 'Отсутствует'}`);
    logToPage('tg.initData:', tg.initData);

    debugMessages.push(`tg.initDataUnsafe: ${tg.initDataUnsafe ? 'Присутствует' : 'Отсутствует'}`);
    logToPage('tg.initDataUnsafe:', tg.initDataUnsafe);

    const user = tg.initDataUnsafe?.user;

    if (user) {
        debugMessages.push('Данные пользователя получены.');
        logToPage('User data received:', user);

        const username = user.username
            ? `@${user.username}`
            : `${user.first_name} ${user.last_name || ''}`.trim();

        const userInfoText = `
            Твой ID: <span>${user.id}</span>
            <br>
            Твой ник: <span>${username}</span>
        `;
        userInfoElement.innerHTML = userInfoText;
        userInfoDisplayed = true; // Устанавливаем флаг, что данные отображены
    } else {
        debugMessages.push('Не удалось получить данные о пользователе.');
        logToPage('No user data received.');
        userInfoElement.innerHTML = "Не удалось получить данные о пользователе. <br> Возможно, вы открыли страницу не через Telegram.";
    }

    // Выводим отладочную информацию на страницу
    userInfoElement.innerHTML += `<br><br><strong>Отладочная информация:</strong><br>${debugMessages.join('<br>')}`;
}

// Сообщаем Telegram, что приложение готово
logToPage('Calling tg.ready()...');
tg.ready();
logToPage('tg.ready() called.');

// Показываем основную кнопку
tg.MainButton.setText('Показать инфо').show();

// Триггеры для вызова displayUserInfo
// 1. При загрузке DOM
document.addEventListener('DOMContentLoaded', displayUserInfo);

// 2. При изменении viewport (может указывать на готовность Web App)
tg.onEvent('viewportChanged', displayUserInfo);

// 3. При клике по основной кнопке
tg.onEvent('mainButtonClicked', displayUserInfo);

// Изначальный вызов displayUserInfo() удален, так как теперь есть DOMContentLoaded
// displayUserInfo();