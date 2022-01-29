<script setup lang="ts">
import Home from './views/Home.vue'
</script>

<template>
    <Home />
</template>

<style>
body {
    margin: 0;
    overflow: hidden;
}

textarea {
    font-family: Avenir, Helvetica, Arial, sans-serif;
}

button, a {
    -webkit-tap-highlight-color: transparent;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

.row,
.column {
    display: flex;
}

.column {
    flex-direction: column;
}
</style>
