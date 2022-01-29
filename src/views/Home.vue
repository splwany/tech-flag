<script setup lang="ts">
import { ref, computed } from 'vue';
import SlideNav from '../components/SlideNav.vue'
import NavGroup from '../components/NavGroup.vue';
import { NavItemType } from '../components/NavItem.vue'
import MainBoard from '../components/MainBoard.vue'
import Doing from './Doing.vue'
import Flag from './Flag.vue'
import Done from './Done.vue'

const navGroup1: NavItemType[] = [
    {
        id: 'doing',
        text: '进行中',
        icon: 'mdi:white-balance-sunny'
    },
    {
        id: 'flag',
        text: '任务',
        icon: 'mdi:checkbox-marked-outline'
    },
    {
        id: 'done',
        text: '已完成',
        icon: 'gg:trash-empty'
    }
];

const navIndex = ref(0)
const viewList = [Doing, Flag, Done]
const curView = computed(() => viewList[navIndex.value])
function onNavChanged(index: number) {
    navIndex.value = index
}
</script>

<template>
    <div id="home" class="row">
        <SlideNav>
            <NavGroup :nav-list="navGroup1" @changed="onNavChanged" />
        </SlideNav>
        <MainBoard class="main-board">
            <keep-alive>
                <component :is="curView"></component>
            </keep-alive>
        </MainBoard>
    </div>
</template>

<style scoped>
#home {
    height: 100vh;
}
.main-board {
    flex: 1;
}
</style>