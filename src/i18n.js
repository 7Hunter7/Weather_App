// Изменение языка интерфейса
import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    appTitle: 'Weather App',
    cityPlaceholder: 'Enter city name',
    getWeather: 'Get Weather',
    detectLocation: 'Show weather in my city',
    update: 'Update',
    temperature: 'Temperature',
    feelsLike: 'Feels like',
    maxTemperature: 'Max Temperature',
    humidity: 'Humidity',
    windSpeed: 'Wind Speed',
    windGust: 'Wind Gust',
    windDirection: 'Wind Direction',
    precipitation: 'Precipitation(last 1 hour)',
    groundPressure: 'Level Pressure',
    weatherConditions: 'Weather Conditions',
    celsius: '℃',
    fahrenheit: '℉',
    metersPerSecond: 'm/s',
    milesPerHour: 'mph',
    millimeterPerHour: 'mm/h',
    millimetersOfMercury: 'mmHg',
    hectopascal: 'hPa',
    directionN: 'N',
    directionNE: 'NE',
    directionE: 'E',
    directionSE: 'SE',
    directionS: 'S',
    directionSW: 'SW',
    directionW: 'W',
    directionNW: 'NW',
    // Переводы для сообщений об ошибках
    cityNameError: 'The name of the city must contain more than one character!',
    genericError: 'An error occurred while fetching data.',
    cityNotFound: 'You entered an invalid city name! Check and try again.',
    serverError: 'An error occurred: {status}',
    networkError: 'Error sending the request. Check your internet connection.',
    geolocationError: 'Failed to determine your location',
    geolocationPermissionDenied: 'You rejected the request to determine your location',
    weatherLoaded: 'Weather for «{city}» successfully loaded',
    weatherUpdated: 'Weather for «{city}» successfully updated',
    geolocationWeatherLoaded: 'Weather for your location successfully loaded from cache',
    cacheLoadError: 'Error loading data from cache: {error}',
    cacheSaveError: 'Error saving data to cache: {error}',
    cacheDeleteError: 'Error deleting data from cache: {error}',
    cacheParseError: 'Error parsing data from cache: {error}',
  },
  ru: {
    appTitle: 'Погодное приложение',
    cityPlaceholder: 'Введите название города',
    getWeather: 'Узнать погоду',
    detectLocation: 'Показать погоду в моём городе',
    update: 'Обновить',
    temperature: 'Температура',
    feelsLike: 'Ощущается как',
    maxTemperature: 'Максимальная температура',
    humidity: 'Влажность воздуха',
    windSpeed: 'Скорость ветра',
    windGust: 'Порывы ветра',
    windDirection: 'Направление ветра',
    precipitation: 'Количество осадков(за 1 час)',
    groundPressure: 'Атмосферное давление',
    weatherConditions: 'Погодные условия',
    celsius: '℃',
    fahrenheit: '℉',
    metersPerSecond: 'м/с',
    milesPerHour: 'миль/ч',
    millimeterPerHour: 'мм/ч',
    millimetersOfMercury: 'мм рт.ст.',
    hectopascal: 'гПа',
    directionN: 'С',
    directionNE: 'СВ',
    directionE: 'В',
    directionSE: 'ЮВ',
    directionS: 'Ю',
    directionSW: 'ЮЗ',
    directionW: 'З',
    directionNW: 'СЗ',
    cityNameError: 'Название города должно содержать более одного символа!',
    genericError: 'Произошла ошибка при получении данных!',
    cityNotFound: 'Вы ввели неверное название города! Проверьте и попробуйте еще раз',
    serverError: 'Произошла ошибка: {status}',
    networkError: 'Ошибка при отправке запроса! Проверьте подключение к интернету',
    geolocationError: 'Не удалось определить ваше местоположение',
    geolocationPermissionDenied: 'Вы отклонили запрос на определение местоположения',
    weatherLoaded: 'Погода для города «{city}» успешно загружена',
    weatherUpdated: 'Погода для города «{city}» успешно обновлена',
    geolocationWeatherLoaded: 'Погода для вашего местоположения успешно загружена',
    cacheLoadError: 'Ошибка при загрузке данных из кэша: {error}',
    cacheSaveError: 'Ошибка при сохранении данных в кэш: {error}',
    cacheDeleteError: 'Ошибка при удалении данных из кэша: {error}',
    cacheParseError: 'Ошибка разбора данных из кэша: {error}',
  },
}

const i18n = createI18n({
  locale: 'ru', // Значение по умолчанию
  fallbackLocale: 'en', // Язык, используемый, если перевод отсутствует
  messages,
})

export default i18n
