<template>
  <div class="weather-card">
    <p v-if="weather.main?.temp">
      {{ $t('temperature') }}: {{ weather.main.temp.toFixed(0) }}{{ temperatureUnit }}
    </p>
    <p v-if="weather.main?.feels_like">
      {{ $t('feelsLike') }}: {{ weather.main.feels_like.toFixed(0) }}{{ temperatureUnit }}
    </p>
    <p v-if="weather.main?.temp_max">
      {{ $t('maxTemperature') }}: {{ weather.main.temp_max.toFixed(0) }}{{ temperatureUnit }}
    </p>
    <p v-if="weather.main?.humidity">
      {{ $t('humidity') }}: {{ weather.main.humidity.toFixed(0) }}%
    </p>
    <p v-if="weather.wind?.speed">
      {{ $t('windSpeed') }}: {{ weather.wind.speed.toFixed(1) }} {{ windSpeedUnit }}
    </p>
    <p v-if="weather.wind?.gust">
      {{ $t('windGust') }}: {{ weather.wind.gust.toFixed(1) }} {{ windSpeedUnit }}
    </p>
    <p v-if="weather.wind?.deg">{{ $t('windDirection') }}: {{ windDirection || $t('noWind') }}</p>
    <p v-if="weather.rain?.['1h']">
      {{ $t('precipitation') }}: {{ weather.rain['1h'].toFixed(1) }}{{ $t('millimeterPerHour') }}
    </p>
    <p v-if="weather.rain?.['3h']">
      {{ $t('precipitation') }}: {{ weather.rain['3h'].toFixed(1) }}{{ $t('millimeterPerHour') }}
    </p>
    <p v-if="weather.main?.grnd_level">
      {{ $t('groundPressure') }}: {{ groundLevelPressureMmHg }} {{ grndLevelUnit }}
    </p>
    <div v-if="weather.weather?.[0]?.description" class="weather-card__weather">
      <p>{{ $t('weatherConditions') }}: {{ weather.weather[0].description }}</p>
      <img
        v-if="weather.iconUrl"
        :src="weather.iconUrl"
        alt="Weather Icon"
        class="weather-card__weather_icon"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' }) // Используем useI18n

const props = defineProps({
  weather: {
    type: Object,
    required: true,
  },
  units: {
    type: String,
    default: 'metric',
    validator: (value) => ['metric', 'empirical'].includes(value),
  },
})

const temperatureUnit = computed(() => {
  return props.units === 'metric' ? t('celsius') : t('fahrenheit')
})
const windSpeedUnit = computed(() => {
  return props.units === 'metric' ? t('metersPerSecond') : t('milesPerHour')
})
const grndLevelUnit = computed(() =>
  props.units === 'metric' ? t('millimetersOfMercury') : t('hectopascal'),
)

// Атмосферное давление
const groundLevelPressureMmHg = computed(() => {
  const grndLevel = props.weather.main?.grnd_level
  if (grndLevel) {
    let pressureHPa = null
    if (props.units === 'empirical') {
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
    const directions = [
      t('directionN'),
      t('directionNE'),
      t('directionE'),
      t('directionSE'),
      t('directionS'),
      t('directionSW'),
      t('directionW'),
      t('directionNW'),
    ]
    const index = Math.round(degrees / 45) % 8
    return directions[index]
  }
  return null
})
</script>

<style scoped lang="scss">
.weather-card {
  margin-top: var(--indents-biggest);
  padding: var(--indents-medium);
  display: flex;
  flex-direction: column;
  gap: var(--indents-small);
  color: var(--text-color);
  background: var(--accent-color);
  border-radius: var(--border-radius-medium);
  position: relative;

  &__weather {
    &_icon {
      position: absolute;
      top: 0;
      right: 0;
      width: var(--icon-size);
      height: var(--icon-size);
      margin: 0 auto;
    }
  }
}

/* Адаптивность */
@media (max-width: 768px) {
  .weather-card {
    margin-top: var(--indents-medium);
    padding: var(--indents-small);
  }
}
</style>
