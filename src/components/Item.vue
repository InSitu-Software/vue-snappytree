<template>
    <div :class="['vst-item', {'active': item.isExpanded}]" @click="toggleChildren" @mouseenter="hoverItem">
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
    methods: {
      toggleChildren () {
        this.item.children
          ? this.instance.setActiveChild(this.item)
          : this.isExpanded = false
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
        console.log('Hovering')
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

        &.active {
            background-color: azure;
        }
    }
</style>