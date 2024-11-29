import { Film } from "../model/film"
import database from "./database"

const films: Film[] = []

const createFilm = ({titel, speeltijd, beschrijving}: Film): Film => {
    const film = new Film({titel, speeltijd, beschrijving, acteurs: []})
    films.push(film)
    return film
}

const getFilmById = (id: number): Film => {
    const film = films.find(film => film.id === id)
    if (!film) {
        throw new Error(`film met id ${id} niet gevonden`)
    }
    return film
}

const getFilmByName = (titel: string): Film | undefined => {
    return films.find(film => film.titel === titel)
}


const getAllFilms = async(): Promise<Film[]> => {
    try {
        const filmsPrisma = await database.film.findMany({
            include: {
                acteurs: true,
            }
        });
        return filmsPrisma.map((filmPrisma) => Film.from(filmPrisma))
    } catch (error) {
        throw new Error(`Database error. See server log for details.`);
    }
};

export default {
    createFilm,
    getFilmById,
    getFilmByName,
    getAllFilms
}