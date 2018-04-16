<template>
    <div class="vst-snappy-tree">
        <search-input
                @toggle="toggleOpen"
        />
        <dropout
                v-if="showDropout"
                v-for="menu, index in expandedItems"
                :key="menu.id"
                :left="index * 300"
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

    export default {
        name: 'snappy-tree',
        components: {
            SearchInput,
            Dropout,
            Item
        },
        props: {
            tree: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                showDropout: false,
                activeChild: undefined
            }
        },
        provide () {
            return {
                instance: this
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
            }
        },
        methods: {
            toggleOpen() {
                this.showDropout = !this.showDropout
            },
            setActiveChild(child) {
                this.$emit('activeChild', child)
            },
            getTop(menu) {
              const level = menu.id.split('_').pop()
              return level * 30
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