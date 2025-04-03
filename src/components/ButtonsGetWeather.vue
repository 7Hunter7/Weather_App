<template>
  <div class="buttons">
    <button
      class="button"
      @click="$emit('get-weather')"
      :class="{ 'button--disabled': isCityEmpty }"
    >
      {{ $t('getWeather') }}
    </button>
    <button class="button" @click="$emit('get-weather-by-geolocation')">
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
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: var(--indents-medium);
}

.button {
  cursor: pointer;
  padding: var(--indents-small) var(--indents-medium);
  background-color: transparent;
  color: var(--text-color);
  border: 1px solid var(--border-color);
  outline: none;
  border-radius: var(--border-radius-small);
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease,
    transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    background: var(--accent-color);
    border-color: var(--accent-color);
  }

  &:active {
    transform: scale(0.97);
  }

  &--disabled {
    cursor: not-allowed;
    pointer-events: none;
    color: var(--disabled-text-color);
    border-color: var(--disabled-background-color);
    background-color: var(--disabled-background-color);
  }
}
/* Адаптивность */
@media (max-width: 768px) {
  .buttons {
    flex-direction: column;
  }

  .button {
    width: 100%;
  }
}
@media (max-width: 480px) {
  .button {
    width: 90%;
  }
}
</style>
