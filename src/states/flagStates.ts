import { computed, shallowReactive } from 'vue'

export type FlagCardType = {
    timestamp: number
    url: string
    title: string
    content: string
}

const doingList = shallowReactive<FlagCardType[]>([])
const flagList = shallowReactive<FlagCardType[]>([])
const flagListReversed = computed(() => flagList.slice().reverse())
const doneList = shallowReactive<FlagCardType[]>([])

function add(list: FlagCardType[], flag: FlagCardType) {
    list.push(flag)
}
function remove(list: FlagCardType[], index: number) {
    const flag = list.splice(index, 1)[0]
    return flag
}
function moveFlagToDoing(index: number) {
    const flag = remove(flagList, index)
    add(doingList, flag)
}
function moveDoingToFlag(index: number) {
    const flag = remove(doingList, index)
    add(flagList, flag)
}
function moveDoingToDone(index: number) {
    const flag = remove(doingList, index)
    add(doneList, flag)
}

function addFlag(flag: FlagCardType) {
    add(flagList, flag)
}

export default function useFlagStates() {
    return {
        flagList,
        flagListReversed,
        doingList,
        doneList,
        add,
        remove,
        addFlag,
        moveFlagToDoing,
        moveDoingToFlag,
        moveDoingToDone,
    }
}
