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
    <button v-if="city != ''" class="wrapper__button" @click="handleGetWeather()">
      Узнать погоду
    </button>
    <button disabled v-else class="wrapper__button">Введите город</button>
    <p class="wrapper__error">{{ error }}</p>

    <div v-if="isLoading" class="wrapper__loading">Загрузка...</div>

    <WeatherCard v-if="weatherData != null" :weather="weatherData" />

    <!-- Кнопка для очистки кэша и обновления данных -->
    <button v-if="weatherData != null && city != ''" class="wrapper__button" @click="clearCache()">
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
const { weatherData, error, isLoading, getWeather } = useWeatherApi() // Используем service useWeatherApi

const cityName = computed(() => '«' + city.value + '»')

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

const clearCache = () => {
  removeCachedData(city.value)
  getWeather(city.value) // Обновить данные
}
</script>

<style scoped lang="scss">
.wrapper {
  min-width: 800px;
  min-height: 420px;
  border-radius: 40px;
  padding: 20px;
  background-color: #1f0f24;
  text-align: center;
  color: rgb(40, 200, 150);

  &__header {
    & h1 {
      margin-top: 40px;
    }
    & p {
      margin-top: 20px;
    }
  }

  &__input {
    margin-top: 30px;
    padding: 5px 10px;
    border: none;
    outline: none; // Удаляем обводку у input
    border-bottom: 2px solid #110813;
    background: transparent;
    color: #fcfcfc;
    font-size: 14px;

    &:focus {
      border-bottom-color: #6e2d7d;
    }
  }

  &__button {
    cursor: pointer;
    margin-left: 20px;
    padding: 8px 16px;
    color: #1f0f24;
    background-color: #e3bc4b;
    border: 2px solid #b99935;
    border-radius: 8px;
    transition: transform 0.2s ease;

    &:hover {
      transform: translateY(-2px);
    }
    &:active {
      transform: translateY(-2px) scale(0.97);
    }
    &:disabled {
      cursor: no-drop;
      color: #fff;
      background-color: #9c7216;
    }
  }
  &__error {
    margin-top: 20px;
    color: #d03939;
  }

  // Стиль для индикатора загрузки
  &__loading {
    margin-top: 20px;
    font-style: italic;
    color: #6e2d7d;
  }
}
</style>
