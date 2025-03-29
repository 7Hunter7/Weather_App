// Функции для работы с кэшем

// Ключи для хранения в localStorage
const WEATHER_CACHE_KEY = 'weatherCache'
const GEOLOCATION_CACHE_KEY = 'geolocationCache'

const CACHE_EXPIRATION_TIME = 60 * 60 * 1000 // 1 час (в миллисекундах)

// --- Геолокация ---
export function getCachedGeolocationData(showNotification) {
  return getCachedData(GEOLOCATION_CACHE_KEY, showNotification)
}
export function cacheGeolocationData(data, showNotification) {
  cacheData(GEOLOCATION_CACHE_KEY, data, showNotification)
}
export function removeCachedGeolocationData(showNotification) {
  removeCachedData(GEOLOCATION_CACHE_KEY, showNotification)
}

// --- Город ---
export function getCachedCityData(city, showNotification) {
  return getCachedData(WEATHER_CACHE_KEY, showNotification, city)
}
export function cacheCityData(city, data, showNotification) {
  cacheData(WEATHER_CACHE_KEY, data, showNotification, city)
}
export function removeCachedCityData(city, showNotification) {
  removeCachedData(WEATHER_CACHE_KEY, showNotification, city)
}

// --- Общие функции ---
// Функция получения данных из localStorage
export function getCachedData(city, showNotification) {
  const cache = localStorage.getItem(WEATHER_CACHE_KEY)
  if (!cache) {
    return null
  }

  try {
    const cacheData = JSON.parse(cache)
    const cachedItem = cacheData[city]
    // Проверяем, есть ли в кэше данные для запрошенного города
    if (cachedItem && Date.now() < cachedItem.expirationTime) {
      return cachedItem
    } else {
      // Если кэш устарел, удаляем его из localStorage
      removeCachedData(city, showNotification)
      return null
    }
  } catch (error) {
    // Уведомление
    showNotification(`Ошибка при загрузке данных из кэша: ${error}`, 'error')
    return null
  }
}

// Функция для сохранения данных в кэш
export function cacheData(city, data, showNotification) {
  const cache = localStorage.getItem(WEATHER_CACHE_KEY)
  let cacheData = cache ? JSON.parse(cache) : {}
  try {
    cacheData[city] = {
      data,
      expirationTime: Date.now() + CACHE_EXPIRATION_TIME,
    }
    localStorage.setItem(WEATHER_CACHE_KEY, JSON.stringify(cacheData))
  } catch (error) {
    // Уведомление
    showNotification(`Ошибка при сохранении данных в кэш: ${error}`, 'error')
  }
}

// Функция для удаления данных из кэша (если устарели)
export function removeCachedData(city, showNotification) {
  const cache = localStorage.getItem(WEATHER_CACHE_KEY)
  if (!cache) {
    return
  }

  try {
    const cacheData = JSON.parse(cache)
    delete cacheData[city]
    localStorage.setItem(WEATHER_CACHE_KEY, JSON.stringify(cacheData))
  } catch (error) {
    // Уведомление
    showNotification(`Ошибка при удалении данных из кэша: ${error}`, 'error')
  }
}
