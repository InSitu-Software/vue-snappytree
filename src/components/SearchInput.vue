<template>
    <div class="vst-search-input">
        <input type="text"/>
        <label @click="$emit('toggle')">&#8595;</label>
    </div>
</template>

<script>
  export default {
    name: 'search-input',
  }
</script>

<style lang="scss">
    .vst-search-input {
        width: 100%;
        height: 30px;
        margin: 0;
        background-color: white;
        box-sizing: border-box;
        border: 1px solid rgba(0,0,0,0.7);
        border-radius: 3px;
        display: flex;
        padding: 1px;

        > input {
            padding-left: 5px;
            flex: 1;
            border: 0;
            height: 100%;
        }

        > label {
            flex: 0 0 30px;
            height: 100%;
            border-left: 1px solid rgba(0,0,0,0.3);
            box-sizing: border-box;
        }
    }
</style>