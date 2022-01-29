<script setup lang="ts">
</script>

<template>
    <div class="main-board">
        <slot></slot>
    </div>
</template>

<style scoped>
.main-board {
    /* position: relative; */
    height: 100%;
    background-color: rgb(237, 245, 245);
    overflow: auto;
}
</style>