import filmDb from "../domain/data-access/film.db";
import voorstellingDb from "../domain/data-access/voorstelling.db";
import zaalDb from "../domain/data-access/zaal.db";
import { Voorstelling } from "../domain/model/voorstelling";
import { VoorstellingInput } from "../types";

const createVoorstelling = ({zaalId, filmId, datum, tijdstip}: VoorstellingInput): Voorstelling => {

    if (!zaalId || !filmId || !datum || !tijdstip) {
        throw new Error('VoorstellingInput is niet correct')
    }

    if (zaalId === undefined) {
        throw new Error('Zaal ID is undefined');
    }

    if (filmId === undefined) {
        throw new Error('Film ID is undefined');
    }

    // if (voorstellingDb.getVoorstellingByInfo({zaal, film, datum, tijdstip})) {
    //     throw new Error(`Voorstelling met zaal ${zaal.id}, film ${film.id}, datum ${datum} en tijdstip ${tijdstip} bestaat al`)
    // }

    const voorstelling = new Voorstelling({zaalId, filmId, datum, tijdstip})
    
    return voorstellingDb.createVoorstelling(voorstelling)
}

const getAllVoorstellingen = async (): Promise<Voorstelling[]> => voorstellingDb.getAllVoorstellingen();

export default {
    createVoorstelling,
    getAllVoorstellingen
}