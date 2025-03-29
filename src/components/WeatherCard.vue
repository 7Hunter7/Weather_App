<template>
  <div class="weather-card">
    <p v-if="weather.main?.temp">
      Температура: {{ weather.main.temp.toFixed(0) }}{{ temperatureUnit }}
    </p>
    <p v-if="weather.main?.feels_like">
      Ощущается как: {{ weather.main.feels_like.toFixed(0) }}{{ temperatureUnit }}
    </p>
    <p v-if="weather.main?.temp_max">
      Максимальная температура (сейчас): {{ weather.main.temp_max.toFixed(0) }}{{ temperatureUnit }}
    </p>
    <p v-if="weather.main?.humidity">Влажность воздуха: {{ weather.main.humidity.toFixed(0) }}%</p>
    <p v-if="weather.wind?.speed">
      Скорость ветра: {{ weather.wind.speed.toFixed(1) }} {{ windSpeedUnit }}
    </p>
    <p v-if="weather.wind?.gust">
      Порывы ветра: до {{ weather.wind.gust.toFixed(1) }} {{ windSpeedUnit }}
    </p>
    <p v-if="weather.wind?.deg">Направление ветра: {{ windDirection }}</p>
    <p v-if="weather.rain?.['1h']">
      Количество осадков(за 1 час): {{ weather.rain['1h'].toFixed(1) }}{{ rainUnit }}
    </p>
    <p v-if="weather.main?.grnd_level">
      Атмосферное давление: {{ groundLevelPressureMmHg }} {{ grndLevelUnit }}
    </p>
    <p v-if="weather.weather?.[0]?.description">
      Погодные условия: {{ weather.weather[0].description }}
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  weather: {
    type: Object,
    required: true,
  },
  units: {
    type: String,
    default: 'metric',
    validator: (value) => ['metric', 'imperial'].includes(value),
  },
})

const temperatureUnit = computed(() => (props.units === 'metric' ? '℃' : '℉'))
const windSpeedUnit = computed(() => (props.units === 'metric' ? 'м/с' : 'mph'))
const rainUnit = computed(() => (props.units === 'metric' ? 'мм/ч' : 'mm/h'))
const grndLevelUnit = computed(() => (props.units === 'metric' ? 'мм рт.ст.' : 'hPa'))

// Атмосферное давление
const groundLevelPressureMmHg = computed(() => {
  const grndLevel = props.weather.main?.grnd_level
  if (grndLevel) {
    let pressureHPa = null
    if (props.units === 'imperial') {
      pressureHPa = grndLevel // Давление в гектопаскалях
    } else {
      pressureHPa = (grndLevel * 0.750062).toFixed(1) // Давление в мм рт. ст.
    }
    return pressureHPa
  }
  return null
})

// Направление ветра
const windDirection = computed(() => {
  if (props.weather.wind?.deg) {
    const degrees = props.weather.wind.deg
    const directions = ['С', 'СВ', 'В', 'ЮВ', 'Ю', 'ЮЗ', 'З', 'СЗ']
    const index = Math.round(degrees / 45) % 8
    return directions[index]
  }
  return null
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
