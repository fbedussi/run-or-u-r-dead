export class Vehicle {
    constructor({
        id,
        fieldEl,
        x,
        y,
        length,
        horizontal = true,
        color,
        numberOfCells,
        checkCanMove,
        fixed = false,
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
        this.el.setAttribute(
            'style',
            `
      width: calc(var(--cell-width) * ${horizontal ? length : 1});
      height: calc(var(--cell-width) * ${horizontal ? 1 : length});
      background-color: ${color};
      position: absolute;
      left: calc(var(--cell-width) * ${x});
      top: calc(var(--cell-width) * ${y});
      transition: left 0.2s, top 0.2s;
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

                if (isOutOfField && isAmbulance) {
                    this.fixed = true
                    setTimeout(() => alert('you won'), 200)
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
