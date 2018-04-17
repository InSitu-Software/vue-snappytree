<template>
    <div class="vst-snappy-tree">
        <search-input
                @toggle="toggleOpen"
        />
        <dropout
                v-if="showDropout"
                v-for="menu, index in expandedItems"
                :key="menu.id"
                :left="index * 200"
                :top="getTop(menu)"
        >
            <item v-for="item in menu.children" :key="item.id" :item="item"/>
        </dropout>
    </div>
</template>

<script>
  import SearchInput from './SearchInput'
  import Dropout from './Dropout'
  import Item from './Item'
  import Vue from 'vue'

  export default {
    name: 'snappy-tree',
    components: {
      SearchInput,
      Dropout,
      Item,
    },
    props: {
      tree: {
        type: Object,
        required: true,
      },
      enableHover: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        showDropout: false,
        activeChild: undefined,
        itemHash: {}
      }
    },
    provide () {
      return {
        instance: this,
      }
    },
    watch: {
      tree: {
        immediate: true,
        deep: true,
        handler (after, before) {
          const createHashMap = (item) => {
            Vue.set(this.itemHash, item.id, item)
            if (item.children) {
              item.children.forEach(createHashMap)
            }
          }
          createHashMap(this.tree)
        }
      }
    },
    computed: {
      expandedItems () {
        const expanded = []
        const searchExpanded = item => {
          if (item.isExpanded) {
            expanded.push(item)
          }
          if (item.children) {
            item.children.forEach(searchExpanded)
          }
        }

        searchExpanded(this.tree)

        return expanded
      },
    },
    methods: {
      toggleOpen () {
        this.showDropout = !this.showDropout
      },
      setActiveChild (child) {
        this.$emit('activeChild', child)
      },
      getTop (menu) {
        const levels = menu.id.split('_')
        levels.shift()
        const sumLevels = levels.reduce((sum, level) => sum + parseInt(level) -1, 0)

        return sumLevels * 30 + 30
      },
      getItemById (id) {
        return this.itemHash[id]
      }
    },

  }
</script>

<style lang="scss">
    .vst-snappy-tree {
        background-color: white;
        position: relative;
    }
</style>