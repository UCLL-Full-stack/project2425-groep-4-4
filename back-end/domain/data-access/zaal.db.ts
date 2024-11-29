import { Zaal } from "../model/zaal"
import database from "./database"

const zalen: Zaal[] = []

const createZaal = ({plaatsen}: Zaal): Zaal => {
    const zaal = new Zaal({plaatsen})
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


const getAllZalen = async (): Promise<Zaal[]> => {
    try {
        const zalenPrisma = await database.zaal.findMany();
        return zalenPrisma.map((zaalPrisma) => Zaal.from(zaalPrisma))
    } catch (error) {
        throw new Error(`Database error. See server log for details.`);
    }
};

export default {
    createZaal,
    getZaalById,
    getAllZalen
}