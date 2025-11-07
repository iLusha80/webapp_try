import asyncio
import os
import sys

from aiogram import Bot, Dispatcher, html
from aiogram.client.default import DefaultBotProperties
from aiogram.enums import ParseMode
from aiogram.filters import CommandStart
from aiogram.types import Message, WebAppInfo, ReplyKeyboardMarkup, KeyboardButton

from dotenv import load_dotenv
from loguru import logger

# --- Загрузка переменных окружения ---
# Загружаем переменные из файла .env в окружение
load_dotenv()

# Считываем переменные из окружения
BOT_TOKEN = os.getenv("BOT_TOKEN")
WEB_APP_URL = os.getenv("WEB_APP_URL")

# --- Настройка логирования ---
# Удаляем стандартный обработчик и добавляем свой с нужным форматом
logger.remove()
logger.add(sys.stderr, format="<green>{time:YYYY-MM-DD HH:mm:ss}</green> | <level>{level: <8}</level> | <cyan>{name}</cyan>:<cyan>{function}</cyan>:<cyan>{line}</cyan> - <level>{message}</level>")


# --- Основная логика бота ---
dp = Dispatcher()


@dp.message(CommandStart())
async def command_start_process(message: Message):
    """
    Обработчик команды /start. Отправляет приветственное сообщение
    с кнопкой для запуска Web App.
    """
    # Проверка, что URL веб-приложения задан
    if not WEB_APP_URL:
        await message.answer("Ошибка: URL веб-приложения не настроен.")
        logger.error("Переменная окружения WEB_APP_URL не задана!")
        return

    logger.info(f"Пользователь {message.from_user.id} запустил бота.")

    # Создаем кнопку, которая будет открывать наше веб-приложение
    button = KeyboardButton(
        text="🚀 Показать информацию обо мне",
        web_app=WebAppInfo(url=WEB_APP_URL)
    )
    
    # Создаем клавиатуру
    keyboard = ReplyKeyboardMarkup(keyboard=[[button]], resize_keyboard=True)

    await message.answer(
        f"Привет, {html.bold(message.from_user.full_name)}!\nНажми на кнопку ниже, чтобы узнать свой ID и ник.",
        reply_markup=keyboard
    )


async def main() -> None:
    """
    Главная функция, которая запускает бота.
    """
    # Проверка наличия токена перед запуском
    if not BOT_TOKEN:
        logger.critical("Не найден токен бота в .env файле! Бот не может быть запущен.")
        return

    # Инициализируем бота и диспетчер
    bot = Bot(token=BOT_TOKEN, default=DefaultBotProperties(parse_mode=ParseMode.HTML))
    
    logger.info("Бот запускается...")
    # Запускаем polling
    await dp.start_polling(bot)


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except (KeyboardInterrupt, SystemExit):
        logger.info("Бот остановлен.")
