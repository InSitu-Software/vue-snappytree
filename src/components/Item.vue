<template>
    <div class="vst-item">
        <label>{{item.label}}</label>
        <span
                v-if="item.children"
                @click="toggleChildren"
        > -> </span>
      <dropout v-if="isOpen" :left="getLeft()" :top="getTop()">
          <item v-for="child in item.children" :key="child.id" :item="child"/>
      </dropout>
    </div>
</template>

<script>
  import Dropout from './Dropout'

  export default {
    name: 'item',
    components: {
      Dropout
    },
    props: {
      item: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        isOpen: false
      }
    },
    methods: {
      toggleChildren () {
        this.item.children
            ? this.isOpen = !this.isOpen
            : this.isOpen= false

      },
      getLeft () {
        const rect = this.$el.getBoundingClientRect()
        let left = rect.x + rect.width
        console.log(left)
        return left
      },
      getTop () {
        const rect = this.$el.getBoundingClientRect()
        let top = rect.y
        console.log(top)
        return top
      }
    }
  }
</script>

<style lang="scss">
    .vst-item {
        padding: 5px;
        display: flex;

        > label {
            flex: 1;
            text-align: left;
        }

        > span {
            flex: 0 0 30px;
            cursor: pointer;
        }
    }
</style>