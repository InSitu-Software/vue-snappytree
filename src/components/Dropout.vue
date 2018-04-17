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
    },
    mounted () {
      console.log('Dropout mounted')
      this.$emit('size', 'TestMe')
    }
  }
</script>

<style lang="scss">
    .vst-dropout {
        position: absolute;
        background-color: lightgray;
        border: 1px solid rgba(0,0,0,0.5);
        width: 200px;
        max-height: 400px;
        overflow: auto;
    }
</style>