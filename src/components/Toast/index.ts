import {createVNode, render} from 'vue'
import toastTemplate from './template.vue'

type Status = 'success' | 'warning' | 'error'

interface domObj {
    id: string
    dom: HTMLDivElement
}

const toastList: Array<domObj> = []

const toastHeight = 39

const gap = 10

const checkId = (id: string): boolean => {
    if (process.env.NODE_ENV !== 'production') return true
    return !toastList.find((v) => v.id === id)
}

const calcPushContainerPosition = (container: HTMLDivElement, message: string, status: string) => {
    const id = (status + message).trim()
    toastList.push({
        id,
        dom: container
    })
    const child = container.children[0]
    child.setAttribute('style', `transform: translate(-50%, ${(toastList.length - 1) * -(toastHeight + gap)}px)`)
}

const calcShiftContainerPosition = () => {
    toastList.shift()
    toastList.forEach((item: domObj, index: number) => {
        const child = item.dom.children[0]
        child.setAttribute('style', `transform: translate(-50%, ${index * -(toastHeight + gap)}px)`)
    })
}

const Toast = (message: string, status: Status = 'success', duration: number = 2000) => {
    if (!message) {
        return
    }
    const flag = checkId((status + message).trim())
    if (!flag) return
    const container = document.createElement('div')
    container.setAttribute('style', 'z-index: 9999; position: absolute')
    const opt = {message, status, duration}
    const vm = createVNode(toastTemplate, opt)
    render(vm, container)
    calcPushContainerPosition(container, message, status)
    document.body.appendChild(container)
    if (opt.duration) {
        window.setTimeout(() => {
            const dom = vm.el as HTMLDivElement
            if (dom.querySelector('.c-toast-value')) {
                dom.querySelector('.c-toast-value')?.classList.add('reomve')
                const t = setTimeout(() => {
                    render(null, container)
                    document.body.removeChild(container)
                    calcShiftContainerPosition()
                    clearTimeout(t)
                }, 500)
            }
        }, opt.duration + (toastList.length - 1) * 1000)
    }
}

export default {
    success(msg: string) {
        Toast(msg, 'success')
    },
    error(msg: string) {
        Toast(msg, 'error')
    },
    warning(msg: string) {
        Toast(msg, 'warning')
    }
}
