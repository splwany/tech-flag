<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import { menusEvent, menusItemType, menusType } from 'vue3-menus'
import useFlagStates, { FlagCardType } from '../states/flagStates'
import { debounce } from '../utils/common';

const { flagListReversed, addFlag, moveFlagToDoing } = useFlagStates()
const adding = ref(false)
function onAddFlag() {
    adding.value = true
}
const urlRef = ref<HTMLInputElement>()
const titleRef = ref<HTMLInputElement>()
const contentRef = ref<HTMLTextAreaElement>()
function onConfirm() {
    const url = urlRef.value!.value
    if (!(/http(s)?:\/\/[\w.]+[\w\/]*[\w.]*\??[\w=&\+\%]*/is.test(url))) {
        alert('必须输入url')
        return
    }
    const title = titleRef.value!.value === '' ? url.split('://').pop()! : titleRef.value!.value
    const content = contentRef.value!.value
    const timestamp = Date.now()
    const flag: FlagCardType = { url, title, content, timestamp }
    addFlag(flag)

    urlRef.value!.value = ''
    titleRef.value!.value = ''
    contentRef.value!.value = ''
    adding.value = false
}
function onCancel() {
    adding.value = false
}
const menus = shallowRef<menusType>({
    menus: [
        {
            label: '前往',
            tip: '点击',
            style: {
                color: '#1b6e79'
            },
            click: debounce((menu: menusItemType, args: any) => { window.open(<string>args.flag.url, '_blank') }, 2000),
        },
        {
            label: '移到进行中',
            tip: '点击',
            style: {
                color: '#1b6e79'
            },
            click: debounce((menu: menusItemType, args: any) => {
                const index = <number>args.index
                moveFlagToDoing(index)
            }, 2000)
        }
    ]
})
function cardMenu(event: MouseEvent) {
    const dataset = (<HTMLDivElement>event.currentTarget).dataset
    const reveredIndex: number = parseInt(dataset.index!)
    const index = flagListReversed.value.length - reveredIndex - 1
    const flag = flagListReversed.value[reveredIndex]
    menusEvent(event, menus.value, { index, flag })
    event.preventDefault()
}
</script>

<template>
    <div class="flag">
        <div class="flag-area" v-for="(flag, index) in flagListReversed" :key="`flag-${ index }`">
            <div class="flag-card" :data-index="index" @click.stop @contextmenu="cardMenu">
                <div class="flag-card-title">{{ flag.title }}</div>
                <div class="flag-card-content">{{ flag.content }}</div>
            </div>
        </div>
    </div>
    <button class="add-btn" @click="onAddFlag">
        <Icon
            class="add-btn-icon"
            icon="carbon:add"
            width="100%"
            height="100%"
            color="rgb(255,255,255)"
        />
    </button>
    <div :class="`flag-modal${ adding ? ' show' : '' }`">
        <input type="text" ref="urlRef" placeholder="请输入url..." />
        <input type="text" ref="titleRef" placeholder="请输入标题..." />
        <textarea ref="contentRef" rows="15" placeholder="请输入笔记..."></textarea>
        <div class="modal-btn-group">
            <button class="modal-confirm-btn" @click="onConfirm">确定</button>
            <button class="modal-cancel-btn" @click="onCancel">取消</button>
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
.add-btn {
    position: fixed;
    right: 30px;
    bottom: 60px;
    width: 50px;
    height: 50px;
    border-width: 0;
    border-radius: 50%;
    background-color: rgb(27, 110, 121);
    box-shadow: 0 2px 10px -2px rgba(0, 0, 0, 0.6);
    cursor: pointer;
    transition: all 0.2s ease-in-out;
}
.add-btn:hover {
    transform: scale(1.1);
}
.add-btn:hover > .add-btn-icon {
    transform: rotate(90deg);
}
.add-btn-icon {
    transform: scale(0.8);
    transition: inherit;
}
.flag-modal {
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    flex-direction: column;
    align-content: center;
    gap: 10px;
    transform: translate(-50%, -50%);
    padding: 10px;
    width: 500px;
    border-radius: 10px;
    background: rgb(241, 241, 241);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
    visibility: hidden;
    opacity: 0;
    transition: all 0.2s ease;
    box-sizing: border-box;
    overflow: hidden;
}
.flag-modal.show {
    visibility: visible;
    opacity: 1;
}
.flag-modal input {
    border: none;
    outline: unset;
    border-radius: 5px;
    height: 30px;
    padding: 10px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);
    box-sizing: border-box;
}
.flag-modal textarea {
    border: none;
    outline: unset;
    border-radius: 5px;
    padding: 10px;
    resize: vertical;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);
    box-sizing: border-box;
}
.modal-btn-group {
    display: flex;
    justify-content: space-between;
    gap: 20px;
}
.modal-btn-group button {
    width: 100%;
    height: 40px;
    border: none;
    border-radius: 20px;
    cursor: pointer;
}
.modal-confirm-btn {
    color: white;
    background-color: rgb(27, 110, 121);
}
.modal-confirm-btn:hover {
    background-color: rgb(22, 90, 99);
}
.modal-cancel-btn {
    background-color: rgb(224, 224, 224);
}
.modal-cancel-btn:hover {
    background-color: rgb(214, 214, 214);
}
</style>