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
  margin: var(--indents-biggest);
  padding: var(--indents-medium);
  display: flex;
  flex-direction: column;
  gap: var(--indents-small);
  color: var(--text-color);
  background-color: var(--background-color);
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius-medium);
}
</style>
