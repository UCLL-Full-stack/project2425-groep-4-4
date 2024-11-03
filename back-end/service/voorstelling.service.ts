import filmDb from "../domain/data-access/film.db";
import voorstellingDb from "../domain/data-access/voorstelling.db";
import zaalDb from "../domain/data-access/zaal.db";
import { Voorstelling } from "../domain/model/voorstelling";
import { VoorstellingInput } from "../types";

const createVoorstelling = ({zaal: zaalInput, film: filmInput, datum, tijdstip}: VoorstellingInput): Voorstelling => {

    if (!zaalInput || !filmInput || !datum || !tijdstip) {
        throw new Error('VoorstellingInput is niet correct')
    }

    if (zaalInput.id === undefined) {
        throw new Error('Zaal ID is undefined');
    }

    if (filmInput.id === undefined) {
        throw new Error('Film ID is undefined');
    }

    const zaal = zaalDb.getZaalById(zaalInput.id)
    const film = filmDb.getFilmById(filmInput.id)

    // if (voorstellingDb.getVoorstellingByInfo({zaal, film, datum, tijdstip})) {
    //     throw new Error(`Voorstelling met zaal ${zaal.id}, film ${film.id}, datum ${datum} en tijdstip ${tijdstip} bestaat al`)
    // }

    const voorstelling = new Voorstelling({zaal, film, datum, tijdstip, tickets: []})
    
    return voorstellingDb.createVoorstelling(voorstelling)
}

const getAllVoorstellingen = (): Voorstelling[] => voorstellingDb.getAllVoorstellingen();

export default {
    createVoorstelling,
    getAllVoorstellingen
}