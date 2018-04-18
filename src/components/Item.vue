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
        this.expandItem()
      }
    },
    methods: {
      toggleChildren () {
        if (this.item.children) {
          this.instance.setActiveChild(this.item)
          this.expandItem()
        }
      },
      hoverItem () {
        if (this.instance.enableHover) {
          this.toggleChildren()
        }
      },
      expandItem () {

        this.$emit('expandItem', {
          top: this.instance.oneRow
            ? this.$parent.$el.offsetTop
            : this.$parent.$el.offsetTop - this.$parent.$el.scrollTop + this.$el.offsetTop
          ,
          right: this.$parent.$el.offsetLeft + this.$parent.$el.offsetWidth
        })
      }
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