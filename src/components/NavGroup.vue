<script setup lang="ts">
import { ref } from 'vue'
import NavItem, { NavItemType } from '../components/NavItem.vue'

interface Props {
    navList: NavItemType[]
    init?: number
}

const props = withDefaults(defineProps<Props>(), {
    init: 0
})

const emit = defineEmits<{
    (event: 'changed', index: number): void
}>()

const curIndex = ref(props.init)

function navClicked(index: number) {
    if (curIndex.value === index) {
        return
    }
    curIndex.value = index
    emit('changed', index)
}
</script>

<template>
    <div class="nav-group">
        <NavItem
            v-for="(item, index) in navList"
            :key="item.id"
            :item="item"
            :active="index === curIndex"
            @click="navClicked(index)"
        />
    </div>
</template>

<style scoped>
.nav-group {
    position: relative;
    margin: 5px 0;
}
.nav-group:not(:last-child)::after {
    content: "";
    width: calc(100% - 10px);
    height: 2px;
    background-color: rgba(0, 0, 0, 0.1);
    position: absolute;
    bottom: -5px;
    transform: translate(5px, 50%);
}
</style>