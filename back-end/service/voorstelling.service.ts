import filmDb from "../domain/data-access/film.db";
import voorstellingDb from "../domain/data-access/voorstelling.db";
import zaalDb from "../domain/data-access/zaal.db";
import { Voorstelling } from "../domain/model/voorstelling";
import { VoorstellingInput } from "../types";

const createVoorstelling = async ({zaal, film, datum, tijdstip}: VoorstellingInput): Promise<Voorstelling> => {

    if (!zaal || !film || !datum || !tijdstip) {
        throw new Error('VoorstellingInput is niet correct')
    }

    if (zaal.id === undefined) {
        throw new Error('Zaal id is undefined');
    }

    const zaalObj = await zaalDb.getZaalById({ id: zaal.id });
    if (!zaalObj) {
        throw new Error('no Zaal was found');
    }

    if (film.id === undefined) {
        throw new Error('Film id is undefined');
    }

    const filmObj = await filmDb.getFilmById({id: film.id});
    if (!filmObj) {
        throw new Error('no film was found');
    }

    const voorstelling = new Voorstelling({film: filmObj, zaal: zaalObj, datum, tijdstip});
    
    return voorstellingDb.createVoorstelling(voorstelling);
}

const getAllVoorstellingen = async (): Promise<Voorstelling[]> => voorstellingDb.getAllVoorstellingen();

const getVoorstellingById = async (id: number): Promise<Voorstelling> => {
    const voorstelling = await voorstellingDb.getVoorstellingById({ id });
    if (!voorstelling) throw new Error(`Voorstelling with id ${id} does not exist.`);
    return voorstelling;
}; 

export default {
    createVoorstelling,
    getAllVoorstellingen,
    getVoorstellingById
}