<template>
    <div :class="['vst-item', {'isExpanded': item.isExpanded}]" @click="toggleChildren" @mouseenter="hoverItem">
        <label>{{item.label}}</label>
        <span v-if="item.children"> -> </span>
    </div>
</template>

<script>
  import Dropout from './Dropout'

  export default {
    name: 'item',
    components: {
      Dropout,
    },
    props: {
      item: {
        type: Object,
        required: true,
      },
    },
    inject: [
      'instance',
    ],
    mounted () {
      if (this.item.isExpanded) {
        console.log('Trigger next box...')
        this.$emit('size', {
          top: this.$parent.$el.offsetTop + this.$el.offsetTop,
          right: this.$parent.$el.offsetLeft + this.$parent.$el.offsetWidth
        })
      }
    },
    methods: {
      toggleChildren () {
        this.item.children
          ? this.instance.setActiveChild(this.item)
          : this.item.isExpanded = false
        this.$emit('size', {
          top: this.$parent.$el.offsetTop + this.$el.offsetTop,
          right: this.$parent.$el.offsetLeft + this.$parent.$el.offsetWidth
        })
        /*this.instance.toggleOpen()
        setTimeout(() => {
          this.instance.toggleOpen()
        }, 0)*/
      },
      getLeft () {
        const rect = this.$el.getBoundingClientRect()
        return rect.x + rect.width
      },
      getTop () {
        const rect = this.$el.getBoundingClientRect()
        return rect.y
      },
      hoverItem () {
        if (this.instance.enableHover) {
          this.toggleChildren()
        }
      },
    },
  }
</script>

<style lang="scss">
    .vst-item {
        padding: 5px;
        display: flex;
        cursor: pointer;

        > label {
            flex: 1;
            text-align: left;
            cursor: pointer;
        }

        > span {
            flex: 0 0 30px;
            cursor: pointer;
        }

        &.isExpanded {
            background-color: azure;
        }
    }
</style>