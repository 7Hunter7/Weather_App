<template>
  <div class="loader">
    <div class="rainbow-loader">
      <div class="border"></div>
      <div class="glow"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.loader {
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;

  .rainbow-loader {
    width: var(--loader-size);
    height: var(--loader-size);
    border-radius: 100%;
    position: relative;
    animation: rotate 1.5s linear infinite;
    .border,
    .glow {
      position: absolute;
      z-index: 0;
      height: 100%;
      width: 100%;
      &:before {
        content: '';
        display: block;
        position: absolute;
        z-index: 1;
        inset: 0;
        border-radius: 100%;
        background-image: conic-gradient(
          from 0deg at 50% 50%,
          transparent 60deg,
          purple 110deg,
          blue 160deg,
          green 210deg,
          yellow 260deg,
          orange 310deg,
          red 360deg
        );
        -webkit-mask:
          linear-gradient(#fff 0 0) content-box,
          linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        pointer-events: none;
      }
    }
    .border {
      &:before {
        padding: 2px;
      }
    }
    .glow {
      animation: pulse 1.5s linear infinite;
      &:before {
        padding: 10px;
        width: calc(100% - 10px);
        height: calc(100% - 10px);
        top: -5px;
        left: -5px;
      }
    }
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0% {
    filter: blur(5px);
    opacity: 0.4;
  }
  50% {
    filter: blur(20px);
    opacity: 1;
  }
  100% {
    filter: blur(5px);
    opacity: 0.4;
  }
}
</style>
