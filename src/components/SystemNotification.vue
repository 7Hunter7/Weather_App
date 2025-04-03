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
  top: 0;
  right: 0;
  margin: var(--indents-medium);
  padding: var(--indents-small) var(--indents-medium);
  color: var(--text-color);
  border-radius: var(--border-radius-small);
  box-shadow: 0 var(--indents-little) var(--indents-small) rgba(0, 0, 0, 0.2);
  opacity: 0.9;
  z-index: 100;

  &.info {
    background-color: var(--notification-info-bg);
    color: var(--notification-info-text);
    border: 1px solid var(--notification-info-border);
  }

  &.success {
    background-color: var(--notification-success-bg);
    color: var(--notification-success-text);
    border: 1px solid var(--notification-success-border);
  }

  &.warning {
    background-color: var(--notification-warning-bg);
    color: var(--notification-warning-text);
    border: 1px solid var(--notification-warning-border);
  }

  &.error {
    background-color: var(--notification-error-bg);
    color: var(--notification-error-text);
    border: 1px solid var(--notification-error-border);
  }
}

/* Адаптивность */
@media (max-width: 480px) {
  .notification {
    margin: var(--indents-small);
  }
}

@media (max-width: 320px) {
  .notification {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    margin: var(--indents-little);
  }
}
</style>
