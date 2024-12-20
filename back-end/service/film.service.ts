import filmDb from "../domain/data-access/film.db";
import voorstellingDb from "../domain/data-access/voorstelling.db";
import { Acteur } from "../domain/model/acteur";
import { Film } from "../domain/model/film";
import { FilmInput } from "../types";

const createFilm = async ({titel, speeltijd, beschrijving, acteurs}: FilmInput): Promise<Film> => {

    if (!speeltijd || !beschrijving || !titel || !acteurs) {
        throw new Error("Speeltijd en beschrijving zijn verplicht")
    }

    const film = new Film({
        titel, 
        speeltijd, 
        beschrijving, 
        acteurs: acteurs.map(acteur => new Acteur(acteur))
    })
    return filmDb.createFilm(film)
}

const getAllFilms = async (): Promise<Film[]> => filmDb.getAllFilms();

const getFilmById = async (id: number): Promise<Film> => {
    const film = await filmDb.getFilmById({ id });
    if (!film) throw new Error(`Film with id ${id} does not exist.`);
    return film;
};

const deleteFilmWithId = async ({filmId}: {filmId: number}): Promise<Film> => {
    const voorstelling = await voorstellingDb.getVoorstellingenByFilm({filmId});
    if (voorstelling !== null) throw new Error(`Film with id ${filmId} is still being used in a voorstelling.`);
    const film = await filmDb.deleteFilmWithId({ filmId });
    if (!film) throw new Error(`Film with id ${filmId} does not exist.`);
    return film;
}

const updateFilm = async ({ id, titel, speeltijd, beschrijving, acteurs }: Film) => {
    if (!speeltijd || !beschrijving || !titel) {
        throw new Error("Speeltijd en beschrijving zijn verplicht")
    }

    if (id && getFilmById(id) === null) {
        throw new Error('Film not found');
    }

    const film = new Film({id, titel, speeltijd, beschrijving, acteurs})
    return filmDb.updateFilm(film);
}

export default {
    createFilm,
    getAllFilms,
    getFilmById,
    deleteFilmWithId,
    updateFilm
}