import filmDb from "../domain/data-access/film.db";
import { Film } from "../domain/model/film";
import { FilmInput } from "../types";

const createFilm = ({speeltijd, beschrijving}: FilmInput): Film => {

    if (!speeltijd || !beschrijving) {
        throw new Error("Speeltijd en beschrijving zijn verplicht")
    }

    const film = new Film({speeltijd, beschrijving, acteurs: [], voorstellingen: []})
    return filmDb.createFilm(film)
}

const getAllFilms = (): Film[] => filmDb.getAllFilms();

export default {
    createFilm,
    getAllFilms
}