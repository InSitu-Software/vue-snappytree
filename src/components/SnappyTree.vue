<template>
    <div class="vst-snappy-tree">
        <search-input
                @toggle="toggleOpen"
        />
        <dropout
                v-if="showDropout"
                v-for="menu, index in renderDropouts"
                :key="menu.id"
                :left="index * 200"
                :top="getTop(menu)"
                @size="onSize"
        >
            <item v-for="item in menu.children" :key="item.id" :item="item" @size="onSize"/>
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
        itemHash: {},
        renderDropouts: []
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
      },
      expandedItems: {
        handler (after, before) {
          const renderLength = this.renderDropouts.length
          this.renderDropouts = []
          for (let i=0; i < renderLength; i++) {
            const tempItem = this.expandedItems[i]
            if (tempItem) {
              this.renderDropouts.push(tempItem)
            }

          }
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
        this.showDropout
          ? this.renderDropouts.push(this.expandedItems[0])
          : this.renderDropouts = []
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
      },
      onSize (parentRect) {
        console.log('OnSize: ', parentRect)
        const tempItem = this.expandedItems[this.renderDropouts.length]
        console.log(tempItem)
        if (tempItem) {
          this.renderDropouts.push(tempItem)
        }
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