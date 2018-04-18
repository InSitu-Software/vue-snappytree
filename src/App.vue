<template>
    <div id="app">
        <h1>SnappyTree Playground</h1>
        <div class="filterRow">
            <snappy-tree
                    :tree="tree"
                    @activeChild="setActiveChild"
                    oneRow
                    enableHover
            />
            <p>Und der Text soll sich nicht bewegen wenn das Menu aufgeht</p>
        </div>
    </div>
</template>

<script>
  import SnappyTree from './components/SnappyTree.vue'
  import TreeGenerator from './helper/treeGenerator'

  export default {
    name: 'app',
    components: {
      SnappyTree,
    },
    data () {
      const tree = TreeGenerator(10, 3)
      return {
        tree,
      }
    },
    methods: {
      setActiveChild (child) {
        console.log('SetActiveChild')
        this.activeChild = child
        const forAll = item => {
          item.isExpanded = false;
          if (item.children) {
            item.children.forEach(forAll)
          }
        }
        const setExpanded = item => {
          let expanded = false
          if (item.children) {
            for (let i = 0; i < item.children.length; i++) {
              expanded = expanded || setExpanded(item.children[i])
            }
          }
          if (item.id === child.id) {
            expanded = true
          }
          item.isExpanded = expanded
          return expanded
        }

        forAll(this.tree)
        setExpanded(this.tree)
      },
    },
  }
</script>

<style lang="scss">
    body, html {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        background-color: lightgray;
        height: 120vh;
        width: 100vw;
        margin: 0;
        padding: 0;
        overflow: hidden;

        h1 {
            padding: 10px;
            margin: 0;
        }

        .filterRow {
            padding: 0 70% 0 10% ;
        }
    }
</style>
