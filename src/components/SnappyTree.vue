<template>
    <div class="vst-snappy-tree">
        <search-input
                @toggle="toggleOpen"
        />
        <dropout v-if="showDropout">
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
        methods: {
            toggleOpen() {
                this.showDropout = !this.showDropout
            },
            setActiveChild(child) {
                this.$emit('activeChild', child)
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