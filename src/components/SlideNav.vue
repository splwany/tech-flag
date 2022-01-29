<script setup lang="ts">
import { ref } from 'vue'

interface Props {
    collapse?: boolean
}
const props = withDefaults(defineProps<Props>(), {
    collapse: false
})
const isCollapse = ref(props.collapse)
function clickNavBtn() {
    isCollapse.value = !isCollapse.value
}
</script>

<template>
    <div :class="`slide-nav${ isCollapse ? ' collapse' : '' }`">
        <button class="slide-nav-toggle-btn" role="button" @click="clickNavBtn">
            <Icon icon="mdi:menu" width="100%" height="100%" color="rgb(255,255,255)" />
        </button>
        <div class="slide-nav-plaint column">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
.slide-nav-toggle-btn {
    width: 50px;
    height: 50px;
    padding: 5px;
    background-color: transparent;
    border: unset;
    cursor: pointer;
    opacity: 0.7;
    transition: all 0.2s ease;
}
.slide-nav-toggle-btn:hover {
    opacity: 0.9;
    background-color: rgba(0, 0, 0, 0.2);
}
.slide-nav {
    width: 300px;
    height: 100%;
    background: rgb(27, 110, 121);
    text-align: start;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.52, 0, 0.19, 1);
    box-shadow: inset -4px 0 10px -4px rgba(0, 0, 0, 0.5);
}
.slide-nav.collapse {
    width: 50px;
}
.slide-nav-plaint {
    width: 300px;
}
</style>