<template>
  <div class="wrapper" :class="{ 'light-theme': isLightTheme }">
    <!-- Иконка справки -->
    <div class="wrapper__help" @click="showHelp = true">
      <svg
        id="svg"
        fill="#000000"
        stroke="#000000"
        width="200"
        height="200"
        version="1.1"
        viewBox="143 143 514 514"
        xmlns="http://www.w3.org/2000/svg"
        stroke-width="0"
      >
        <g id="IconSvg_bgCarrier" stroke-width="0"></g>
        <g
          id="IconSvg_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke="#CCCCCC"
          stroke-width="0"
        >
          <path
            xmlns="http://www.w3.org/2000/svg"
            d="m400 609.92c55.672 0 109.07-22.117 148.43-61.484 39.367-39.367 61.484-92.762 61.484-148.43 0-55.676-22.117-109.07-61.484-148.44-39.367-39.367-92.762-61.484-148.43-61.484-55.676 0-109.07 22.117-148.44 61.484s-61.484 92.762-61.484 148.44c0.089844 55.645 22.234 108.99 61.582 148.34 39.348 39.348 92.691 61.496 148.34 61.582zm0-314.88c5.5664 0 10.906 2.2109 14.844 6.1484 3.9336 3.9375 6.1484 9.2734 6.1484 14.844 0 5.5664-2.2148 10.906-6.1484 14.844-3.9375 3.9375-9.2773 6.1484-14.844 6.1484-5.5703 0-10.91-2.2109-14.844-6.1484-3.9375-3.9375-6.1484-9.2773-6.1484-14.844 0-5.5703 2.2109-10.906 6.1484-14.844 3.9336-3.9375 9.2734-6.1484 14.844-6.1484zm-20.992 83.969c0-7.5 4-14.43 10.496-18.18 6.4922-3.75 14.496-3.75 20.992 0 6.4922 3.75 10.496 10.68 10.496 18.18v104.96-0.003906c0 7.5-4.0039 14.434-10.496 18.18-6.4961 3.75-14.5 3.75-20.992 0-6.4961-3.7461-10.496-10.68-10.496-18.18z"
          ></path>
        </g>
        <g id="IconSvg_iconCarrier">
          <path
            xmlns="http://www.w3.org/2000/svg"
            d="m400 609.92c55.672 0 109.07-22.117 148.43-61.484 39.367-39.367 61.484-92.762 61.484-148.43 0-55.676-22.117-109.07-61.484-148.44-39.367-39.367-92.762-61.484-148.43-61.484-55.676 0-109.07 22.117-148.44 61.484s-61.484 92.762-61.484 148.44c0.089844 55.645 22.234 108.99 61.582 148.34 39.348 39.348 92.691 61.496 148.34 61.582zm0-314.88c5.5664 0 10.906 2.2109 14.844 6.1484 3.9336 3.9375 6.1484 9.2734 6.1484 14.844 0 5.5664-2.2148 10.906-6.1484 14.844-3.9375 3.9375-9.2773 6.1484-14.844 6.1484-5.5703 0-10.91-2.2109-14.844-6.1484-3.9375-3.9375-6.1484-9.2773-6.1484-14.844 0-5.5703 2.2109-10.906 6.1484-14.844 3.9336-3.9375 9.2734-6.1484 14.844-6.1484zm-20.992 83.969c0-7.5 4-14.43 10.496-18.18 6.4922-3.75 14.496-3.75 20.992 0 6.4922 3.75 10.496 10.68 10.496 18.18v104.96-0.003906c0 7.5-4.0039 14.434-10.496 18.18-6.4961 3.75-14.5 3.75-20.992 0-6.4961-3.7461-10.496-10.68-10.496-18.18z"
          ></path>
        </g>
      </svg>
    </div>
    <!-- Справка -->
    <HelpDialog v-if="showHelp" @close="showHelp = false" />

    <div class="wrapper__header">
      <h1>{{ $t('appTitle') }}</h1>
      <theme-switcher @click="toggleTheme" class="theme-switcher" />
      <p>{{ $t('findWeather') }} {{ city == '' ? t('yourCity') : cityName }}</p>
    </div>
    <div class="wrapper__form">
      <InputWithValidation
        v-model="city"
        :errorMessage="error"
        @get-weather="handleGetWeather()"
        @clear-input="clearInput()"
      />
      <LanguageUnitSelect
        :language="language"
        :units="units"
        @update:language="setLanguage"
        @update:units="setUnits"
      />
    </div>
    <ButtonsGetWeather
      :isCityEmpty="city === ''"
      :isWeatherDataAvailable="weatherData != null"
      @get-weather="handleGetWeather()"
      @get-weather-by-geolocation="handleGetWeatherByGeolocation()"
      @update-weather="handleUpdateWeather()"
    />
    <LoadingAnimation v-if="isLoading" class="wrapper__loading" />
    <WeatherCard
      v-if="weatherData != null"
      :weather="weatherData"
      :units="units"
      :language="language"
    />
  </div>
  <!-- Уведомленя -->
  <system-notification
    v-if="notification.show"
    :message="notification.message"
    :type="notification.type"
  />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import WeatherCard from '@/components/WeatherCard.vue'
import ThemeSwitcher from '@/components/ThemeSwitcher.vue'
import SystemNotification from '@/components/SystemNotification.vue'
import InputWithValidation from '@/components/InputWithValidation.vue'
import ButtonsGetWeather from '@/components/ButtonsGetWeather.vue'
import LanguageUnitSelect from '@/components/LanguageUnitSelect.vue'
import LoadingAnimation from '@/components/LoadingAnimation.vue'
import HelpDialog from '@/components/HelpDialog.vue'
import { useWeatherApi } from '@/services/useWeatherApi'
import { removeCachedGeolocationData, removeCachedCityData } from '@/utils/cacheUtils'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n({ useScope: 'global' })

const city = ref('')
const cityName = computed(() => '«' + city.value + '»')
const language = ref('ru')
const units = ref('metric')
const showHelp = ref(false)
const notification = ref({
  message: '',
  type: '',
  show: false,
})

onMounted(async () => {
  removeCachedData()
})

// Логика переключения тем
const isLightTheme = ref(false)
const toggleTheme = () => {
  isLightTheme.value = !isLightTheme.value
  const bodyEl = document.querySelector(`body`)
  const weatherCard = document.querySelector(`.weather-card`) || null
  if (isLightTheme.value) {
    bodyEl.style.background =
      'linear-gradient(339deg, rgba(110, 156, 246, 1) 0%, rgba(255, 255, 255, 1) 100%)'
    if (weatherCard) {
      weatherCard.style.background =
        'linear-gradient(339deg, rgba(110, 156, 246, 1) 0%, rgba(255, 255, 255, 1) 100%)'
    }
  } else {
    bodyEl.style.background =
      'linear-gradient(329deg, rgba(10, 18, 56, 1) 0%, rgba(207, 73, 251, 1) 100%)'
    if (weatherCard) {
      weatherCard.style.background =
        'linear-gradient(329deg, rgba(10, 18, 56, 1) 0%, rgba(207, 73, 251, 1) 100%)'
    }
  }
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
const handleGetWeatherByGeolocation = async () => {
  removeCachedData()
  const weather = await getWeatherByGeolocation() // Получаем данные о погоде
  if (weather) {
    // Отображаем уведомление с названием города
    showNotification(
      t('geolocationWeatherLoadedCity', { city: weather.name ? weather.name : t('yourCity') }),
      'success',
    )
    city.value = weather.name
    weatherData.value = weather // Обновляем weatherData
    error.value = '' // Очищаем ошибки
  } else {
    showNotification(t('geolocationError'), 'error')
  }
}

// Обновление погоды
const handleUpdateWeather = async () => {
  if (city.value.trim() === '') {
    // Обновляем данные о погоде по геолокации
    handleGetWeatherByGeolocation()
  } else {
    // Обновляем данные о погоде по названию города
    removeCachedData()
    updateWeather(city.value)
  }
  showNotification(t('weatherUpdated', { city: city.value }), 'success')
}

// Очистка кэша
const removeCachedData = () => {
  const cacheKeyForCity = `${city.value}-${language.value}-${units.value}`
  const cacheKeyForGeo = `geolocation-${language.value}-${units.value}`
  // Очистка кэша
  removeCachedCityData(cacheKeyForCity, showNotification, t)
  removeCachedGeolocationData(cacheKeyForGeo, showNotification, t)
}

// Очистка данных
const clearInput = () => {
  city.value = ''
  error.value = ''
  weatherData.value = null
}

// Установка выбранного языка
const setLanguage = (value) => {
  language.value = value
  locale.value = value
}

// Установка выбранных единиц измерения
const setUnits = (value) => {
  units.value = value
}
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
  }

  &__loading {
    margin-top: var(--indents-big);
  }

  // Стили для справки
  &__help {
    position: absolute;
    top: var(--indents-small);
    left: var(--indents-small);
    cursor: pointer;

    svg {
      width: var(--indents-big);
      height: var(--indents-big);
      fill: var(--loading-color);
      transition: fill 0.2s ease;
    }

    &:hover svg {
      fill: var(--input-color);
    }

    &_dialog {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: var(--background-color);
      color: var(--text-color);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10;

      &-content {
        background-color: var(--white-color);
        padding: var(--indents-medium);
        border-radius: var(--border-radius-small);
        width: 80%;
        max-width: var(--wrapper-min-width);
      }
    }
  }
}

/* Адаптивность */
@media (max-width: 768px) {
  .wrapper {
    max-width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    border-radius: var(--border-radius-medium);

    &__header {
      max-width: 100%;
      word-wrap: break-word;
    }

    &__form {
      max-width: 100%;
      flex-direction: column;
      gap: var(--indents-medium);
    }
  }
}

@media (max-width: 480px) {
  .wrapper {
    margin: var(--indents-small);
    padding: var(--indents-small);
  }
}
</style>
