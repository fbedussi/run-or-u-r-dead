import { Vehicle } from './vehicle.js'

const fieldEl = document.querySelector('.field')

const NUMBER_OF_CELLS = 9

const veiclesData = [
    {
        x: 0,
        y: 4,
        length: 3,
        color: 'red',
    },
    {
        x: 0,
        y: 0,
        length: 3,
        horizontal: false,
        color: 'green',
    },
    {
        x: 2,
        y: 2,
        length: 4,
        color: 'rebeccapurple',
    },
    {
        x: 4,
        y: 4,
        length: 2,
        horizontal: false,
        color: 'orange',
    },
    {
        x: 8,
        y: 4,
        length: 4,
        horizontal: false,
        color: 'yellow',
    },
    {
        x: 2,
        y: 6,
        length: 3,
        color: 'grey',
        fixed: true,
    },
    {
        x: 2,
        y: 7,
        length: 3,
        color: 'grey',
        fixed: true,
    },
    {
        x: 2,
        y: 8,
        length: 3,
        color: 'grey',
        fixed: true,
    },
    {
        x: 7,
        y: 8,
        length: 2,
        color: 'grey',
        fixed: true,
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
