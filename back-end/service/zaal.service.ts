import zaalDb from "../domain/data-access/zaal.db";
import { Zaal } from "../domain/model/zaal";
import { ZaalInput } from "../types";

const createZaal = ({plaatsen, zaalnummer}: ZaalInput): Zaal => {

    if (!plaatsen) {
        throw new Error('ZaalInput is niet correct')
    }

    if (!zaalnummer) {
        throw new Error('ZaalInput is niet correct')
    }

    const zaal = new Zaal({plaatsen, zaalnummer})

    return zaalDb.createZaal(zaal)
}

const getAllZalen = async (): Promise<Zaal[]> => {
    const zalen = await zaalDb.getAllZalen();
    console.log(zalen)
    return zalen
}

const getZaalById = async (id: number): Promise<Zaal> => {
    const zaal = await zaalDb.getZaalById({ id });
    if (!zaal) throw new Error(`Zaal with id ${id} does not exist.`);
    return zaal;
};


export default {
    createZaal,
    getAllZalen,
    getZaalById
}