import { Zaal } from "../model/zaal"

const zalen: Zaal[] = []

const createZaal = ({plaatsen}: Zaal): Zaal => {
    const zaal = new Zaal({plaatsen, voorstellingen: []})
    zalen.push(zaal)
    return zaal
}

const getZaalById = (id: number): Zaal => {
    const zaal = zalen.find(z => z.id === id)
    if (!zaal) {
        throw new Error(`zaal met id ${id} niet gevonden`)
    }
    return zaal
}


const getAllZalen = (): Zaal[] => zalen;

export default {
    createZaal,
    getZaalById,
    getAllZalen
}