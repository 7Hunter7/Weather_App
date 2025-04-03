<template>
  <div class="select-container">
    <label for="language-select">{{ $t('selectLanguage') }}:</label>
    <select
      id="language-select"
      v-model="language"
      class="select"
      @change="$emit('update:language', language)"
    >
      <option value="ru">Русский</option>
      <option value="en">English</option>
    </select>

    <label for="units-select">{{ $t('selectUnits') }}:</label>
    <select id="units-select" v-model="units" class="select" @change="$emit('update:units', units)">
      <option value="metric">{{ $t('unitMetric') }}</option>
      <option value="empirical">{{ $t('unitEmpirical') }}</option>
    </select>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  language: {
    type: String,
    required: true,
  },
  units: {
    type: String,
    required: true,
  },
})

const language = ref(props.language)
const units = ref(props.units)

defineEmits(['update:language', 'update:units'])
</script>

<style scoped lang="scss">
.select-container {
  display: flex;
  flex-direction: column;
  gap: var(--indents-small);

  label {
    font-weight: bold;
  }
}

.select {
  padding: var(--indents-little) var(--indents-small);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-small);
  background-color: var(--background-color);
  color: var(--text-color);
  outline: none;
  cursor: pointer;
}

/* Адаптивность */
@media (max-width: 768px) {
  .select {
    margin-left: 0;
    width: 100%;
  }
}
</style>
