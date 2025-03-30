<template>
  <div class="wrapper" :class="{ 'light-theme': isLightTheme }">
    <div class="wrapper__header">
      <h1>{{ $t('appTitle') }}</h1>
      <button @click="toggleTheme" class="theme-switcher">
        {{ isLightTheme ? 'Dark' : 'Light' }}
      </button>
      <p>{{ $t('findWeather') }} {{ city == '' ? t('yourCity') : cityName }}</p>
    </div>
    <div class="wrapper__form">
      <input
        class="wrapper__form_input"
        type="text"
        v-model.trim="city"
        :placeholder="$t('cityPlaceholder')"
        @keydown.enter="handleGetWeather()"
        @keydown.esc="clearInput()"
      />
      <button
        class="wrapper__button"
        @click="handleGetWeather()"
        :class="{ 'wrapper__button--disabled': city === '' }"
      >
        {{ $t('getWeather') }}
      </button>

      <select v-model="language" class="wrapper__form_select">
        <option value="ru">Русский</option>
        <option value="en">English</option>
      </select>

      <select v-model="units" class="wrapper__form_select">
        <option value="metric">Цельсий (°C)</option>
        <option value="imperial">Фаренгейт (°F)</option>
      </select>
    </div>
    <p class="wrapper__error">{{ error }}</p>
    <div v-if="isLoading" class="wrapper__loading">Загрузка...</div>
    <button
      class="wrapper__button"
      @click="handleGetWeatherByGeolocation()"
      style="margin-top: 2rem"
    >
      {{ $t('detectLocation') }}
    </button>
    <WeatherCard
      v-if="weatherData != null"
      :weather="weatherData"
      :units="units"
      :language="language"
    />

    <!-- Кнопка для очистки кэша и обновления данных -->
    <button
      v-if="weatherData != null && city != ''"
      class="wrapper__button"
      @click="handleUpdateWeather()"
    >
      {{ $t('update') }}
    </button>
  </div>

  <system-notification
    v-if="notification.show"
    :message="notification.message"
    :type="notification.type"
  />
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import WeatherCard from '@/components/WeatherCard.vue'
import SystemNotification from '@/components/SystemNotification.vue'
import { useWeatherApi } from '@/services/useWeatherApi'
import { removeCachedGeolocationData, removeCachedCityData } from '@/utils/cacheUtils'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n({ useScope: 'global' })

const city = ref('')
const cityName = computed(() => '«' + city.value + '»')
const language = ref('ru')
const units = ref('metric')
const notification = ref({
  message: '',
  type: '',
  show: false,
})

// Логика переключения тем
const isLightTheme = ref(false)
const toggleTheme = () => {
  isLightTheme.value = !isLightTheme.value
}

// Управление уведомлениями
const showNotification = (message, type = 'info') => {
  notification.value.message = message
  notification.value.type = type
  notification.value.show = true
  setTimeout(() => {
    notification.value.show = false
  }, 3000) // Автоматическое скрытие через 3 секунды
}

// Используем service useWeatherApi и передаем в неё showNotification, language и units
const { weatherData, error, isLoading, getWeather, getWeatherByGeolocation, updateWeather } =
  useWeatherApi(showNotification, language.value, units.value, t)

// Получение погоды
const handleGetWeather = () => {
  if (city.value.trim().length < 2) {
    error.value = t('cityNameError')
    weatherData.value = null
    return
  }
  getWeather(city.value)
}

// Получение погоды по геопозиции пользователя
const handleGetWeatherByGeolocation = () => {
  const cacheKey = `geolocation-${language.value}-${units.value}`
  removeCachedGeolocationData(showNotification, t, cacheKey)
  getWeatherByGeolocation()
  city.value = '' // Очистка поля ввода для города, чтобы не было конфликтов
}

// Обновление погоды
const handleUpdateWeather = () => {
  const cacheKey = `${city.value}-${language.value}-${units.value}`
  // Очистка кэша
  removeCachedCityData(city.value, showNotification, t)
  removeCachedGeolocationData(showNotification, t, cacheKey)
  // Обновление погоды
  updateWeather(city.value)
  showNotification(t('weatherUpdated', { city: city.value }), 'success')
}

// Очистка данных
const clearInput = () => {
  city.value = ''
  error.value = ''
  weatherData.value = null
}

watch(language, (newLanguage) => {
  locale.value = newLanguage // Установка языка
  weatherData.value = null
  error.value = ''
})

// Наблюдатель для сброса данных при смене языка или единиц измерения
watch([units], () => {
  weatherData.value = null
  error.value = ''
})
</script>

<style scoped lang="scss">
.wrapper {
  min-width: var(--wrapper-min-width);
  min-height: var(--wrapper-min-height);
  border-radius: var(--border-radius-large);
  padding: var(--indents-medium);
  background-color: var(--background-color);
  text-align: center;
  color: var(--text-color);
  position: relative;

  &__header {
    & h1 {
      margin-top: var(--indents-medium);
    }
    & p {
      margin-top: var(--indents-small);
    }
  }
  &__form {
    margin: var(--indents-medium);
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;

    &_input {
      padding: var(--indents-little) var(--indents-small);
      border: none;
      outline: none; // Удаляем обводку у input
      border-bottom: 2px solid var(--border-bottom-color);
      background: transparent;
      color: var(--input-color);
      font-size: var(--font-size-input);

      &:focus {
        border-bottom-color: var(--loading-color);
      }
    }

    &_select {
      padding: var(--indents-little) var(--indents-small);
      border: 2px solid var(--border-color);
      border-radius: var(--border-radius-small);
      background-color: var(--background-color);
      color: var(--text-color);
      outline: none;
      cursor: pointer;
    }
  }

  &__button {
    cursor: pointer;
    margin-left: var(--indents-medium);
    padding: var(--indents-small) var(--indents-medium);
    color: var(--background-color);
    background-color: var(--accent-color);
    border: 2px solid var(--border-color);
    border-radius: var(--border-radius-small);
    transition: transform 0.2s ease;

    &:hover {
      transform: translateY(-2px);
    }
    &:active {
      transform: translateY(-2px) scale(0.97);
    }
    &--disabled {
      cursor: not-allowed;
      color: var(--disabled-text-color);
      background-color: var(--disabled-background-color);
    }
  }

  &__error {
    margin-top: var(--indents-medium);
    color: var(--error-color);
  }

  // Стиль для индикатора загрузки
  &__loading {
    margin-top: var(--indents-medium);
    font-style: italic;
    color: var(--loading-color);
  }

  &__notification {
    position: absolute;
    top: var(--indents-medium);
    right: var(--indents-medium);
    background-color: transparent;
    color: var(--text-color);
    padding: var(--indents-small) var(--indents-medium);
    border-radius: var(--border-radius-small);
    opacity: 0.9;
    z-index: 10;
  }
}

/* Адаптивность */
@media (max-width: 768px) {
  .wrapper {
    padding: var(--indents-small);
    border-radius: var(--border-radius-medium);

    &__form {
      flex-direction: column;
      gap: var(--indents-small);

      &_input,
      &_select,
      &__button {
        margin-left: 0;
        width: 100%;
      }
    }

    &-card {
      margin: var(--indents-medium);
      padding: var(--indents-small);
    }
  }
}
</style>
