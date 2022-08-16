class Vehicle {
    constructor(field, x, y, length, direction, color, isAmbulance = false) {
        this.x = x
        this.y = y

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
            console.log(e)
        })
        this.el.addEventListener('touchend', (e) => {
            e.preventDefault()
            e.stopPropagation()

            const TOUCH_DURATION = 400
            const MIN_MOVEMENT = 20
            const NUMBER_OF_CELLS = 9

            if (e.timeStamp - this.startTimestamp < TOUCH_DURATION) {
                const xDelta = e.changedTouches[0].clientX - this.startX
                const yDelta = e.changedTouches[0].clientY - this.startY
                const isXMove =
                    Math.abs(yDelta) < MIN_MOVEMENT &&
                    Math.abs(xDelta) > MIN_MOVEMENT
                const isYMove =
                    Math.abs(xDelta) < MIN_MOVEMENT &&
                    Math.abs(yDelta) > MIN_MOVEMENT

                if (direction === 'horizontal' && isXMove) {
                    const newX = Math.max(0, this.x + (xDelta > 0 ? 1 : -1))
                    const isOutOfField = newX + length > NUMBER_OF_CELLS

                    if (!isOutOfField || isAmbulance) {
                        this.x = newX
                    }

                    this.move()

                    if (isOutOfField && isAmbulance) {
                        setTimeout(() => alert('you won'), 200)
                    }
                }

                if (direction === 'vertical' && isYMove) {
                    const newY = Math.max(0, this.y + (yDelta > 0 ? 1 : -1))
                    const isOutOfField = newY + length > NUMBER_OF_CELLS

                    if (!isOutOfField) {
                        this.y = newY
                        this.move()
                    }
                }
            }

            this.startX = 0
            this.startY = 0
            this.startTimestamp = 0
            console.log(e)
        })

        field.appendChild(this.el)
    }

    move() {
        this.el.style.left = `calc(var(--cell-width) * ${this.x})`
        this.el.style.top = `calc(var(--cell-width) * ${this.y})`
    }
}

const field = document.querySelector('.field')

const ambulance = new Vehicle(field, 0, 4, 2, 'horizontal', 'red', true)

const vehicle1 = new Vehicle(field, 0, 0, 2, 'vertical', 'rebeccapurple', true)
