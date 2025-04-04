# Weather App

Это простое погодное приложение, созданное с использованием Vue.js, которое позволяет пользователям получать информацию о погоде для указанного города.

## Демо

- Проект развернут на Netlify: (ссылка на Netlify проект)

## Особенности

- **Получение текущей погоды:** Отображает текущую температуру, ощущаемую и максимальную температуру, влажность, скорость ветра, порывы ветра, направление ветра, количество осадков (за последний час), атмосферное давление и погодные условия для выбранного города.
- **Определение местоположения:** Определение погоды по геопозиции пользователя.
- **Интуитивно понятный интерфейс:** Простое и удобное взаимодействие с пользователем.
- **Обработка ошибок:** Отображает сообщения об ошибках, если город не найден, нет доступа к геолокации или при возникновении проблем с подключением к API. Используются уведомления для отображения ошибок и успешных операций.
- **Быстрый ввод:** Возможность запроса погоды нажатием клавиши `Enter` в поле ввода.
- **Очистка ввода:** Возможность очистки поля ввода и отображаемой информации нажатием клавиши `Esc`.
- **Кэширование данных:** Реализовано кэширование данных о погоде в `localStorage` для улучшения производительности и снижения нагрузки на API. Данные кэшируются на 1 час. Раздельное кэширование для данных о погоде по названию города и по геолокации.
- **Обновление погоды:** Добавлена возможность принудительного обновления данных о погоде для указанного в поле ввода городе с помощью кнопки "Обновить".
- **Уведомления:** Уведомления об успешной загрузке, обновлении погоды и ошибках.
- **Выбор языка:** Поддержка русского и английского языков.
- **Выбор единиц измерения:** Поддержка метрической (°C, м/с) и эмпирической (°F, миль/ч) систем измерения.
- **Выбор темы:** Переключение между светлой и темной темой.

## Технологии

- **Vue.js 3:** Прогрессивный JavaScript-фреймворк для создания пользовательских интерфейсов.
- **vue-i18n:** Плагин для реализации мультиязычности.
- **Axios:** HTTP-клиент на основе промисов для выполнения запросов к API.
- **OpenWeatherMap API:** Используется для получения данных о погоде.
- **localStorage:** Используется для кэширования данных о погоде.
- **Sass/SCSS:** Препроцессор CSS для организации стилей.

## Структура проекта

```bash
├── .vscode/           # Конфигурация VS Code
├── node_modules/      # Зависимости проекта
├── public/            # Статические файлы
│   └── favicon.ico
├── src/               # Исходный код приложения
│   ├── assets/        # Статические ресурсы (CSS, изображения)
│   │   └── main.css   # Главный файл стилей
│   ├── components/    # Vue компоненты:
│   │   ├── ButtonsGetWeather.vue   # Компонент поле ввода для названия города с валидацией
│   │   ├── InputWithValidation.vue # Компонент с кнопками для запроса погоды и обновления данных
│   │   ├── LanguageUnitSelect.vue  # Компонент для выбора языка и единиц измерения
│   │   ├── LoadingAnimation.vue  # Компонент индикатора загрузки
│   │   ├── SystemNotification.vue  # Компонент уведомлений
│   │   ├── ThemeSwitcher.vue       # Компонент переключателя темы
│   │   └── WeatherCard.vue         # Компонент карточки с данными о погоде для указанного в поле ввода города
│   ├── services/      # Сервисы для работы с OpenWeatherMap API
│   │   └── useWeatherApi.js
│   ├── utils/         # Утилиты для работы с кэшем
│   │   └── cacheUtils.js
│   ├── App.vue        # Главный компонент приложения
│   ├── i18n.js        # Конфигурация i18n -  Файл локализации для разных языков
│   ├── main.js        # Точка входа
├── .env               # Переменные окружения
├── .gitattributes     # Атрибуты Git
├── .gitignore         # Игнорируемые файлы Git
├── index.html         # HTML страница
├── LICENSE            # Лицензия
├── package.json       # Информация о проекте и зависимости
├── .editorconfig      # Конфигурация EditorConfig
├── .prettierrc.json   # Конфигурация Prettier
├── eslint.config.js   # Конфигурация ESLint
├── package-lock.json  # Заблокированные версии зависимостей
├── README.md          # Этот файл
└── vite.config.js     # Конфигурация Vite
```

## Установка и запуск

1.  **Клонируйте репозиторий:**

```bash
git clone <ссылка_на_репозиторий>
```

2.  **Перейдите в каталог проекта:**

```bash
cd <название_каталога_проекта>
```

3.  **Установите зависимости:**

```bash
npm install
```

4. **Убедитесь, что у вас правильно настроены переменные окружения для API-ключа:**

Создайте файл .env в корне проекта и добавьте туда ваш API-ключ OpenWeatherMap:

```bash
VITE_OPENWEATHER_API_KEY=YOUR_API_KEY
```

5. **Запустите приложение в режиме разработки:**

```bash
npm run dev
```

Приложение будет доступно по адресу `http://localhost:5173` (или другому, указанному в консоли).

## Конфигурация

- Для работы приложения требуется API-ключ OpenWeatherMap. В данном проекте используется демонстрационный API-ключ, который может быть ограничен.
- Рекомендуется получить свой собственный API-ключ на сайте [OpenWeatherMap](https://openweathermap.org/).
- API-ключ должен быть установлен в переменной окружения `VITE_OPENWEATHER_API_KEY` в файле .env.
- Язык интерфейса и единицы измерения можно изменить с помощью соответствующих выпадающих списков в приложении.

## Планы на будущее

- Добавление прогноза погоды на несколько дней.
- Улучшение стилизации и адаптивности интерфейса.
- Добавление анимированных иконок погоды.

## Благодарности

Благодарю OpenWeatherMap за предоставление API погоды!

## Автор

Ivan Kalugin Телеграмм: https://t.me/Ivan_Anatolievich_Kalugin

## Лицензия

Этот проект лицензирован в соответствии с условиями лицензии MIT. Смотрите файл LICENSE для получения подробной информации.
