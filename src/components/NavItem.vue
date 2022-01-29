<script lang="ts">
export type NavItemType = {
    id: string
    text: string
    icon?: string
};
</script>

<script setup lang="ts">
const props = defineProps<{
    item: NavItemType,
    active?: boolean,
}>()
const emit = defineEmits<{
    (event: 'click'): void
}>()
function navClicked() {
    emit('click')
}
</script>

<template>
    <a class="nav-item" :class="{ 'actived': active }" @click="navClicked">
        <span v-if="item.icon" class="nav-item-icon">
            <Icon :icon="item.icon" width="100%" height="100%" color="rgb(255,255,255)" />
        </span>
        <span class="nav-item-text">{{ item.text }}</span>
    </a>
</template>

<style scoped>
    .nav-item {
        display: flex;
        align-items: center;
        height: 50px;
        margin: 5px;
        padding: 0 10px;
        border-radius: 5px;
        color: rgba(255, 255, 255, 1);
        background-color: transparent;
        cursor: pointer;
        transition: all .25s ease-in-out;
        opacity: 0.7;
    }
    .nav-item:where(:hover, .actived) {
        opacity: 0.9;
        background-color: rgba(0, 0, 0, 0.3);
    }
    .nav-item.actived {
        box-shadow: 2px 2px 10px 0 rgba(0, 0, 0, 0.25);
    }
    .nav-item-icon {
        width: 30px;
        height: 30px;
        margin-right: 10px;
        transition: all .3s ease;
    }
    .nav-item:where(:hover, .actived) .nav-item-icon {
        transform: rotate(360deg);
    }
</style>