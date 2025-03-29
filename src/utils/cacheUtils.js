import { useI18n } from 'vue-i18n'

// Ключи для хранения в localStorage
const WEATHER_CACHE_KEY = 'weatherCache'
const GEOLOCATION_CACHE_KEY = 'geolocationCache'

const CACHE_EXPIRATION_TIME = 60 * 60 * 1000 // 1 час (в миллисекундах)

// Функции для работы с кэшем
// --- Геолокация ---
export function getCachedGeolocationData(showNotification) {
  return getCachedData(GEOLOCATION_CACHE_KEY, showNotification)
}
export function cacheGeolocationData(data, showNotification) {
  cacheData(GEOLOCATION_CACHE_KEY, data, showNotification)
}
export function removeCachedGeolocationData(showNotification, cacheKey) {
  removeCachedData(GEOLOCATION_CACHE_KEY, showNotification, cacheKey)
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
function getCachedData(cacheKey, showNotification, specificKey = null) {
  const { t } = useI18n({ useScope: 'global' })
  const cache = localStorage.getItem(cacheKey)

  if (!cache) {
    return null
  }

  try {
    const cacheData = JSON.parse(cache)
    let cachedItem = cacheData

    if (specificKey) {
      cachedItem = cacheData[specificKey]
    }
    // Проверяем, есть ли в кэше данные для запрошенного города
    if (cachedItem && Date.now() < cachedItem.expirationTime) {
      return cachedItem.data
    } else {
      if (specificKey) {
        // Если кэш устарел, удаляем его из localStorage
        removeCachedData(cacheKey, showNotification, specificKey)
      } else {
        localStorage.removeItem(cacheKey) // Очищаем весь кэш геолокации, если он устарел
      }
      return null
    }
  } catch (error) {
    // Уведомление
    showNotification(t('cacheLoadError', { error }), 'error')
    return null
  }
}

// Функция для сохранения данных в кэш
function cacheData(cacheKey, data, showNotification, specificKey = null) {
  const { t } = useI18n({ useScope: 'global' })
  let cacheData = {}
  const cache = localStorage.getItem(cacheKey)

  if (cache) {
    try {
      cacheData = JSON.parse(cache)
    } catch (error) {
      console.error('Ошибка разбора кэша:', error)
      showNotification(t('cacheParseError', { error }), 'error')
    }
  }

  let itemToCache = {
    data,
    expirationTime: Date.now() + CACHE_EXPIRATION_TIME,
  }

  if (specificKey) {
    cacheData[specificKey] = itemToCache
  } else {
    cacheData = itemToCache
  }

  try {
    localStorage.setItem(cacheKey, JSON.stringify(cacheData))
  } catch (error) {
    showNotification(t('cacheSaveError', { error }), 'error')
  }
}

// Функция для удаления данных из кэша (если устарели)
function removeCachedData(cacheKey, showNotification, specificKey = null) {
  const { t } = useI18n({ useScope: 'global' })
  const cache = localStorage.getItem(cacheKey)

  if (!cache) {
    return
  }

  try {
    const cacheData = JSON.parse(cache)

    if (specificKey) {
      delete cacheData[specificKey]
      if (Object.keys(cacheData).length === 0) {
        localStorage.removeItem(cacheKey)
      } else {
        localStorage.setItem(cacheKey, JSON.stringify(cacheData))
      }
    } else {
      localStorage.removeItem(cacheKey)
    }
  } catch (error) {
    showNotification(t('cacheDeleteError', { error }), 'error')
  }
}
