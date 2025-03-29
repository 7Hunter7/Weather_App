import axios from 'axios'
import { ref } from 'vue'
import {
  getCachedCityData,
  cacheCityData,
  removeCachedCityData,
  getCachedGeolocationData,
  cacheGeolocationData,
} from '@/utils/cacheUtils' // Импорт утилит

// Логика работы с API
export function useWeatherApi(showNotification, language = 'ru', units = 'metric') {
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
    const cacheKey = `${city}-${language.value}-${units.value}`
    const cachedData = getCachedCityData(cacheKey, showNotification)
    if (cachedData) {
      showNotification(`Погода для города «${city}» успешно загружена`, 'success')
      weatherData.value = cachedData
      isLoading.value = false
      return // Выходим из функции, если данные взяты из кэша
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units.value}&lang=${language.value}&appid=${apiKey}`
      const response = await axios.get(url)
      weatherData.value = response.data

      // 2. Сохранение данных в кэш
      cacheCityData(cacheKey, response.data, showNotification)

      // 3. Обработка ошибок
    } catch (err) {
      let errorMessage = 'Произошла ошибка при получении данных.' // Сообщение по умолчанию
      if (err.response) {
        if (err.response.status === 404) {
          errorMessage = 'Вы ввели неверное название города! Проверьте и попробуйте еще раз'
        } else {
          errorMessage = `Произошла ошибка: ${err.response.status}`
        }
      } else if (err.request) {
        errorMessage = 'Ошибка при отправке запроса. Проверьте подключение к интернету.'
      }

      showNotification(errorMessage, 'error') // Используем переданную функцию
      error.value = errorMessage // Устанавливаем сообщение об ошибке
      weatherData.value = null // Сбрасываем данные
    } finally {
      isLoading.value = false
    }
  }

  const updateWeather = (city) => {
    const cacheKey = `${city}-${language.value}-${units.value}`
    removeCachedCityData(cacheKey, showNotification)
    getWeather(city)
  }

  const getWeatherByGeolocation = async () => {
    isLoading.value = true
    error.value = ''
    weatherData.value = null

    // 1. Проверка кэша геолокации
    const cacheKey = `geolocation-${language.value}-${units.value}`
    const cachedData = getCachedGeolocationData(showNotification)
    if (cachedData) {
      weatherData.value = cachedData
      showNotification('Погода для вашего местоположения успешно загружена', 'success')
      isLoading.value = false
      return
    }

    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
      })

      const { latitude, longitude } = position.coords
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units.value}&lang=${language.value}&appid=${apiKey}`
      const response = await axios.get(url)
      weatherData.value = response.data

      // 2. Кэширование данных геолокации
      cacheGeolocationData(cacheKey, response.data, showNotification)
      showNotification(`Погода для вашего местоположения успешно загружена`, 'success')
    } catch (err) {
      let errorMessage = 'Не удалось определить ваше местоположение'
      if (err.code === 1) {
        errorMessage = 'Вы отклонили запрос на определение местоположения'
      }
      showNotification(errorMessage, 'error')
      error.value = errorMessage
    } finally {
      isLoading.value = false
    }
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
