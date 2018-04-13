<template>
  <div id="app">
    <h1>SnappyTree Playground</h1>
    <div class="filterRow">
      <snappy-tree
              :items="items"
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
    SnappyTree
  },
  data () {
    const items = TreeGenerator(10,3)
    return {
      items
    }
  }
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
    height: 100vh;
    width: 100vw;
    margin: 0;
    padding: 0;
    overflow: hidden;

    h1 {
      padding: 10px;
      margin: 0;
    }

    .filterRow {
      padding: 0% 40%;
    }
  }
</style>
