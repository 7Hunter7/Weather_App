<template>
  <div class="wrapper">
    <div class="wrapper__header">
      <h1>Погодное приложение</h1>
      <p>Узнать погоду в {{ city == '' ? 'вашем городе' : cityName }}</p>
    </div>
    <input
      class="wrapper__input"
      type="text"
      v-model.trim="city"
      placeholder="Введите название города"
      @keydown.enter="handleGetWeather()"
      @keydown.esc="clearInput()"
    />
    <button
      class="wrapper__button"
      @click="handleGetWeather()"
      :class="{ 'wrapper__button--disabled': city === '' }"
    >
      Узнать погоду
    </button>
    <p class="wrapper__error">{{ error }}</p>
    <div v-if="isLoading" class="wrapper__loading">Загрузка...</div>

    <WeatherCard v-if="weatherData != null" :weather="weatherData" />

    <!-- Кнопка для очистки кэша и обновления данных -->
    <button
      v-if="weatherData != null && city != ''"
      class="wrapper__button"
      @click="handleUpdateWeather()"
    >
      Обновить
    </button>
  </div>

  <Notification
    v-if="notification.show"
    :message="notification.message"
    :type="notification.type"
  />
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import WeatherCard from '@/components/WeatherCard.vue'
import Notification from '@/components/Notification.vue'
import { useWeatherApi } from '@/services/useWeatherApi'

const city = ref('')
const cityName = computed(() => '«' + city.value + '»')
const notification = ref({
  message: '',
  type: '',
  show: false,
})

// Управление уведомлениями
const showNotification = (message, type = 'info') => {
  notification.value.message = message
  notification.value.type = type
  notification.value.show = true

  setTimeout(() => {
    notification.value.show = false
  }, 3000) // Автоматическое скрытие через 3 секунды
}

// Используем service useWeatherApi и передаем в неё showNotification
const { weatherData, error, isLoading, getWeather, updateWeather } = useWeatherApi(showNotification)

// Получение погоды
const handleGetWeather = () => {
  if (city.value.trim().length < 2) {
    error.value = 'Название города должно содержать более одного символа!'
    weatherData.value = null
    return
  }
  getWeather(city.value)
}

// Обновление погоды
const handleUpdateWeather = () => {
  updateWeather(city.value) // Очищаем кэш для введенного города
  showNotification('Погода обновлена!', 'success')
}

// Очистка данных
const clearInput = () => {
  city.value = ''
  error.value = ''
  weatherData.value = null
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
  position: relative;

  &__header {
    & h1 {
      margin-top: var(--indents-biggest);
    }
    & p {
      margin-top: var(--indents-medium);
    }
  }

  &__input {
    margin-top: var(--indents-big);
    padding: var(--indents-little) var(--indents-small);
    border: none;
    outline: none; // Удаляем обводку у input
    border-bottom: 2px solid #110813;
    background: transparent;
    color: var(--input-color);
    font-size: var(--font-size-input);

    &:focus {
      border-bottom-color: var(--loading-color);
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
</style>
