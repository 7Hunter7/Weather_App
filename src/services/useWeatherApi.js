import axios from 'axios'
import { ref } from 'vue'

// Логика работы с API
export function useWeatherApi() {
  const weatherData = ref(null)
  const error = ref('')
  const isLoading = ref(false) // Индикатор загрузки
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY // Используем переменную окружения
  console.log(`apiKey: ${apiKey}`)

  const getWeather = async (city) => {
    weatherData.value = null // Сбрасываем данные перед новым запросом
    error.value = ''
    isLoading.value = true

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=ru&appid=${apiKey}`

      const response = await axios.get(url)
      weatherData.value = response.data
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          error.value = 'Вы ввели неверное название города!'
        } else {
          error.value = `Произошла ошибка: ${error.response.status}`
        }
      } else if (error.request) {
        error.value = 'Ошибка при отправке запроса. Проверьте подключение к интернету.'
      } else {
        error.value = 'Произошла ошибка при получении данных.'
      }
      weatherData.value = null // Сбрасываем данные при ошибке
    } finally {
      isLoading.value = false
    }
  }

  return {
    weatherData,
    error,
    isLoading,
    getWeather,
  }
}
