import axios from 'axios'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  getCachedCityData,
  cacheCityData,
  removeCachedCityData,
  getCachedGeolocationData,
  cacheGeolocationData,
} from '@/utils/cacheUtils' // Импорт утилит

// Логика работы с API
export function useWeatherApi(showNotification, language = 'ru', units = 'metric') {
  const { t } = useI18n({ useScope: 'global' }) // Используем useI18n

  const weatherData = ref(null)
  const error = ref('')
  const isLoading = ref(false) // Индикатор загрузки
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY // Используем переменную окружения

  const getWeather = async (city) => {
    // Сбрасываем данные перед новым запросом
    weatherData.value = null
    error.value = ''
    isLoading.value = true

    // 1. Проверка кэша
    const cacheKey = `${city}-${language}-${units}`
    const cachedData = getCachedCityData(cacheKey, showNotification)
    if (cachedData) {
      showNotification(t('weatherLoaded', { city }), 'success')
      weatherData.value = cachedData
      isLoading.value = false
      return // Выходим из функции, если данные взяты из кэша
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&lang=${language}&appid=${apiKey}`
      const response = await axios.get(url)
      weatherData.value = {
        ...response.data,
        iconUrl: response.data.weather?.[0]?.icon
          ? getWeatherIconUrl(response.data.weather[0].icon)
          : null,
      }

      // 2. Сохранение данных в кэш
      cacheCityData(cacheKey, weatherData.value, showNotification)

      // 3. Обработка ошибок
    } catch (err) {
      let errorMessage = t('genericError') // Сообщение по умолчанию
      if (err.response) {
        if (err.response.status === 404) {
          errorMessage = t('cityNotFound')
        } else {
          errorMessage = t('serverError', { status: err.response.status })
        }
      } else if (err.request) {
        errorMessage = t('networkError')
      }

      showNotification(errorMessage, 'error') // Используем переданную функцию
      error.value = errorMessage // Устанавливаем сообщение об ошибке
    } finally {
      isLoading.value = false
    }
  }

  const updateWeather = (city) => {
    const cacheKey = `${city}-${language}-${units}`
    removeCachedCityData(cacheKey, showNotification)
    getWeather(city)
  }

  const getWeatherByGeolocation = async () => {
    // Сбрасываем данные перед новым запросом
    weatherData.value = null
    error.value = ''
    isLoading.value = true

    // 1. Проверка кэша геолокации
    const cacheKey = `geolocation-${language}-${units}`
    const cachedData = getCachedGeolocationData(showNotification)
    if (cachedData) {
      weatherData.value = cachedData
      return cachedData.name // Город
    }

    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
      })

      const { latitude, longitude } = position.coords
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&lang=${language}&appid=${apiKey}`
      const response = await axios.get(url)

      weatherData.value = {
        ...response.data,
        iconUrl: response.data.weather?.[0]?.icon
          ? getWeatherIconUrl(response.data.weather[0].icon)
          : null,
      }

      // 2. Кэширование данных геолокации
      cacheGeolocationData(cacheKey, weatherData.value, showNotification)
      return weatherData.value // Город
    } catch (err) {
      let errorMessage = t('geolocationError')
      if (err.code === 1) {
        errorMessage = t('geolocationPermissionDenied')
      }
      showNotification(errorMessage, 'error')
      error.value = errorMessage
    } finally {
      isLoading.value = false
    }
  }

  // Функция для получения URL иконки
  const getWeatherIconUrl = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
  }

  return {
    weatherData,
    error,
    isLoading,
    getWeather,
    updateWeather,
    getWeatherByGeolocation,
  }
}
