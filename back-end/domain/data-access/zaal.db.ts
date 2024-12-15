import { Zaal } from "../model/zaal"
import database from "./database"

const zalen: Zaal[] = []

const createZaal = ({plaatsen}: Zaal): Zaal => {
    const zaal = new Zaal({plaatsen})
    zalen.push(zaal)
    return zaal
}

const getAllZalen = async (): Promise<Zaal[]> => {
    try {
        const zalenPrisma = await database.zaal.findMany();
        console.log(zalenPrisma)
        return zalenPrisma.map((zaalPrisma) => Zaal.from(zaalPrisma))
    } catch (error) {
        throw new Error(`Database error. See server log for details.`);
    }
};

const getZaalById = async ({ id }: { id: number }): Promise<Zaal | null> => {
    try {
        const zaalPrisma = await database.zaal.findUnique({
            where: { id },
        });

        return zaalPrisma ? Zaal.from(zaalPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    createZaal,
    getZaalById,
    getAllZalen
}