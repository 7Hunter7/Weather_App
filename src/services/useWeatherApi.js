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
    // Сбрасываем данные перед новым запросом
    weatherData.value = null
    error.value = ''
    isLoading.value = true

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=ru&appid=${apiKey}`

      const response = await axios.get(url)
      weatherData.value = response.data
    } catch (err) {
      let errorMessage = 'Произошла ошибка при получении данных.' // Сообщение по умолчанию

      if (err.response) {
        if (err.response.status === 404) {
          errorMessage = 'Вы ввели неверное название города!'
        } else {
          errorMessage = `Произошла ошибка: ${err.response.status}`
        }
      } else if (err.request) {
        errorMessage = 'Ошибка при отправке запроса. Проверьте подключение к интернету.'
      }

      error.value = errorMessage // Устанавливаем сообщение об ошибке
      weatherData.value = null // Сбрасываем данные
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
