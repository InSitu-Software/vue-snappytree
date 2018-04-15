<template>
    <div class="vst-wrapper" :style="{ left: left + 'px', top: top + 'px' }">
        <slot></slot>
    </div>
</template>

<script>
  export default {
    name: 'dropout',
    props: {
      left: {
        default: 0
      },
      top: {
        type: Number,
        default: 0
      }
    }
  }
</script>

<style lang="scss">
    .vst-dropout2 {
        position: fixed;
        left: 0;
        top: 0;
    }

    .vst-wrapper {
        position: absolute;
        background-color: lightgray;
        border: 1px solid rgba(0,0,0,0.5);
        width: 300px;
        max-height: 400px;
        overflow: auto;
    }
</style>