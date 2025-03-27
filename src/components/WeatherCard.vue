<template>
  <div class="weather-card">
    <p v-if="weather.main?.temp">Температура: {{ weather.main.temp.toFixed(0) }}℃</p>
    <p v-if="weather.main?.feels_like">Ощущается как: {{ weather.main.feels_like.toFixed(0) }}℃</p>
    <p v-if="weather.main?.temp_max">
      Максимальная температура: {{ weather.main.temp_max.toFixed(0) }}℃
    </p>
    <p v-if="weather.main?.humidity">Влажность воздуха: {{ weather.main.humidity.toFixed(0) }}%</p>
    <p v-if="weather.wind?.speed">Скорость ветра до: {{ weather.wind.speed.toFixed(1) }} м/с</p>
    <p v-if="weather.weather?.[0]?.description">
      Погодные условия: {{ weather.weather[0].description }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  weather: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped lang="scss">
.weather-card {
  margin: 40px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: rgb(40, 200, 150);
  background-color: #1f0f24;
  border: 2px solid #b99935;
  border-radius: 16px;
}
</style>
