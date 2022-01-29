export function once(fn: Function) {
    let done = false
    return function(...args: any[]) {
        if (done) {
            return
        }
        done = true
        return fn.apply(undefined, args)
    }
}

export function debounce(fn: Function, delay: number = 300) {
    let timer = 0
    return function(...args: any[]) {
        if (timer !== 0) {
            return
        }
        timer = setTimeout(() => {
            timer = 0
        }, delay);
        fn.apply(undefined, args)
    }
}