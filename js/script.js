document.addEventListener('DOMContentLoaded', () => {
    const tg = window.Telegram.WebApp;

    // Элементы для вывода
    const userInfoElement = document.getElementById('user-info');
    const jsonOutputElement = document.getElementById('json-output');

    // Сообщаем Telegram, что приложение готово
    tg.ready();

    // Проверяем наличие данных
    if (tg.initDataUnsafe && tg.initData) {
        const user = tg.initDataUnsafe.user;

        // --- 1. Заполняем верхний блок с информацией о пользователе ---
        if (user) {
            const username = user.username 
                ? `@${user.username}` 
                : `${user.first_name} ${user.last_name || ''}`.trim();

            userInfoElement.innerHTML = `
                ID: <span>${user.id}</span>
                <br>
                Ник: <span>${username}</span>
            `;
        } else {
            userInfoElement.innerText = 'Информация о пользователе отсутствует.';
        }

        // --- 2. Форматируем и выводим весь JSON-объект ---
        // JSON.stringify(value, replacer, space)
        // value - наш объект
        // replacer - null (не изменяем ничего)
        // space - 2 (количество пробелов для отступа, делает JSON читаемым)
        const formattedJson = JSON.stringify(tg.initDataUnsafe, null, 2);
        
        jsonOutputElement.textContent = formattedJson;

    } else {
        // Если открыто не в Telegram
        document.querySelector('.container').innerHTML = '<h1>Ошибка</h1><p>Пожалуйста, запустите это приложение из клиента Telegram.</p>';
    }
});