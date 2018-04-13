<template>
    <div class="vst-snappy-tree">
        <search-input
            @toggle="toggleOpen"
        />
        <dropout v-if="isOpen">
            <template>
                <item v-for="item in items" :key="item.id" :item="item"/>
            </template>
        </dropout>
    </div>
</template>

<script>
  import SearchInput from './SearchInput'
  import Dropout from './Dropout'
  import Item from './Item'

  export default {
    name: 'snappy-tree',
    components: {
      SearchInput,
      Dropout,
      Item
    },
    props: {
      items: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
        isOpen: false
      }
    },
    methods: {
      toggleOpen () {
        console.log('clicked')
        this.isOpen = !this.isOpen
      }
    }
  }
</script>

<style lang="scss">
    .vst-snappy-tree {
        background-color: white;
        position: relative;
    }
</style>