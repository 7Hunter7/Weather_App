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
    directionN: 'N',
    directionNE: 'NE',
    directionE: 'E',
    directionSE: 'SE',
    directionS: 'S',
    directionSW: 'SW',
    directionW: 'W',
    directionNW: 'NW',
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
    directionN: 'С',
    directionNE: 'СВ',
    directionE: 'В',
    directionSE: 'ЮВ',
    directionS: 'Ю',
    directionSW: 'ЮЗ',
    directionW: 'З',
    directionNW: 'СЗ',
  },
}

const i18n = createI18n({
  locale: 'ru', // Значение по умолчанию
  fallbackLocale: 'en', // Язык, используемый, если перевод отсутствует
  messages,
})

export default i18n
