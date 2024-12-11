import { Film } from "../model/film"
import database from "./database"

const films: Film[] = []

const createFilm = ({titel, speeltijd, beschrijving}: Film): Film => {
    const film = new Film({titel, speeltijd, beschrijving, acteurs: []})
    films.push(film)
    return film
}

const getFilmById = async ({ id }: { id: number }): Promise<Film | null> => {
    try {
        const filmPrisma = await database.film.findUnique({
            where: { id },
            include: { acteurs: true}
        });

        return filmPrisma ? Film.from(filmPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

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