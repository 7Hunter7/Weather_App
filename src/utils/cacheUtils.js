// Функции для работы с кэшем
const WEATHER_CACHE_KEY = 'weatherCache' // Ключ для хранения в localStorage
const CACHE_EXPIRATION_TIME = 60 * 60 * 1000 // 1 час (в миллисекундах)

// Функция получения данных из localStorage
export function getCachedData(city) {
  const cache = localStorage.getItem(WEATHER_CACHE_KEY)
  if (!cache) {
    return null
  }

  try {
    const cacheData = JSON.parse(cache)
    const cachedItem = cacheData[city]

    if (cachedItem && Date.now() < cachedItem.expirationTime) {
      return cachedItem
    } else {
      // Если кэш устарел, удаляем его из localStorage
      removeCachedData(city)
      return null
    }
  } catch (error) {
    console.error('Ошибка при разборе данных из кэша:', error)
    return null
  }
}
