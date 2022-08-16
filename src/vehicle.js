const TOUCH_DURATION = 400
const MIN_MOVEMENT = 20

export class Vehicle {
    constructor({
        id,
        fieldEl,
        x,
        y,
        length,
        direction,
        color,
        numberOfCells,
        checkCanMove,
    }) {
        this.id = id
        this.x = x
        this.y = y
        this.length = length
        this.direction = direction
        this.checkCanMove = checkCanMove
        
        const isAmbulance = id === 0

        this.startX = 0
        this.startY = 0
        this.startTimestamp = 0

        this.el = document.createElement('div')
        this.el.setAttribute(
            'style',
            `
      width: calc(var(--cell-width) * ${
          direction === 'horizontal' ? length : 1
      });
      height: calc(var(--cell-width) * ${
          direction === 'horizontal' ? 1 : length
      });
      background-color: ${color};
      position: absolute;
      left: calc(var(--cell-width) * ${x});
      top: calc(var(--cell-width) * ${y});
      transition: left 0.2s, top 0.2s;
    `,
        )
        this.el.addEventListener('touchstart', (e) => {
            e.preventDefault()
            e.stopPropagation()
            this.startX = e.touches[0].clientX
            this.startY = e.touches[0].clientY
            this.startTimestamp = e.timeStamp
        })
        this.el.addEventListener('touchend', (e) => {
            e.preventDefault()
            e.stopPropagation()

            if (e.timeStamp - this.startTimestamp > TOUCH_DURATION) {
                return
            }

            const xDelta = e.changedTouches[0].clientX - this.startX
            const yDelta = e.changedTouches[0].clientY - this.startY
            const isXMove =
                Math.abs(yDelta) < MIN_MOVEMENT &&
                Math.abs(xDelta) > MIN_MOVEMENT
            const isYMove =
                Math.abs(xDelta) < MIN_MOVEMENT &&
                Math.abs(yDelta) > MIN_MOVEMENT

            let newX = this.x
            let newY = this.y

            if (direction === 'horizontal' && isXMove) {
                newX = Math.max(0, this.x + (xDelta > 0 ? 1 : -1))
                const isOutOfField = newX + length > numberOfCells

                if (isOutOfField && !isAmbulance) {
                    newX = this.x
                }

                if (isOutOfField && isAmbulance) {
                    setTimeout(() => alert('you won'), 200)
                }
            }

            if (direction === 'vertical' && isYMove) {
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

            this.startX = 0
            this.startY = 0
            this.startTimestamp = 0
        })

        fieldEl.appendChild(this.el)
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
                this.direction === 'horizontal'
                    ? { x: x + index, y: y }
                    : { x: x, y: y + index },
            )

        return positionVector
    }
}
