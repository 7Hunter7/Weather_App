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
    <!-- Уведомление -->
    <div v-if="showNotification" class="wrapper__notification">Погода обновлена!</div>

    <WeatherCard v-if="weatherData != null" :weather="weatherData" />

    <!-- Кнопка для очистки кэша и обновления данных -->
    <button
      v-if="weatherData != null && city != ''"
      class="wrapper__button"
      @click="updateWeather()"
    >
      Обновить
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import WeatherCard from '@/components/WeatherCard.vue'
import { useWeatherApi } from '@/services/useWeatherApi'
import { removeCachedData } from '@/utils/cacheUtils'

const city = ref('')
const cityName = computed(() => '«' + city.value + '»')
const showNotification = ref(false)
const { weatherData, error, isLoading, getWeather } = useWeatherApi() // Используем service useWeatherApi

const handleGetWeather = () => {
  if (city.value.trim().length < 2) {
    error.value = 'Название города должно содержать более одного символа!'
    weatherData.value = null
    return
  }
  getWeather(city.value)
}

const clearInput = () => {
  city.value = ''
  error.value = ''
  weatherData.value = null
}

const updateWeather = () => {
  removeCachedData(city.value) // Очищаем кэш
  getWeather(city.value) // Запрашиваем новые данные
  showNotification.value = true // Показываем уведомление

  setTimeout(() => {
    showNotification.value = false // Скрываем уведомление через 3 секунды
  }, 3000)
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
