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
    background-color: var(--notification-info-bg);
    color: var(--notification-info-text);
    border: 1px solid darken(--notification-info-bg, 10%);
  }

  &.success {
    background-color: var(--notification-success-bg);
    color: var(--notification-success-text);
    border: 1px solid darken(--notification-success-bg, 10%);
  }

  &.warning {
    background-color: var(--notification-warning-bg);
    color: var(--notification-warning-text);
    border: 1px solid darken(--notification-warning-bg, 10%);
  }

  &.error {
    background-color: var(--notification-error-bg);
    color: var(--notification-error-text);
    border: 1px solid darken(--notification-error-bg, 10%);
  }
}
</style>
