<template>
  <div class="buttons">
    <button
      class="button"
      @click="$emit('get-weather')"
      :class="{ 'button--disabled': isCityEmpty }"
    >
      {{ $t('getWeather') }}
    </button>
    <button class="button" @click="$emit('get-weather-by-geolocation')" style="margin-top: 2rem">
      {{ $t('detectLocation') }}
    </button>
    <button
      v-if="isWeatherDataAvailable && !isCityEmpty"
      class="button"
      @click="$emit('update-weather')"
    >
      {{ $t('update') }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  isCityEmpty: {
    type: Boolean,
    required: true,
  },
  isWeatherDataAvailable: {
    type: Boolean,
    required: false,
  },
})

defineEmits(['get-weather', 'get-weather-by-geolocation', 'update-weather'])
</script>

<style scoped lang="scss">
.buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.button {
  cursor: pointer;
  padding: var(--indents-small) var(--indents-medium);
  color: var(--text-color);
  background: var(--accent-color);
  border: 2px solid var(--accent-color);
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
</style>
