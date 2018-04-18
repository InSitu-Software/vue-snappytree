<template>
    <div class="vst-dropout" :style="{ left: left + 'px', top: top + 'px' }">
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
    .vst-dropout {
        position: absolute;
        background-color: lightgray;
        border: 1px solid rgba(0,0,0,0.5);
        width: 100%;
        max-height: 250px;
        max-width: 250px;
        overflow: auto;
    }
</style>