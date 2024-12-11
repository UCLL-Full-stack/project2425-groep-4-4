import filmDb from "../domain/data-access/film.db";
import { Film } from "../domain/model/film";
import { FilmInput } from "../types";

const createFilm = ({titel, speeltijd, beschrijving}: FilmInput): Film => {

    if (!speeltijd || !beschrijving || !titel) {
        throw new Error("Speeltijd en beschrijving zijn verplicht")
    }

    if (filmDb.getFilmByName(titel)) {
        throw new Error(`Film met titel ${titel} bestaat al`)
    }

    const film = new Film({titel, speeltijd, beschrijving, acteurs: []})
    return filmDb.createFilm(film)
}

const getAllFilms = async (): Promise<Film[]> => filmDb.getAllFilms();

const getFilmById = async (id: number): Promise<Film> => {
    const film = await filmDb.getFilmById({ id });
    if (!film) throw new Error(`Film with id ${id} does not exist.`);
    return film;
};

export default {
    createFilm,
    getAllFilms,
    getFilmById
}