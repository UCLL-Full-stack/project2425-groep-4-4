import filmDb from "../domain/data-access/film.db";
import voorstellingDb from "../domain/data-access/voorstelling.db";
import zaalDb from "../domain/data-access/zaal.db";
import { Voorstelling } from "../domain/model/voorstelling";
import { VoorstellingInput, VoorstellingUpdate } from "../types";

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

    const voorstelling = new Voorstelling({film: filmObj, zaal: zaalObj, datum, tijdstip, plaatsen: zaalObj.plaatsen});
    
    return voorstellingDb.createVoorstelling(voorstelling);
}

const getAllVoorstellingen = async (): Promise<Voorstelling[]> => voorstellingDb.getAllVoorstellingen();

const getVoorstellingById = async (id: number): Promise<Voorstelling> => {
    const voorstelling = await voorstellingDb.getVoorstellingById({ id });
    if (!voorstelling) throw new Error(`Voorstelling with id ${id} does not exist.`);
    return voorstelling;
}; 

const updateVoorstelling = async ({ id, zaalId, filmId, datum, tijdstip, plaatsen }: VoorstellingUpdate) => {
    if (!zaalId || !filmId || !datum || !tijdstip || !plaatsen) {
        throw new Error('Voorstelling is niet correct')
    }

    const zaalObj = await zaalDb.getZaalById({ id: zaalId });
    if (!zaalObj) {
        throw new Error('no Zaal was found');
    }

    const filmObj = await filmDb.getFilmById({id: filmId});
    if (!filmObj) {
        throw new Error('no film was found');
    }

    if (id && getVoorstellingById(id) === null) {
        throw new Error('Voorstelling not found');
    }

    const voorstelling = new Voorstelling({id, film: filmObj, zaal: zaalObj, datum, tijdstip, plaatsen});
    return voorstellingDb.updateVoorstelling(voorstelling);
}

const deleteVoorstellingWithId = async ({voorstellingId}: {voorstellingId: number}): Promise<Voorstelling> => {
    const voorstelling = await voorstellingDb.deleteVoorstellingWithId({voorstellingId});
    if (!voorstelling) throw new Error(`Voorstelling with id ${voorstellingId} does not exist.`);
    return voorstelling
}

export default {
    createVoorstelling,
    getAllVoorstellingen,
    getVoorstellingById,
    updateVoorstelling,
    deleteVoorstellingWithId
}