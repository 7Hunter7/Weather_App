<template>
  <div class="help-dialog" @click.self="$emit('close')">
    <div class="help-dialog__content">
      <h2>{{ $t('helpTitle') }}</h2>
      <slot />
      <button @click="$emit('close')">{{ $t('close') }}</button>
    </div>
  </div>
</template>

<script setup>
defineEmits(['close'])
</script>

<style scoped lang="scss">
.help-dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /*  Полупрозрачный фон */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;

  &__content {
    background-color: var(--white-color);
    padding: var(--indents-medium);
    border-radius: var(--border-radius-small);
    width: 80%;
    max-width: var(--wrapper-min-width);
    position: relative;
  }
}
</style>
