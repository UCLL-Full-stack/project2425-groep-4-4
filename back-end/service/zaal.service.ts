import zaalDb from "../domain/data-access/zaal.db";
import { Zaal } from "../domain/model/zaal";
import { ZaalInput } from "../types";

const createZaal = ({plaatsen}: ZaalInput): Zaal => {

    if (!plaatsen) {
        throw new Error('ZaalInput is niet correct')
    }

    const zaal = new Zaal({plaatsen})

    return zaalDb.createZaal(zaal)
}

const getAllZalen = async (): Promise<Zaal[]> => zaalDb.getAllZalen();

export default {
    createZaal,
    getAllZalen
}