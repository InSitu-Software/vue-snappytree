<template>
    <div class="vst-snappy-tree">
        <search-input
                @toggle="toggleOpen"
        />
        <dropout
                v-if="showDropout"
                v-for="menu, index in renderDropouts"
                :key="menu.item.id"
                :left="getLeft(menu)"
                :top="getTop(menu)"
        >
            <item v-for="item in menu.item.children" :key="item.id" :item="item" @expandItem="expandItem"/>
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
      },
      oneRow: {
        type: Boolean,
        default: false
      },
      snappy: {
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
          ? this.renderDropouts.push({
            item: this.expandedItems[0],
            parentRect: {
              top: 30,
              right: 0
            }
          })
          : this.renderDropouts = []
      },
      setActiveChild (child) {
        this.$emit('activeChild', child)
      },
      getTop (menu) {
        return menu.parentRect.top
      },
      getLeft (menu) {
        return menu.parentRect.right
      },
      getItemById (id) {
        return this.itemHash[id]
      },
      expandItem (parentRect) {
        const tempItem = this.expandedItems[this.renderDropouts.length] || this.expandedItems[this.expandedItems.length -1 ]
        const newRenderDropouts = []
        let i=0
        while (this.renderDropouts[i] && this.renderDropouts[i].item.parent !== tempItem.parent) {
          newRenderDropouts.push(this.renderDropouts[i])
          i++
        }

        newRenderDropouts.push({
          item: tempItem,
          parentRect
        })
        Vue.set(this, 'renderDropouts', newRenderDropouts)
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