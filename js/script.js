document.addEventListener('DOMContentLoaded', () => {
    const tg = window.Telegram.WebApp;
    tg.ready();

    // Получаем все элементы
    const choicesButtons = document.querySelectorAll('.choice-btn');
    const statusDiv = document.getElementById('status');
    const playerScoreSpan = document.getElementById('player-score');
    const botScoreSpan = document.getElementById('bot-score');
    const resultsDiv = document.getElementById('results');
    const playerChoiceResult = document.getElementById('player-choice-result');
    const botChoiceResult = document.getElementById('bot-choice-result');
    const choicesDiv = document.getElementById('choices');
    const playAgainBtn = document.getElementById('play-again');

    let playerScore = 0;
    let botScore = 0;
    const choices = ['rock', 'paper', 'scissors'];
    const emojiMap = {
        rock: '✊',
        paper: '✋',
        scissors: '✌️'
    };

    // Функция для хода игры
    function playGame(playerChoice) {
        // Скрываем кнопки выбора
        choicesDiv.classList.add('hidden');

        // Генерируем ход бота
        const botChoice = choices[Math.floor(Math.random() * choices.length)];
        
        // Определяем победителя
        let resultText = '';
        if (playerChoice === botChoice) {
            resultText = 'Ничья!';
        } else if (
            (playerChoice === 'rock' && botChoice === 'scissors') ||
            (playerChoice === 'scissors' && botChoice === 'paper') ||
            (playerChoice === 'paper' && botChoice === 'rock')
        ) {
            resultText = 'Вы победили!';
            playerScore++;
        } else {
            resultText = 'Вы проиграли...';
            botScore++;
        }

        // Обновляем счет
        playerScoreSpan.textContent = playerScore;
        botScoreSpan.textContent = botScore;

        // Показываем результаты
        playerChoiceResult.textContent = emojiMap[playerChoice];
        botChoiceResult.textContent = emojiMap[botChoice];
        resultsDiv.style.visibility = 'visible';
        resultsDiv.style.opacity = '1';

        // Обновляем статус и показываем кнопку "Играть снова"
        statusDiv.textContent = resultText;
        playAgainBtn.classList.remove('hidden');
    }

    // Функция для сброса игры
    function resetGame() {
        statusDiv.textContent = 'Сделайте ваш ход!';
        choicesDiv.classList.remove('hidden');
        resultsDiv.style.visibility = 'hidden';
        resultsDiv.style.opacity = '0';
        playAgainBtn.classList.add('hidden');
    }

    // Навешиваем обработчики на кнопки выбора
    choicesButtons.forEach(button => {
        button.addEventListener('click', () => {
            const choice = button.dataset.choice;
            playGame(choice);
        });
    });

    // Обработчик на кнопку "Играть снова"
    playAgainBtn.addEventListener('click', resetGame);
});