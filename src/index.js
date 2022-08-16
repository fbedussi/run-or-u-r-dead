import { Vehicle } from './vehicle.js'

const fieldEl = document.querySelector('.field')

const NUMBER_OF_CELLS = 9

const veiclesData = [
    {
        x: 0,
        y: 4,
        length: 3,
        direction: 'horizontal',
        color: 'red',
    },
    {
        x: 0,
        y: 0,
        length: 4,
        direction: 'vertical',
        color: 'green',
    },
    {
        x: 2,
        y: 0,
        length: 4,
        direction: 'horizontal',
        color: 'rebeccapurple',
    },
    {
        x: 3,
        y: 4,
        length: 4,
        direction: 'vertical',
        color: 'orange',
    },
    {
        x: 8,
        y: 4,
        length: 3,
        direction: 'vertical',
        color: 'yellow',
    },
]

const doesPositionVectorsIntersect = (vector1, vector2) =>
    vector1.some((v1) => vector2.some((v2) => v1.x === v2.x && v1.y === v2.y))

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

const vehicles = veiclesData.map(
    (data, index) =>
        new Vehicle({
            fieldEl,
            numberOfCells: NUMBER_OF_CELLS,
            checkCanMove,
            id: index,
            ...data,
        }),
)
