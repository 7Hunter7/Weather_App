<template>
  <div class="notification" :class="type">
    {{ message }}
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'info', // 'info', 'success', 'warning', 'error'
    validator: (value) => ['info', 'success', 'warning', 'error'].includes(value),
  },
})
</script>

<style scoped lang="scss">
.notification {
  position: fixed;
  top: var(--indents-medium);
  right: var(--indents-medium);
  padding: 1rem 1.5rem;
  color: var(--text-color);
  border-radius: var(--border-radius-small);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 100;

  &.info {
    background-color: var(--background-color);
    border: 1px solid var(--border-color);
  }

  &.success {
    background-color: var(--text-color);
  }

  &.warning {
    background-color: var(--accent-color);
    color: var(--background-color);
  }

  &.error {
    background-color: var(--error-color);
  }
}
</style>
