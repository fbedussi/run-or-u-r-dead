import { beep } from './heart.js'

const timerEl = document.querySelector('.timer')
const heathEl = document.querySelector('.heart')

export const startTimer = (seconds = 30, onEnd) => {
    timerEl.innerHTML = seconds
    heathEl.setAttribute('style', `animation: pulse 2s infinite`)

    if (seconds > 10) {
        if (seconds % 2 === 0) {
            beep()
        }
    } else if (seconds > 5) {
        beep()
        heathEl.setAttribute('style', `animation: pulse 1s infinite`)
    } else if (seconds > 0) {
        heathEl.setAttribute('style', `animation: pulse 500ms infinite`)
        beep()
        setTimeout(() => {
            beep()
        }, 500)
    } else if (seconds === 0) {
        heathEl.setAttribute(
            'style',
            `animation: disappear 1s; animation-fill-mode: forwards;`,
        )
        beep(4000)
        setTimeout(() => {
            onEnd()
        }, 4000)
    }

    // if (seconds > 0) {
    //     setTimeout(() => {
    //         startTimer(seconds - 1, onEnd)
    //     }, 1000)
    // }
}
