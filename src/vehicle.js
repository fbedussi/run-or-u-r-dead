export class Vehicle {
    constructor({
        id,
        fieldEl,
        x,
        y,
        length,
        horizontal = true,
        color,
        type,
        numberOfCells,
        checkCanMove,
        fixed = false,
        onWin,
    }) {
        this.id = id
        this.x = x
        this.y = y
        this.length = length
        this.horizontal = horizontal
        this.checkCanMove = checkCanMove
        this.fixex = fixed

        const isAmbulance = id === 0

        const MIN_MOVEMENT = Math.round(
            (window.innerWidth * 0.9) / numberOfCells,
        )

        this.startX = 0
        this.startY = 0

        this.el = document.createElement('div')

        this.el.classList.add('vehicle', !horizontal ? 'vertical' : undefined)

        this.el.setAttribute(
            'style',
            `
            width: calc(var(--cell-width) * ${length});
            height: calc(var(--cell-width) * 1);
            background-color: ${color || 'transparent'};
            position: absolute;
            left: calc(var(--cell-width) * ${x});
            top: calc(var(--cell-width) * ${y});
            transition: left 0.2s, top 0.2s;
            image-rendering: pixelated;
            background-image: url('./images/${type}.png');
            background-size: 100% 100%;
            image-rendering: pixelated;
            
            ${
                !horizontal
                    ? `
                    transform: translateY(-100%) rotate(90deg);
                    transform-origin: 0 100%;
                `
                    : ''
            }
            ${
                type === 'obstacle'
                    ? `
                    background-repeat: repeat;
                    background-size: auto 100%;
                    `
                    : ''
            }
            `,
        )
        fieldEl.appendChild(this.el)

        if (this.fixed) {
            return
        }

        this.el.addEventListener('touchstart', (e) => {
            e.preventDefault()
            e.stopPropagation()
            this.startX = e.touches[0].clientX
            this.startY = e.touches[0].clientY
        })
        this.el.addEventListener('touchmove', (e) => {
            e.preventDefault()
            e.stopPropagation()

            const xDelta = e.changedTouches[0].clientX - this.startX
            const yDelta = e.changedTouches[0].clientY - this.startY

            let newX = this.x
            let newY = this.y

            if (
                (horizontal && Math.abs(xDelta) < MIN_MOVEMENT) ||
                (!horizontal && Math.abs(yDelta) < MIN_MOVEMENT)
            ) {
                return
            }

            if (horizontal) {
                newX = Math.max(0, this.x + (xDelta > 0 ? 1 : -1))
                const isOutOfField = newX + length > numberOfCells

                if (isOutOfField && !isAmbulance) {
                    newX = this.x
                }

                if (isOutOfField && isAmbulance && !this.fixed) {
                    this.fixed = true
                    setTimeout(onWin, 200)
                }
            } else {
                newY = Math.max(0, this.y + (yDelta > 0 ? 1 : -1))
                const isOutOfField = newY + length > numberOfCells

                if (isOutOfField) {
                    newY = this.y
                }
            }

            const canMove = checkCanMove(
                this.id,
                this.getPositionVector(newX, newY),
            )
            if (canMove) {
                this.move(newX, newY)
            }

            this.startX = e.changedTouches[0].clientX
            this.startY = e.changedTouches[0].clientY
        })
    }

    move(newX, newY) {
        this.x = newX
        this.y = newY
        this.el.style.left = `calc(var(--cell-width) * ${this.x})`
        this.el.style.top = `calc(var(--cell-width) * ${this.y})`
    }

    getPositionVector(x = this.x, y = this.y) {
        const positionVector = new Array(this.length)
            .fill(undefined)
            .map((_, index) =>
                this.horizontal
                    ? { x: x + index, y: y }
                    : { x: x, y: y + index },
            )

        return positionVector
    }
}
