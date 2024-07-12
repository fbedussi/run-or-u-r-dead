import { Vehicle } from './vehicle.js'
import { startTimer } from './timer.js'

const fieldEl = document.querySelector('.field')

const NUMBER_OF_CELLS = 9

const veiclesData = [
    {
        x: 4,
        y: 0,
        length: 3,
        type: 'ambulance',
        horizontal: false,
    },
    {
        x: 6,
        y: 0,
        length: 3,
        type: 'bus',
    },
    {
        x: 6,
        y: 2,
        length: 4,
        type: 'truck',
        horizontal: false,
    },
    {
        x: 3,
        y: 4,
        length: 2,
        type: 'taxi',
    },
    {
        x: 2,
        y: 8,
        length: 4,
        type: 'fire-truck',
    },
    {
        x: 0,
        y: 2,
        length: 3,
        fixed: true,
        type: 'obstacle',
    },
    {
        x: 0,
        y: 3,
        length: 3,
        fixed: true,
        type: 'obstacle',
    },
    {
        x: 0,
        y: 4,
        length: 3,
        fixed: true,
        type: 'obstacle',
    },
    {
        x: 0,
        y: 8,
        length: 2,
        fixed: true,
        type: 'obstacle',
    },
]

const doesPositionVectorsIntersect = (vector1, vector2) =>
    vector1.some((v1) => vector2.some((v2) => v1.x === v2.x && v1.y === v2.y))

const startButtonEl = document.querySelector('.start-button')

const start = () => {
    const checkCanMove = (vehicleId, positionVector) => {
        const otherVehicles = vehicles.filter(({ id }) => id !== vehicleId)
        return !otherVehicles.some((vehicle) => {
            const intersect = doesPositionVectorsIntersect(
                vehicle.getPositionVector(),
                positionVector,
            )
            return intersect
        })
    }

    const onWin = () => {
        alert('You won')
    }

    const vehicles = veiclesData.map(
        (data, index) =>
            new Vehicle({
                fieldEl,
                numberOfCells: NUMBER_OF_CELLS,
                checkCanMove,
                id: index,
                onWin,
                ...data,
            }),
    )

    document.body.className = 'is-play'

    startTimer(20, () => {
        document.body.className = 'is-start'
    })
}

startButtonEl.addEventListener('click', start)
