<template>
  <div>
    <input
      class="input"
      type="text"
      :value="modelValue"
      :placeholder="$t('cityPlaceholder')"
      @input="$emit('update:modelValue', $event.target.value)"
      @keydown.enter="$emit('get-weather')"
      @keydown.esc="$emit('clear-input')"
    />
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  errorMessage: {
    type: String,
    default: '',
  },
})

defineEmits(['update:modelValue', 'get-weather', 'clear-input'])
</script>

<style scoped lang="scss">
.input {
  padding: var(--indents-little) var(--indents-small);
  border: none;
  outline: none; /* Удаляем обводку у input */
  border-bottom: 2px solid var(--border-bottom-color);
  background: transparent;
  color: var(--input-color);
  font-size: var(--font-size-input);

  &:focus {
    border-bottom-color: var(--loading-color);
  }
}

.error {
  margin-top: var(--indents-medium);
  color: var(--error-color);
}

/* Адаптивность */
@media (max-width: 768px) {
  .input {
    margin-left: 0;
    width: 100%;
  }
}
</style>
