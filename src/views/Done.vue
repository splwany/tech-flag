<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import useFlagStates from '../states/flagStates'
import { debounce } from '../utils/common';

const { doneList } = useFlagStates()
</script>

<template>
    <div class="flag">
        <div class="flag-area" v-for="(flag, index) in doneList" :key="`flag-${ index }`">
            <div class="flag-card" :data-index="index">
                <div class="flag-card-title">{{ flag.title }}</div>
                <div class="flag-card-content">{{ flag.content }}</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.flag {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 20px;
    margin: 20px;
    perspective: 1000px;
    transform-style: preserve-3d;
}
@media (min-width: 820px) {
    .flag {
        grid-template-columns: repeat(2, 1fr);
    }
}
@media (min-width: 1024px) {
    .flag {
        grid-template-columns: repeat(3, 1fr);
    }
}
@media (min-width: 1200px) {
    .flag {
        grid-template-columns: repeat(4, 1fr);
    }
}
.flag-area {
    position: relative;
    height: 40px;
    transition: all 0.2s ease-in-out;
}
.flag-area:hover {
    transform: translateY(-5px) translateZ(20px);
    z-index: 999;
}
.flag-card {
    position: absolute;
    display: flex;
    flex-direction: column;
    max-height: 40px;
    width: 100%;
    border-radius: 10px;
    overflow: hidden;
    background-color: rgb(255, 247, 225);
    filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.1));
    transition: all 0.3s ease-in-out;
    cursor: pointer;
}
.flag-card:hover {
    max-height: 300px;
    filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.08));
}
.flag-card-title {
    flex-shrink: 0;
    line-height: 40px;
    padding: 0 10px;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: white;
    background-color: rgb(27, 110, 121);
    overflow: hidden;
    box-sizing: border-box;
}
.flag-card-content {
    flex: 1;
    /* position: absolute; */
    top: 10px;
    width: 100%;
    padding: 0 10px;
    text-align: left;
    white-space: pre-wrap;
    overflow-y: auto;
    overflow-x: hidden;
    box-sizing: border-box;
    scrollbar-width: none;
    transition: all 0.2s ease-in-out;
}
.flag-card-content::-webkit-scrollbar {
    display: none;
}
</style>