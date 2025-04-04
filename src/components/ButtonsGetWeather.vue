<template>
  <div class="buttons">
    <button
      class="button"
      @click="$emit('get-weather')"
      :class="{ 'button--disabled': isCityEmpty }"
    >
      {{ $t('getWeather') }}
      <svg
        id="svg"
        fill="#000000"
        stroke="#000000"
        width="200px"
        height="200px"
        version="1.1"
        viewBox="144 144 512 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="IconSvg_bgCarrier" stroke-width="0"></g>
        <g
          id="IconSvg_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke="#CCCCCC"
        ></g>
        <g id="IconSvg_iconCarrier">
          <g xmlns="http://www.w3.org/2000/svg">
            <path
              d="m407.87 226.97v-55.262c0-4.4102-3.4648-7.875-7.8711-7.875-4.4102 0-7.8711 3.4648-7.8711 7.8711v55.262c2.6758-0.15625 5.1914-0.15625 7.8711-0.15625 2.6758 0 5.3516 0 7.8711 0.16016z"
            />
            <path
              d="m234.69 392.12c0-2.6758 0-5.1953 0.15625-7.8711h-55.262c-4.4102 0-7.8711 3.4648-7.8711 7.8711 0 4.4102 3.4609 7.875 7.8711 7.875h55.262c-0.15625-2.5195-0.15625-5.1953-0.15625-7.875z"
            />
            <path
              d="m620.41 384.25h-55.262c0.15625 2.5195 0.15625 5.1953 0.15625 7.8711s0 5.3516-0.15625 7.8711l55.262 0.003906c4.4102 0 7.8711-3.4648 7.8711-7.8711 0.003906-4.4102-3.4609-7.875-7.8711-7.875z"
            />
            <path
              d="m392.12 557.28v55.262c0 4.4102 3.4648 7.8711 7.8711 7.8711 4.4102 0 7.8711-3.4648 7.8711-7.8711v-55.262c-2.5156 0.15625-5.1914 0.15625-7.8672 0.15625-2.6797 0-5.3555 0-7.875-0.15625z"
            />
            <path
              d="m272.63 287.11c1.2617-1.8906 2.8359-3.6211 4.4102-5.3516 2.0469-2.2031 4.0938-4.4102 6.1406-6.4531l-66.125-77.305c-2.832-3.1484-7.8711-3.6211-11.18-0.78906-3.3086 2.8359-3.6211 7.8711-0.78906 11.18z"
            />
            <path
              d="m522.17 280.97 72.266-72.266c3.1484-2.9922 3.1484-8.0312 0-11.02-2.9922-3.1484-8.0312-3.1484-11.02 0l-72.266 72.266c1.8906 1.7305 3.7773 3.4648 5.668 5.3516 1.8867 1.8906 3.6211 3.7812 5.3516 5.668z"
            />
            <path
              d="m277.82 503.28-72.266 72.266c-3.1484 2.9922-3.1484 8.0312 0 11.02 1.418 1.5742 3.4648 2.3594 5.5117 2.3594 2.0469 0 4.0938-0.78906 5.5117-2.3633l72.266-72.266c-1.8906-1.7305-3.7773-3.4648-5.668-5.3516-1.8906-1.8867-3.625-3.7773-5.3555-5.6641z"
            />
            <path
              d="m522.17 503.28c-1.7305 1.8906-3.4648 3.7773-5.3516 5.668-1.8906 1.8906-3.7773 3.6211-5.668 5.3516l72.266 72.266c1.4141 1.5742 3.4609 2.3594 5.5078 2.3594s4.0938-0.78906 5.5117-2.3633c3.1484-2.9922 3.1484-8.0312 0-11.02z"
            />
            <path
              d="m516.66 497.77c23.617-26.137 38.73-60.141 40.621-97.77 0.15625-2.5195 0.15625-5.1953 0.15625-7.875 0-2.6758 0-5.3516-0.15625-7.8711-1.8906-37.629-17.004-71.637-40.621-97.77-1.7305-1.8906-3.4648-3.7773-5.3516-5.668-1.8906-1.8906-3.7773-3.6211-5.668-5.3516-26.137-23.617-60.141-38.73-97.77-40.621-2.5195-0.15625-5.1953-0.15625-7.8711-0.15625s-5.3516 0-7.8711 0.15625c-40.461 2.0469-76.988 19.363-103.75 46.289-1.8906 1.8867-3.6211 3.7773-5.5117 5.8242-1.7305 1.8867-3.4648 3.9336-5.0391 5.9805-20.469 25.191-33.379 56.836-35.109 91.316-0.15625 2.6758-0.15625 5.1953-0.15625 7.8711s0 5.3516 0.15625 7.8711c1.8906 37.629 17.004 71.637 40.621 97.77 1.7305 1.8906 3.4648 3.7773 5.3516 5.668 1.8906 1.8906 3.7773 3.6211 5.668 5.3516 26.137 23.617 60.141 38.73 97.77 40.621 2.5195 0.15625 5.1953 0.15625 7.8711 0.15625 2.6758 0 5.3516 0 7.8711-0.15625 37.629-1.8906 71.637-17.004 97.77-40.621 1.8906-1.7305 3.7773-3.4648 5.668-5.3516 1.8945-1.8867 3.625-3.7734 5.3555-5.6641z"
            />
          </g>
        </g>
      </svg>
    </button>
    <button class="button geolocation-button" @click="$emit('get-weather-by-geolocation')">
      {{ $t('detectLocation') }}
      <svg
        id="svg"
        fill="#000000"
        stroke="#000000"
        width="200"
        height="200"
        version="1.1"
        viewBox="144 144 512 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="IconSvg_bgCarrier" stroke-width="0"></g>
        <g
          id="IconSvg_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke="#CCCCCC"
        ></g>
        <g id="IconSvg_iconCarrier">
          <g xmlns="http://www.w3.org/2000/svg">
            <path
              d="m400 274.05c-20.879 0-40.902 8.293-55.664 23.055-14.766 14.766-23.059 34.785-23.059 55.664s8.293 40.902 23.059 55.664c14.762 14.762 34.785 23.059 55.664 23.059 20.875 0 40.898-8.2969 55.664-23.059 14.762-14.762 23.055-34.785 23.055-55.664-0.023438-20.871-8.3281-40.879-23.086-55.637-14.754-14.758-34.766-23.059-55.633-23.082zm0 125.95c-12.527 0-24.543-4.9766-33.398-13.836-8.8594-8.8555-13.836-20.871-13.836-33.398s4.9766-24.539 13.836-33.398c8.8555-8.8555 20.871-13.832 33.398-13.832 12.523 0 24.539 4.9766 33.398 13.832 8.8555 8.8594 13.832 20.871 13.832 33.398s-4.9766 24.543-13.832 33.398c-8.8594 8.8594-20.875 13.836-33.398 13.836z"
            />
            <path
              d="m400 195.32c-41.742 0.046875-81.762 16.648-111.28 46.164s-46.117 69.535-46.164 111.28c0 77.793 124.38 251.91 157.44 251.91s157.44-174.11 157.44-251.91c-0.042969-41.742-16.648-81.762-46.164-111.28-29.516-29.516-69.531-46.117-111.27-46.164zm0 375.2c-27.898-24.953-125.95-154.1-125.95-217.75 0-44.996 24.004-86.578 62.977-109.08 38.969-22.5 86.98-22.5 125.95 0 38.969 22.5 62.973 64.082 62.973 109.08 0 63.652-98.051 192.8-125.95 217.76z"
            />
          </g>
        </g>
      </svg>
    </button>
    <button
      v-if="isWeatherDataAvailable && !isCityEmpty"
      class="button"
      @click="$emit('update-weather')"
    >
      {{ $t('update') }}
      <svg
        id="svg"
        fill="#000000"
        stroke="#000000"
        width="200px"
        height="200px"
        version="1.1"
        viewBox="144 144 512 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="IconSvg_bgCarrier" stroke-width="0"></g>
        <g
          id="IconSvg_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke="#CCCCCC"
        ></g>
        <g id="IconSvg_iconCarrier">
          <path
            xmlns="http://www.w3.org/2000/svg"
            d="m578.59 385.73c-16.434 0-29.766 13.332-29.766 29.766v0.050781c-0.046875 82.016-66.766 148.78-148.83 148.78-82.066 0-148.83-66.766-148.83-148.83s66.766-148.83 148.83-148.83c18.105 0 35.277 3.7383 51.363 9.6914-15.742 1.4766-28.242 14.316-28.242 30.453 0 17.121 13.875 30.996 30.996 30.996h99.336c17.121 0 30.996-13.875 30.996-30.996v-99.68c0-17.121-13.875-30.996-30.996-30.996s-30.996 13.875-30.996 30.996v40.051c-34.391-25.043-76.605-40.051-122.46-40.051-115.08 0-208.36 93.285-208.36 208.36s93.281 208.36 208.36 208.36c115.08 0 208.36-93.285 208.36-208.36 0-16.434-13.332-29.766-29.766-29.766z"
          />
        </g>
      </svg>
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
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--indents-little);
  padding: var(--indents-small) var(--indents-medium);
  background: none;
  color: var(--text-color);
  border: 1px solid var(--border-color);
  outline: none;
  border-radius: var(--border-radius-small);
  transition: all 0.3s ease;
  svg {
    height: var(--indents-medium);
    width: auto;
    fill: var(--loading-color);
    transition: fill 0.2s ease;
  }

  &:hover svg {
    fill: var(--input-color);
  }

  &::after {
    position: absolute;
    left: 0;
    top: 0;
    height: 0;
    width: 0;
    content: '';
    z-index: -1;
    border-radius: var(--border-radius-small);
    background: var(--accent-color);
    border-color: var(--accent-color);
  }

  &:hover {
    transform: translateY(-2px);
    &::after {
      height: 100%;
      width: 100%;
    }
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
.geolocation-button {
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
